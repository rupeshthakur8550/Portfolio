import { MdOutlineArrowForward } from "react-icons/md";
import common from "../../assets/json/common.json";
import GradientText from "../UI/GradientText";
import LazyImage from "../UI/LazyImage";

const Blogs = () => {
  const blogs = common.Portfolio.blogs;
  const blogsText = common.Portfolio.blogsPage;

  return (
    <div
      id="blogs"
      className="min-h-screen py-16 px-4 md:px-10 max-w-6xl mx-auto relative z-20"
    >
      <div className="text-center mb-12 md:mb-20">
        <div className="mb-6">
          <GradientText
            animationSpeed={3}
            showBorder={false}
            className="text-5xl sm:text-7xl font-black tracking-tight"
          >
            {blogsText.title}
          </GradientText>
        </div>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          {blogsText.subtitle}
        </p>
      </div>

      <div className="flex flex-wrap justify-center items-start gap-8">
        {blogs.map((blog, index) => (
          <a
            key={index}
            href={blog.link}
            className="group block bg-gray-900/40 backdrop-blur-md border border-gray-700 rounded-xl p-6 hover:bg-gray-800/60 hover:border-purple-500/50 transition-all duration-300 w-full md:w-[calc(50%-16px)] lg:w-[calc(33.33%-22px)]"
          >
            {/* Blog Image */}
            <div className="w-full h-48 mb-6 overflow-hidden rounded-lg">
              <LazyImage
                src={blog.image}
                alt={blog.title}
                className="w-full h-full transform group-hover:scale-110 transition-transform duration-500"
              />
            </div>

            <div className="flex justify-between items-center text-sm text-gray-400 mb-4">
              <span>{blog.date}</span>
              <span>{blog.readTime}</span>
            </div>

            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors">
              {blog.title}
            </h3>

            <p className="text-gray-400 text-sm mb-6 line-clamp-3">
              {blog.summary}
            </p>

            <div className="flex items-center text-purple-400 font-medium group-hover:translate-x-2 transition-transform duration-300">
              {blogsText.readArticle} <MdOutlineArrowForward className="ml-2" />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Blogs;