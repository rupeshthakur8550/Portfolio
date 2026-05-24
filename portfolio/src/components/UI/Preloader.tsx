import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";

const headers = ["EXPERIENCE", "PROJECTS", "BLOGS", "CONTACT", "TECHNOLOGIES"];
const TITLE_DELAY_MS = 650;
const CYCLE_START_DELAY_MS = 1500;
const CYCLE_INTERVAL_MS = 550;
const EXIT_HOLD_MS = 900;
const ZOOM_DURATION_MS = 1450;

const Preloader = ({
 onComplete
}: {
 onComplete: () => void;
}) => {
 const prefersReducedMotion = usePrefersReducedMotion();
 const [showTitle, setShowTitle] = useState(false);
 const [cyclingText, setCyclingText] = useState("");
 const [isZooming, setIsZooming] = useState(false);
 const [animationSequenceDone, setAnimationSequenceDone] = useState(false);

 useEffect(() => {
 if (prefersReducedMotion) {
 onComplete();
 return undefined;
 }

 const titleTimer = window.setTimeout(() => setShowTitle(true), TITLE_DELAY_MS);

 let textIndex = 0;
 let cycleInterval: number | undefined;
 const cycleStartTimer = window.setTimeout(() => {
 cycleInterval = window.setInterval(() => {
 if (textIndex < headers.length) {
 setCyclingText(headers[textIndex]);
 textIndex++;
 } else {
 if (cycleInterval) {
 window.clearInterval(cycleInterval);
 }
 setAnimationSequenceDone(true);
 }
 }, CYCLE_INTERVAL_MS);
 }, CYCLE_START_DELAY_MS);

 return () => {
 window.clearTimeout(titleTimer);
 window.clearTimeout(cycleStartTimer);
 if (cycleInterval) {
 window.clearInterval(cycleInterval);
 }
 };
 }, [onComplete, prefersReducedMotion]);

 useEffect(() => {
 if (!animationSequenceDone) {
 return undefined;
 }

 const zoomTimer = window.setTimeout(() => {
 setIsZooming(true);
 }, EXIT_HOLD_MS);

 const completeTimer = window.setTimeout(onComplete, EXIT_HOLD_MS + ZOOM_DURATION_MS);

 return () => {
 window.clearTimeout(zoomTimer);
 window.clearTimeout(completeTimer);
 };
 }, [animationSequenceDone, onComplete]);

 return (
 <motion.div
 initial={{ opacity: 1 }}
 animate={{ opacity: isZooming ? 0 : 1 }}
 transition={{ duration: 1.75, ease: "easeIn", delay: 0.35 }}
 className="fixed inset-0 z-[10000] flex flex-col items-center justify-center text-white font-mono overflow-hidden bg-black"
 >
 <div className="relative z-10 flex flex-col items-center gap-8">
 <AnimatePresence>
 {showTitle && (
 <motion.div
 initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
 animate={
 isZooming
 ? { scale: 120, opacity: 0, filter: "blur(0px)" }
 : { opacity: 1, scale: 1, filter: "blur(0px)" }
 }
 transition={
 isZooming
 ? { duration: ZOOM_DURATION_MS / 1000, ease: [0.7, 0, 0.3, 1] }
 : { duration: 0.8 }
 }
 style={{
 willChange: "transform, opacity",
 transform: "translateZ(0)",
 backfaceVisibility: "hidden",
 textRendering: "geometricPrecision"
 }}
 className="text-center origin-center"
 >
 <h1 className="text-5xl md:text-8xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-br from-white via-orange-200 to-orange-500 pb-2 antialiased subpixel-antialiased">
 PORTFOLIO
 </h1>
 </motion.div>
 )}
 </AnimatePresence>
 <div className="relative md:relative md:mt-0 h-8">
 <AnimatePresence mode="wait">
 {cyclingText && !isZooming && (
 <motion.span
 key={cyclingText}
 initial={{ opacity: 0, y: 10 }}
 animate={{ opacity: 1, y: 0 }}
 exit={{ opacity: 0, y: -10 }}
 transition={{ duration: 0.2 }}
 className="text-orange-300/80 text-xs sm:text-sm tracking-[0.3em] sm:tracking-[0.5em] font-bold whitespace-nowrap"
 >
 Loading {cyclingText}...
 </motion.span>
 )}
 </AnimatePresence>
 </div>
 </div>
 </motion.div>
 );
};

export default Preloader;
