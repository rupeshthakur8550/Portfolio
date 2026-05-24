# Onboarding Automation Platform

## Current System Flow, Edge Cases, and Gap Analysis

Last updated from the live codebase on **2026-05-15**.

This document is intentionally written as an **as-built system view**, not a future-state architecture pitch. It describes:

1. What the current backend and frontend actually do.
2. How the onboarding, provisioning, onboarding-day, and offboarding flows currently work.
3. Which edge cases are already handled in code.
4. What is still missing to make the platform truly end-to-end autonomous with controlled HITL checkpoints.

---

## 1. Current System at a Glance

The current product is an **internal onboarding operations platform** with:

- A **FastAPI backend** backed by PostgreSQL, SQLAlchemy, and Alembic.
- A **React + TypeScript frontend** used by internal users.
- **Microsoft SSO** plus session-based auth for browser users.
- **Role-aware workflow routing** for TA, HR, Admin, and SYSTEM actors.
- A **state-machine-driven employee lifecycle** from TA draft through onboarding and offboarding.
- Background schedulers for:
  - config mapping refresh,
  - workflow side-effect processing,
  - reminder scheduling and execution,
  - immediate joiner handling,
  - SLA escalation.

The platform is already more than a CRUD app. It has real orchestration, approvals, reminders, audit logs, and external integrations. But it is **not yet a fully closed-loop autonomous onboarding system**.

---

## 2. What Exists Today: Frontend

### 2.1 Current frontend shape

The frontend is a **single internal operations console**, not three independent portals.

Current routes:

- `/login`
- `/signup`
- `/dashboard`
- `/pre-onboarding`
- `/onboarding`
- `/offboarding`

Important reality:

- `/dashboard`, `/pre-onboarding`, `/onboarding`, and `/offboarding` are live internal workflow views.
- `/signup` is currently just a local UI form and is **not tied to real backend account creation**.
- There is **no real candidate portal** today.
- There is **no real manager portal** today.

### 2.2 Frontend auth flow

The frontend uses:

- Redux Toolkit + persisted auth state.
- A session bootstrap hook that calls `/auth/session` on app load.
- Protected/public routes.
- Microsoft SSO redirect flow initiated from the login page.
- Client-side inactivity timeout handling.

Current behavior:

- Users land on the login page.
- Clicking Microsoft login redirects the browser to the backend auth route.
- The backend performs Microsoft auth, application allowlist authorization, role resolution, and session creation.
- The frontend rehydrates the session and routes the user to `/dashboard`.
- If the session expires or is missing, the UI fails closed and routes back to login.

### 2.3 Main frontend modules

#### Dashboard

The dashboard is an internal analytics and planning view built from employee records returned by `/employees`.

It currently provides:

- counts by workflow status and urgency,
- monthly and yearly visualizations,
- pre/on/off flow grouping,
- derived operational views such as reminders, readiness, blocked workflows, and rescheduled cases.

Important caveat:

- several dashboard workflow visuals are **derived client-side** from `workflowStatus`, `workflow`, and `integrationFlags`,
- so some widgets are presenting an **interpreted workflow state**, not always a backend-generated canonical timeline.

#### Workflow Console

The `/pre-onboarding`, `/onboarding`, and `/offboarding` pages all render the same `WorkflowConsole` with different filters.

Current capabilities:

- list/search/filter employee records,
- create employee record,
- edit employee record,
- view employee workflow detail,
- trigger workflow transitions,
- view pending approval queue,
- approve Keka checkpoint,
- approve destructive offboarding checkpoint,
- initiate withdrawal / offer revoke / offboarding,
- show recent audit activity for admins.

#### Master Form

The create/edit experience is driven by a dynamic form system using JSON metadata.

Current behavior:

- TA and HR fields are shown through one unified form,
- designation and role logic determines whether HR-managed fields are accessible,
- HR validation confirmation is surfaced in the form,
- joining urgency can be auto-derived for near-term joiners,
- reserved workflow/system fields are stripped before patch updates.

### 2.4 Frontend limitations

The current frontend does **not** yet provide:

- candidate self-service form/document upload,
- manager self-service task completion,
- an IT operations console for provisioning work,
- a workflow scheduler/queue operations screen,
- a side-effect job failure console,
- a real approval inbox beyond the current embedded queue cards,
- a true document verification workbench,
- a production-grade signup/account enrollment path.

---

## 3. What Exists Today: Backend

### 3.1 Core backend stack

The backend currently includes:

- FastAPI application lifecycle management,
- PostgreSQL persistence,
- Alembic migrations,
- async SQLAlchemy session handling,
- rate limiting through SlowAPI,
- session middleware,
- CORS middleware,
- request traceability middleware,
- centralized exception handling with redaction,
- environment-driven settings and safety checks.

### 3.2 Startup behavior

On startup, the backend conditionally starts background workers if required schema exists:

- config mapping loader and refresh loop,
- workflow side-effect queue processor,
- reminder scheduler loop,
- immediate joiner loop,
- SLA escalation loop.

This is important because the application does not just expose APIs. It also runs asynchronous workflow support processes in the same service.

### 3.3 Auth and identity

The backend supports three effective caller types:

- browser session users authenticated through Microsoft SSO,
- system callers using a bearer token,
- development bypass users only on loopback when explicitly enabled and header-driven.

Current auth chain:

1. Microsoft auth callback exchanges code for token.
2. User profile is fetched from Microsoft Graph.
3. Email is validated against `APP_AUTHORIZED_USER_EMAILS` from `.env`.
4. Role is resolved from config mapping and SSO profile.
5. Session is created for the browser only if role resolution succeeds.

Security hardening already applied:

- `ALLOWED_ORIGINS`, `APP_AUTHORIZED_USER_EMAILS`, and `APP_RBAC_ADMIN_EMAILS` are parsed as explicit list settings from `.env`,
- session-authenticated unsafe requests require trusted `Origin` or `Referer` matching `ALLOWED_ORIGINS`,
- development bypass works only in `development`, only on loopback, and only when explicit dev headers are present,
- SYSTEM bearer access is scoped to an explicit endpoint allowlist from `.env`, not accepted globally.

### 3.4 Role resolution

Roles are currently:

- `TA`
- `HR`
- `Admin`
- `SYSTEM`

Resolution rules:

- explicit admin email allowlist wins,
- otherwise HR designation mapping,
- otherwise TA designation mapping,
- otherwise access fails closed with no role,
- direct role is honored for `SYSTEM` and dev bypass users.

This is now a fail-closed permission model. Unknown or unmapped users do not receive a valid app role.

### 3.5 Main backend routers

#### `auth_router`

Provides:

- session status,
- logout,
- Microsoft login,
- Microsoft callback,
- admin-only application allowlist verification.

#### `employee_router`

Provides:

- create employee,
- list employees,
- fetch single employee,
- update employee,
- SharePoint ingestion endpoint,
- task reconciliation for one employee,
- bulk reconciliation for pending reschedules.

Current hardening on ingestion and bulk operations:

- unknown top-level request fields are rejected,
- SharePoint ingestion rows are validated against an allowlisted field set,
- nested JSON values inside SharePoint rows are rejected,
- oversized SharePoint sync batches are rejected,
- bulk pending reconciliation is capped to `50` items per request and remains admin-only.

#### `workflow_router`

Provides workflow transitions and approval endpoints including:

- submit to HR,
- HR accept,
- HR return to TA,
- HR validate,
- trigger provisioning,
- complete provisioning,
- trigger onboarding,
- ready for onboarding,
- approve Keka,
- send welcome email,
- mark onboarded,
- withdraw,
- revoke offer,
- initiate offboarding,
- approve offboarding,
- asset recovery pending,
- account deletion pending,
- complete offboarding,
- workflow history,
- pending approval queue,
- pending approval list by employee.

#### `hr_router`

Provides:

- HR checklist update,
- explicit validation endpoint,
- HR release to automation,
- HR accept/return helpers.

#### `audit_router`

Provides:

- audit log queries,
- employee-specific audit history.

---

## 4. Current Data Model

### 4.1 Primary record: `employees`

The employee table is the operational source of truth for the workflow. It already stores:

- TA-entered fields,
- HR-managed fields,
- logistics fields,
- employee document link fields,
- workflow state,
- workflow history,
- assignee,
- HR checklist,
- freeform workflow metadata,
- integration flags,
- source tracking for ingest,
- form submission timestamp,
- reschedule flag,
- optimistic locking version.

### 4.2 Supporting process tables

The system also stores operational side effects in dedicated tables:

- `audit_logs`
- `timeline_tasks`
- `workflow_side_effect_jobs`
- `happyfox_tickets`
- `entra_accounts`
- `keka_staging`
- `offboarding_events`
- `mail_log`
- `documents`
- `config_mappings`

This is a strong foundation because it separates core employee state from operational artifacts.

### 4.3 Important design note

The `documents` table exists, but the current live platform does **not yet expose a full document upload and validation product flow**. In practice, document references are currently handled mostly as fields or SharePoint-ingested values, not as a first-class candidate-facing document pipeline.

---

## 5. Current Workflow State Machine

### 5.1 Implemented statuses

The backend currently supports these workflow statuses:

#### Pre-onboarding

- `TA_DRAFT`
- `TA_SUBMITTED`
- `HR_REVIEW`
- `HR_ENRICHMENT`
- `TA_RETURNED`
- `HR_VALIDATION`
- `VALIDATION_FAILED`

#### Provisioning

- `READY_FOR_AUTOMATION`
- `READY_FOR_PROVISIONING`
- `PROVISIONING_IN_PROGRESS`
- `PROVISIONING_COMPLETE`

#### Onboarding

- `READY_FOR_ONBOARDING`
- `ONBOARDING_EMAIL_SENT`
- `KEKA_PROFILE_CREATED`
- `WELCOME_MAIL_SENT`
- `ONBOARDED`

#### Exceptions / exits

- `WITHDRAWN`
- `OFFER_REVOKED`

#### Offboarding

- `OFFBOARDING_INITIATED`
- `OFFBOARDING_TRIGGERED`
- `ASSET_RECOVERY_PENDING`
- `ACCOUNT_DELETION_PENDING`
- `OFFBOARDED`

### 5.2 Current control model

This is not a passive status list. The system enforces:

- valid transition paths,
- role-based transition permission,
- workflow history creation,
- next-owner assignment,
- idempotency-aware duplicate transition suppression,
- post-transition side-effect dispatch,
- approval checkpoints for destructive or irreversible steps.

---

## 6. End-to-End Flow: How the App Works Today

## 6.1 Access and authorization

1. A user authenticates via Microsoft SSO.
2. The backend checks whether the user email exists in `APP_AUTHORIZED_USER_EMAILS`.
3. The backend resolves the role using the explicit admin allowlist plus designation/config mapping.
4. The frontend stores session state and renders the internal portal.

This means the first gate is external identity plus an application-owned allowlist, not SharePoint access rows.

## 6.2 Employee record creation

The current platform supports two record creation paths:

### Path A: Manual internal creation

- TA or Admin creates an employee from the frontend form.
- Backend validates the payload.
- Work email uniqueness is checked.
- Optional idempotency key prevents duplicate creation.
- Audit log entry is created.
- HR entry-created notification is sent.

### Path B: SharePoint row ingestion

- Admin calls the SharePoint ingest endpoint.
- Rows are normalized through field alias mapping.
- Existing employees are matched using personal email, work email, or full name + DOJ.
- New records can be created for TA source rows.
- Existing records are selectively updated.
- row source, sync time, and source row key are tracked.

Important current limitation:

- SharePoint ingestion exists as a service and endpoint, but the platform still needs a stronger production-grade ingestion trigger strategy. Today it is not a full event-driven inbound data pipeline.
- SharePoint is now used for operational data/config refresh, not as the live authorization registry for user login.

## 6.3 TA stage

The employee starts in `TA_DRAFT`.

During this stage, TA can:

- fill core candidate information,
- assign role, manager, DOJ, work mode, laptop needs, and logistics,
- update allowed TA-managed fields,
- submit the record to HR.

The system restricts TA from directly changing protected workflow fields or HR-owned fields.

## 6.4 HR review and enrichment

When TA submits:

- workflow changes to `TA_SUBMITTED`,
- HR/Admin can accept and move the record into enrichment,
- HR can return the record to TA with a mandatory reason,
- HR notes are stored,
- return-to-TA alerts are sent.

This is the first real HITL checkpoint in the system.

## 6.5 HR validation and release

Before the record is released for provisioning, the system validates:

- mandatory base fields,
- mandatory HR-managed fields,
- remote shipping requirements,
- HR checklist completion,
- duplicate employee number conflicts.

If validation passes:

- HR releases the employee to `READY_FOR_PROVISIONING`,
- task reconciliation is triggered,
- scheduling artifacts are refreshed,
- record is marked for provisioning execution.

If validation fails:

- the employee stays blocked until corrected,
- or HR may override warnings during release.

This is the current place where HR is intentionally in the loop and should remain so, even in a future autonomous model.

## 6.6 Task planning and reconciliation

When the employee becomes provisioning-ready or data changes materially:

- the task reconciliation service calculates the desired pre-join task set,
- existing pending tasks are retained, cancelled, or recreated,
- outdated tasks are cancelled,
- reschedule flag is cleared after reconciliation.

Planned task types currently include:

- BGV request mail,
- joining reminders,
- manager notification,
- HR verification mail,
- joining details mail,
- onboarding instruction mail,
- HappyFox provisioning ticket,
- Entra account creation,
- HappyFox/Entra sync,
- asset allocation ticket.

The planning logic accounts for:

- joining date,
- urgency,
- work mode,
- laptop requirement,
- shipping requirement,
- reschedule state,
- already joined or post-join statuses.

## 6.7 Reminder and execution engine

The reminder engine picks due `timeline_tasks` and executes them.

Current execution capabilities:

- send templated mails,
- create provisioning tickets,
- create Entra account,
- sync provisioning completion,
- create asset allocation tasks.

Execution model:

- mark task `IN_PROGRESS`,
- run handler,
- mark `COMPLETED` on success,
- retry through centralized failure handling on error,
- create audit events for task completion.

This is the core automation engine for pre-join operational work.

## 6.8 Provisioning flow

Once provisioning work starts, the system can:

- create HappyFox provisioning ticket,
- create or recover Entra account,
- assign usage location,
- assign licenses,
- resolve and assign manager,
- resolve and add groups,
- create asset allocation ticket if required,
- update integration flags,
- record Entra and HappyFox operational artifacts.

The system uses `integration_flags` as the lightweight operational mirror for external system state.

When enough provisioning conditions are met, the employee can move through:

- `PROVISIONING_IN_PROGRESS`
- `PROVISIONING_COMPLETE`
- `READY_FOR_ONBOARDING`

## 6.9 Onboarding-day flow

After provisioning completes:

- HR or SYSTEM can mark `READY_FOR_ONBOARDING`,
- onboarding instruction mail can be sent,
- onboarding mail includes Entra UPN and inline schedule asset when available,
- reminder and notification services send readiness alerts.

This is where the workflow transitions from pre-join preparation to Day 0 / Day 1 activation.

## 6.10 Keka checkpoint

The current system correctly treats Keka creation as a sensitive milestone.

Flow today:

1. Employee reaches `ONBOARDING_EMAIL_SENT`.
2. A Keka approval action is requested and stored in workflow metadata.
3. HR/Admin sees this in the approval queue.
4. HR explicitly approves.
5. The backend validates the approval snapshot hash.
6. If the employee data changed after the request, approval is rejected and must be re-requested.
7. After approval, Keka profile creation is executed.

Current Keka behavior:

- attempts live Keka creation when integration is enabled,
- can recover an already-existing Keka employee,
- syncs personal and job details,
- stores Keka-related integration flags,
- sends manual alert if automated Keka completion cannot proceed cleanly.

This is the strongest current HITL pattern in the system and should remain in the final autonomous design.

## 6.11 Welcome and completion

After Keka:

- org welcome email can be sent,
- employee can be marked `ONBOARDED`.

This final state is still mostly controlled by explicit workflow transitions, not a fully event-driven closed loop.

## 6.12 Withdrawal, revocation, and offboarding

The current system already supports three different exit patterns:

- candidate withdrew,
- offer revoked,
- employee offboarding.

Current behavior:

- withdrawal requires reason,
- offer revocation requires reason,
- offboarding can be initiated for already-onboarded employees,
- destructive offboarding actions require explicit approval,
- approval may require typed confirmation,
- once approved, the flow proceeds through:
  - `OFFBOARDING_TRIGGERED`
  - `ASSET_RECOVERY_PENDING`
  - `ACCOUNT_DELETION_PENDING`
  - `OFFBOARDED`

There is real offboarding workflow logic today, but not all cleanup actions are fully autonomous yet.

---

## 7. Edge Cases the Current System Already Covers

This is one of the strongest parts of the current implementation.

### 7.1 Idempotent create and update

The system already handles duplicate submissions with idempotency keys for:

- employee create,
- employee update,
- workflow transitions,
- approval transitions.

This reduces accidental duplicate writes from retries or double-clicks.

### 7.2 Optimistic locking / stale write protection

Employee records carry a `version` field and workflow updates raise stale object errors when the expected version no longer matches.

This protects concurrent operators from silently overwriting each other.

### 7.3 Role fail-closed API protection

Transition endpoints are role-gated, and unresolved role cases are denied.

This is important because the frontend is not the security boundary. The API is.

### 7.4 SharePoint cache behavior

SharePoint config and worksheet reads are cached.

If SharePoint fetch fails:

- stale cache can still be used,
- cache expiry is bounded,
- the app avoids a total hard stop when transient SharePoint errors occur.

After the security fixes:

- SharePoint cache staleness no longer decides who can access the app,
- operator access is controlled by the application allowlist in `.env`,
- SharePoint outages mainly affect config freshness and ingestion freshness.

### 7.5 Remote shipping validation

For remote/shipping cases, required shipping fields are enforced before release.

This avoids “remote joiner with no delivery details” slipping into provisioning.

### 7.6 Duplicate employee number detection

HR validation detects when `employee_number` is already used by another employee.

This is critical for Keka/payroll correctness.

### 7.7 TA vs HR field ownership

The backend enforces update permissions so:

- TA cannot modify HR-managed fields,
- HR cannot patch protected workflow internals directly through generic update,
- system fields remain reserved.

### 7.8 Reschedule-aware task regeneration

Material changes to operational fields can mark the employee for reschedule.

Then reconciliation:

- cancels outdated pending tasks,
- recreates the correct schedule,
- clears the reschedule flag.

This is essential for changed DOJ, changed shipping info, changed reporting manager, and similar operational edits.

### 7.9 Immediate joiner handling

Near-term and same-day joiners are treated with urgent task mode and fast scheduling behavior.

This prevents the normal cadence engine from missing urgent onboarding windows.

### 7.10 Duplicate mail suppression

Mail orchestration checks whether the same template was already sent that day for the employee.

This protects against repeated scheduler retries spamming users.

### 7.11 Pending approval snapshot protection

Approval requests store an HMAC snapshot hash of the employee data.

At approval time:

- if the snapshot no longer matches current employee data,
- approval is rejected,
- a fresh approval request is required.

This is especially important for:

- Keka creation,
- destructive offboarding.

### 7.12 Approval timeout escalation

Pending approvals can expire and escalate automatically.

The system can:

- mark them escalated,
- write audit history,
- notify the appropriate team.

### 7.13 External service failure escalation

If integrations like Graph Directory fail during critical actions, the system can:

- capture failure details,
- infer likely permission/configuration issues,
- notify IT/ops owners with contextual information.

### 7.14 Disabled integration safe behavior

When HappyFox or Keka integrations are disabled, the system does not simply crash.

It can:

- skip outbound actions safely in some paths,
- mark skip reasons,
- preserve workflow continuity where possible.

### 7.15 Missing manager handling

Certain notification flows can safely skip manager communication when no manager email is available, instead of breaking the queue.

### 7.16 Schema readiness gating

Background schedulers and side-effect processors only start if required schema elements exist.

This avoids half-started automation loops after partial deployments or missing migrations.

---

## 8. Current HITL Model

The system is already partially autonomous, but not fully autonomous.

### 8.1 HITL points that currently exist and should remain

These are good human checkpoints:

- HR validation and release to provisioning,
- HR return-to-TA review loop,
- Keka profile approval,
- destructive offboarding approval,
- manual review for failed external side effects.

### 8.2 HITL points that exist today mostly because automation is incomplete

These should shrink over time:

- manual ingestion triggering,
- manual readiness transitions after provisioning,
- manual offboarding progress marking,
- manual audit inspection for failures,
- manual coordination around document verification and BGV completion.

---

## 9. What Is Missing to Make This Fully Autonomous End-to-End

This section is the most important for the future roadmap.

## 9.1 Missing external input automation

Today, core inbound data still depends too much on manual triggers or partial feeds.

Missing:

- fully automated TA source ingestion pipeline,
- automated BGV/form ingestion trigger,
- webhook-driven updates from external systems,
- robust reconciliation against source-of-truth changes,
- managed lifecycle for the current `.env`-driven application access allowlist.

Target state:

- SharePoint/form/Keka/HappyFox/Graph events should land automatically,
- inbound changes should trigger reconciliation without admin intervention,
- source conflicts should surface in a controlled review queue.

## 9.2 Missing true candidate portal

There is no candidate-facing authenticated or tokenized portal today.

Missing:

- candidate document upload,
- candidate data confirmation,
- candidate correction workflow,
- re-upload on rejection,
- candidate visibility into status,
- acknowledgement or e-sign capture,
- intake of BGV and statutory forms directly in product.

Target state:

- candidate receives secure link,
- completes profile and uploads docs,
- system validates completeness and quality,
- HR only reviews exceptions.

## 9.3 Missing true manager portal

There is no dedicated manager portal today.

Missing:

- manager readiness checklist,
- manager acknowledgement,
- seat/desk/equipment readiness sign-off,
- team introduction tasks,
- manager escalations when tasks are overdue.

Target state:

- manager receives actionable checklist,
- manager actions are tracked in-system,
- onboarding is not marked ready until required manager tasks are closed or waived.

## 9.4 Missing document intelligence layer

The codebase has document fields and a `documents` table, but not a complete document engine.

Missing:

- secure upload storage flow,
- OCR and extraction pipeline,
- document type classification,
- document validity rules,
- rejection reasoning,
- checklist auto-completion based on verified docs.

Target state:

- uploaded docs are parsed and validated automatically,
- only mismatches and low-confidence cases go to HR review.

## 9.5 Missing full compliance automation

Regional document policy logic exists, but it is not fully wired into the real document experience.

Missing:

- region-based mandatory document enforcement in the candidate flow,
- compliance evidence storage,
- statutory audit bundle generation,
- country/legal-entity specific downstream system mapping completeness.

## 9.6 Missing real closed-loop provisioning confirmations

The provisioning engine is strong, but still not fully closed loop.

Missing:

- webhook/event confirmation from HappyFox,
- stronger authoritative completion signals from asset systems,
- stronger authoritative completion signals from identity systems,
- real-time provisioning state dashboard,
- retry/override UI for provisioning failures.

Target state:

- provisioning completion should move from “best-effort inferred from flags and tasks” to “confirmed by external acknowledgements”.

## 9.7 Missing fully autonomous Day 1 completion logic

Today the system can send onboarding mails and transition states, but final completion still needs more system-driven evidence.

Missing:

- auto-detect first login / account activation,
- confirm Keka activation completion from Keka itself,
- confirm welcome communication delivery and acknowledgement,
- auto-close onboarding based on evidence rather than manual marking.

## 9.8 Missing offboarding closure automation

Offboarding exists, but the last mile is still largely manual.

Missing:

- asset return verification integration,
- laptop/device deallocation system integration,
- SaaS deprovisioning coverage beyond Entra,
- payroll/HRIS exit closure sync,
- revocation evidence collection,
- automatic offboarding completion when all downstream signals are green.

Target state:

- offboarding should close itself when asset return, access revocation, and HRIS closure are all confirmed.

## 9.9 Missing operations control plane

Autonomous systems need operator tooling, not just end-user screens.

Missing:

- queue monitor for `timeline_tasks`,
- queue monitor for `workflow_side_effect_jobs`,
- dead-letter / failed-job operations UI,
- replay / retry controls,
- approval SLA dashboard,
- scheduler health dashboard,
- per-integration health panel.

This is required if the platform is going to scale without becoming an opaque black box.

## 9.10 Missing stronger observability and runbooks

The code already has good foundations such as audit logs, traceability, alerts, and structured side effects. But it still needs a more explicit ops layer.

Missing:

- business KPI dashboards,
- workflow stuck-state alerts,
- queue lag alerts,
- per-stage SLA breach reporting,
- daily exception digest,
- runbooks for manual recovery paths,
- operational ownership matrix,
- secrets-manager-backed SYSTEM token rotation and delivery,
- mTLS or equivalent service-to-service trust for SYSTEM callers,
- field-level encryption strategy for the most sensitive PII.

## 9.11 Missing richer approval UX

Approvals exist, but the user experience is still minimal.

Missing:

- approval inbox with grouped actions,
- side-by-side snapshot diff on approval,
- approval history timeline,
- bulk approvals where safe,
- delegated approvals,
- escalation ownership reassignment.

## 9.12 Missing frontend truth alignment

The UI currently derives several workflow step cards client-side from status and flags.

This is useful, but not ideal as the final model.

Missing:

- backend-generated canonical workflow timeline object,
- consistent workflow explanation payload,
- machine-readable “why blocked / why ready / why escalated” state payloads.

Target state:

- frontend should render exactly what backend orchestration says, not reconstruct it heuristically.

## 9.13 Missing proper product separation

Right now the frontend is one internal console serving multiple mental models.

Target architecture should separate:

- internal TA/HR ops console,
- candidate portal,
- manager portal,
- IT / provisioning operations console,
- admin / support operations console.

---

## 10. What “Fully Autonomous with HITL” Should Mean for This Product

The right target is **not** “remove humans”. The right target is:

- automate deterministic work,
- require humans only at risk-bearing or policy-bearing checkpoints,
- make every HITL action explicit, auditable, and time-bound.

### 10.1 Recommended autonomous operating model

#### Fully automated

- source ingestion,
- data normalization,
- schedule generation,
- reminder generation,
- standard mail delivery,
- provisioning ticket creation,
- Entra user creation,
- license/group assignment,
- asset request generation,
- non-sensitive workflow progression based on confirmed downstream signals.

#### HITL required

- HR validation release,
- exception handling on validation mismatches,
- Keka irreversible activation approval,
- destructive offboarding approval,
- compliance exceptions,
- failed external integration recovery,
- policy overrides.

#### Auto-escalated to human only on exception

- missing manager mapping,
- duplicate or conflicting source data,
- document mismatch,
- integration timeout after retry budget,
- approval timeout,
- side-effect queue failure,
- task reconciliation conflict.

---

## 11. Recommended Next Build Sequence

If the goal is “start to end completely fully autonomous with some HITL”, the cleanest order is:

### Phase 1: Close the inbound data loop

- automate SharePoint/form ingestion,
- add source conflict handling,
- auto-trigger reconciliation on change.

### Phase 2: Build the candidate portal

- secure intake,
- document upload,
- validation,
- correction loop,
- completion scoring.

### Phase 3: Build the operator control plane

- task queue view,
- side-effect queue view,
- replay/retry tools,
- failure workbench,
- SLA dashboard.

### Phase 4: Close provisioning with authoritative external confirmations

- webhook/event consumers,
- provisioning state convergence rules,
- downstream completion signals.

### Phase 5: Build manager and IT self-service surfaces

- manager checklist,
- IT queue,
- exception routing.

### Phase 6: Make onboarding/offboarding evidence-driven

- auto-close onboarding from real signals,
- auto-close offboarding from revocation + asset + HRIS evidence.

---

## 12. Final Assessment

The current system is already a **real workflow orchestration platform**, not just a prototype UI.

It already has:

- authenticated internal access,
- backend-enforced RBAC,
- employee lifecycle state machine,
- idempotent transitions,
- audit trails,
- task scheduling,
- notification orchestration,
- approval checkpoints,
- external provisioning integrations,
- offboarding support,
- several strong edge-case protections.

But it is **not yet fully autonomous from start to finish** because the following are still incomplete:

- candidate-side intake and document journey,
- manager-side participation,
- inbound event automation,
- queue operations tooling,
- canonical backend-generated workflow explanation,
- full external confirmation loop for provisioning/onboarding/offboarding,
- stronger exception-handling workbenches.

### Practical conclusion

Today the platform is best described as:

> **An internal onboarding workflow orchestration system with partial automation and well-placed approval checkpoints.**

It is **not yet**:

> **A fully autonomous, closed-loop onboarding operating system with exception-only human intervention.**

That final step is achievable, but it requires productizing the missing portals, control-plane tooling, inbound automation, and evidence-based completion logic.
