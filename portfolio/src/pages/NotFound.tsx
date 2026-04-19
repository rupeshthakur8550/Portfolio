import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <section className="min-h-[70vh] flex flex-col items-center justify-center px-6 text-center gap-6">
      <p className="text-sm uppercase tracking-[0.35em] text-theme-text-muted">
        404
      </p>
      <h1 className="text-4xl md:text-6xl font-black text-theme-text">
        Page not found
      </h1>
      <p className="max-w-2xl text-theme-text-sec text-base md:text-lg leading-relaxed">
        The route does not exist anymore or the URL is incorrect. Use the
        primary navigation or return to the homepage.
      </p>
      <Link
        to="/"
        className="inline-flex items-center rounded-xl bg-theme-sky px-5 py-3 text-white font-semibold shadow-lg hover:bg-theme-sky/90 transition-colors"
      >
        Go home
      </Link>
    </section>
  );
};

export default NotFoundPage;
