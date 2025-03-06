import { useState, useRef, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '@/components/layout/Layout';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '@/components/shared/SEO';

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

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.3 } },
};

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

// Service options for the form
const serviceOptions = [
  { id: 'content-strategy', label: 'Content Strategy' },
  { id: 'growth-management', label: 'Growth Management' },
  { id: 'analytics', label: 'Analytics & Insights' },
  { id: 'community', label: 'Community Building' },
  { id: 'other', label: 'Other' }
];

export default function Contact() {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    message: ''
  });
  
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const formRef = useRef<HTMLFormElement>(null);
  
  // Track which FAQ items are open
  const [openFaqs, setOpenFaqs] = useState<number[]>([]);
  
  // Toggle FAQ open/closed
  const toggleFaq = (index: number) => {
    setOpenFaqs(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index) 
        : [...prev, index]
    );
  };
  
  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user types
    if (formErrors[name]) {
      setFormErrors(prev => {
        const newErrors = {...prev};
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  // Validate form
  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (!formData.service) {
      errors.service = 'Please select a service';
    }
    
    if (!formData.message.trim()) {
      errors.message = 'Message is required';
    }
    
    return errors;
  };
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    // Set submitting state
    setFormStatus('submitting');
    
    try {
      // Simulate form submission - in a real app, you would send to an API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Reset form on success
      setFormData({
        name: '',
        email: '',
        service: '',
        message: ''
      });
      setFormStatus('success');
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setFormStatus('idle');
      }, 5000);
      
    } catch (error) {
      console.error('Form submission error:', error);
      setFormStatus('error');
    }
  };
  
  // GSAP animations
  useEffect(() => {
    const initializeGSAP = async () => {
      if (typeof window !== 'undefined') {
        const { gsap } = await import('gsap');
        const { ScrollTrigger } = await import('gsap/dist/ScrollTrigger');
        
        gsap.registerPlugin(ScrollTrigger);
        
        // Animate map and contact info on scroll
        gsap.fromTo(
          '.contact-map',
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            scrollTrigger: {
              trigger: '.contact-map',
              start: 'top 80%',
              toggleActions: 'play none none none'
            }
          }
        );
      }
    };
    
    initializeGSAP();
  }, []);
  
  return (
    <Layout>
      <Head>
        <title>Contact Us | RiseKlix</title>
        <meta name="description" content="Get in touch with RiseKlix Agency for Instagram and TikTok growth services. Let's discuss how we can help your brand go viral." />
      </Head>
      
      {/* Hero Section */}
      <section className="relative pt-44 pb-36 bg-dark text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          {/* Enhanced gradient background with multiple layers */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-dark to-dark opacity-90"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-accent-600/30 via-primary-500/20 to-dark z-10"></div>
          <div className="absolute inset-0 bg-noise opacity-5 mix-blend-soft-light"></div>
          <div className="absolute inset-0 bg-gradient-conic from-primary-900/40 via-accent-900/20 to-primary-900/40 opacity-30 animate-spin-slow"></div>
          
          {/* Enhanced Mesh Gradient with Dynamic Effects */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-full h-full opacity-30 bg-[linear-gradient(45deg,rgba(var(--primary-rgb),0.1)_25%,transparent_25%,transparent_50%,rgba(var(--primary-rgb),0.1)_50%,rgba(var(--primary-rgb),0.1)_75%,transparent_75%,transparent)] bg-[length:64px_64px] animate-gradient-scroll"></div>
          </div>
          
          {/* Enhanced Animated Particles and Orbs */}
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-gradient-to-br from-primary-500/30 to-accent-500/20 filter blur-[100px] animate-float-slow"></div>
            <div className="absolute bottom-1/3 right-1/3 w-64 h-64 rounded-full bg-gradient-to-tr from-accent-500/30 to-primary-500/20 filter blur-[80px] animate-float-slow animation-delay-2000"></div>
            <div className="absolute top-1/2 right-1/4 w-40 h-40 rounded-full bg-gradient-to-bl from-primary-400/30 to-accent-400/20 filter blur-[60px] animate-float animation-delay-1000"></div>
            <div className="absolute bottom-1/4 left-1/3 w-56 h-56 rounded-full bg-gradient-to-r from-neo-500/20 to-primary-500/20 filter blur-[70px] animate-pulse-slow"></div>
          </div>
          
          {/* Subtle Grid Pattern */}
          <div className="absolute inset-0 bg-grid-dark opacity-10"></div>
        </div>
        
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5 }}
              className="mb-6 inline-block"
            >
              <span className="inline-block py-2 px-6 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-md text-white/90 rounded-full text-sm font-medium border border-white/10 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group">
                <span className="mr-2 inline-block w-2 h-2 rounded-full bg-gradient-to-r from-accent-400 to-primary-400 animate-pulse group-hover:scale-110 transition-transform duration-300"></span>
                <span className="relative inline-flex items-center">
                  Get in Touch
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
              Let's <motion.span 
                className="text-accent-400 relative inline-block"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                Connect
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
                
                {/* Animated particles along the underline */}
                <motion.div 
                  className="absolute -bottom-2 w-2 h-2 rounded-full bg-accent-400/70"
                  animate={{
                    x: [0, 100, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatDelay: 2
                  }}
                />
              </motion.span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-white/80 mb-12 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Ready to take your social media presence to the next level?
              <br />
              We're here to help your brand go viral.
            </motion.p>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-light to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-500/40 to-transparent"></div>
      </section>
      
      {/* Contact Form Section */}
      <section className="py-24 relative overflow-hidden bg-bone-50">
        {/* Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 right-1/4 w-72 h-72 rounded-full bg-bone-100/60 filter blur-[150px] opacity-60 -z-10"></div>
          <div className="absolute bottom-1/4 left-1/4 w-72 h-72 rounded-full bg-bone-200/60 filter blur-[150px] opacity-60 -z-10"></div>
          <div className="absolute top-1/2 left-1/2 w-96 h-96 rounded-full bg-bone-100/40 filter blur-[180px] opacity-40 -z-10 transform -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute inset-0 bg-noise opacity-[0.02] mix-blend-soft-light z-0"></div>
          <div className="absolute inset-0 bg-grid-light opacity-[0.03] pointer-events-none"></div>
        </div>
        
        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Contact Form */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInUp}
              className="bg-white/90 backdrop-blur-sm p-8 md:p-10 rounded-2xl shadow-xl border border-gray-100/50 relative overflow-hidden">
              
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 to-accent-500"></div>
              
              <h2 className="text-3xl font-display font-bold mb-6 text-gray-800">Send Us a Message</h2>
              <p className="text-gray-600 mb-8">Fill out the form below and we'll get back to you as soon as possible.</p>
              
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl border ${formErrors.name ? 'border-red-300 bg-red-50' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300`}
                    placeholder="John Doe"
                  />
                  {formErrors.name && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.name}</p>
                  )}
                </div>
                
                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl border ${formErrors.email ? 'border-red-300 bg-red-50' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300`}
                    placeholder="john@example.com"
                  />
                  {formErrors.email && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>
                  )}
                </div>
                
                {/* Service Selection */}
                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">Service Interested In</label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl border ${formErrors.service ? 'border-red-300 bg-red-50' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 bg-white`}
                  >
                    <option value="">Select a service</option>
                    {serviceOptions.map(option => (
                      <option key={option.id} value={option.id}>{option.label}</option>
                    ))}
                  </select>
                  {formErrors.service && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.service}</p>
                  )}
                </div>
                
                {/* Message Field */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Your Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className={`w-full px-4 py-3 rounded-xl border ${formErrors.message ? 'border-red-300 bg-red-50' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300`}
                    placeholder="Tell us about your project or inquiry..."
                  ></textarea>
                  {formErrors.message && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.message}</p>
                  )}
                </div>
                
                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={formStatus === 'submitting'}
                  className="w-full py-4 px-6 bg-primary-600 hover:bg-primary-700 text-white rounded-xl transition-all duration-300 relative overflow-hidden group disabled:opacity-70 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10 flex items-center justify-center">
                    {formStatus === 'submitting' ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </>
                    ) : 'Send Message'}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-500/0 via-primary-400/20 to-primary-500/0 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                </motion.button>
                
                {/* Form Status Messages */}
                <AnimatePresence>
                  {formStatus === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="p-4 bg-green-50 border border-green-200 rounded-xl text-green-800 flex items-start"
                    >
                      <svg className="w-5 h-5 mr-3 mt-0.5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <p>Thank you for your message! We'll get back to you soon.</p>
                    </motion.div>
                  )}
                  
                  {formStatus === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-800 flex items-start"
                    >
                      <svg className="w-5 h-5 mr-3 mt-0.5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                      </svg>
                      <p>There was an error sending your message. Please try again later.</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </motion.div>
            
            {/* Contact Information */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInDown}
              className="lg:mt-16"
            >
              <div className="space-y-12">
                {/* Contact Info Cards */}
                <motion.div variants={staggerChildren} className="space-y-6">
                  <h2 className="text-3xl font-display font-bold mb-8 text-gray-800">Get in Touch</h2>
                  
                  {/* Email */}
                  <motion.div 
                    variants={fadeInUp}
                    className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-md border border-gray-100/50 flex items-start space-x-4 hover:shadow-lg transition-all duration-300 group"
                  >
                    <div className="bg-primary-100 p-3 rounded-lg text-primary-600 group-hover:bg-primary-600 group-hover:text-white transition-all duration-300">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-800 mb-1">Email Us</h3>
                      <p className="text-gray-600 mb-2">Our team is here to help</p>
                      <a href="mailto:satwik@riseklix.com" className="text-primary-600 hover:text-primary-700 font-medium transition-colors duration-300">satwik@riseklix.com</a>
                    </div>
                  </motion.div>
                  
                  {/* Phone */}
                  <motion.div 
                    variants={fadeInUp}
                    className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-md border border-gray-100/50 flex items-start space-x-4 hover:shadow-lg transition-all duration-300 group"
                  >
                    <div className="bg-primary-100 p-3 rounded-lg text-primary-600 group-hover:bg-primary-600 group-hover:text-white transition-all duration-300">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-800 mb-1">Call Us</h3>
                      <p className="text-gray-600 mb-2">Mon-Fri from 9am to 6pm</p>
                      <a href="https://wa.me/917366917190" className="text-primary-600 hover:text-primary-700 font-medium transition-colors duration-300">WhatsApp us at +917366917190</a>
                    </div>
                  </motion.div>
                  
                </motion.div>
                
                {/* Social Media */}
                <motion.div variants={fadeInUp} className="space-y-4">
                  <h3 className="text-xl font-bold text-gray-800">Follow Us</h3>
                  <div className="flex space-x-4">
                    <a 
                      href="https://instagram.com/riseklix" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 group"
                    >
                      <svg className="w-5 h-5 text-gray-600 group-hover:text-primary-600 transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.26-.149 4.771-1.699-4.919-4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </a>
                    <a 
                      href="https://tiktok.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 group"
                    >
                      <svg className="w-5 h-5 text-gray-600 group-hover:text-primary-600 transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
                      </svg>
                    </a>
                    <a 
                      href="https://x.com/riseklixagency" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 group"
                    >
                      <svg className="w-5 h-5 text-gray-600 group-hover:text-primary-600 transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                      </svg>
                    </a>
                    <a 
                      href="https://linkedin.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 group"
                    >
                      <svg className="w-5 h-5 text-gray-600 group-hover:text-primary-600 transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </a>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-light opacity-[0.03]"></div>
        <div className="container relative z-10">
          <div className="text-center mb-16">
            <motion.span 
              className="inline-block py-1.5 px-4 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-4 border border-primary-200/50 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="mr-1.5 inline-block w-1.5 h-1.5 rounded-full bg-primary-500 animate-pulse"></span>
              Frequently Asked Questions
            </motion.span>
            <motion.h2 
              className="text-4xl md:text-5xl font-display font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Got <span className="text-primary-600">Questions?</span>
            </motion.h2>
            <motion.p 
              className="max-w-2xl mx-auto text-xl text-gray-600"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Find answers to common questions about our services and process
            </motion.p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              {[
                {
                  question: "How quickly can I expect to see results?",
                  answer: "While every brand is different, our clients typically start seeing engagement improvements within the first 2-4 weeks. Significant follower growth usually begins after 4-8 weeks of consistent strategy implementation."
                },
                {
                  question: "Do you guarantee viral content?",
                  answer: "While we can't guarantee virality (no one honestly can), we use data-driven strategies and trend analysis to significantly increase the probability of your content reaching a wider audience and gaining traction."
                },
                {
                  question: "What platforms do you specialize in?",
                  answer: "We primarily focus on Instagram and TikTok growth, as these platforms currently offer the best organic reach and engagement opportunities for most brands."
                },
                {
                  question: "Do you handle content creation or just strategy?",
                  answer: "We offer both! Our team can develop comprehensive content strategies and also handle the creation of high-quality, platform-optimized content if needed."
                },
                {
                  question: "How do you measure success?",
                  answer: "We track multiple KPIs including follower growth, engagement rates, reach, impressions, website traffic from social platforms, and conversion metrics. We provide detailed monthly reports showing your progress."
                }
              ].map((faq, index) => (
                <motion.div 
                  key={index}
                  className="bg-bone-50 rounded-xl overflow-hidden shadow-md border border-bone-100/50"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <button
                    className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
                    onClick={() => toggleFaq(index)}
                  >
                    <span className="text-lg font-bold text-gray-800">{faq.question}</span>
                    <svg
                      className={`w-5 h-5 text-primary-600 transform transition-transform duration-300 ${openFaqs.includes(index) ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <AnimatePresence>
                    {openFaqs.includes(index) && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="px-6 pb-4"
                      >
                        <p className="text-gray-600">{faq.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* CTA */}
          <motion.div 
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xl text-gray-600 mb-6">Still have questions? We're here to help!</p>
            <Link 
              href="mailto:satwik@riseklix.com"
              className="inline-flex items-center py-4 px-8 bg-primary-600 hover:bg-primary-700 text-white rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl group"
            >
              <span className="relative z-10 flex items-center">
                Contact Our Team
                <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </span>
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}