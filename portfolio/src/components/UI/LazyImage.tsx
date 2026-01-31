import { useState, useEffect } from "react";

interface LazyImageProps {
    src: string;
    alt: string;
    className?: string;
    priority?: boolean;
}

const LazyImage = ({ src, alt, className = "", priority = false }: LazyImageProps) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [currentSrc, setCurrentSrc] = useState<string | null>(null);

    useEffect(() => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
            setCurrentSrc(src);
            setIsLoaded(true);
        };
    }, [src]);

    return (
        <div className={`relative overflow-hidden bg-white/5 ${className}`}>
            {/* Skeleton/Placeholder */}
            {!isLoaded && (
                <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-transparent via-white/5 to-transparent" />
            )}

            {currentSrc && (
                <img
                    src={currentSrc}
                    alt={alt}
                    loading={priority ? "eager" : "lazy"}
                    //@ts-ignore
                    fetchpriority={priority ? "high" : "auto"}
                    className={`w-full h-full object-cover transition-all duration-1000 ease-out ${isLoaded ? "opacity-100 scale-100 blur-0" : "opacity-0 scale-105 blur-lg"
                        }`}
                />
            )}
        </div>
    );
};

export default LazyImage;
