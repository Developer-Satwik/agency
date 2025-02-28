import { useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Layout from '@/components/layout/Layout';
import { motion } from 'framer-motion';

export default function Custom404() {
  // GSAP animation for the glitch effect
  useEffect(() => {
    const initializeGSAP = async () => {
      const { gsap } = await import('gsap');
      
      // Glitch effect
      const tl = gsap.timeline({
        repeat: -1,
        repeatDelay: 5
      });
      
      tl.to('.glitch-text', {
        skewX: 20,
        duration: 0.1,
        ease: 'power1.inOut'
      })
      .to('.glitch-text', {
        skewX: 0,
        duration: 0.1,
        ease: 'power1.inOut'
      })
      .to('.glitch-text', {
        opacity: 0.8,
        duration: 0.1
      })
      .to('.glitch-text', {
        opacity: 1,
        duration: 0.1
      })
      .to('.glitch-text', {
        x: -4,
        duration: 0.1
      })
      .to('.glitch-text', {
        x: 0,
        duration: 0.1
      });
    };
    
    initializeGSAP();
  }, []);
  
  return (
    <Layout>
      <Head>
        <title>Page Not Found | Viral Growth Agency</title>
        <meta name="description" content="Sorry, the page you're looking for doesn't exist." />
      </Head>
      
      <section className="relative min-h-screen flex items-center justify-center bg-dark text-white py-20">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-radial from-primary-600/20 to-dark z-10"></div>
          <div className="absolute inset-0 bg-noise opacity-5 mix-blend-soft-light"></div>
          
          {/* Decorative elements */}
          <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-primary-600/20 blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 rounded-full bg-primary-600/10 blur-3xl"></div>
        </div>
        
        <div className="container relative z-10 text-center px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto"
          >
            {/* 404 Text */}
            <h1 className="glitch-text text-[180px] md:text-[240px] font-display font-bold leading-none text-transparent bg-clip-text bg-gradient-to-b from-white to-primary-100">
              404
            </h1>
            
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 -mt-10">
              Page Not Found
            </h2>
            
            <p className="text-xl text-gray-300 mb-10 max-w-xl mx-auto">
              The page you're looking for has been moved, deleted, or possibly never existed in the first place.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link 
                href="/"
                className="btn-primary"
              >
                Back to Homepage
              </Link>
              
              <Link 
                href="/contact"
                className="px-6 py-3 rounded-lg border border-gray-600 hover:border-primary-600 hover:bg-primary-600/10 transition-colors"
              >
                Contact Support
              </Link>
            </div>
            
            {/* Lost in Social Media Illustration */}
            <div className="relative w-full max-w-md mx-auto h-64">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-white absolute z-10"></div>
                <div className="w-40 h-40 rounded-full border-4 border-dashed border-primary-400 animate-spin-slow absolute"></div>
                <div className="w-60 h-60 rounded-full border border-gray-700 absolute"></div>
                
                {/* Social Media Icons floating around */}
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center animate-float">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </div>
                <div className="absolute top-10 right-0 w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center animate-float-delayed">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </div>
                <div className="absolute bottom-0 left-10 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center animate-float-slow">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                  </svg>
                </div>
                <div className="absolute bottom-10 right-10 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center animate-float-delayed-slow">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4.326 18.266l-4.326-2.314-4.326 2.313.863-4.829-3.537-3.399 4.86-.671 2.14-4.415 2.14 4.415 4.86.671-3.537 3.4.863 4.829z"/>
                  </svg>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
} 