import React, { useCallback, useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

interface DecryptedTextProps {
  text: string;
  speed?: number;
  maxIterations?: number;
  className?: string;
  revealDirection?: 'start' | 'end' | 'center';
  useOriginalCharsOnly?: boolean;
  characters?: string;
  animateOn?: "view" | "hover"; 
}

const DecryptedText: React.FC<DecryptedTextProps> = ({
  text,
  speed = 50,
  maxIterations = 10,
  className = '',
  revealDirection = 'start',
  // useOriginalCharsOnly = false, // Removed unused
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+',
  animateOn = 'view',
}) => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [displayText, setDisplayText] = useState(text);
  const [isScrambling, setIsScrambling] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);

  const scramble = useCallback(() => {
    if (prefersReducedMotion) {
      setDisplayText(text);
      setHasAnimated(true);
      return;
    }
    if (isScrambling) return;
    setIsScrambling(true);

    const originalText = text.split('');
    const length = originalText.length;
    let iteration = 0;
    
    const interval = setInterval(() => {
        let scrambled = '';
        
        for (let i = 0; i < length; i++) {
            if (revealDirection === 'start') {
                if (i < Math.floor(iteration / maxIterations * length)) {
                    scrambled += originalText[i];
                } else {
                    scrambled += characters[Math.floor(Math.random() * characters.length)];
                }
            } else if (revealDirection === 'end') {
                 if (i > length - Math.floor(iteration / maxIterations * length)) {
                    scrambled += originalText[i];
                } else {
                    scrambled += characters[Math.floor(Math.random() * characters.length)];
                }
            } else {
                // simple scramble all
                 if (iteration >= maxIterations) {
                     scrambled = text;
                 } else {
                     scrambled += characters[Math.floor(Math.random() * characters.length)];
                 }
            }
        }

        setDisplayText(scrambled);
        iteration++;

        if (iteration > maxIterations) {
            clearInterval(interval);
            setDisplayText(text);
            setIsScrambling(false);
        }
    }, speed);
  }, [characters, isScrambling, maxIterations, prefersReducedMotion, revealDirection, speed, text]);

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayText(text);
      return;
    }

    if (animateOn === 'view') {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !hasAnimated) {
                    scramble();
                    setHasAnimated(true);
                }
            },
            { threshold: 0.1 }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }
  }, [animateOn, hasAnimated, prefersReducedMotion, scramble, text]);


  return (
    <motion.span
      ref={containerRef}
      className={`inline-block whitespace-pre-wrap ${className}`}
      onMouseEnter={animateOn === 'hover' ? scramble : undefined}
    >
      {displayText}
    </motion.span>
  );
};

export default DecryptedText;
