import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const navigationItems = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'About', href: '/about' },
];

// Animation variants
const fadeInDown = {
  hidden: { opacity: 0, y: -20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6, 
      ease: [0.215, 0.61, 0.355, 1] 
    }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    }
  }
};

const navItemVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.5, 
      ease: [0.215, 0.61, 0.355, 1] 
    }
  }
};

const mobileMenuVariants = {
  hidden: { opacity: 0, x: '100%' },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { 
      type: 'spring', 
      stiffness: 300, 
      damping: 30 
    }
  },
  exit: { 
    opacity: 0, 
    x: '100%',
    transition: { 
      duration: 0.3, 
      ease: 'easeInOut' 
    }
  }
};

// Logo animation variants
const logoVariants = {
  hover: {
    scale: 1.05,
    transition: { duration: 0.3, ease: 'easeInOut' }
  }
};

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const scrollProgress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    const handleRouteChange = () => {
      setIsOpen(false);
    };

    router.events.on('routeChangeStart', handleRouteChange);

    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router.events]);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-bone-50/80 backdrop-blur-sm shadow-sm py-3' : 'bg-transparent py-5'}`}
    >
      {/* Modern 2025 glass morphism background with improved visibility */}
      <div className={`absolute inset-0 transition-all duration-500 ${
        scrolled 
          ? 'bg-bone-100/70 dark:bg-dark/60 backdrop-blur-2xl shadow-neo border-b border-bone-200/10' 
          : 'bg-gradient-to-b from-bone-50/70 via-bone-100/40 to-transparent backdrop-blur-lg'
      }`}>
        {/* Advanced glass morphism effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Primary glass reflection */}
          <motion.div 
            className={`absolute top-0 left-1/3 -translate-x-1/2 w-64 h-12 bg-gradient-to-r from-bone-100/20 via-bone-50/10 to-bone-100/20 rounded-full blur-2xl transition-opacity duration-700 ${scrolled ? 'opacity-50' : 'opacity-0'}`}
            animate={{
              x: [-10, 10, -10],
              rotate: [0, 5, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          {/* Secondary glass reflection */}
          <motion.div 
            className={`absolute top-1/2 right-1/4 translate-x-1/2 w-32 h-12 bg-gradient-to-r from-bone-100/10 via-bone-50/5 to-bone-100/10 rounded-full blur-2xl transition-opacity duration-700 ${scrolled ? 'opacity-30' : 'opacity-0'}`}
            animate={{
              x: [10, -10, 10],
              rotate: [0, -5, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
        </div>
        
        {/* Enhanced dynamic gradients */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div 
            className="absolute top-0 left-1/4 -translate-x-1/2 w-40 h-20 bg-gradient-to-r from-primary-500/30 to-primary-400/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute top-0 right-1/4 translate-x-1/2 w-40 h-20 bg-gradient-to-r from-accent-500/30 to-accent-400/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
        </div>
        
        {/* Noise texture overlay */}
        <div className="absolute inset-0 bg-noise opacity-[0.02] mix-blend-overlay"></div>
      </div>
      
      <div className="container flex items-center justify-between relative z-10">
        {/* Logo */}
        <Link href="/" className="relative z-10 interactive group">
          <motion.div 
            initial="hidden"
            animate="visible"
            whileHover="hover"
            variants={logoVariants}
            className="text-2xl font-retro font-bold flex items-center"
          >
            <span className={`transition-colors duration-500 ${scrolled ? 'text-bone-900' : 'text-white shadow-text-lg'}`}>RISE</span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-bone-700 via-primary-500 to-bone-900 font-extrabold">KLIX</span>
            <span className="ml-2 relative h-3 w-3">
              <span className="absolute inset-0 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 animate-pulse-slow shadow-glow-sm"></span>
            </span>
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <motion.nav 
          className="hidden md:flex items-center space-x-10 font-modern"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          {navigationItems.map((item) => (
            <motion.div key={item.name} variants={navItemVariants}>
              <Link
                href={item.href}
                className={`transition-all duration-300 font-modern relative overflow-hidden group interactive px-2 py-2 text-lg
                  ${scrolled 
                    ? 'text-dark hover:text-primary-600' 
                    : 'text-bone-50 hover:text-primary-200 shadow-text-lg'
                  }
                  ${router.pathname === item.href 
                    ? scrolled ? 'text-primary-600' : 'text-primary-200' 
                    : ''}
                `}
              >
                {/* Fill effect on hover - Adaptive to scroll state */}
                <span className={`absolute inset-0 w-full h-full rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out -z-10 ${
                  scrolled 
                    ? 'bg-bone-50/80 dark:bg-primary-900/20' 
                    : 'bg-white/10'
                }`}></span>
                
                {item.name}
                
                {/* Enhanced hover effect with gradient - Adaptive to scroll state */}
                <span className={`absolute bottom-0 left-0 w-full h-0.5 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ${
                  scrolled
                    ? 'bg-gradient-to-r from-primary-500 via-accent-500 to-primary-600'
                    : 'bg-white/80'
                }`}></span>
                
                {/* Active state indicator - Adaptive to scroll state */}
                {router.pathname === item.href && (
                  <span className={`absolute bottom-0 left-0 w-full h-0.5 ${
                    scrolled
                      ? 'bg-gradient-to-r from-primary-500 to-accent-500 shadow-glow-sm'
                      : 'bg-white shadow-glow-sm'
                  }`}></span>
                )}
              </Link>
            </motion.div>
          ))}
          
          <motion.div variants={navItemVariants}>
            <Link
              href="/contact"
              className="btn-touch-dark btn-touch-arrow group relative overflow-hidden"
            >
              <span className="btn-content">
                Get in Touch
                <svg className="w-4 h-4 btn-arrow group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </span>
              {/* Enhanced touch button effect */}
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary-600/20 to-accent-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 -z-10 blur-sm"></span>
            </Link>
          </motion.div>
        </motion.nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-300 interactive ${
              scrolled
                ? 'text-dark hover:bg-gray-100 dark:hover:bg-dark/20'
                : 'text-white hover:bg-white/10'
            }`}
            aria-expanded={isOpen}
            aria-label="Toggle menu"
          >
            <span className="sr-only">Toggle menu</span>
            {isOpen ? (
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Scroll Progress Bar - Enhanced for 2025 */}
      <motion.div 
        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary-500 via-accent-500 to-primary-600 z-50 shadow-glow-sm" 
        style={{ width: scrollProgress }}
      ></motion.div>

      {/* Mobile Menu - Enhanced for 2025 */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 md:hidden"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={mobileMenuVariants}
          >
            <div className="absolute inset-0 bg-dark/60 backdrop-blur-md" onClick={() => setIsOpen(false)} />
            <div className="fixed right-0 top-0 h-full w-[80%] max-w-sm bg-gradient-to-b from-light to-gray-50 dark:from-dark/95 dark:to-gray-900/95 shadow-2xl p-6 flex flex-col justify-between overflow-y-auto">
              {/* Mobile Menu Header */}
              <div className="flex items-center justify-between mb-8">
                <Link href="/" className="text-lg font-display font-bold">
                  <span className="text-dark dark:text-white">RISE</span>
                  <span className="gradient-text-neo font-extrabold">KLIX</span>
                </Link>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg text-dark dark:text-white hover:bg-gray-100 dark:hover:bg-dark/20 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-300"
                  aria-label="Close menu"
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              {/* Mobile Links */}
              <nav className="flex-1">
                <ul className="space-y-4">
                  {navigationItems.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={`block py-3 px-4 text-dark dark:text-white hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-all duration-300 text-lg font-medium ${
                          router.pathname === item.href ? 'text-primary-600 dark:text-primary-400 bg-primary-50/50 dark:bg-primary-900/30' : ''
                        }`}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Mobile Footer */}
              <div className="mt-8 pt-6 border-t border-gray-200/50 dark:border-gray-700/30">
                <Link
                  href="/contact"
                  onClick={() => setIsOpen(false)}
                  className="w-full btn-touch-dark block text-center group relative overflow-hidden"
                >
                  <span className="btn-content justify-center">
                    Get in Touch
                    <svg className="w-4 h-4 btn-arrow group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </span>
                  {/* Enhanced glow effect */}
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary-600/20 to-accent-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 -z-10 blur-sm"></span>
                </Link>
                
                <div className="mt-6 flex justify-center space-x-6">
                  <a 
                    href="https://instagram.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-dark dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300 relative group"
                    aria-label="Instagram"
                  >
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
                    </svg>
                    <span className="absolute inset-0 rounded-full bg-primary-500/10 opacity-0 group-hover:opacity-100 scale-0 group-hover:scale-150 transition-all duration-300"></span>
                  </a>
                  <a 
                    href="https://tiktok.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-dark dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300 relative group"
                    aria-label="TikTok"
                  >
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                    </svg>
                    <span className="absolute inset-0 rounded-full bg-primary-500/10 opacity-0 group-hover:opacity-100 scale-0 group-hover:scale-150 transition-all duration-300"></span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;