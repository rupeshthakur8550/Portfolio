import { isRouteErrorResponse, Link, useRouteError } from "react-router-dom";

const RouteErrorPage = () => {
  const error = useRouteError();

  const message = isRouteErrorResponse(error)
    ? `${error.status} ${error.statusText}`
    : "Something went wrong while loading this page.";

  return (
    <section className="min-h-[70vh] flex flex-col items-center justify-center px-6 text-center gap-6">
      <p className="text-sm uppercase tracking-[0.35em] text-theme-text-muted">
        Route Error
      </p>
      <h1 className="text-4xl md:text-6xl font-black text-theme-text">
        Unable to render this page
      </h1>
      <p className="max-w-2xl text-theme-text-sec text-base md:text-lg leading-relaxed">
        {message}
      </p>
      <Link
        to="/"
        className="inline-flex items-center rounded-xl bg-theme-sky px-5 py-3 text-white font-semibold shadow-lg hover:bg-theme-sky/90 transition-colors"
      >
        Back to home
      </Link>
    </section>
  );
};

export default RouteErrorPage;
