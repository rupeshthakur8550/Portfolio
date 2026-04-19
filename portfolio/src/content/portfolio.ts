import rawContent from "../assets/json/common.json";

export interface IntroProfile {
  name: string;
  description: string;
}

export interface IntroStat {
  label: string;
  value: string;
}

export interface EducationEntry {
  title: string;
  degree: string;
  batch: string;
  institution: string;
  school?: string;
  major?: string;
  learnings: string[];
}

export interface IntroContent {
  heroTitle: string;
  heroSubtitle: string;
  bio: string;
  introSentences: string[];
  profile: IntroProfile;
  stats: IntroStat[];
  education: {
    title: string;
    data: EducationEntry[];
  };
}

export interface HeaderNavItem {
  label: string;
  icon: string;
  href: string;
}

export interface ActivityEntry {
  title: string;
  points: string[];
}

export interface ProjectInitiative {
  title: string;
  duration: string;
  points: string[];
}

export interface CompanyExperience {
  company: string;
  duration: string;
  role: string;
  bullets: string[];
  activities?: ActivityEntry[];
  projects?: ProjectInitiative[];
}

export interface ExperienceContent {
  heading: string;
  activitiesLabel: string;
  projectsLabel: string;
  companyDetails: CompanyExperience[];
}

export interface SkillEntry {
  name: string;
  icon: string;
  color: string;
  description: string;
}

export interface SkillsContent {
  header: {
    heading: string;
    subHeading: string;
  };
  instruction: string;
  skillsData: SkillEntry[];
}

export interface ProjectEntry {
  title: string;
  slug: string;
  cardDescription: string;
  pageDescription: string;
  tech: string[];
  link: string;
  livelink: string | null;
  image: string;
  problem: string;
  solution: string;
}

export interface BlogEntry {
  title: string;
  slug: string;
  summary: string;
  image: string;
  fullContent: string;
  learningOutcomes: string[];
  githubLink?: string;
  date?: string;
}

export interface ContactContent {
  title: string;
  subtitle: string;
  letsTalk: string;
  description: string;
  emailLabel: string;
  email: string;
  form: {
    fullNameLabel: string;
    fullNamePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    contactLabel: string;
    contactPlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    submitButton: string;
    submitting: string;
    successMessage: string;
    errorMessage: string;
    errorFallback: string;
  };
}

export interface PortfolioContent {
  IntroPage: IntroContent;
  Header: {
    navigation: HeaderNavItem[];
  };
  experience: ExperienceContent;
  SkillsPage: SkillsContent;
  projectsPage: {
    title: string;
    subtitle: string;
    subtitleExpanded: string;
    folderText: string;
    folderSubtext: string;
    tapToExpand: string;
    clickToOpen: string;
  };
  blogsPage: {
    title: string;
    subtitle: string;
    readArticle: string;
  };
  contactPage: ContactContent;
  projects: Omit<ProjectEntry, "slug">[];
  blogs: Omit<BlogEntry, "slug">[];
}

const portfolioBase = rawContent.Portfolio as PortfolioContent;

export const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const portfolioContent = {
  ...portfolioBase,
  projects: portfolioBase.projects.map((project) => ({
    ...project,
    slug: slugify(project.title),
  })),
  blogs: portfolioBase.blogs.map((blog) => ({
    ...blog,
    slug: slugify(blog.title),
  })),
};

export const getProjectBySlug = (slug: string) =>
  portfolioContent.projects.find((project) => project.slug === slug);

export const getBlogBySlug = (slug: string) =>
  portfolioContent.blogs.find((blog) => blog.slug === slug);
