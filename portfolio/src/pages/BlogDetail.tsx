import { Navigate, useParams } from "react-router-dom";
import BlogDetails from "../components/Blogs/BlogDetails";
import { getBlogBySlug } from "../content/portfolio";

const BlogDetailPage = () => {
  const { slug = "" } = useParams();
  const blog = getBlogBySlug(slug);

  if (!blog) {
    return <Navigate to="/not-found" replace />;
  }

  return (
    <div className="px-4 pb-20 md:pb-28">
      <BlogDetails blog={blog} />
    </div>
  );
};

export default BlogDetailPage;
