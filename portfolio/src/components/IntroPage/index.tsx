import { useEffect, useRef, useState } from "react";
import heroImage from "../../assets/images/hero.jpg";
import { GiSwitchWeapon } from "react-icons/gi";
import gsap from "gsap";
import common from "../../assets/json/common.json";
import DecryptedText from "../UI/DecryptedText";
import GradientText from "../UI/GradientText";
import ScrollReveal from "../UI/ScrollReveal";

const ProfileCard = ({ profile }: { profile: any }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative w-full max-w-sm group">
      <div className="absolute -inset-1 bg-gradient-to-r from-theme-pink to-theme-purple rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
      <div className="bg-white rounded-xl p-6 md:p-10 mx-10 sm:mx-0 text-black relative overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-[1.02]">
        {/* Decorative dots */}
        <div className="absolute top-4 right-4 z-10">
          <div className="flex space-x-2 items-center">
            <div className="w-3.5 h-3.5 bg-theme-red rounded-full flex items-center justify-center">
              <span className="text-[10px] text-white font-bold leading-none">✕</span>
            </div>
            <div className="w-3.5 h-3.5 bg-theme-yellow rounded-full flex items-center justify-center">
              <span className="text-[10px] text-white font-bold leading-none">−</span>
            </div>
            <div className="w-3.5 h-3.5 bg-theme-green rounded-full flex items-center justify-center">
              <span className="text-[10px] text-white font-bold leading-none">+</span>
            </div>
          </div>
        </div>

        {/* Dotted lines */}
        <div className="absolute top-0 left-8 w-0.5 h-20 border-l-2 border-dashed border-theme-sky z-0"></div>
        <div className="absolute top-10 left-0 w-12 h-0.5 border-t-2 border-dashed border-theme-sky z-0"></div>
        <div className="absolute bottom-0 right-8 w-0.5 h-16 md:h-40 border-l-2 border-dashed border-theme-sky z-0"></div>
        <div className="absolute bottom-10 right-0 w-12 md:w-16 h-0.5 border-t-2 border-dashed border-theme-sky z-0"></div>

        <div className="relative z-10 pt-4">
          <div className="relative mb-6">
            <div className={`w-40 h-56 rounded-2xl mx-auto overflow-hidden shadow-md transition-all duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0 bg-gray-100'}`}>
              <img
                src={heroImage}
                className={`w-full h-full object-cover transition-transform duration-1000 ${isLoaded ? 'scale-100' : 'scale-110'}`}
                alt="Profile"
                //@ts-ignore
                fetchpriority="high"
                onLoad={() => setIsLoaded(true)}
              />
            </div>
          </div>

          <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">
            {profile.name}
          </h2>

          <div className="flex justify-center">
            <ScrollReveal
              baseOpacity={0.2}
              enableBlur
              blurStrength={6}
              baseRotation={0}
              textClassName="text-gray-600 text-center text-sm leading-relaxed px-2"
            >
              {profile.description}
            </ScrollReveal>
          </div>
        </div>
      </div>
    </div>
  );
};

const BioSection = ({ introData, sentenceIndex }: { introData: any; sentenceIndex: number }) => (
  <div
    className="flex flex-col items-center w-full lg:w-7/12 text-center px-2"
    style={{ fontFamily: "QuickSand" }}
  >
    <div>
      <h1 className="text-5xl lg:text-7xl font-black mb-4 tracking-tighter text-theme-text">
        {introData.heroTitle}
        <br />
        <span className="text-gray-500">{introData.heroSubtitle}</span>
      </h1>
    </div>

    <div
      className="text-xl sm:text-2xl font-bold text-theme-sky text-center md:h-8 h-12 flex items-center justify-center min-w-[300px]"
      style={{
        fontFamily: "QuickSand",
      }}
    >
      <DecryptedText
        text={introData.introSentences[sentenceIndex]}
        speed={80}
        maxIterations={15}
        key={sentenceIndex}
      />
    </div>

    <div className="mt-6">
      <ScrollReveal
        baseOpacity={0.1}
        enableBlur
        baseRotation={2}
        blurStrength={10}
        textClassName="md:text-justify text-base sm:text-lg leading-relaxed px-2 sm:px-6 text-gray-300"
      >
        {introData.bio}
      </ScrollReveal>
    </div>
  </div>
);

const EducationTimeline = ({ education, className = "" }: { education: any; className?: string }) => (
  <div className={`pt-16 md:py-24 px-6 md:px-12 lg:px-20 max-w-[1440px] mx-auto w-full ${className}`}>
    <div className="text-center mb-12 md:mb-20">
      <GradientText
        animationSpeed={3}
        showBorder={false}
        className="text-5xl sm:text-7xl font-black tracking-tight"
      >
        {education.title}
      </GradientText>
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
      {education.data.map((edu: any, idx: number) => (
        <div
          key={idx}
          className="relative border-l border-gray-800 pl-10 group"
        >
          <div className="absolute w-4 h-4 bg-theme-orange rounded-full -left-[8.5px] top-1.5 ring-4 ring-gray-900 transition-all duration-300 group-hover:scale-125 group-hover:bg-orange-400 z-10"></div>

          <h3 className="text-2xl font-bold text-theme-text mb-2 group-hover:text-theme-sky transition-colors tracking-tight">
            {edu.title}
          </h3>

          <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
            <span className="text-theme-sky/90 font-medium tracking-wide uppercase text-sm">
              {edu.degree}
            </span>
            <span className="text-theme-sky/90 font-medium tracking-wide uppercase text-sm">
              {edu.institution}
            </span>
            <span className="hidden sm:block text-gray-800">|</span>
            <span className="text-[10px] font-mono font-medium text-gray-500 tracking-widest uppercase bg-theme-card-light/30 px-3 py-1 rounded border border-white/5 w-fit">
              {edu.batch}
            </span>
          </div>

          <ul className="space-y-3 mt-6">
            {edu.learnings.map((l: string, i: number) => (
              <li
                key={i}
                className="text-gray-400 text-sm sm:text-base leading-relaxed flex items-start"
              >
                <span className="text-theme-sky/60 mr-3 mt-1.5 text-xs">◆</span>
                <ScrollReveal
                  baseOpacity={0.3}
                  enableBlur
                  blurStrength={4}
                  baseRotation={0}
                  textClassName="inline"
                >
                  {l}
                </ScrollReveal>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </div>
);

const IntroPage = () => {
  const introData = common.Portfolio.IntroPage;
  const [sentenceIndex, setSentenceIndex] = useState<number>(0);

  const [sliderPosition, setSliderPosition] = useState(2);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);
  const afterRef = useRef<HTMLDivElement>(null);
  const educationRef = useRef<HTMLDivElement>(null);

  const updateSliderPosition = (clientX: number) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
      setSliderPosition(percentage);

      gsap.to(afterRef.current, {
        clipPath: `polygon(${percentage}% 0%, 100% 0%, 100% 100%, ${percentage}% 100%)`,
        duration: 0.3,
        ease: "power2.out",
      });

      gsap.to(educationRef.current, {
        clipPath: `polygon(0% 0%, ${percentage}% 0%, ${percentage}% 100%, 0% 100%)`,
        duration: 0.3,
        ease: "power2.out",
      });

      gsap.to(handleRef.current, {
        left: `${percentage}%`,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    updateSliderPosition(e.clientX);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    updateSliderPosition(e.touches[0].clientX);
  };

  const handleMouseMove = (e: MouseEvent | TouchEvent) => {
    if (isDragging) {
      const clientX =
        e instanceof MouseEvent ? e.clientX : e.touches[0].clientX;
      updateSliderPosition(clientX);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.addEventListener("touchmove", handleMouseMove);
      document.addEventListener("touchend", handleMouseUp);
    }
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchmove", handleMouseMove);
      document.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDragging]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSentenceIndex((prev) => (prev + 1) % introData.introSentences.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [introData.introSentences.length]);

  return (
    <div id="about">
      {/* DESKTOP SLIDER VIEW (Hidden on mobile) */}
      <div
        ref={containerRef}
        className="hidden md:flex relative w-full justify-center items-center overflow-hidden h-full min-h-[80vh]"
      >
        {/* Education Section (Slider Left) */}
        <div
          ref={educationRef}
          className="absolute top-0 left-0 w-full h-full z-10 flex flex-col items-center justify-center p-10"
          style={{
            clipPath: `polygon(0% 0%, ${sliderPosition}% 0%, ${sliderPosition}% 100%, 0% 100%)`,
          }}
        >
          <EducationTimeline education={introData.education} />
        </div>

        {/* Intro Section (Slider Right) */}
        <div
          ref={afterRef}
          className="flex flex-col lg:flex-row justify-center items-center max-w-full py-8 lg:py-5 gap-10 md:max-w-8xl mx-auto mb-10 z-20 md:mt-30"
          style={{
            clipPath: `polygon(${sliderPosition}% 0%, 100% 0%, 100% 100%, ${sliderPosition}% 100%)`,
          }}
        >
          <ProfileCard profile={introData.profile} />
          <BioSection introData={introData} sentenceIndex={sentenceIndex} />
        </div>

        {/* Slider Handle */}
        <div
          ref={handleRef}
          className="absolute top-0 w-0.5 bg-indigo-500 z-30 lg:h-[600px] h-[95%] sm:h-[90%] cursor-grab active:cursor-grabbing flex justify-center sm:mt-20"
          style={{ left: `${sliderPosition}%` }}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        >
          <div className="absolute top-1/2 transform -translate-y-1/2">
            <div className="w-10 h-10 bg-white rounded-full border-2 border-indigo-500 flex items-center justify-center shadow-md hover:scale-110 transition-transform duration-200">
              <GiSwitchWeapon className="text-indigo-700 text-xl" />
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE VIEW (Hidden on desktop) */}
      <div className="md:hidden flex flex-col items-center py-10 px-4 space-y-12">
        <div className="mt-8">
          <ProfileCard profile={introData.profile} />
        </div>
        <BioSection introData={introData} sentenceIndex={sentenceIndex} />
      </div>

      {/* Shared Stats Block */}
      <div className="relative grid grid-cols-1 sm:grid-cols-3 gap-6 md:max-w-5xl mx-auto sm:mt-10 md:mb-20 px-4 w-[75%]">
        {introData.stats.map((stat, i) => (
          <div key={i} className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-xl p-6 text-center shadow-lg hover:shadow-xl hover:border-theme-purple/30 transition-all duration-300">
            <div className="text-4xl sm:text-5xl font-extrabold text-theme-text mb-2">{stat.value}</div>
            <div className="flex justify-center">
              <ScrollReveal
                baseOpacity={0.4}
                enableBlur={false}
                baseRotation={0}
                textClassName="text-gray-400 text-xs sm:text-sm uppercase tracking-wider"
              >
                {stat.label}
              </ScrollReveal>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile Education Section (Hidden on desktop) */}
      <div className="md:hidden">
        <EducationTimeline education={introData.education} />
      </div>
    </div>
  );
};

export default IntroPage;