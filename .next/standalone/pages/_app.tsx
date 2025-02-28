import React, { useEffect, useState, useCallback } from 'react';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { AnimatePresence, motion, LazyMotion, domAnimation } from 'framer-motion';
import SEO from '@/components/shared/SEO';
import '../styles/globals.css';

// Page transition variants - simplified for performance
const pageVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3, ease: "easeInOut" }
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2, ease: "easeInOut" }
  }
};

// Page transition component with React.memo for performance
const PageTransition = React.memo(({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial="hidden"
    animate="visible"
    exit="exit"
    variants={pageVariants}
    className="w-full min-h-screen"
  >
    {children}
  </motion.div>
));

PageTransition.displayName = 'PageTransition';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [isPageLoading, setIsPageLoading] = useState(false);

  // GSAP Setup - optimized
  useEffect(() => {
    // Reduce GSAP initialization cost with lazy loading and error handling
    let gsapInstance: any;
    let scrollTriggerInstance: any;
    
    const setupAnimations = async () => {
      try {
        // Dynamic import to avoid SSR issues
        const gsapModule = await import('gsap');
        const stModule = await import('gsap/dist/ScrollTrigger');
        
        gsapInstance = gsapModule.gsap;
        scrollTriggerInstance = stModule.ScrollTrigger;
        
        if (gsapInstance && !gsapInstance.plugins?.ScrollTrigger) {
          gsapInstance.registerPlugin(scrollTriggerInstance);
        }
        
        // Enable smooth scrolling with CSS only if needed
        if (typeof window !== 'undefined') {
          document.body.classList.add('smooth-scroll');
        }
      } catch (error) {
        console.error('Failed to load animation libraries:', error);
      }
    };
    
    setupAnimations();
    
    // Clean up GSAP resources on unmount
    return () => {
      if (scrollTriggerInstance) {
        scrollTriggerInstance.getAll().forEach((trigger: any) => trigger.kill());
      }
    };
  }, []);

  // Memoize handlers to prevent regeneration on each render
  const handleStart = useCallback(() => setIsPageLoading(true), []);
  const handleComplete = useCallback(() => setIsPageLoading(false), []);

  // Page loading indicator
  useEffect(() => {
    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router, handleStart, handleComplete]);

  return (
    <>
      <SEO />
      
      {/* Use LazyMotion to reduce initial bundle size */}
      <LazyMotion features={domAnimation}>
        {/* Page loading indicator - simplified for performance */}
        {isPageLoading && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-dark/60 backdrop-blur-sm">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 border-3 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
              <span className="mt-3 text-white font-display">Loading</span>
            </div>
          </div>
        )}
        
        <div className="smooth-scroll-container">
          <AnimatePresence mode="wait">
            <PageTransition key={router.asPath}>
              <Component {...pageProps} />
            </PageTransition>
          </AnimatePresence>
        </div>
      </LazyMotion>
    </>
  );
} 