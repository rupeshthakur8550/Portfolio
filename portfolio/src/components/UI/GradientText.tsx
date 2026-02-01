import React from 'react';
import { motion } from 'framer-motion';

interface GradientTextProps {
    children: React.ReactNode;
    colors?: string[];
    animationSpeed?: number;
    showBorder?: boolean;
    className?: string;
}

const GradientText: React.FC<GradientTextProps> = ({
    children,
    colors = ["var(--accent-sky)", "var(--accent-purple)", "var(--accent-pink)", "var(--accent-sky)"],
    animationSpeed = 8,
    showBorder = false,
    className = ""
}) => {
    const gradientColors = [...colors, ...colors];
    const gradientStyle = {
        backgroundImage: `linear-gradient(to right, ${gradientColors.join(", ")})`,
        backgroundSize: "200% 100%",
    };

    return (
        <div className={`relative inline-block py-2 ${className}`}>
            <motion.span
                style={{
                    ...gradientStyle,
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    backgroundPositionX: "0%",
                }}
                animate={{
                    backgroundPositionX: "100%",
                }}
                transition={{
                    repeat: Infinity,
                    duration: animationSpeed,
                    ease: "linear",
                }}
                className="text-transparent inline-block font-bold leading-normal pb-1"
            >
                {children}
            </motion.span>
            {showBorder && (
                <div className="absolute inset-x-0 bottom-0 h-[2px] w-full overflow-hidden rounded-full">
                    <motion.div
                        style={{
                            ...gradientStyle,
                            width: "100%"
                        }}
                        animate={{
                            backgroundPositionX: "100%",
                        }}
                        transition={{
                            repeat: Infinity,
                            duration: animationSpeed,
                            ease: "linear",
                        }}
                        className="h-full w-full"
                    />
                </div>
            )}
        </div>
    );
};

export default GradientText;
