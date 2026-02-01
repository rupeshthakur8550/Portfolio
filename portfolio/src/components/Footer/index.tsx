import { SiLeetcode } from "react-icons/si";
import { MdOutlineMail } from "react-icons/md";
import { FiLinkedin, FiGithub } from "react-icons/fi";

const VerticalSocialBar = () => {
  return (
    <div className="fixed bottom-0 left-4 sm:inline-flex hidden flex-col items-center space-y-4 text-theme-text-sec">
      <a
        href="https://github.com/rupeshthakur8550"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FiGithub size={22} className="hover:text-theme-sky transition" />
      </a>
      <a
        href="https://leetcode.com/u/rupeshthakur80078/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <SiLeetcode size={22} className="hover:text-theme-sky transition" />
      </a>

      <a
        href="https://in.linkedin.com/in/rupesh-thakur-010209207?trk=people-guest_people_search-card"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FiLinkedin size={22} className="hover:text-theme-sky transition" />
      </a>

      <a
        href="https://mail.google.com/mail/?view=cm&to=rupeshthakur80078@gmail.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        <MdOutlineMail size={22} className="hover:text-theme-sky transition" />
      </a>

      {/* Vertical line */}
      <div className="w-px h-20 bg-theme-text-sec mt-2"></div>
    </div>
  );
};

const Footer = () => {
  return (
    <div className="text-theme-text absolute">
      <VerticalSocialBar />
      {/* Hello Im here to develop something */}
    </div>
  );
};

export default Footer;
