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
 aria-label="GitHub profile"
 >
 <FiGithub size={22} className="hover:text-theme-sky transition" />
 </a>
 <a
 href="https://leetcode.com/u/rupeshthakur80078/"
 target="_blank"
 rel="noopener noreferrer"
 aria-label="LeetCode profile"
 >
 <SiLeetcode size={22} className="hover:text-theme-sky transition" />
 </a>

 <a
 href="https://in.linkedin.com/in/rupesh-thakur-010209207?trk=people-guest_people_search-card"
 target="_blank"
 rel="noopener noreferrer"
 aria-label="LinkedIn profile"
 >
 <FiLinkedin size={22} className="hover:text-theme-sky transition" />
 </a>

 <a
 href="mailto:rupeshthakur80078@gmail.com"
 aria-label="Send an email"
 >
 <MdOutlineMail size={22} className="hover:text-theme-sky transition" />
 </a>

 <div className="w-px h-20 bg-theme-text-sec mt-2"></div>
 </div>
 );
};

const Footer = () => {
  return (
    <footer className="text-theme-text">
      <VerticalSocialBar />
    </footer>
  );
};

export default Footer;
