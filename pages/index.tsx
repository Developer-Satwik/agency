import { useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '@/components/layout/Layout';
import { motion, useAnimation, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import SEO from '@/components/shared/SEO';
import { InstagramIcon, TikTokIcon } from '@/components/shared/SocialIcons';

// GSAP Registration
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const fadeInDown = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.215, 0.61, 0.355, 1]
    }
  }
};

const fadeInRight = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.215, 0.61, 0.355, 1]
    }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.3 } },
};

// Adding the missing staggerChildren variant
const staggerChildren = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

const parallaxVariants = {
  hidden: { y: 0 },
  visible: { y: -20, transition: { duration: 0.6, ease: "easeInOut" } },
};

// Services data
const services = [
  {
    title: 'Content Strategy',
    description: "Data-driven strategies customized for your brand's unique goals and audience demographics.",
    icon: '/images/icons/strategy.svg',
    link: '/services#content-strategy'
  },
  {
    title: 'Growth Management',
    description: 'Comprehensive account management focused on sustainable follower growth and engagement.',
    icon: '/images/icons/growth.svg',
    link: '/services#growth-management'
  },
  {
    title: 'Analytics & Insights',
    description: 'In-depth performance analytics to optimize your content for maximum impact.',
    icon: '/images/icons/analytics.svg',
    link: '/services#analytics'
  },
  {
    title: 'Community Building',
    description: 'Foster authentic connections with your audience through strategic community engagement.',
    icon: '/images/icons/community.svg',
    link: '/services#community'
  }
];

// Stats data
const stats = [
  { value: '500+', label: 'Clients', plus: true },
  { value: '25M+', label: 'Followers Gained', plus: true },
  { value: '200M+', label: 'Total Impressions', plus: true },
  { value: '97%', label: 'Satisfaction Rate', percent: true }
];

const backgroundVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } },
};

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const buttonVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, type: "spring", stiffness: 300 } },
};

const servicesVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Home() {
  const ctaRef = useRef<HTMLDivElement>(null);
  const ctaHeadingRef = useRef<HTMLHeadingElement>(null);
  const ctaTextRef = useRef<HTMLParagraphElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const { scrollYProgress } = useScroll();
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Mouse movement parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth - 0.5,
        y: e.clientY / window.innerHeight - 0.5
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    // Initialize stats counter animation
    if (statsRef.current) {
      const statElements = statsRef.current.querySelectorAll('.stat-number');

      gsap.fromTo(statElements,
        { textContent: '0' },
        {
          textContent: (_i: number, target: Element) => target.getAttribute('data-value'),
          duration: 2.5,
          ease: 'power2.out',
          snap: { textContent: 1 },
          stagger: 0.2,
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 80%',
          },
        }
      );
    }

    // Initialize services hover effect
    if (servicesRef.current) {
      const serviceCards = servicesRef.current.querySelectorAll('.service-card');

      serviceCards.forEach((card: Element) => {
        const cardBg = card.querySelector('.card-bg');

        card.addEventListener('mouseenter', () => {
          if (cardBg) {
            gsap.to(cardBg, {
              opacity: 1,
              scale: 1.05,
              duration: 0.4,
              ease: 'power2.out'
            });
          }
        });

        card.addEventListener('mouseleave', () => {
          if (cardBg) {
            gsap.to(cardBg, {
              opacity: 0.5,
              scale: 1,
              duration: 0.4,
              ease: 'power2.out'
            });
          }
        });
      });
    }

    // Trigger animations when elements are in view
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          controls.start('visible');
        }
      });
    }, { threshold: 0.2 });

    const targets = document.querySelectorAll('.fade-in-section');
    targets.forEach(target => observer.observe(target));

    return () => {
      observer.disconnect();
    };
  }, [controls]);

  useEffect(() => {
    // Initialize CTA viral effect animation
    if (ctaRef.current && ctaHeadingRef.current && ctaTextRef.current) {
      // Split text animation for the heading
      const headingText = ctaHeadingRef.current.querySelector(".gradient-text");

      if (headingText) {
        // Create 3D rotation effect on scroll
        gsap.timeline({
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 70%",
            end: "center center",
            scrub: 0.5,
          }
        })
        .fromTo(headingText,
          {
            scale: 0.8,
            opacity: 0.5,
            filter: "blur(5px)",
            textShadow: "0 0 0 rgba(79, 70, 229, 0)"
          },
          {
            scale: 1.2,
            opacity: 1,
            filter: "blur(0px)",
            textShadow: "0 0 20px rgba(79, 70, 229, 0.5)",
            duration: 1.5,
            ease: "power3.out"
          }
        )
        .to(headingText, {
          scale: 1,
          duration: 0.5,
          ease: "elastic.out(1, 0.3)",
        });

        // Particle explosion effect when scrolled to
        const particlesContainer = ctaRef.current.querySelector(".particles-container");
        if (particlesContainer) {
          gsap.timeline({
            scrollTrigger: {
              trigger: ctaRef.current,
              start: "top 50%",
              toggleActions: "play none none reverse"
            }
          })
          .fromTo(particlesContainer.children,
            {
              scale: 0,
              opacity: 0
            },
            {
              scale: 1,
              opacity: 1,
              stagger: 0.02,
              duration: 0.8,
              ease: "back.out(1.7)"
            }
          );
        }
      }

      // Animate the paragraph with line-by-line reveal
      gsap.fromTo(ctaTextRef.current,
        {
          clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
          opacity: 0
        },
        {
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          opacity: 1,
          duration: 1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 60%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }
  }, []);

  return (
    <Layout>
      <SEO
        title="ViralGrowth - Social Media Growth Agency"
        description="We help brands go viral with data-driven content strategies that drive real engagement and growth."
      />

      {/* Hero Section - 2025 Design Update */}
      <section className="relative bg-cover bg-center h-screen" style={{ backgroundImage: `url('/hero.jpg')` }}>
        <motion.div variants={backgroundVariants} initial="hidden" animate="visible" className="flex flex-col items-center justify-center h-full text-white text-center">
          <motion.h1 variants={staggerContainer} initial="hidden" animate="visible" className="text-6xl md:text-7xl xl:text-8xl font-retro mb-4 tracking-tight leading-[1.1] text-center">
            Make Your Brand <span className="relative overflow-hidden">
              <motion.span
                variants={textVariants}
                initial="hidden"
                animate="visible"
                className="text-transparent bg-clip-text transition-colors duration-700 [text-shadow:0_0_40px_rgba(255,192,203,0.4)] gradient-heading bg-gradient-to-r from-pink-300 via-blue-300 to-gray-200"
              >
                  Go Viral
              </motion.span>
                <svg className="absolute -bottom-3 left-0 w-full h-3 text-accent-500/70" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 25 0, 50 5 Q 75 10, 100 5" stroke="currentColor" strokeWidth="3" fill="none" />
                </svg>
              </span>
            </motion.h1>
          <motion.p variants={staggerContainer} initial="hidden" animate="visible" className="text-xl md:text-2xl xl:text-3xl text-gray-100/90 mb-14 font-metropolis font-light leading-relaxed max-w-3xl backdrop-blur-[2px] shadow-text-lg [text-shadow:0_2px_5px rgba(0,0,0,0.2)] text-balance">
            We help brands create content that captures attention, drives engagement, and generates explosive growth.
          </motion.p>
          <motion.div variants={buttonVariants} initial="hidden" animate="visible">
            <Link href="/get-started" className="relative inline-flex items-center justify-center px-6 py-3 overflow-hidden text-lg font-medium text-white transition duration-300 ease-out border-2 border-transparent rounded-lg shadow-md group bg-gradient-to-r from-blue-400 to-green-400 hover:from-green-300 hover:to-blue-300">
              <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform -translate-x-full bg-gradient-to-r from-blue-400 to-green-400 group-hover:translate-x-0"></span>
              <span className="relative z-10">Get Started</span>
              <svg className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Services Section - 2025 Design Update */}
      <section className="py-32 bg-gradient-to-b from-light to-light/80 relative overflow-hidden" ref={servicesRef}>
        {/* Enhanced Background Elements - Inspired by Hero Section */}
        <div className="absolute top-0 right-0 w-1/2 h-2/3 bg-gradient-to-br from-neo-100/30 to-neo-300/20 rounded-full filter blur-[150px] opacity-70 -z-10 animate-float-slow"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-primary-100/30 to-primary-300/20 rounded-full filter blur-[150px] opacity-70 -z-10 animate-float-slow animation-delay-2000"></div>
        <div className="absolute top-1/3 left-1/4 w-1/3 h-1/3 bg-gradient-to-tr from-accent-100/30 to-accent-300/20 rounded-full filter blur-[120px] opacity-60 -z-10 animate-pulse-slow"></div>
        <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-soft-light"></div>

        {/* Modern Mesh Gradient - 2025 Design Trend */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-neo-100/10 via-transparent to-primary-100/10 opacity-60"></div>

        {/* Grid Pattern Overlay - 2025 Design Trend */}
        <div className="absolute inset-0 bg-grid-light opacity-[0.4] pointer-events-none"></div>

        {/* Animated Particles - Similar to Hero */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-primary-400 rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, Math.random() * 100 - 50],
                x: [0, Math.random() * 100 - 50],
                opacity: [0, 0.8, 0],
                scale: [0, 1.5, 0]
              }}
              transition={{
                duration: 10 + Math.random() * 10,
                repeat: Infinity,
                delay: i * 2
              }}
            />
          ))}
        </div>

        <div className="container relative z-10">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-24 fade-in-section"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <div className="inline-block mb-6">
              <span className="inline-block py-2 px-5 bg-gradient-to-r from-neo-100 to-neo-50 text-neo-700 rounded-full text-sm font-medium border border-neo-200/50 shadow-lg backdrop-blur-sm">
                <span className="mr-2 inline-block w-2 h-2 rounded-full bg-neo-500 animate-pulse"></span>
                <span className="relative inline-flex items-center">Our Expertise
                  <motion.span
                    className="absolute -right-1 -top-1 w-2 h-2 bg-accent-400 rounded-full"
                    animate={{ scale: [1, 1.5, 1], opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </span>
              </span>
            </div>
            <h2 className="text-5xl md:text-6xl font-retro mb-8 tracking-tight">
              Our <span className="relative inline-block">
                <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-primary-500 via-neo-500 to-accent-500 animate-gradient-x">Services</span>
                <motion.svg
                  className="absolute -bottom-2 left-0 w-full h-3 text-neo-400 opacity-70"
                  viewBox="0 0 100 15"
                  preserveAspectRatio="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 0.7 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                >
                  <path d="M0 5 Q 25 15, 50 5 Q 75 -5, 100 5" stroke="currentColor" strokeWidth="2.5" fill="none" />
                </motion.svg>
              </span>
            </h2>
            <motion.p
              className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed font-general"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              We offer end-to-end social media growth solutions tailored to your brand's unique goals and audience. Our data-driven approach ensures maximum impact.
            </motion.p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 xl:gap-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerChildren}
          >
            {services.map((service, index) => (
              <motion.div
                className="service-card relative h-full rounded-2xl transition-all duration-500 group"
                key={index}
                variants={fadeInUp}
                whileHover={{
                  y: -10,
                  transition: { type: "spring", stiffness: 300, damping: 15 }
                }}
              >
                {/* Enhanced Card Glow Effect - 2025 Design */}
                <div className="absolute -inset-1 bg-gradient-to-br from-neo-400/20 via-primary-400/10 to-accent-400/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-all duration-700 group-hover:blur-xl -z-10"></div>

                {/* Animated Border - 2025 Design Trend */}
                <motion.div
                  className="absolute inset-0 rounded-2xl border border-transparent z-0 overflow-hidden"
                  animate={{
                    background: ["linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0) 100%)", "linear-gradient(90deg, rgba(79,70,229,0.2) 0%, rgba(236,72,153,0.2) 50%, rgba(79,70,229,0.2) 100%)"],
                    backgroundSize: ["200% 100%", "200% 100%"],
                    backgroundPosition: ["0% 0%", "200% 0%"]
                  }}
                  transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  style={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                />

                {/* Card Background with Glass Morphism - 2025 Design */}
                <div className="absolute inset-0 bg-bone-100/90 dark:bg-dark-800/90 backdrop-blur-sm rounded-2xl overflow-hidden border border-bone-200/60 dark:border-dark-700/60 shadow-xl transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-neo-500/20">
                  {/* Enhanced Card Background Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-bone-50 via-bone-100 to-neo-500/50 dark:from-dark-800 dark:via-dark-800 dark:to-neo-900/20 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                  <div className="absolute inset-0 bg-noise opacity-[0.05]"></div>

                  {/* Subtle Pattern Overlay - 2025 Design Trend */}
                  <div className="absolute inset-0 bg-grid-light opacity-[0.03] mix-blend-overlay"></div>
                </div>

                {/* Card Content */}
                <div className="relative z-10 p-8 h-full flex flex-col">
                  <div className="mb-6 relative">
                    {/* Enhanced Icon Background Effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-neo-200 to-primary-200 dark:from-neo-900/30 dark:to-primary-900/30 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
                      whileHover={{ scale: 1.2 }}
                      transition={{ duration: 0.5 }}
                    ></motion.div>
                    <motion.div
                      className="relative w-16 h-16 bg-bone-50 dark:bg-dark-700 rounded-xl flex items-center justify-center shadow-lg border border-bone-100 dark:border-dark-700 group-hover:border-neo-100 transition-all duration-500 overflow-hidden"
                      whileHover={{ rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <img src={service.icon} alt={service.title} className="w-8 h-8 transition-transform duration-500 group-hover:scale-110 relative z-10" />

                      {/* Animated Pulse Ring - 2025 Design Trend */}
                      <motion.div
                        className="absolute inset-0 border-2 border-neo-400/30 rounded-xl"
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.7, 0, 0.7]
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          delay: index * 0.5
                        }}
                      />
                    </motion.div>
                  </div>

                  <h3 className="text-2xl font-general font-bold mb-4 text-gray-800 dark:text-white group-hover:text-neo-600 dark:group-hover:text-neo-400 transition-colors duration-300 tracking-tight">{service.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6 flex-grow transition-colors duration-300 font-sans">{service.description}</p>

                  <Link
                    href={service.link}
                    className="inline-flex items-center font-medium text-neo-600 dark:text-neo-400 hover:text-neo-800 dark:hover:text-neo-300 transition-colors relative group/link"
                  >
                    <span className="relative z-10">Learn more</span>
                    <motion.span
                      className="absolute bottom-0 left-0 h-0.5 bg-neo-400 transition-all duration-300"
                      initial={{ width: "0%" }}
                      whileHover={{ width: "100%" }}
                    ></motion.span>
                    <svg
                      className="w-5 h-5 ml-2 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </Link>
                </div>

                {/* Enhanced Corner Accents - 2025 Design */}
                <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-primary-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-primary-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.div>
            ))}
          </motion.div>

          {/* Services CTA - Enhanced for 2025 Design */}
          <motion.div
            className="mt-24 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              href="/services"
              className="relative inline-flex items-center justify-center px-8 py-4 overflow-hidden font-medium text-neo-600 bg-bone-100/80 backdrop-blur-sm border border-bone-200/50 rounded-xl shadow-lg group hover:text-white transition-all duration-500"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-primary-500 via-neo-500 to-accent-500 opacity-0 group-hover:opacity-100 transition-all duration-500"></span>
              <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary-500 via-neo-500 to-accent-500 opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500"></span>
              <span className="relative z-10 flex items-center">
                View All Services
                <svg className="w-5 h-5 ml-2 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </span>

              {/* Animated particles around button - inspired by hero section */}
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-neo-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animation-delay-300"></span>
              <span className="absolute -bottom-1 -left-1 w-2 h-2 rounded-full bg-primary-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animation-delay-500"></span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats Section - 2025 Design Update */}
      <section className="py-32 bg-gradient-to-br from-primary-950 via-dark to-primary-950 relative overflow-hidden" ref={statsRef}>
        <div className="container relative z-10">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block py-2 px-5 bg-white/80 backdrop-blur-sm border border-primary-100 rounded-full text-primary-600 text-sm font-medium mb-6 tracking-[0.02em] shadow-sm">
              <span className="mr-2 inline-block w-1.5 h-1.5 rounded-full bg-primary-500 animate-pulse"></span>
              Our Growth Impact
            </span>
            <h2 className="text-[clamp(2.5rem,5vw+1rem,3.75rem)] font-display font-bold mb-8 text-gray-900 tracking-[-0.02em] leading-[1.1]">
              Results that <span className="gradient-text">Speak</span> for Themselves
            </h2>
            <div className="h-1 w-32 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto rounded-full"></div>
          </motion.div>

          {/* Stats Grid - 2025 Design */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="group"
                whileHover={{
                  y: -8,
                  transition: { type: "spring", stiffness: 300, damping: 10 }
                }}
              >
                <div className="relative h-full p-8 rounded-2xl bg-white/80 backdrop-blur-sm border border-primary-100/20 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden">
                  {/* Card Background Effects */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-50/50 to-accent-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500/0 via-primary-500/50 to-primary-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative z-10 flex flex-col items-center">
                    <h3 className="flex items-baseline mb-4">
                      <span 
                        className="stat-number text-[clamp(2.5rem,3vw+2rem,4rem)] bg-clip-text text-transparent bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 font-bold tracking-[-0.03em] tabular-nums" 
                        data-value={stat.value}
                      >0</span>
                      <span className={`text-primary-500 text-[clamp(1.5rem,2vw+1rem,2.5rem)] font-bold ml-1 ${stat.plus || stat.percent ? 'ml-1' : ''}`}>
                        {stat.plus ? '+' : stat.percent ? '%' : ''}
                      </span>
                    </h3>
                    <div className="w-12 h-1 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full mb-4 transform transition-all duration-300 group-hover:scale-x-125 origin-center"></div>
                    <p className="text-gray-600 text-[clamp(1rem,1vw+0.5rem,1.25rem)] font-medium tracking-wide">{stat.label}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Platforms Section - 2025 Design Update */}
      <section className="py-32 bg-gradient-to-b from-light/95 to-light relative overflow-hidden">
        {/* Background Elements - 2025 Design */}
        <div className="absolute inset-0 bg-grid-light opacity-30 pointer-events-none"></div>
        <div className="absolute inset-0 bg-noise opacity-[0.05] mix-blend-soft-light"></div>

        {/* Enhanced Gradient Blobs */}
        <div className="absolute -top-1/4 -right-1/4 w-2/3 h-2/3 bg-neo-100/40 rounded-full filter blur-[120px] opacity-60 animate-float-slow"></div>
        <div className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-primary-100/40 rounded-full filter blur-[100px] opacity-50 animate-float-slow animation-delay-2000"></div>

        <div className="container relative z-10">
          <motion.div
            className="flex flex-col lg:flex-row gap-16 lg:gap-20 items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
          >
            <motion.div className="w-full lg:w-1/2" variants={staggerChildren}>
              {/* Section Title - 2025 Design */}
              <motion.span
                className="inline-block py-2 px-5 bg-neo-100 text-neo-700 rounded-full text-sm font-medium border border-neo-200/50 shadow-md mb-6"
                variants={fadeInUp}
              >
                <span className="mr-2 inline-block w-2 h-2 rounded-full bg-neo-500 animate-pulse"></span>
                Platform Expertise
              </motion.span>

              <motion.h2
                className="text-5xl md:text-6xl font-bold mb-8"
                variants={fadeInUp}
              >
                Platforms We <span className="gradient-text relative inline-block">
                  Master
                  <svg className="absolute -bottom-2 left-0 w-full h-3 text-neo-400 opacity-70" viewBox="0 0 100 15" preserveAspectRatio="none">
                    <path d="M0 5 Q 25 15, 50 5 Q 75 -5, 100 5" stroke="currentColor" strokeWidth="2.5" fill="none" />
                  </svg>
                </span>
              </motion.h2>

              <motion.p
                className="text-xl md:text-2xl text-gray-600 mb-12 leading-relaxed"
                variants={fadeInUp}
              >
                We specialize in creating viral-worthy content for the most influential social media platforms, tailored to each platform's unique algorithm and audience.
              </motion.p>

              <motion.ul className="space-y-8" variants={staggerChildren}>
                {/* Instagram Platform Card - 2025 Design */}
                <motion.li
                  className="group rounded-2xl p-6 transition-all duration-300 hover:shadow-xl border border-transparent hover:border-primary-200 bg-bone-50 hover:bg-gradient-to-br hover:from-bone-50 hover:to-primary-50 relative overflow-hidden"
                  variants={fadeInUp}
                  whileHover={{ y: -5, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                  {/* Subtle Card Accents */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-300/0 via-primary-400/50 to-primary-300/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute inset-0 bg-primary-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  <div className="flex items-start gap-5">
                    <div className="flex-shrink-0 flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-primary-500/20 to-primary-600/20 border border-primary-500/30 group-hover:border-primary-500/50 transition-colors shadow-lg">
                      <InstagramIcon className="w-8 h-8 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-2xl mb-2 text-gray-800 group-hover:text-primary-700 transition-colors">Instagram</h3>
                      <p className="text-gray-600 leading-relaxed">Visual storytelling and engagement strategies that capture attention through Reels, Stories, and carefully curated grids. We optimize content for maximum reach and audience growth.</p>
                    </div>
                  </div>
                </motion.li>

                {/* TikTok Platform Card - 2025 Design */}
                <motion.li
                  className="group rounded-2xl p-6 transition-all duration-300 hover:shadow-xl border border-transparent hover:border-accent-200 bg-bone-50 hover:bg-gradient-to-br hover:from-bone-50 hover:to-accent-50 relative overflow-hidden"
                  variants={fadeInUp}
                  whileHover={{ y: -5, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                  {/* Subtle Card Accents */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent-300/0 via-accent-400/50 to-accent-300/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute inset-0 bg-accent-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  <div className="flex items-start gap-5">
                    <div className="flex-shrink-0 flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-accent-500/20 to-accent-600/20 border border-accent-500/30 group-hover:border-accent-500/50 transition-colors shadow-lg">
                      <TikTokIcon className="w-8 h-8 text-accent-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-2xl mb-2 text-gray-800 group-hover:text-accent-700 transition-colors">TikTok</h3>
                      <p className="text-gray-600 leading-relaxed">Trend-aware content creation that aligns with TikTok's fast-paced algorithm. We create authentic, engaging short-form videos that capture attention and drive viral growth.</p>
                    </div>
                  </div>
                </motion.li>
              </motion.ul>
            </motion.div>

            {/* Visual Elements - 2025 Design */}
            <motion.div
              className="relative w-full lg:w-1/2"
              variants={fadeInUp}
            >
              <div className="w-full aspect-[4/3] relative rounded-2xl overflow-hidden border border-bone-100/20 shadow-2xl backdrop-blur-sm">
                {/* Decorative Elements */}
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary-500/20 rounded-full filter blur-2xl animate-pulse-slow"></div>
                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-accent-500/20 rounded-full filter blur-2xl animate-pulse-slow animation-delay-1000"></div>
                <div className="absolute top-1/3 right-1/4 w-20 h-20 bg-neo-500/20 rounded-full filter blur-xl animate-pulse-slow animation-delay-2000"></div>

                {/* Main Image */}
                <Image
                  src="/images/platforms-collage.jpg"
                  alt="Social Media Platforms"
                  fill
                  className="object-cover"
                />

                {/* Image Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-800/30 via-transparent to-transparent"></div>

                {/* Decorative Grid Pattern */}
                <div className="absolute inset-0 bg-grid-dark opacity-10"></div>
              </div>

              {/* Floating Stats Cards - 2025 Design */}
              <motion.div
                className="absolute -bottom-8 -right-8 p-6 glass-card rounded-2xl shadow-2xl backdrop-blur-xl border border-bone-100/10 bg-bone-50/95"
                initial={{ opacity: 0, y: 30, x: 30 }}
                whileInView={{ opacity: 1, y: 0, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-neo-600 to-primary-600">10x</div>
                <div className="text-lg font-medium text-gray-700">Average Growth</div>
              </motion.div>

              <motion.div
                className="absolute -top-6 -left-6 p-4 rounded-2xl shadow-lg backdrop-blur-xl border border-bone-100/10 bg-bone-50/95"
                initial={{ opacity: 0, y: -20, x: -20 }}
                whileInView={{ opacity: 1, y: 0, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <div className="flex items-center space-x-2">
                  <span className="inline-block w-3 h-3 rounded-full bg-neo-500 animate-pulse"></span>
                  <span className="text-sm font-medium text-gray-700">Always Trending</span>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section - 2025 Design Update with Retro Typography */}
      <section className="py-32 bg-gradient-to-br from-primary-900 via-dark to-primary-950 relative overflow-hidden font-retro">
        {/* Enhanced Background Elements */}
        <div className="absolute inset-0 bg-noise opacity-[0.08] mix-blend-soft-light"></div>
        <div className="absolute inset-0 bg-grid-dark opacity-10"></div>

        {/* Dynamic Gradient Orbs */}
        <div className="absolute top-0 right-0 w-2/3 h-2/3 bg-gradient-to-br from-primary-500/10 to-accent-500/10 rounded-full filter blur-[120px] animate-float-slow"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-neo-500/10 to-primary-500/10 rounded-full filter blur-[100px] animate-float-delayed-slow"></div>

        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.span 
              className="inline-block py-2 px-5 bg-white/10 backdrop-blur-sm text-white/90 rounded-full text-sm font-medium border border-white/10 shadow-inner-light mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="mr-2 inline-block w-2 h-2 rounded-full bg-accent-400 animate-pulse"></span>
              Ready to Transform Your Brand?
            </motion.span>

            <motion.h2 
              className="text-[clamp(2.5rem,4vw+1rem,4.5rem)] font-['BluuNext'] font-bold text-center mb-8 tracking-tight leading-[1.1] text-balance text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-accent-400 to-neo-400 animate-gradient">Go Viral</span>?
            </motion.h2>

            <motion.p 
              className="text-[clamp(1.25rem,2vw+0.5rem,1.75rem)] font-metropolis font-light text-gray-300/90 mb-12 max-w-2xl mx-auto leading-relaxed text-balance"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Let's transform your social media presence and take your brand to the next level with our proven strategies.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Link 
                href="/contact" 
                className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white transition-all duration-500 ease-out bg-gradient-to-r from-primary-600 to-accent-600 rounded-xl overflow-hidden hover:scale-105 transform hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-dark"
              >
                <span className="relative z-10">Get Started Today</span>
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-accent-600 to-primary-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out"></div>
                <div className="absolute right-0 w-8 h-8 transform translate-x-full group-hover:-translate-x-2 transition-transform duration-500 ease-out flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Decorative Bottom Border */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500/30 to-transparent"></div>
      </section>
    </Layout>
  );
}
