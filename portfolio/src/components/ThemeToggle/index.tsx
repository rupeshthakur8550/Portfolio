import { MdWbSunny, MdNightlight } from "react-icons/md";
import { useTheme } from "../../hooks/useTheme";
import { motion, AnimatePresence } from "framer-motion";

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            className="relative p-2.5 rounded-xl bg-theme-card/50 hover:bg-theme-card border border-theme-text/10 text-theme-text-sec transition-all duration-300 shadow-sm overflow-hidden group"
            aria-label="Toggle Theme"
        >
            <AnimatePresence mode="wait" initial={false}>
                <motion.div
                    key={theme}
                    initial={{ y: 20, opacity: 0, rotate: -90 }}
                    animate={{ y: 0, opacity: 1, rotate: 0 }}
                    exit={{ y: -20, opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.3, ease: "backOut" }}
                >
                    {theme === "light" ? (
                        <MdNightlight className="w-5 h-5 text-accent-purple" />
                    ) : (
                        <MdWbSunny className="w-5 h-5 text-accent-yellow" />
                    )}
                </motion.div>
            </AnimatePresence>

            {/* Subtle hover effect background */}
            <div className="absolute inset-0 bg-gradient-to-tr from-accent-sky/0 to-accent-purple/0 group-hover:from-accent-sky/5 group-hover:to-accent-purple/5 transition-colors duration-500" />
        </motion.button>
    );
};

export default ThemeToggle;
