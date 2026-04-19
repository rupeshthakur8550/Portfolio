import { useState } from "react";

interface LazyImageProps {
    src: string;
    alt: string;
    className?: string;
    priority?: boolean;
}

const LazyImage = ({ src, alt, className = "", priority = false }: LazyImageProps) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);

    return (
        <div className={`relative overflow-hidden bg-white/5 ${className}`}>
            {!isLoaded && !hasError && (
                <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-transparent via-white/5 to-transparent" />
            )}

            {!hasError ? (
                <img
                    src={src}
                    alt={alt}
                    loading={priority ? "eager" : "lazy"}
                    fetchPriority={priority ? "high" : "auto"}
                    referrerPolicy="no-referrer"
                    onLoad={() => setIsLoaded(true)}
                    onError={() => {
                        setHasError(true);
                        setIsLoaded(true);
                    }}
                    className={`w-full h-full object-cover transition-all duration-700 ease-out ${isLoaded ? "opacity-100 scale-100 blur-0" : "opacity-100 scale-[1.02] blur-[2px]"
                        }`}
                />
            ) : (
                <div className="flex h-full min-h-[12rem] w-full items-center justify-center bg-gradient-to-br from-theme-card via-theme-card-light to-theme-card border border-theme-text/10">
                    <span className="px-6 text-center text-sm md:text-base font-semibold text-theme-text-sec">
                        {alt}
                    </span>
                </div>
            )}
        </div>
    );
};

export default LazyImage;
