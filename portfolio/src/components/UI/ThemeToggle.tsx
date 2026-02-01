import { motion, AnimatePresence } from "framer-motion";
import { HiSun, HiMoon } from "react-icons/hi2";
import { useTheme } from "../../hooks/useTheme";

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="relative flex items-center justify-center p-2 rounded-xl bg-theme-text/5 hover:bg-theme-text/10 border border-theme-text/10 transition-colors overflow-hidden group w-10 h-10"
            aria-label="Toggle Theme"
        >
            <AnimatePresence mode="wait" initial={false}>
                <motion.div
                    key={theme}
                    initial={{ y: 20, opacity: 0, rotate: -90 }}
                    animate={{ y: 0, opacity: 1, rotate: 0 }}
                    exit={{ y: -20, opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="flex items-center justify-center"
                >
                    {theme === "light" ? (
                        <HiSun className="w-6 h-6 text-orange-500" />
                    ) : (
                        <HiMoon className="w-5 h-5 text-blue-400" />
                    )}
                </motion.div>
            </AnimatePresence>

            {/* Subtle glow effect */}
            <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity blur-lg pointer-events-none ${theme === "light" ? "bg-orange-400" : "bg-blue-400"
                }`} />
        </button>
    );
};

export default ThemeToggle;
