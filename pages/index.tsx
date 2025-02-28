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
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
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
  { value: '3B+', label: 'Total Impressions', plus: true },
  { value: '97%', label: 'Satisfaction Rate', percent: true }
];

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
        description="We help brands go viral on Instagram and TikTok with data-driven content strategies that drive real engagement and growth."
      />

      {/* Hero Section - 2025 Design Update */}
      <motion.section 
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{ scale: heroScale, opacity: heroOpacity }}
      >
        {/* Background Elements - Advanced 2025 Design */}
        <div className="absolute inset-0 w-full h-full z-0">
          {/* Ultra-modern gradient backdrop with depth */}
          <div className="absolute inset-0 bg-gradient-conic from-primary-800/50 via-dark/95 to-neo-900/70 z-10 mix-blend-multiply"></div>
          
          {/* Advanced noise texture with grain control */}
          <div className="absolute inset-0 w-full h-full opacity-40 mix-blend-overlay">
            <div className="absolute inset-0 bg-noise bg-repeat-small"></div>
          </div>
          
          {/* Dynamic 3D mesh background */}
          <div className="absolute inset-0 w-full h-full opacity-20 mix-blend-soft-light">
            <div className="absolute inset-0 mesh-gradient"></div>
          </div>
          
          {/* Advanced interactive background with parallax */}
          <div className="absolute inset-0 w-full h-full">
            <Image 
              src="/images/hero-bg.jpg" 
              alt="Agency Background" 
              fill 
              className="object-cover object-center"
              priority
              style={{
                transform: `scale(1.15) translate(${mousePosition.x * 25}px, ${mousePosition.y * 25}px) rotateX(${mousePosition.y * 5}deg) rotateY(${mousePosition.x * -5}deg)`,
                transition: 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)'
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-primary-900/60 via-dark/70 to-dark/90 z-10 mix-blend-multiply"></div>
          </div>
          
          {/* 3D Floating particles */}
          <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
            {Array.from({ length: 40 }).map((_, i) => (
              <motion.div 
                key={i}
                className="absolute rounded-full bg-white opacity-80 mix-blend-screen"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  width: `${Math.random() * 8 + 1}px`,
                  height: `${Math.random() * 8 + 1}px`,
                  boxShadow: '0 0 20px 2px rgba(255, 255, 255, 0.3)',
                  filter: 'blur(1px)'
                }}
                animate={{
                  y: [0, -Math.random() * 150 - 50, 0],
                  opacity: [0, Math.random() * 0.5 + 0.3, 0],
                  scale: [0, Math.random() * 1.5 + 0.5, 0]
                }}
                transition={{
                  duration: Math.random() * 15 + 15,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: Math.random() * 20
                }}
              />
            ))}
          </div>
          
          {/* Advanced morphing gradient blobs */}
          <motion.div 
            className="absolute top-1/4 left-1/4 w-[45rem] h-[45rem] rounded-full bg-gradient-to-br from-primary-600/30 via-neo-500/20 to-accent-600/15 filter blur-[130px]"
            animate={{ 
              x: [0, 40, 0, -40, 0],
              y: [0, -40, 0, 40, 0],
              scale: [1, 1.3, 1, 0.8, 1],
              borderRadius: ['50%', '40%', '60%', '30%', '50%']
            }}
            transition={{ 
              duration: 30, 
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut"
            }}
          />
          
          <motion.div 
            className="absolute bottom-1/3 right-1/4 w-[40rem] h-[40rem] rounded-full bg-gradient-to-tr from-accent-600/25 via-primary-500/30 to-neo-400/20 filter blur-[120px]"
            animate={{ 
              x: [0, -50, 0, 50, 0],
              y: [0, 50, 0, -50, 0],
              scale: [1, 0.7, 1, 1.2, 1],
              borderRadius: ['50%', '55%', '45%', '60%', '50%']
            }}
            transition={{ 
              duration: 35, 
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut"
            }}
          />
          
          <motion.div 
            className="absolute top-1/3 right-1/4 w-[35rem] h-[35rem] rounded-full bg-gradient-to-bl from-neo-600/25 via-accent-400/20 to-primary-500/15 filter blur-[110px]"
            animate={{ 
              x: [0, 60, 0, -60, 0],
              y: [0, 60, 0, -60, 0],
              scale: [1, 1.4, 1, 0.6, 1],
              borderRadius: ['50%', '45%', '55%', '40%', '50%']
            }}
            transition={{ 
              duration: 40, 
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut"
            }}
          />
          
          {/* Social Media Platform Icons - Floating Animation */}
          <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
            {/* Instagram style icons */}
            {Array.from({ length: 4 }).map((_, i) => (
              <motion.div
                key={`social-icon-${i}`}
                className="absolute rounded-lg bg-gradient-to-br from-primary-500/20 to-accent-500/20 border border-white/10 backdrop-blur-sm"
                style={{
                  width: `${Math.random() * 20 + 30}px`,
                  height: `${Math.random() * 20 + 30}px`,
                  top: `${Math.random() * 70 + 10}%`,
                  left: `${Math.random() * 80 + 10}%`,
                }}
                animate={{
                  y: [0, -20, 0, 20, 0],
                  rotate: [0, 10, 0, -10, 0],
                  opacity: [0.3, 0.7, 0.3],
                }}
                transition={{
                  duration: Math.random() * 10 + 15,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: Math.random() * 5
                }}
              />
            ))}
          </div>
          
          {/* Ascending Like/Heart Animations */}
          <div className="absolute inset-x-0 bottom-0 h-3/4 overflow-hidden pointer-events-none">
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={`like-heart-${i}`}
                className="absolute text-accent-500/30"
                style={{
                  left: `${Math.random() * 100}%`,
                  bottom: '-20px',
                  fontSize: `${Math.random() * 16 + 12}px`,
                }}
                animate={{
                  y: [-400, -800],
                  opacity: [0, 0.7, 0],
                  rotate: [0, Math.random() * 45 - 22.5],
                }}
                transition={{
                  duration: Math.random() * 10 + 15,
                  repeat: Infinity,
                  delay: Math.random() * 20,
                  ease: "easeOut"
                }}
              >
                ♥
              </motion.div>
            ))}
          </div>
          
          {/* Growth Chart Lines */}
          <div className="absolute inset-0 w-full h-full overflow-hidden opacity-20 mix-blend-screen">
            <svg width="100%" height="100%" className="absolute inset-0">
              <path 
                d="M0,70 Q25,40 50,60 T100,30"
                stroke="url(#gradient-line)"
                strokeWidth="2"
                fill="none"
                strokeDasharray="1,3"
                className="animate-dash-slow"
              />
              <path 
                d="M0,50 Q30,60 50,30 T100,40"
                stroke="url(#gradient-line)"
                strokeWidth="2"
                fill="none"
                strokeDasharray="1,3"
                className="animate-dash-slow animation-delay-1000"
              />
              <defs>
                <linearGradient id="gradient-line" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgba(79, 70, 229, 0.4)" />
                  <stop offset="100%" stopColor="rgba(236, 72, 153, 0.4)" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          
          {/* Enhanced glass panel reflections */}
          <div className="absolute inset-0 w-full h-full opacity-40 mix-blend-overlay">
            {Array.from({ length: 3 }).map((_, i) => (
              <motion.div
                key={`glass-${i}`}
                className="absolute bg-white/5 backdrop-blur-2xl rounded-full overflow-hidden border border-white/10"
                style={{
                  width: `${Math.random() * 40 + 20}%`,
                  height: `${Math.random() * 40 + 20}%`,
                  top: `${Math.random() * 80}%`,
                  left: `${Math.random() * 80}%`,
                  transform: `rotate(${Math.random() * 360}deg)`
                }}
                animate={{
                  opacity: [0, 0.6, 0],
                  scale: [0.8, 1.1, 0.8],
                  rotate: [`${Math.random() * 20}deg`, `${Math.random() * 20 + 180}deg`, `${Math.random() * 20 + 360}deg`]
                }}
                transition={{
                  duration: Math.random() * 50 + 30,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            ))}
          </div>
          
          {/* Viral Ripple Effects */}
          <div className="absolute inset-0 w-full h-full overflow-hidden mix-blend-overlay pointer-events-none">
            {Array.from({ length: 6 }).map((_, i) => (
              <motion.div
                key={`ripple-${i}`}
                className="absolute rounded-full border-2 border-accent-500/20"
                style={{
                  top: `${Math.random() * 80 + 10}%`,
                  left: `${Math.random() * 80 + 10}%`,
                  width: '10px',
                  height: '10px',
                  boxShadow: '0 0 10px 2px rgba(236, 72, 153, 0.1)'
                }}
                animate={{
                  scale: [0, 20],
                  opacity: [0.8, 0],
                }}
                transition={{
                  duration: Math.random() * 8 + 8,
                  repeat: Infinity,
                  delay: Math.random() * 15,
                  ease: "easeOut"
                }}
              />
            ))}
          </div>
          
          {/* Network Connection Lines */}
          <div className="absolute inset-0 w-full h-full opacity-10 mix-blend-screen">
            <svg width="100%" height="100%" className="absolute inset-0">
              <defs>
                <linearGradient id="networkGradient" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgb(79, 70, 229)" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="rgb(236, 72, 153)" stopOpacity="0.5" />
                </linearGradient>
              </defs>
              {[...Array(6)].map((_, i) => (
                <path 
                  key={`network-line-${i}`}
                  d={`M${Math.random() * 100},${Math.random() * 100} C${Math.random() * 100},${Math.random() * 100} ${Math.random() * 100},${Math.random() * 100} ${Math.random() * 100},${Math.random() * 100}`}
                  stroke="url(#networkGradient)"
                  strokeWidth="0.5"
                  fill="none"
                  strokeDasharray="5,5"
                  className="animate-dash-offset-slow"
                />
              ))}
            </svg>
          </div>
          
          {/* Advanced grid pattern with perspective */}
          <div className="absolute inset-0 perspective-grid opacity-[0.06] mix-blend-soft-light transform rotate-12 perspective-1000"></div>
        </div>

        {/* Content */}
        <div className="container relative z-20 py-24">
          <motion.div 
            className="max-w-4xl mx-auto"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.h1 
              className="text-6xl md:text-7xl xl:text-8xl font-bold text-white mb-10 tracking-tight leading-[1.1] [text-shadow:0_0_30px_rgba(0,0,0,0.3)] drop-shadow-2xl display-text"
              variants={fadeInUp}
            >
              Make Your Brand <span className="inline-block relative overflow-hidden">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-neo-300 via-primary-400 to-accent-400 inline-block hover:from-accent-300 hover:to-primary-300 transition-colors duration-700 [text-shadow:0_0_40px_rgba(79,70,229,0.4)] gradient-heading">
                  Go Viral
                </span>
                <svg className="absolute -bottom-3 left-0 w-full h-3 text-accent-500/70" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 25 0, 50 5 Q 75 10, 100 5" stroke="currentColor" strokeWidth="3" fill="none" />
                </svg>
              </span>
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl xl:text-3xl text-gray-100/90 mb-14 font-light leading-relaxed max-w-3xl backdrop-blur-[2px] shadow-text-lg [text-shadow:0_2px_5px_rgba(0,0,0,0.2)] text-balance"
              variants={fadeInUp}
            >
              We help brands create content that <span className="text-white font-normal">captures attention</span>, drives <span className="text-white font-normal">engagement</span>, and generates <span className="text-white font-normal">explosive growth</span> on Instagram and TikTok.
            </motion.p>
            <motion.div 
              className="flex flex-wrap"
              variants={fadeInUp}
            >
              <Link 
                href="/contact" 
                className="btn-touch-light group relative overflow-hidden shadow-2xl"
              >
                <span className="relative z-10 flex items-center font-medium text-lg">
                  Get Started
                  <svg className="w-5 h-5 ml-2 transition-all duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-neo-500 to-primary-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out z-0"></span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Services Section - 2025 Design Update */}
      <section className="py-32 bg-gradient-to-b from-light to-light/80 relative overflow-hidden" ref={servicesRef}>
        {/* Enhanced Background Elements */}
        <div className="absolute top-0 right-0 w-1/3 h-2/5 bg-gradient-to-br from-neo-100/30 to-neo-300/20 rounded-full filter blur-[120px] opacity-70 -z-10 animate-float-slow"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-primary-100/30 to-primary-300/20 rounded-full filter blur-[120px] opacity-70 -z-10 animate-float-slow animation-delay-2000"></div>
        <div className="absolute top-1/3 left-1/4 w-1/4 h-1/4 bg-gradient-to-tr from-accent-100/30 to-accent-300/20 rounded-full filter blur-[100px] opacity-60 -z-10 animate-pulse-slow"></div>
        <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-soft-light"></div>
        
        {/* Grid Pattern Overlay - 2025 Design Trend */}
        <div className="absolute inset-0 bg-grid-light opacity-[0.5] pointer-events-none"></div>
        
        <div className="container relative z-10">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-24 fade-in-section"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <div className="inline-block mb-6">
              <span className="inline-block py-2 px-5 bg-neo-100 text-neo-700 rounded-full text-sm font-medium border border-neo-200/50 shadow-md">
                <span className="mr-2 inline-block w-2 h-2 rounded-full bg-neo-500 animate-pulse"></span>
                Our Expertise
              </span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-8 tracking-tight">
              Our <span className="relative inline-block">
                <span className="relative z-10 gradient-text">Services</span>
                <svg className="absolute -bottom-2 left-0 w-full h-3 text-neo-400 opacity-70" viewBox="0 0 100 15" preserveAspectRatio="none">
                  <path d="M0 5 Q 25 15, 50 5 Q 75 -5, 100 5" stroke="currentColor" strokeWidth="2.5" fill="none" />
                </svg>
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              We offer end-to-end social media growth solutions tailored to your brand's unique goals and audience. Our data-driven approach ensures maximum impact.
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 xl:gap-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
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
                {/* Card Glow Effect */}
                <div className="absolute -inset-1 bg-gradient-to-br from-neo-400/20 via-primary-400/10 to-accent-400/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-all duration-700 group-hover:blur-xl -z-10"></div>
                
                {/* Card Background */}
                <div className="absolute inset-0 bg-white dark:bg-dark-800 rounded-2xl overflow-hidden border border-slate-200/60 dark:border-dark-700/60 shadow-xl transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-neo-500/20">
                  {/* Card Background Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-neo-500/50 dark:from-dark-800 dark:via-dark-800 dark:to-neo-900/20 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                  <div className="absolute inset-0 bg-noise opacity-[0.05]"></div>
                </div>
                
                {/* Card Content */}
                <div className="relative z-10 p-8 h-full flex flex-col">
                  <div className="mb-6 relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-neo-200 to-primary-200 dark:from-neo-900/30 dark:to-primary-900/30 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
                    <div className="relative w-16 h-16 bg-white dark:bg-dark-700 rounded-xl flex items-center justify-center shadow-lg border border-slate-100 dark:border-dark-700 group-hover:border-neo-100 transition-all duration-500 overflow-hidden">
                      <img src={service.icon} alt={service.title} className="w-8 h-8 transition-transform duration-500 group-hover:scale-110 relative z-10" />
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white group-hover:text-neo-600 dark:group-hover:text-neo-400 transition-colors duration-300">{service.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6 flex-grow transition-colors duration-300">{service.description}</p>
                  
                  <Link 
                    href={service.link} 
                    className="inline-flex items-center font-medium text-neo-600 dark:text-neo-400 hover:text-neo-800 dark:hover:text-neo-300 transition-colors relative group/link"
                  >
                    <span className="relative z-10">Learn more</span>
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-neo-400 group-hover/link:w-full transition-all duration-300"></span>
                    <svg 
                      className="w-5 h-5 ml-2 transition-all duration-300" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </Link>
                </div>

                {/* Corner Accent */}
                <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                  <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-br from-neo-400/20 to-neo-500/30 dark:from-neo-800/30 dark:to-neo-700/40 -rotate-45 transform origin-top-right translate-y-[-50%] translate-x-[50%] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          {/* Services CTA - Updated for 2025 Design */}
          <motion.div 
            className="mt-24 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <Link href="/services" className="btn-touch-light relative inline-flex group/cta px-8 py-4 text-lg font-medium shadow-lg shadow-neo-500/20 overflow-hidden">
              <span className="relative z-10 flex items-center">
                View All Services
                <svg className="w-5 h-5 ml-2 transition-all duration-300" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-neo-500 to-primary-500 transform -translate-x-full group-hover/cta:translate-x-0 transition-transform duration-500 ease-out z-0"></span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats Section - 2025 Design Update */}
      <section 
        className="py-32 bg-gradient-to-br from-primary-950 via-dark to-primary-950 relative overflow-hidden"
        ref={statsRef}
      >
        {/* Background Elements - 2025 Design */}
        <div className="absolute inset-0 bg-noise opacity-[0.08] mix-blend-soft-light"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-grid-dark opacity-[0.05]"></div>
        
        {/* Enhanced Gradient Blobs */}
        <div className="absolute top-0 left-1/4 w-2/3 h-2/3 bg-primary-600/10 rounded-full filter blur-[150px] animate-pulse-slow"></div>
        <div className="absolute bottom-0 right-1/4 w-1/2 h-1/2 bg-accent-600/10 rounded-full filter blur-[150px] animate-pulse-slow animation-delay-2000"></div>
        <div className="absolute top-1/2 right-10 w-32 h-32 bg-neo-500/15 rounded-full filter blur-[70px] animate-pulse-slow animation-delay-1000"></div>
        
        {/* Enhanced Mesh Grid Lines */}
        <div className="absolute inset-0 flex justify-between">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-full w-px bg-gradient-to-b from-white/0 via-white/5 to-white/0"></div>
          ))}
        </div>
        <div className="absolute inset-0 flex flex-col justify-between">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="w-full h-px bg-gradient-to-r from-white/0 via-white/5 to-white/0"></div>
          ))}
        </div>
        
        <div className="container relative z-10">
          {/* Section Title - 2025 Design */}
          <motion.div
            className="text-center max-w-3xl mx-auto mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block py-2 px-5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full text-neo-400 text-sm font-medium mb-6">
              <span className="mr-2 inline-block w-2 h-2 rounded-full bg-neo-500 animate-pulse"></span>
              Our Growth Impact
            </span>
            <h2 className="text-5xl md:text-6xl font-bold mb-8 text-white">
              Results that <span className="gradient-text">Speak</span> for Themselves
            </h2>
            <div className="h-1 w-32 bg-gradient-to-r from-neo-500 to-primary-500 mx-auto rounded-full"></div>
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
                <div className="relative h-full">
                  {/* Card Glow Effect */}
                  <div className="absolute -inset-1 bg-gradient-to-br from-neo-500/30 to-primary-500/30 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500"></div>
                  
                  {/* Card Background */}
                  <div className="relative h-full rounded-2xl p-8 border border-white/10 backdrop-blur-xl transition-all duration-300 overflow-hidden">
                    {/* Background Glass Effect */}
                    <div className="absolute inset-0 bg-white/5"></div>
                    
                    {/* Animated Background on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-neo-800/40 via-primary-900/30 to-dark opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute inset-0 bg-noise opacity-[0.07]"></div>
                    
                    {/* Accent Lines */}
                    <div className="absolute bottom-0 left-0 w-1/2 h-px bg-gradient-to-r from-neo-500/0 to-neo-500/50"></div>
                    <div className="absolute top-0 right-0 w-1/2 h-px bg-gradient-to-l from-neo-500/0 to-neo-500/50"></div>
                    
                    {/* Content */}
                    <div className="relative z-10 flex flex-col items-center">
                      <h3 className="flex items-center">
                        <span className="stat-number text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-white/80 text-5xl md:text-6xl xl:text-7xl font-bold" data-value={stat.value}>0</span>
                        <span className={`text-neo-400 text-3xl md:text-4xl xl:text-5xl font-bold ${stat.plus || stat.percent ? 'ml-1' : ''}`}>
                          {stat.plus ? '+' : stat.percent ? '%' : ''}
                        </span>
                      </h3>
                      <div className="w-12 h-1 bg-gradient-to-r from-neo-500 to-primary-500 rounded-full mt-4 mb-4 transform transition-all duration-300 group-hover:scale-x-125 origin-center"></div>
                      <p className="text-white/80 text-lg font-medium">{stat.label}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          {/* Stats CTA - 2025 Design */}
          <motion.div 
            className="text-center mt-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link 
              href="/case-studies" 
              className="btn-outline text-white border-white/20 hover:border-neo-500/50 hover:bg-white/5 backdrop-blur-xl shadow-glow-sm group"
            >
              <span className="flex items-center">
                Explore Our Case Studies
                <svg className="w-5 h-5 ml-2 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </span>
            </Link>
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
                  className="group rounded-2xl p-6 transition-all duration-300 hover:shadow-xl border border-transparent hover:border-primary-200 bg-white hover:bg-gradient-to-br hover:from-white hover:to-primary-50 relative overflow-hidden"
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
                  className="group rounded-2xl p-6 transition-all duration-300 hover:shadow-xl border border-transparent hover:border-accent-200 bg-white hover:bg-gradient-to-br hover:from-white hover:to-accent-50 relative overflow-hidden"
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
              <div className="w-full aspect-[4/3] relative rounded-2xl overflow-hidden border border-white/20 shadow-2xl backdrop-blur-sm">
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
                className="absolute -bottom-8 -right-8 p-6 glass-card rounded-2xl shadow-2xl backdrop-blur-xl border border-white/10 bg-white/95"
                initial={{ opacity: 0, y: 30, x: 30 }}
                whileInView={{ opacity: 1, y: 0, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-neo-600 to-primary-600">10x</div>
                <div className="text-lg font-medium text-gray-700">Average Growth</div>
              </motion.div>
              
              <motion.div 
                className="absolute -top-6 -left-6 p-4 rounded-2xl shadow-lg backdrop-blur-xl border border-white/10 bg-white/95"
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

      {/* CTA Section - 2025 Design Update */}
      <section 
        className="py-36 relative overflow-hidden"
        ref={ctaRef}
      >
        {/* Enhanced Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-950 via-dark to-primary-950"></div>
        <div className="absolute inset-0 bg-noise opacity-[0.08] mix-blend-soft-light"></div>
        
        {/* Enhanced Animated Gradients */}
        <div className="absolute top-0 right-0 w-2/3 h-2/3 bg-primary-600/10 rounded-full filter blur-[200px] animate-pulse-slow"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-neo-500/10 rounded-full filter blur-[200px] animate-float-slow"></div>
        <div className="absolute top-1/3 left-1/4 w-32 h-32 bg-accent-400/10 rounded-full filter blur-[100px] animate-spin-slow"></div>
        
        {/* Enhanced Particle Effect */}
        <div className="absolute inset-0 particles-container">
          {Array.from({ length: 40 }).map((_, i) => (
            <div 
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-float-particle opacity-0"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDuration: `${Math.random() * 10 + 20}s`,
                animationDelay: `${Math.random() * 10}s`,
                width: `${Math.random() * 4 + 1}px`,
                height: `${Math.random() * 4 + 1}px`,
              }}
            ></div>
          ))}
        </div>
        
        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-grid-dark opacity-[0.05]"></div>
        
        <div className="container relative z-10">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
          >
            <motion.div 
              className="inline-block px-6 py-2 mb-8 rounded-full bg-neo-500/10 backdrop-blur-xl border border-neo-500/20"
              variants={fadeInUp}
            >
              <span className="text-neo-400 text-sm font-medium flex items-center">
                <span className="mr-2 inline-block w-2 h-2 rounded-full bg-neo-500 animate-pulse"></span>
                Ready for explosive growth?
              </span>
            </motion.div>
            
            <motion.h2 
              className="text-5xl md:text-6xl xl:text-7xl font-bold mb-10 text-white"
              variants={fadeInUp}
              ref={ctaHeadingRef}
            >
              Ready to <span className="gradient-text inline-block relative">
                Go Viral
                <svg className="absolute -bottom-2 left-0 w-full h-2.5 text-neo-500 opacity-70" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 25 0, 50 5 Q 75 10, 100 5" stroke="currentColor" strokeWidth="2.5" fill="none" />
                </svg>
              </span>?
            </motion.h2>
            
            <motion.p 
              className="text-xl md:text-2xl xl:text-3xl text-gray-300 mb-12 font-light leading-relaxed"
              variants={fadeInUp}
              ref={ctaTextRef}
            >
              Let's transform your social media presence and take your brand to the next level with our proven strategies.
            </motion.p>
            
            <motion.div 
              variants={fadeInUp}
              className="flex flex-col sm:flex-row items-center justify-center gap-6"
            >
              <Link 
                href="/contact" 
                className="btn-touch-light relative overflow-hidden px-8 py-4 rounded-xl text-lg font-medium group"
              >
                <span className="btn-content flex items-center relative z-10">
                  Get Started Today
                  <svg className="w-5 h-5 ml-2 transition-all duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-neo-500 to-primary-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out z-0"></span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}