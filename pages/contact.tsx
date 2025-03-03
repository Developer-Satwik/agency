import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Layout from '@/components/layout/Layout';
import { motion, useScroll, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: '',
    services: [] as string[],
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const heroRef = useRef<HTMLDivElement>(null);
  
  // Parallax scroll effects
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 300], [1, 0.95]);
  
  // Handle mouse movement for parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate mouse position as percentage of screen width/height
      const x = (e.clientX / window.innerWidth) - 0.5;
      const y = (e.clientY / window.innerHeight) - 0.5;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  // Form handling functions
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleCheckboxChange = (service: string) => {
    setFormData(prev => {
      const services = prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service];
      
      return {
        ...prev,
        services
      };
    });
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      // Create a new document in Firestore with the form data
      await addDoc(collection(db, 'contactSubmissions'), {
        ...formData,
        timestamp: serverTimestamp(),
      });
      
      // Handle successful submission
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Reset form after submission
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        message: '',
        services: [],
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    } catch (error) {
      // Handle error
      setIsSubmitting(false);
      setSubmitError('There was an error submitting your form. Please try again.');
      console.error('Error submitting form:', error);
    }
  };
  
  return (
    <Layout>
      <Head>
        <title>Contact Us | Viral Growth Agency</title>
        <meta name="description" content="Get in touch with our team to discuss how we can help your brand grow on social media." />
      </Head>
      
      {/* Hero Section with Get in Touch Heading - 2025 Design */}
      <motion.section 
        ref={heroRef}
        className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-dark via-dark/95 to-dark/90"
        style={{ scale: heroScale, opacity: heroOpacity }}
      >
        {/* Enhanced Background Elements - 2025 Design */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Dynamic gradient orbs */}
          <motion.div 
            className="absolute top-0 right-0 w-2/3 h-2/3 bg-gradient-to-br from-primary-600/30 via-accent-500/20 to-primary-400/10 rounded-full filter blur-[120px] opacity-70 -z-10"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
              opacity: [0.5, 0.7, 0.5]
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <motion.div 
            className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-accent-500/30 via-primary-400/20 to-neo-500/10 rounded-full filter blur-[100px] opacity-70 -z-10"
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [90, 0, 90],
              opacity: [0.6, 0.4, 0.6]
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear",
              delay: 2
            }}
          />
          
          {/* Advanced noise and grid textures */}
          <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-soft-light"></div>
          <div className="absolute inset-0 bg-grid-dark opacity-[0.07]"></div>
          
          {/* Floating particles */}
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                filter: 'blur(1px)'
              }}
              animate={{
                y: [-20, 20],
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0]
              }}
              transition={{
                duration: Math.random() * 5 + 5,
                repeat: Infinity,
                delay: Math.random() * 5
              }}
            />
          ))}
        </div>
        
        <div className="container relative z-10 max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2 
              className="section-heading"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              Get in <span className="gradient-text">Touch</span>
            </motion.h2>
            <motion.p 
              className="section-subheading mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              We'd love to hear from you. Fill out the form below and we'll get back to you within 24 hours.
            </motion.p>
          </div>
        </div>
      </motion.section>
      
      {/* Contact Form Section */}
      <section id="contact-form" className="pb-32 pt-0 bg-gradient-to-b from-light to-gray-50 relative overflow-hidden">
        {/* Enhanced Background Elements - 2025 Design */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Dynamic gradient orbs */}
          <motion.div 
            className="absolute top-0 right-0 w-2/3 h-2/3 bg-gradient-to-br from-primary-600/30 via-accent-500/20 to-primary-400/10 rounded-full filter blur-[120px] opacity-70 -z-10"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
              opacity: [0.5, 0.7, 0.5]
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <motion.div 
            className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-accent-500/30 via-primary-400/20 to-neo-500/10 rounded-full filter blur-[100px] opacity-70 -z-10"
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [90, 0, 90],
              opacity: [0.6, 0.4, 0.6]
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear",
              delay: 2
            }}
          />
          
          {/* Advanced noise and grid textures */}
          <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-soft-light"></div>
          <div className="absolute inset-0 bg-grid-dark opacity-[0.07]"></div>
          
          {/* Floating particles */}
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                filter: 'blur(1px)'
              }}
              animate={{
                y: [-20, 20],
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0]
              }}
              transition={{
                duration: Math.random() * 5 + 5,
                repeat: Infinity,
                delay: Math.random() * 5
              }}
            />
          ))}
        </div>
        
        <div className="container relative max-w-3xl mx-auto">
          <div className="flex flex-col items-center">
            {/* Email Contact Info - Centered Above Form */}
            <motion.a 
              href="mailto:satwik@riseklix.com"
              className="flex items-center justify-center group hover:scale-105 transition-transform duration-300 mb-12"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-primary-500/20 rounded-xl filter blur-sm opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative w-12 h-12 bg-white flex items-center justify-center rounded-xl shadow-soft">
                  <svg className="w-5 h-5 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500 font-medium">Email us at</p>
                <p className="text-lg text-gray-900 font-medium group-hover:text-primary-500 transition-colors">satwik@riseklix.com</p>
              </div>
            </motion.a>

            {/* Form Column */}
            <motion.div 
              className="neu-element p-8 md:p-10 relative w-full"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              
              {submitError && (
                <motion.div 
                  className="bg-red-50 text-red-700 p-4 rounded-lg mb-6"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <p>{submitError}</p>
                  </div>
                </motion.div>
              )}
              
              {isSubmitted ? (
                <motion.div 
                  className="bg-gradient-to-r from-primary-50 to-primary-100/70 text-primary-700 p-8 rounded-2xl mb-6 shadow-inner-light"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center mb-4">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Thank you for reaching out!</h3>
                    <p className="text-primary-700/80">We've received your message and will get back to you within 24 hours.</p>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name Field */}
                    <div>
                      <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                        Your Name <span className="text-primary-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="John Smith"
                      />
                    </div>
                    
                    {/* Email Field */}
                    <div>
                      <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                        Email Address <span className="text-primary-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Company Field */}
                    <div>
                      <label htmlFor="company" className="block text-gray-700 font-medium mb-2">
                        Company Name
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="Your Company"
                      />
                    </div>
                    
                    {/* Phone Field */}
                    <div>
                      <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="(123) 456-7890"
                      />
                    </div>
                  </div>
                  
                  {/* Services Interest Checkboxes */}
                  <div>
                    <label className="block text-gray-700 font-medium mb-3">
                      Services You're Interested In
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {serviceOptions.map((service) => (
                        <div key={service.value} className="flex items-center">
                          <label className="flex items-center space-x-3 cursor-pointer group">
                            <div className="relative">
                              <input
                                type="checkbox"
                                id={service.value}
                                checked={formData.services.includes(service.value)}
                                onChange={() => handleCheckboxChange(service.value)}
                                className="peer sr-only"
                              />
                              <div className="w-5 h-5 border-2 border-gray-300 rounded transition-colors peer-checked:border-primary-500 peer-checked:bg-primary-500"></div>
                              <div className="absolute inset-0 flex items-center justify-center text-white opacity-0 peer-checked:opacity-100 transition-opacity">
                                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                                </svg>
                              </div>
                            </div>
                            <span className="text-gray-700 text-sm group-hover:text-primary-600 transition-colors">
                              {service.label}
                            </span>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Message Field */}
                  <div>
                    <label htmlFor="message" className="block text-gray-700 font-medium mb-3">
                      Tell Us About Your Goals <span className="text-primary-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className="form-input"
                      placeholder="I'd like to increase my brand's presence on Instagram and TikTok..."
                    />
                  </div>
                  
                  {/* Submit Button */}
                  <div className="mt-12">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full btn-touch-dark py-5 text-lg font-medium relative ${
                        isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                      }`}
                    >
                      <span className="btn-content">
                        {isSubmitting ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Sending...
                          </>
                        ) : (
                          <>
                            Send Message
                            <svg className="w-5 h-5 btn-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                            </svg>
                          </>
                        )}
                      </span>
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section - Adjusted Spacing */}
      <section className="py-32 bg-gradient-to-b from-light to-gray-50 relative overflow-hidden">
        {/* Enhanced Background Elements - 2025 Design */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Dynamic gradient orbs */}
          <motion.div 
            className="absolute top-0 right-0 w-2/3 h-2/3 bg-gradient-to-br from-primary-600/30 via-accent-500/20 to-primary-400/10 rounded-full filter blur-[120px] opacity-70 -z-10"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
              opacity: [0.5, 0.7, 0.5]
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <motion.div 
            className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-accent-500/30 via-primary-400/20 to-neo-500/10 rounded-full filter blur-[100px] opacity-70 -z-10"
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [90, 0, 90],
              opacity: [0.6, 0.4, 0.6]
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear",
              delay: 2
            }}
          />
          
          {/* Advanced noise and grid textures */}
          <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-soft-light"></div>
          <div className="absolute inset-0 bg-grid-dark opacity-[0.07]"></div>
          
          {/* Floating particles */}
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                filter: 'blur(1px)'
              }}
              animate={{
                y: [-20, 20],
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0]
              }}
              transition={{
                duration: Math.random() * 5 + 5,
                repeat: Infinity,
                delay: Math.random() * 5
              }}
            />
          ))}
        </div>
        
        <div className="container relative max-w-3xl mx-auto">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h2 className="section-heading">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h2>
            <p className="section-subheading mx-auto">
              Have questions about working with us? Here are answers to some of the most common questions we receive.
            </p>
          </motion.div>
          
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <FaqItem key={index} question={faq.question} answer={faq.answer} index={index} />
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section - Adjusted Spacing */}
      <section className="py-32 bg-gradient-to-b from-light to-gray-50 relative overflow-hidden">
        {/* Enhanced Background Elements - 2025 Design */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Dynamic gradient orbs */}
          <motion.div 
            className="absolute top-0 right-0 w-2/3 h-2/3 bg-gradient-to-br from-primary-600/30 via-accent-500/20 to-primary-400/10 rounded-full filter blur-[120px] opacity-70 -z-10"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
              opacity: [0.5, 0.7, 0.5]
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <motion.div 
            className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-accent-500/30 via-primary-400/20 to-neo-500/10 rounded-full filter blur-[100px] opacity-70 -z-10"
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [90, 0, 90],
              opacity: [0.6, 0.4, 0.6]
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear",
              delay: 2
            }}
          />
          
          {/* Advanced noise and grid textures */}
          <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-soft-light"></div>
          <div className="absolute inset-0 bg-grid-dark opacity-[0.07]"></div>
          
          {/* Floating particles */}
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                filter: 'blur(1px)'
              }}
              animate={{
                y: [-20, 20],
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0]
              }}
              transition={{
                duration: Math.random() * 5 + 5,
                repeat: Infinity,
                delay: Math.random() * 5
              }}
            />
          ))}
        </div>
        
        <div className="container relative max-w-5xl mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h2 
              className="text-4xl md:text-5xl font-display font-bold mb-8 text-gray-900"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              Ready to <span className="text-primary-500">Grow</span> Your Social Presence?
            </motion.h2>
            <motion.p 
              className="text-xl md:text-2xl text-gray-700 mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              viewport={{ once: true }}
            >
              Let's turn your audience into raving fans and customers.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex flex-wrap justify-center gap-6"
            >
              <a 
                href="#contact-form" 
                className="btn-touch-dark inline-flex items-center px-10 py-5 rounded-xl text-lg"
              >
                <span className="btn-content">
                  Get in Touch
                  <svg className="w-5 h-5 ml-2 btn-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </span>
              </a>
              <a 
                href="/portfolio" 
                className="inline-flex items-center px-10 py-5 bg-transparent border-2 border-primary-500/30 hover:border-primary-500/60 text-primary-700 rounded-xl text-lg transition-colors duration-300"
              >
                View Our Work
              </a>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

// FAQ Accordion Item Component
function FaqItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <motion.div 
      className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.05 * index }}
      viewport={{ once: true }}
    >
      <button
        className="flex justify-between items-center w-full px-6 py-5 text-left focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-display font-semibold text-lg text-gray-800">{question}</span>
        <span className={`ml-6 flex-shrink-0 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>
      <motion.div 
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="px-6 pb-5 text-gray-600">
          {answer}
        </div>
      </motion.div>
    </motion.div>
  );
}

// Service options
const serviceOptions = [
  { value: 'content-creation', label: 'Content Creation' },
  { value: 'growth-strategy', label: 'Growth Strategy' },
  { value: 'trend-analysis', label: 'Trend Analysis' },
  { value: 'community-management', label: 'Community Management' },
  { value: 'analytics-reporting', label: 'Analytics & Reporting' },
  { value: 'influencer-consulting', label: 'Influencer Consulting' },
];

// FAQ Data
const faqs = [
  {
    question: "What social media platforms do you specialize in?",
    answer: "We specialize in creating growth strategies for Instagram, TikTok, YouTube, and LinkedIn. Our team stays ahead of algorithm changes and trends on each platform to maximize your results."
  },
  {
    question: "How long until I see results from working with you?",
    answer: "While every brand is different, our clients typically start seeing measurable growth within the first 30-60 days. For more competitive niches, it might take 90 days to gain significant traction. We provide detailed analytics and reporting throughout the process."
  },
  {
    question: "Do you offer content creation services?",
    answer: "Yes! We offer full-service content creation including strategy, photography, videography, editing, and copywriting. Our team can produce content at your location or in our studio, depending on your needs and budget."
  },
  {
    question: "What makes your agency different from others?",
    answer: "Unlike many agencies that focus purely on vanity metrics, we build strategies that drive real business results. Our data-driven approach combines trend analysis, competitor research, and platform-specific optimization to create content that not only goes viral but converts to actual customers."
  },
  {
    question: "What information do you need to get started?",
    answer: "To create an effective strategy, we'll need access to your current social media analytics, information about your target audience, your business goals, and examples of content that has performed well for you in the past. Don't worry if you're just starting out - we can help you build from the ground up!"
  },
];