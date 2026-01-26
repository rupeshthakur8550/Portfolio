import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const [showTitle, setShowTitle] = useState(false);
  const [cyclingText, setCyclingText] = useState("");
  const [isZooming, setIsZooming] = useState(false);
  
  // Sequence constants
  const headers = ["EXPERIENCE", "PROJECTS", "BLOGS", "CONTACT", "TECHNOLOGIES"];
  
  useEffect(() => {
    const titleTimer = setTimeout(() => setShowTitle(true), 500);

    let textIndex = 0;
    const cycleStartTimer = setTimeout(() => {
        const interval = setInterval(() => {
            if (textIndex < headers.length) {
                setCyclingText(headers[textIndex]);
                textIndex++;
            } else {
                clearInterval(interval);
                // Start Zoom Effect
                setTimeout(() => {
                    setIsZooming(true);
                    setTimeout(onComplete, 1000); // Wait for zoom to finish before unmounting
                }, 500);
            }
        }, 350); // Faster cycle for snappy feel
    }, 1000);

    return () => {
        clearTimeout(titleTimer);
        clearTimeout(cycleStartTimer);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: isZooming ? 0 : 1 }}
      transition={{ duration: 1.5, ease: "easeIn", delay: 0.5 }} // Background fades out slowly as we zoom
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
                            ? { duration: 2.2, ease: [0.7, 0, 0.3, 1] } // Cinematic slow-to-fast
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
                                transition={{ duration: 0.1 }}
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
