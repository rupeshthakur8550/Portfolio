import React, { useRef, useMemo } from 'react';
import type { ReactNode, RefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
 children: ReactNode;
 scrollContainerRef?: RefObject<HTMLElement | null>;
 enableBlur?: boolean;
 baseOpacity?: number;
 baseRotation?: number;
 blurStrength?: number;
 containerClassName?: string;
 textClassName?: string;
 rotationEnd?: string;
 wordAnimationEnd?: string;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
 children,
 scrollContainerRef,
 enableBlur = true,
 baseOpacity = 0.1,
 baseRotation = 3,
 blurStrength = 4,
 containerClassName = '',
 textClassName = '',
 rotationEnd = 'bottom bottom',
 wordAnimationEnd = 'bottom bottom'
}) => {
 const containerRef = useRef<HTMLHeadingElement>(null);
 const prefersReducedMotion = usePrefersReducedMotion();
 const plainText = typeof children === 'string' ? children : '';

 const splitText = useMemo(() => {
 return plainText.split(/(\s+)/).map((word, index) => {
 if (word.match(/^\s+$/)) return word;
 return (
 <span className="word inline-block relative will-change-[opacity,filter,transform]" key={index}>
 {word}
 </span>
 );
 });
 }, [plainText]);

 useGSAP(() => {
 const el = containerRef.current;
 if (!el || prefersReducedMotion || !plainText) return;

 const scroller = scrollContainerRef && scrollContainerRef.current ? scrollContainerRef.current : window;

 const tl = gsap.timeline({
 scrollTrigger: {
 trigger: el,
 scroller,
 start: 'top bottom',
 end: rotationEnd === 'bottom bottom' ? 'bottom 95%' : rotationEnd,
 scrub: 0.5,
 }
 });

 tl.fromTo(
 el,
 { transformOrigin: '0% 50%', rotate: baseRotation },
 {
 ease: 'none',
 rotate: 0,
 }
 );

 const wordElements = el.querySelectorAll<HTMLElement>('.word');

 gsap.fromTo(
 wordElements,
 { opacity: baseOpacity, willChange: 'opacity' },
 {
 ease: 'none',
 opacity: 1,
 stagger: 0.05,
 scrollTrigger: {
 trigger: el,
 scroller,
 start: 'top bottom-=5%',
 end: wordAnimationEnd === 'bottom bottom' ? 'bottom 85%' : wordAnimationEnd,
 scrub: 0.8
 }
 }
 );

 if (enableBlur) {
 gsap.fromTo(
 wordElements,
 { filter: `blur(${blurStrength}px)` },
 {
 ease: 'none',
 filter: 'blur(0px)',
 stagger: 0.05,
 scrollTrigger: {
 trigger: el,
 scroller,
 start: 'top bottom-=5%',
 end: wordAnimationEnd === 'bottom bottom' ? 'bottom 85%' : wordAnimationEnd,
 scrub: 0.8
 }
 }
 );
 }
 }, {
 scope: containerRef,
 dependencies: [plainText, scrollContainerRef, enableBlur, baseRotation, baseOpacity, rotationEnd, wordAnimationEnd, blurStrength, prefersReducedMotion]
 });

 return (
 <div ref={containerRef} className={`relative block w-full p-5 ${containerClassName}`}>
 <div className={`block whitespace-pre-wrap break-words leading-[inherit] ${textClassName}`}>
 {prefersReducedMotion || !plainText ? children : splitText}
 </div>
 </div>
 );
};

export default ScrollReveal;
