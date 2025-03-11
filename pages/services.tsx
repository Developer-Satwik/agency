import { useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '@/components/layout/Layout';
import { motion, AnimatePresence } from 'framer-motion';
import { InstagramIcon, TikTokIcon, YouTubeIcon, PinterestIcon } from '@/components/shared/SocialIcons';

// Dynamically import GSAP for code splitting - only load when needed
const loadGSAP = () => import('gsap').then(({ gsap }) => gsap);
const loadScrollTrigger = () => import('gsap/dist/ScrollTrigger').then(({ ScrollTrigger }) => ScrollTrigger);

// Service icons defined directly in this file
const ContentIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19.5 3h-15A1.5 1.5 0 003 4.5v15A1.5 1.5 0 004.5 21h15a1.5 1.5 0 001.5-1.5v-15A1.5 1.5 0 0019.5 3z" 
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M7 7h10M7 12h10M7 17h6" 
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="18.5" cy="17.5" r="1.5" fill="currentColor"/>
  </svg>
);

const GrowthIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7 14L12 9L17 14M12 9V21M5 5H19" 
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const StrategyIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M3 9H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M7 15L11 13L15 16L18 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="7" cy="15" r="1" fill="currentColor"/>
    <circle cx="11" cy="13" r="1" fill="currentColor"/>
    <circle cx="15" cy="16" r="1" fill="currentColor"/>
    <circle cx="18" cy="11" r="1" fill="currentColor"/>
  </svg>
);

const CommunityIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17 20L17 4M17 4L13 8M17 4L21 8M7 4L7 20M7 20L3 16M7 20L11 16" 
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const AnalyticsIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 15V17M12 11V17M16 7V17M7.8 21H16.2C17.8802 21 18.7202 21 19.362 20.673C19.9265 20.3854 20.3854 19.9265 20.673 19.362C21 18.7202 21 17.8802 21 16.2V7.8C21 6.11984 21 5.27976 20.673 4.63803C20.3854 4.07354 19.9265 3.6146 19.362 3.32698C18.7202 3 17.8802 3 16.2 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21Z" 
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ConsultingIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 15L15 9M12 12L12 21M15.5 7.5L12 4L8.5 7.5M3 9.5L7.5 14L3 18.5M16.5 14L21 18.5M21 9.5L16.5 14" 
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function Services() {
  // Reference for scroll animations
  const containerRef = useRef<HTMLDivElement>(null);
  // Track which FAQ items are open
  const [openFaqs, setOpenFaqs] = useState<number[]>([]);
  // State to track whether animations have been initialized
  const [animationsInitialized, setAnimationsInitialized] = useState(true); // Set to true by default to prevent animation from hiding content
  
  // Toggle FAQ open/closed
  const toggleFaq = (index: number) => {
    setOpenFaqs(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index) 
        : [...prev, index]
    );
  };
  
  useEffect(() => {
    // Skip animation initialization since it's causing visibility issues
    if (true) return;
    
    // Initialize GSAP animations - only load when needed and in client
    const initializeGSAP = async () => {
      try {
        const gsap = await loadGSAP();
        const ScrollTrigger = await loadScrollTrigger();
        
        gsap.registerPlugin(ScrollTrigger);
        
        // Use a more efficient selector to get elements
        const serviceCards = document.querySelectorAll('.service-card');
        const processSteps = document.querySelectorAll('.process-step');
        
        // Do NOT set initial opacity to 0 as it may be causing visibility issues
        // gsap.set(serviceCards, { y: 100, opacity: 0 });
        // gsap.set(processSteps, { opacity: 0 });
        
        // Create one scroll trigger for service cards with safe animation values
        ScrollTrigger.batch(serviceCards, {
          interval: 0.1,
          batchMax: 3,
          onEnter: (elements) => {
            gsap.to(elements, {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: "power2.out",
              stagger: 0.1
            });
          },
          start: "top 80%"
        });
        
        // Simplified process steps animation
        processSteps.forEach((step, i) => {
          gsap.to(step, {
            opacity: 1,
            duration: 0.8,
            scrollTrigger: {
              trigger: step,
              start: "top 75%",
              once: true
            }
          });
        });
        
        setAnimationsInitialized(true);
      } catch (error) {
        console.error("Failed to initialize animations:", error);
        // Set to true even if there's an error to prevent content from staying hidden
        setAnimationsInitialized(true);
      }
    };
    
    // Only run in browser
    if (typeof window !== 'undefined') {
      // Use requestIdleCallback for non-critical initialization
      if ('requestIdleCallback' in window) {
        (window as any).requestIdleCallback(() => {
          initializeGSAP();
        });
      } else {
        // Fallback for browsers that don't support requestIdleCallback
        setTimeout(initializeGSAP, 200);
      }
    }
    
    // Cleanup function
    return () => {
      if (typeof window !== 'undefined') {
        const cleanup = async () => {
          try {
            const ScrollTrigger = await loadScrollTrigger();
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
          } catch (error) {
            console.error("Failed to cleanup animations:", error);
          }
        };
        cleanup();
      }
    };
  }, [animationsInitialized]);
  
  // Memoized motion variants to prevent recalculation
  const fadeUpVariant = {
    hidden: { opacity: 0.8, y: 20 }, // Changed from opacity: 0 to ensure content is still somewhat visible
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5 }
    }
  };
  
  return (
    <Layout>
      <Head>
        <title>Services | Riseklix</title>
        <meta name="description" content="Our comprehensive services for Instagram and TikTok growth, including content creation, strategy, and trend analysis." />
      </Head>
      
      {/* Hero Section - Optimized by reducing unnecessary animations */}
      <section className="relative pt-44 pb-36 bg-dark text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          {/* Simplified background elements with fewer animations */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-dark to-dark opacity-90"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-accent-600/30 via-primary-500/20 to-dark z-10"></div>
          <div className="absolute inset-0 bg-noise opacity-5 mix-blend-soft-light"></div>
          
          {/* Reduced number of animated elements */}
          <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-gradient-to-br from-primary-500/30 to-accent-500/20 filter blur-[100px] animate-float-slow"></div>
          <div className="absolute bottom-1/3 right-1/3 w-64 h-64 rounded-full bg-gradient-to-tr from-accent-500/30 to-primary-500/20 filter blur-[80px] animate-float-slow animation-delay-2000"></div>
          
          {/* Subtle Grid Pattern - static, not animated */}
          <div className="absolute inset-0 bg-grid-dark opacity-10"></div>
        </div>
        
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="mb-6 inline-block"
            >
              <span className="inline-block py-2 px-6 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-md text-white/90 rounded-full text-sm font-medium border border-white/10 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group">
                <span className="mr-2 inline-block w-2 h-2 rounded-full bg-gradient-to-r from-accent-400 to-primary-400 animate-pulse group-hover:scale-110 transition-transform duration-300"></span>
                <span className="relative inline-flex items-center">
                  Social Media Growth Services
                  <span className="absolute -right-1 -top-1 w-2 h-2 bg-primary-400 rounded-full opacity-75 animate-ping"></span>
                </span>
              </span>
            </motion.div>
            
            <motion.h1 
              className="text-5xl md:text-7xl font-display font-bold mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Our <motion.span 
                className="text-accent-400 relative inline-block"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                Services
                <motion.svg 
                  className="absolute -bottom-2 left-0 w-full h-3 text-accent-500 opacity-70" 
                  viewBox="0 0 100 15" 
                  preserveAspectRatio="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.7 }}
                  transition={{ duration: 1, delay: 0.8 }}
                >
                  <path d="M0 5 Q 25 15, 50 5 Q 75 -5, 100 5" stroke="currentColor" strokeWidth="2" fill="none" />
                </motion.svg>
              </motion.span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-white/80 mb-12 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Comprehensive solutions to help your brand go viral and grow
              on today's most important social platforms
            </motion.p>
            
            {/* Hero CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Link href="https://calendly.com/riseklix/30min" className="btn-touch-light inline-flex items-center py-4 px-8 rounded-xl text-lg">
                <span className="btn-content">
                  Get Started Today
                  <svg className="w-5 h-5 ml-2 btn-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </span>
              </Link>
            </motion.div>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-light to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-500/40 to-transparent"></div>
      </section>
      
      {/* Services Cards - Fixed visibility issues */}
      <section className="py-32 relative overflow-visible" ref={containerRef}>
        {/* Simplified background elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-bone-50 via-bone-100/30 to-bone-50/80 -z-10"></div>
        
        <div className="container relative z-30">
          <div className="text-center mb-16">
            <motion.span 
              className="inline-block py-1.5 px-4 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-4 border border-primary-200/50 shadow-sm"
              initial={{ opacity: 1 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="mr-1.5 inline-block w-1.5 h-1.5 rounded-full bg-primary-500 animate-pulse"></span>
              Tailored Solutions
            </motion.span>
            <motion.h2 
              className="text-4xl md:text-5xl font-display font-bold mb-4 text-gray-800"
              initial={{ opacity: 1 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Everything You Need to <span className="text-primary-600">Go Viral</span>
            </motion.h2>
            <motion.p 
              className="max-w-2xl mx-auto text-xl text-gray-600 font-modern"
              initial={{ opacity: 1 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              We've crafted our services to address every aspect of social media growth
            </motion.p>
          </div>
          
          {/* Grid of Service Cards - Ensured visibility with static styling */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 relative z-30">
            {services.map((service, index) => (
              <div 
                key={service.title} 
                id={service.id}
                className={`service-card bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100/50 overflow-hidden group relative ${service.id === "content-creation" || service.id === "trend-analysis" ? "ring-2 ring-primary-100 ring-offset-2" : ""}`}
                style={{ 
                  opacity: 1,
                  transform: 'none',
                  zIndex: 40,
                  position: 'relative'
                }}
              >
                {/* Card Top Color Bar */}
                <div 
                  className={`h-2 w-full bg-gradient-to-r ${service.id === "content-creation" ? "from-primary-400 to-accent-400" : service.id === "trend-analysis" ? "from-accent-400 to-primary-400" : "from-primary-500 to-accent-500"} group-hover:h-[8px] transition-all duration-300`}
                ></div>
                
                <div className="p-8">
                  <div className="relative mb-6 inline-block">
                    <div 
                      className={`absolute inset-0 bg-gradient-to-br ${service.id === "content-creation" ? "from-primary-100 to-accent-200" : service.id === "trend-analysis" ? "from-accent-100 to-primary-200" : "from-primary-100 to-accent-100"} rounded-xl opacity-30 group-hover:opacity-100 transition-opacity duration-300 blur-xl group-hover:scale-110 transition-transform duration-300`}
                    ></div>
                    <div 
                      className={`relative rounded-xl w-16 h-16 ${service.id === "content-creation" || service.id === "trend-analysis" ? "bg-primary-50" : "bg-white"} flex items-center justify-center shadow-md border border-gray-100 group-hover:shadow-lg group-hover:border-primary-100 transition-all duration-300 group-hover:rotate-3`}
                    >
                      <service.icon className={`w-8 h-8 ${service.id === "content-creation" || service.id === "trend-analysis" ? "text-primary-700" : "text-primary-600"} transition-transform duration-300 group-hover:scale-110`} />
                    </div>
                  </div>
                  
                  <h3 className={`text-2xl font-bold mb-3 ${service.id === "content-creation" || service.id === "trend-analysis" ? "text-primary-700" : ""} group-hover:text-primary-600 transition-colors duration-300 text-gray-800`}>{service.title}</h3>
                  <p className="text-gray-600 mb-5 font-modern">{service.description}</p>
                  
                  <div className="space-y-4 mb-6">
                    <h4 className="font-bold text-lg mb-3 flex items-center text-gray-700">
                      <span className="w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center mr-2">
                        <svg className="w-3.5 h-3.5 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                      What's included:
                    </h4>
                    <ul className="space-y-3 pl-2">
                      {service.features.map((feature, i) => (
                        <li 
                          key={feature} 
                          className="flex items-start group/feature"
                        >
                          <svg 
                            className={`w-5 h-5 ${service.id === "content-creation" || service.id === "trend-analysis" ? "text-primary-700" : "text-primary-600"} mr-2 mt-1 flex-shrink-0 transition-transform duration-300 group-hover/feature:scale-110`}
                            fill="currentColor" 
                            viewBox="0 0 20 20"
                          >
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-gray-600 group-hover/feature:text-primary-700 transition-colors duration-200">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-100">
                    <Link 
                      href="https://calendly.com/riseklix/30min"
                      className={`inline-flex items-center font-medium ${service.id === "content-creation" || service.id === "trend-analysis" ? "text-primary-700" : "text-primary-600"} hover:text-primary-700 transition-colors duration-300 relative group/link`}
                    >
                      <span className="relative z-10">Get Started</span>
                      <span 
                        className="absolute bottom-0 left-0 h-0.5 bg-primary-400 transition-all duration-300 w-0 group-hover/link:w-full"
                      ></span>
                      <svg className="w-4 h-4 ml-1.5 transform group-hover/link:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                  </div>
                </div>

                {/* Hover effect corner decorations */}
                <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-primary-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-primary-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Add special decoration just for content creation card */}
                {service.id === "content-creation" && (
                  <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-primary-50 to-transparent opacity-30 rounded-tl-full"></div>
                )}
                
                {/* Add special decoration just for trend analysis card */}
                {service.id === "trend-analysis" && (
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-accent-50 to-transparent opacity-30 rounded-tr-full"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Process Section */}
      <section className="py-32 bg-bone-50 relative overflow-visible">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-br from-bone-100/40 to-bone-300/30 rounded-full filter blur-[100px] opacity-70 -z-10"></div>
          <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-gradient-to-tr from-bone-200/40 to-bone-400/30 rounded-full filter blur-[80px] opacity-70 -z-10"></div>
        </div>
        <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-soft-light"></div>
        <div className="absolute inset-0 bg-grid-light opacity-[0.03]"></div>
        
        <div className="container relative z-30">
          <div className="text-center mb-20">
            <motion.span 
              className="inline-block py-1.5 px-4 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-4 border border-primary-200/50 shadow-sm"
              initial={{ opacity: 1 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="mr-1.5 inline-block w-1.5 h-1.5 rounded-full bg-primary-500 animate-pulse"></span>
              Our Approach
            </motion.span>
            <motion.h2 
              className="text-4xl md:text-5xl font-display font-bold mb-4"
              initial={{ opacity: 1 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Our <span className="text-primary-600">Process</span>
            </motion.h2>
            <motion.p 
              className="max-w-2xl mx-auto text-xl text-gray-600"
              initial={{ opacity: 1 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              How we transform your social media presence step by step
            </motion.p>
          </div>
          
          <div className="relative">
            {/* Process Timeline */}
            <motion.div 
              className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary-200 via-primary-400 to-primary-200 transform -translate-x-1/2"
              initial={{ height: "100%", opacity: 1 }}
              whileInView={{ height: "100%", opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              {/* Animated particles moving along the timeline */}
              <motion.div 
                className="absolute w-3 h-3 bg-primary-500 rounded-full left-1/2 transform -translate-x-1/2"
                animate={{
                  top: ["0%", "100%"],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              <motion.div 
                className="absolute w-2 h-2 bg-primary-400 rounded-full left-1/2 transform -translate-x-1/2"
                animate={{
                  top: ["20%", "100%"],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "linear",
                  delay: 2
                }}
              />
            </motion.div>
            
            <div className="space-y-24">
              {process.map((step, index) => (
                <motion.div 
                  key={step.title} 
                  className="process-step relative"
                  initial={{ opacity: 1, y: 0 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ 
                    duration: 0.7, 
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 100
                  }}
                  style={{ opacity: 1 }}
                >
                  <div className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8`}>
                    {/* Step Number */}
                    <div className="relative md:w-1/2 flex justify-center md:justify-end">
                      <motion.div 
                        className="w-20 h-20 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 text-white flex items-center justify-center text-3xl font-display font-bold z-10 shadow-lg shadow-primary-500/20"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        {index + 1}
                        
                        {/* Animated ring around number */}
                        <motion.div 
                          className="absolute inset-0 rounded-full border-2 border-primary-400 opacity-0"
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0, 0.5, 0],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: index * 0.5
                          }}
                        />
                      </motion.div>
                      {/* Hidden on mobile */}
                      <motion.div 
                        className="hidden md:block absolute top-10 w-full h-1 bg-gradient-to-r from-transparent via-primary-200 to-transparent"
                        initial={{ width: "100%", opacity: 1 }}
                        whileInView={{ width: "100%", opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 + (index * 0.1) }}
                      />
                    </div>
                    
                    {/* Step Content */}
                    <motion.div 
                      className={`md:w-1/2 ${index % 2 === 0 ? 'md:text-left' : 'md:text-right'} bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100/50 relative`}
                      whileHover={{ y: -5, scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    >
                      {/* Decorative corner elements */}
                      <div className="absolute top-2 right-2 w-5 h-5 border-t-2 border-r-2 border-primary-200/50 rounded-tr-md"></div>
                      <div className="absolute bottom-2 left-2 w-5 h-5 border-b-2 border-l-2 border-primary-200/50 rounded-bl-md"></div>
                      
                      <h3 className="text-2xl font-display font-bold mb-3 text-primary-600">{step.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{step.description}</p>
                      
                      {/* Subtle indicator icon */}
                      <div className={`absolute ${index % 2 === 0 ? '-right-3' : '-left-3'} top-1/2 transform -translate-y-1/2 w-6 h-6 bg-white rounded-full shadow-md border border-gray-100 flex items-center justify-center hidden md:flex`}>
                        <svg className="w-3 h-3 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
                          <path fillRule="evenodd" d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Platforms Section */}
      <section className="py-32 bg-white relative overflow-visible">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 right-1/3 w-64 h-64 rounded-full bg-gradient-to-br from-primary-100/40 to-primary-300/20 filter blur-[80px]"></div>
          <div className="absolute bottom-1/4 left-1/3 w-72 h-72 rounded-full bg-gradient-to-tr from-accent-100/40 to-accent-300/20 filter blur-[100px]"></div>
        </div>
        <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-soft-light"></div>
        <div className="absolute inset-0 bg-grid-light opacity-[0.02]"></div>
        
        <div className="container relative z-30">
          <div className="text-center mb-20">
            <motion.span 
              className="inline-block py-1.5 px-4 bg-accent-100 text-accent-700 rounded-full text-sm font-medium mb-4 border border-accent-200/50 shadow-sm"
              initial={{ opacity: 1 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="mr-1.5 inline-block w-1.5 h-1.5 rounded-full bg-accent-500 animate-pulse"></span>
              Platform Expertise
            </motion.span>
            <motion.h2 
              className="text-4xl md:text-5xl font-display font-bold mb-4"
              initial={{ opacity: 1 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Platforms We <span className="text-accent-600">Dominate</span>
            </motion.h2>
            <motion.p 
              className="max-w-2xl mx-auto text-xl text-gray-600"
              initial={{ opacity: 1 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              We specialize in the fastest growing social media platforms
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {platforms.map((platform, index) => (
              <motion.div 
                key={platform.name} 
                className="group flex flex-col md:flex-row gap-8 items-center bg-gradient-to-br from-white to-gray-50 p-8 rounded-2xl shadow-xl border border-gray-100/50 hover:shadow-2xl hover:border-accent-100/50 transition-all duration-300 backdrop-blur-sm relative overflow-hidden"
                initial={{ opacity: 1, y: 0 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.2,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ 
                  y: -10,
                  transition: { type: "spring", stiffness: 300, damping: 15 }
                }}
                style={{ opacity: 1 }}
              >
                {/* Decorative background elements */}
                <div className="absolute -right-16 -bottom-16 w-32 h-32 bg-accent-50 rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
                <div className="absolute right-20 bottom-20 w-16 h-16 bg-primary-50 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-500 transition-delay-200"></div>
                
                {/* Platform Icon */}
                <motion.div 
                  className="relative w-24 h-24 rounded-full bg-white flex items-center justify-center shadow-lg border border-gray-100 group-hover:shadow-accent-100/20 group-hover:border-accent-100/30 transition-all duration-300"
                  whileHover={{ rotate: 10, scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-accent-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
                  <platform.icon className="w-12 h-12 text-accent-600 transform transition-transform duration-300 relative z-10 group-hover:scale-110" />
                </motion.div>
                
                {/* Platform Content */}
                <div className="flex-1">
                  <motion.h3 
                    className="text-2xl font-display font-bold mb-2 text-gray-800 group-hover:text-accent-600 transition-colors duration-300"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    {platform.name}
                  </motion.h3>
                  <p className="text-gray-600 mb-4 group-hover:text-gray-700 transition-colors duration-300">{platform.description}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    {platform.strengths.map((strength) => (
                      <motion.span 
                        key={strength} 
                        className="px-3 py-1 bg-gradient-to-r from-primary-50 to-accent-50 rounded-full text-sm text-gray-700 border border-gray-100 shadow-sm group-hover:shadow-md transition-all duration-300 hover:bg-gradient-to-r hover:from-primary-100 hover:to-accent-100 cursor-default"
                        whileHover={{ 
                          y: -3,
                          scale: 1.05,
                          transition: { type: "spring", stiffness: 400, damping: 10 }
                        }}
                      >
                        {strength}
                      </motion.span>
                    ))}
                  </div>
                </div>
                
                {/* Hover arrow indicator */}
                <div className="absolute right-8 bottom-8 w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg className="w-5 h-5 text-accent-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-32 bg-bone-50/80 relative overflow-visible">
        {/* Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/3 right-1/5 w-64 h-64 rounded-full bg-bone-100/50 filter blur-[100px] opacity-60 -z-10"></div>
          <div className="absolute bottom-1/4 left-1/3 w-72 h-72 rounded-full bg-bone-200/40 filter blur-[120px] opacity-50 -z-10"></div>
          <div className="absolute inset-0 bg-noise opacity-[0.02] mix-blend-soft-light"></div>
          <div className="absolute inset-0 bg-grid-light opacity-[0.03]"></div>
        </div>
        <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-soft-light"></div>
        <div className="absolute inset-0 bg-grid-light opacity-[0.02]"></div>
        
        <div className="container relative z-30">
          <div className="text-center mb-20">
            <motion.span 
              className="inline-block py-1.5 px-4 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-4 border border-primary-200/50 shadow-sm"
              initial={{ opacity: 1 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="mr-1.5 inline-block w-1.5 h-1.5 rounded-full bg-primary-500 animate-pulse"></span>
              Get Answers
            </motion.span>
            <motion.h2 
              className="text-4xl md:text-5xl font-display font-bold mb-4"
              initial={{ opacity: 1 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Frequently Asked <span className="text-primary-600">Questions</span>
            </motion.h2>
            <motion.p 
              className="max-w-2xl mx-auto text-xl text-gray-600 mb-4"
              initial={{ opacity: 1 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Everything you need to know about working with us
            </motion.p>
          </div>
          
          <motion.div 
            className="max-w-3xl mx-auto"
            initial={{ opacity: 1 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="space-y-8">
              {faqs.map((faq, index) => (
                <motion.div 
                  key={faq.question} 
                  className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100/50 relative overflow-hidden group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  {/* Decorative elements */}
                  <div className="absolute right-0 top-0 w-24 h-24 bg-gradient-to-br from-primary-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-bl-[100px]"></div>
                  
                  <button 
                    onClick={() => toggleFaq(index)}
                    className="w-full text-left focus:outline-none"
                  >
                    <h3 className="text-xl font-display font-bold mb-4 text-gray-800 flex items-start group-hover:text-primary-600 transition-colors duration-300">
                      <motion.span 
                        className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 mr-3 font-mono flex-shrink-0"
                        whileHover={{ 
                          rotate: [0, -10, 10, -10, 0],
                          transition: { duration: 0.5 }
                        }}
                      >
                        Q
                      </motion.span>
                      <span className="pt-0.5 flex-1">{faq.question}</span>
                      
                      <span 
                        className={`ml-4 text-primary-400 flex-shrink-0 transition-transform duration-200 ease-in-out ${openFaqs.includes(index) ? 'rotate-180' : ''}`}
                        style={{ transformOrigin: 'center' }}
                      >
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </span>
                    </h3>
                  </button>
                  
                  <div 
                    className={`overflow-hidden transition-all duration-200 ease-out ${openFaqs.includes(index) ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                    style={{ transformOrigin: 'top' }}
                  >
                    <div className="relative pt-4">
                      <div className="w-px h-full absolute left-4 top-0 bg-primary-100"></div>
                      <p className="text-gray-600 relative pl-8">
                        {faq.answer}
                      </p>
                      {/* Link to contact for more info */}
                      <div className="mt-4 pl-8">
                        <Link 
                          href="https://calendly.com/riseklix/30min"
                          className="text-primary-600 inline-flex items-center text-sm font-medium hover:text-primary-800 transition-colors"
                        >
                          Still have questions?
                          <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-bone-100/80 to-bone-200/50 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-br from-bone-200/30 to-bone-300/20 rounded-full filter blur-[120px] opacity-70 -z-10"></div>
          <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-bone-100/30 to-bone-300/20 rounded-full filter blur-[100px] opacity-60 -z-10"></div>
          <div className="absolute inset-0 bg-noise opacity-[0.02] mix-blend-soft-light"></div>
          <div className="absolute inset-0 bg-grid-light opacity-[0.02]"></div>
        </div>
        <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-soft-light"></div>
        <div className="absolute inset-0 bg-grid-light opacity-[0.03]"></div>
        
        <div className="container relative z-10">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <motion.h2 
              className="text-4xl md:text-5xl font-display font-bold mb-6 text-gray-800"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              Ready to <motion.span 
                className="text-accent-600 relative inline-block"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                Transform
                <motion.svg 
                  className="absolute -bottom-2 left-0 w-full h-3 text-accent-500 opacity-70" 
                  viewBox="0 0 100 15" 
                  preserveAspectRatio="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 0.7 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.8 }}
                >
                  <path d="M0 5 Q 25 15, 50 5 Q 75 -5, 100 5" stroke="currentColor" strokeWidth="2" fill="none" />
                </motion.svg>
              </motion.span> Your Social Presence?
            </motion.h2>
            
            <motion.p 
              className="text-xl text-gray-800 mb-12 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              Let's discuss how we can help you achieve viral growth on today's most important social platforms.
              Our data-driven strategies make the difference.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <Link 
                href="https://calendly.com/riseklix/30min" 
                className="btn-dark inline-flex items-center py-4 px-8 rounded-xl text-lg relative overflow-hidden group"
              >
                <span className="btn-content">
                  Book Your Strategy Call
                  <svg className="w-5 h-5 ml-2 btn-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}

// Optimize data by moving it outside the component to prevent recreation on each render
const services = [
  {
    id: "content-creation",
    title: "Content Creation",
    description: "We craft scroll-stopping, share-worthy content tailored to your brand voice and audience preferences.",
    icon: ContentIcon,
    features: [
      "Platform-specific content creation for Instagram and TikTok",
      "High-quality video production and editing",
      "Custom graphics and animation design",
      "Copywriting and caption optimization",
      "Regular content calendar updates",
      "Trending audio and hashtag research"
    ]
  },
  {
    id: "growth-strategy",
    title: "Growth Strategy",
    description: "Data-driven strategies to grow your audience, boost engagement, and convert followers into customers.",
    icon: GrowthIcon,
    features: [
      "Comprehensive social media audit",
      "Competitor analysis",
      "Custom growth roadmap development",
      "Audience targeting and expansion tactics",
      "Engagement rate optimization",
      "Conversion strategy implementation"
    ]
  },
  {
    id: "trend-analysis",
    title: "Trend Analysis",
    description: "Stay ahead of the curve with our real-time trend monitoring and rapid content adaptation.",
    icon: StrategyIcon,
    features: [
      "24/7 trend monitoring across platforms",
      "Rapid response content creation",
      "Viral potential assessment",
      "Opportunity identification",
      "Platform algorithm analysis",
      "Trending audio and effect utilization"
    ]
  },
  {
    id: "community-management",
    title: "Community Management",
    description: "Build a loyal community around your brand with consistent, authentic engagement.",
    icon: CommunityIcon,
    features: [
      "Daily engagement with followers",
      "Comment monitoring and response",
      "DM management and customer service",
      "User-generated content curation",
      "Community guidelines establishment",
      "Crisis management protocols"
    ]
  },
  {
    id: "analytics-reporting",
    title: "Analytics & Reporting",
    description: "In-depth performance tracking and actionable insights to continually optimize your social presence.",
    icon: AnalyticsIcon,
    features: [
      "Custom performance dashboards",
      "Weekly and monthly performance reports",
      "Content A/B testing",
      "Audience demographic analysis",
      "ROI tracking and measurement",
      "Content optimization recommendations"
    ]
  },
  {
    id: "influencer-consulting",
    title: "Influencer Consulting",
    description: "Strategic partnerships with the right creators to amplify your brand's reach and credibility.",
    icon: ConsultingIcon,
    features: [
      "Influencer identification and vetting",
      "Partnership negotiation and management",
      "Campaign strategy development",
      "Content brief creation",
      "Performance tracking",
      "Long-term relationship building"
    ]
  }
];

const process = [
  {
    title: "Discovery & Analysis",
    description: "We start by understanding your brand, audience, and competitors through a comprehensive analysis, establishing clear growth objectives."
  },
  {
    title: "Strategy Development",
    description: "Based on our findings, we create a tailored strategy that defines content pillars, posting frequency, and growth tactics specific to your goals."
  },
  {
    title: "Content Creation",
    description: "Our creative team produces high-quality, platform-optimized content that aligns with your brand voice and resonates with your target audience."
  },
  {
    title: "Publishing & Community Management",
    description: "We manage the posting schedule and actively engage with your community to build relationships and increase your content's reach."
  },
  {
    title: "Analysis & Optimization",
    description: "Through continuous performance monitoring, we identify what's working and optimize our approach to maximize growth and engagement."
  }
];

const platforms = [
  {
    name: "TikTok",
    icon: TikTokIcon,
    description: "Trend-aware content creation that aligns with TikTok's fast-paced algorithm. We create authentic, engaging short-form videos that capture attention and drive viral growth. We handle all aspects of account management so there's no hassle for you—just results.",
    strengths: ["15-60 Second Videos", "Viral Algorithm", "Trending Sounds", "High Organic Reach", "Gen Z & Millennial Focus", "Full Account Management"]
  },
  {
    name: "Instagram",
    icon: InstagramIcon,
    description: "Visual storytelling and engagement strategies that capture attention through Reels, Stories, and carefully curated grids. We optimize content for maximum reach and audience growth while managing your entire account, eliminating any hassle for you.",
    strengths: ["Reels", "Stories", "Shopping Integration", "Influencer Hub", "High Engagement", "Full Account Management"]
  },
  {
    name: "YouTube Shorts",
    icon: YouTubeIcon,
    description: "Short-form video on YouTube, combining viral potential with the platform's superior search discoverability.",
    strengths: ["60-Second Videos", "Music Library", "Search Discovery", "Cross-Promotion", "Monetization"]
  },
  {
    name: "Pinterest",
    icon: PinterestIcon,
    description: "Ideal for visual discovery and driving traffic to websites, with content that has a longer lifecycle than other platforms.",
    strengths: ["Idea Discovery", "Shopping Integration", "Long Content Lifespan", "High Purchase Intent", "Female Demographic"]
  }
];

const faqs = [
  {
    question: "How quickly will I see results from your services?",
    answer: "While every brand's growth journey is different, most clients begin seeing measurable improvements in engagement within the first 2-4 weeks. Significant follower growth typically begins around the 1-2 month mark, with viral content opportunities possibly accelerating this timeline."
  },
  {
    question: "Do you guarantee viral content?",
    answer: "While we can't guarantee virality (no one truthfully can), our data-driven approach and experienced team significantly increase your chances. We analyze platform algorithms, trends, and audience behavior to create content with the highest potential for widespread engagement."
  },
  {
    question: "How many posts will you create per week?",
    answer: "Our content volume varies based on your selected package and platform strategy. Typically, we recommend 3-5 TikTok/Reels posts per week and 5-7 Instagram Stories. We prioritize quality and strategic timing over quantity to maximize engagement."
  },
  {
    question: "Will I have approval over content before it's posted?",
    answer: "Absolutely! We implement a collaborative approval process where you'll review all content before publication. We typically work on a content calendar 1-2 weeks in advance to allow time for feedback and revisions."
  },
  {
    question: "Do you offer one-time services or only ongoing packages?",
    answer: "We primarily focus on ongoing partnerships for sustainable growth, with most clients choosing 3-6 month engagements. However, we do offer strategy sessions and content creation packages for brands looking to start with a smaller commitment."
  }
];