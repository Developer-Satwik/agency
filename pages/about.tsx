import { useEffect, useRef } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '@/components/layout/Layout';
import { motion } from 'framer-motion';

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Initialize GSAP animations
    const initializeGSAP = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/dist/ScrollTrigger');
      
      gsap.registerPlugin(ScrollTrigger);
      
      // Animate team members on scroll
      gsap.utils.toArray<HTMLElement>('.team-member').forEach((member, i) => {
        gsap.fromTo(
          member,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: member,
              start: "top 80%",
              toggleActions: "play none none none"
            },
            delay: i * 0.1
          }
        );
      });
      
      // Timeline animation for history milestones
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: '.history-timeline',
          start: "top 70%",
          end: "bottom 20%",
          scrub: 1
        }
      });
      
      timeline.fromTo(
        '.timeline-progress',
        { scaleY: 0, transformOrigin: 'top' },
        { scaleY: 1, ease: "none", duration: 1 }
      );
      
      // Animate milestone dots and content
      gsap.utils.toArray<HTMLElement>('.milestone').forEach((milestone) => {
        gsap.fromTo(
          milestone.querySelector('.milestone-dot'),
          { scale: 0 },
          {
            scale: 1,
            duration: 0.5,
            scrollTrigger: {
              trigger: milestone,
              start: "top 75%",
              toggleActions: "play none none none"
            }
          }
        );
        
        gsap.fromTo(
          milestone.querySelector('.milestone-content'),
          { opacity: 0, x: 50 },
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
            delay: 0.2,
            scrollTrigger: {
              trigger: milestone,
              start: "top 75%",
              toggleActions: "play none none none"
            }
          }
        );
      });
    };
    
    initializeGSAP();
  }, []);
  
  return (
    <Layout>
      <Head>
        <title>About Us | Riseklix</title>
        <meta name="description" content="Learn about Riseklix - social media experts helping brands grow on Instagram and TikTok." />
      </Head>
      
      {/* Hero Section */}
      <section className="relative pt-44 pb-36 bg-gradient-to-br from-dark via-dark/95 to-primary-900/90 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-soft-light"></div>
          <div className="absolute inset-0 bg-grid-light opacity-10"></div>
          
          {/* Modern gradient orbs */}
          <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-primary-500/20 filter blur-[120px] animate-float-slow"></div>
          <div className="absolute bottom-1/3 left-1/3 w-64 h-64 rounded-full bg-accent-500/20 filter blur-[100px] animate-float-slow animation-delay-2000"></div>
          <div className="absolute top-2/3 right-1/3 w-48 h-48 rounded-full bg-primary-600/10 filter blur-[80px] animate-float-slow animation-delay-1000"></div>
        </div>
        
        <div className="container relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <motion.span 
              className="inline-block px-6 py-2 mb-8 bg-white/10 backdrop-blur-sm text-white text-sm font-medium rounded-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Our Mission & Vision
            </motion.span>
            <motion.h1 
              className="text-5xl md:text-7xl font-display font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-100 to-primary-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              We Build <motion.span 
                className="relative inline-block group"
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <span className="relative z-10 text-white">Digital Presence</span>
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
                <motion.div 
                  className="absolute -bottom-2 left-0 w-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 1 }}
                >
                  <motion.div 
                    className="w-2 h-2 bg-white rounded-full absolute -left-1 -top-1"
                    animate={{ 
                      x: [0, 5, 0, -5, 0],
                      opacity: [0, 1, 0.7, 0.3, 0]
                    }}
                    transition={{ 
                      duration: 2.5, 
                      repeat: Infinity,
                      repeatDelay: 2
                    }}
                  />
                  <motion.div 
                    className="w-2 h-2 bg-white rounded-full absolute -right-1 -top-1"
                    animate={{ 
                      x: [0, -5, 0, 5, 0],
                      opacity: [0, 1, 0.7, 0.3, 0]
                    }}
                    transition={{ 
                      duration: 2.5, 
                      repeat: Infinity,
                      repeatDelay: 2,
                      delay: 0.5 
                    }}
                  />
                </motion.div>
              </motion.span> That Delivers Results
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              We're a forward-thinking team of social media strategists, content creators, and data scientists
              passionate about helping brands thrive in the digital landscape.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Link href="https://calendly.com/riseklix/30min" className="btn-touch-light inline-flex items-center py-4 px-8 rounded-xl text-lg">
                <span className="btn-content font-medium">
                  Get in Touch
                  <svg className="w-5 h-5 ml-2 btn-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </span>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* About Section */}
      <section className="py-32 bg-light relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 bg-noise opacity-[0.02]"></div>
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-br from-primary-100/30 to-primary-300/20 rounded-full filter blur-[100px] opacity-70 -z-10 animate-float-slow"></div>
        <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-gradient-to-tr from-accent-100/30 to-accent-300/20 rounded-full filter blur-[80px] opacity-70 -z-10 animate-float-slow animation-delay-2000"></div>
        
        <div className="container relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-block px-4 py-1 mb-6 rounded-full bg-primary-50 border border-primary-100 text-primary-700 text-sm font-medium">
                Est. 2024
              </div>
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-8 leading-tight">
                Creating <span className="text-primary-600">Impact</span> Through Strategic Social Media
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Riseklix was founded in 2024 with a simple mission: help brands cut through the noise on social media and create content that resonates, engages, and converts.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Born at the intersection of creativity and data science, we emerged when social algorithms were becoming increasingly complex. Our founders—experts in digital marketing, content creation, and AI—recognized that traditional approaches were no longer sufficient in the rapidly evolving digital landscape.
              </p>
              <p className="text-lg text-gray-600 mb-10 leading-relaxed">
                Today, we blend advanced analytics with creative storytelling, using AI-enhanced tools alongside human intuition. This dual approach allows us to identify emerging trends and create content that not only captures attention but drives meaningful business results for our clients.
              </p>
              <div className="flex flex-wrap gap-5">
                <Link href="https://calendly.com/riseklix/30min" className="btn-touch-dark py-4 px-8 rounded-xl text-lg">
                  <span className="btn-content font-medium">
                    Work With Us
                    <svg className="w-5 h-5 ml-2 btn-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </span>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="relative h-[600px] w-full rounded-2xl overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-t from-dark/40 to-transparent z-10"></div>
                <Image
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80"
                  alt="Our innovative workspace"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -top-10 -left-10 w-32 h-32 bg-primary-500/80 backdrop-blur-sm rounded-2xl -z-1 hidden lg:block"></div>
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-accent-500/80 backdrop-blur-sm rounded-2xl -z-1 hidden lg:block"></div>
              
              {/* Stats overlay */}
              <div className="absolute -right-6 bottom-32 bg-white/90 backdrop-blur-sm shadow-xl rounded-2xl p-6 w-64 z-20 hidden lg:block">
                <div className="flex flex-col">
                  <p className="text-gray-600 text-sm font-medium mb-2">Client Retention Rate</p>
                  <p className="text-4xl font-display font-bold text-primary-600 mb-2">94%</p>
                  <div className="w-full h-1 bg-gray-200 rounded-full">
                    <div className="w-[94%] h-full bg-primary-500 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Company History Timeline */}
      <section className="py-32 bg-white relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 bg-noise opacity-[0.02]"></div>
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-br from-primary-100/30 to-primary-300/20 rounded-full filter blur-[100px] opacity-70 -z-10 animate-float-slow"></div>
        <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-gradient-to-tr from-accent-100/30 to-accent-300/20 rounded-full filter blur-[80px] opacity-70 -z-10 animate-float-slow animation-delay-2000"></div>
        
        <div className="container relative">
          <div className="text-center mb-20">
            <div className="inline-block px-4 py-1 mb-6 rounded-full bg-primary-50 border border-primary-100 text-primary-700 text-sm font-medium">
              Our Timeline
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">Our <span className="text-primary-600">Journey</span></h2>
            <p className="max-w-2xl mx-auto text-lg text-gray-600 leading-relaxed">
              From innovative concept to industry disruption
            </p>
          </div>
          
          <div className="history-timeline relative max-w-4xl mx-auto">
            {/* Timeline line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary-100 via-primary-500 to-primary-200 transform -translate-x-1/2 rounded-full overflow-hidden">
              <div className="timeline-progress absolute left-0 top-0 bottom-0 w-full bg-primary-500 opacity-60"></div>
            </div>
            
            <div className="space-y-32">
              {companyHistory.map((milestone, index) => (
                <motion.div 
                  key={milestone.year} 
                  className={`milestone relative ${index % 2 === 0 ? 'text-right lg:ml-auto lg:mr-0' : 'text-left lg:ml-0 lg:mr-auto'} max-w-md`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true, margin: "-100px" }}
                >
                  <div className="milestone-dot absolute left-1/2 top-0 w-10 h-10 bg-white flex items-center justify-center border-4 border-primary-500 rounded-full transform -translate-x-1/2 z-10 shadow-lg">
                    <div className="w-3 h-3 bg-primary-500 rounded-full"></div>
                  </div>
                  <div className={`milestone-content p-6 bg-white rounded-2xl shadow-soft border border-gray-100 mt-12 ${index % 2 === 0 ? 'mr-12 lg:mr-24' : 'ml-12 lg:ml-24'}`}>
                    <div className="inline-block px-3 py-1 mb-2 bg-primary-50 text-primary-700 text-sm font-medium rounded-md">{milestone.year}</div>
                    <h3 className="text-2xl font-display font-bold mb-3">{milestone.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{milestone.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Values Section */}
      <section className="py-32 bg-gray-50 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 bg-noise opacity-[0.02]"></div>
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-br from-primary-100/30 to-primary-300/20 rounded-full filter blur-[100px] opacity-70 -z-10 animate-float-slow"></div>
        <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-gradient-to-tr from-accent-100/30 to-accent-300/20 rounded-full filter blur-[80px] opacity-70 -z-10 animate-float-slow animation-delay-2000"></div>
        
        <div className="container relative">
          <div className="text-center mb-20">
            <div className="inline-block px-4 py-1 mb-6 rounded-full bg-primary-50 border border-primary-100 text-primary-700 text-sm font-medium">
              What Drives Us
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">Our Core <span className="text-primary-600">Values</span></h2>
            <p className="max-w-2xl mx-auto text-lg text-gray-600 leading-relaxed">
              The principles that guide our work, shape our culture, and define our relationships with clients
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {values.map((value, index) => (
              <motion.div 
                key={value.title} 
                className="bg-white p-8 rounded-2xl shadow-soft hover:shadow-soft-lg transition-all duration-300 border border-gray-100 relative group overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary-50 rounded-full -translate-x-10 -translate-y-10 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out"></div>
                <div className="relative z-10">
                  <div className="text-primary-600 p-3 bg-primary-50 rounded-xl inline-block mb-6">
                    <value.icon className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-display font-bold mb-4">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-36 relative overflow-hidden">
        {/* Background gradient - simplified for minimalism */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-800 to-primary-950 z-0"></div>
        
        {/* Subtle noise texture */}
        <div className="absolute inset-0 bg-noise opacity-[0.02] mix-blend-soft-light"></div>
        
        {/* Minimal geometric elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-700/10 rounded-full filter blur-[80px]"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent-500/10 rounded-full filter blur-[90px]"></div>
        
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto backdrop-blur-sm rounded-2xl p-12 md:p-16 relative overflow-hidden border border-white/10">
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-white/0"></div>
            
            <div className="text-center relative z-10">
              <motion.h2 
                className="text-3xl md:text-5xl font-display font-bold mb-6 text-white"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
              >
                Ready to transform your <span className="text-accent-400">digital presence</span>?
              </motion.h2>
              <motion.div 
                className="h-0.5 w-24 bg-accent-500/50 mx-auto mb-6"
                initial={{ width: 0, opacity: 0 }}
                whileInView={{ width: 96, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                viewport={{ once: true }}
              ></motion.div>
              <motion.p 
                className="text-lg md:text-xl text-white/80 mb-10 max-w-xl mx-auto font-light"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                viewport={{ once: true }}
              >
                Partner with Riseklix to create impactful content that converts followers into loyal customers
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                viewport={{ once: true }}
                className="flex flex-wrap justify-center"
              >
                <Link 
                  href="https://calendly.com/riseklix/30min" 
                  className="group relative overflow-hidden"
                >
                  <div className="relative px-8 py-3 bg-transparent border border-white/30 text-white rounded-lg overflow-hidden group-hover:border-accent-400 transition-all duration-300">
                    {/* Button background animation */}
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-accent-500 to-primary-500 translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500 ease-in-out"></div>
                    
                    {/* Button content */}
                    <div className="relative flex items-center justify-center font-medium text-lg z-10">
                      <span className="mr-2">Get in Touch</span>
                      <svg 
                        className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                      </svg>
                    </div>
                  </div>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

// Social media icons component
const SocialIcon = ({ platform }: { platform: string }) => {
  switch(platform.toLowerCase()) {
    case 'instagram':
      return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
        </svg>
      );
    case 'twitter':
      return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
        </svg>
      );
    case 'linkedin':
      return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      );
    case 'tiktok':
      return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
        </svg>
      );
    default:
      return null;
  }
};

// Value icons
const InnovationIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Lightbulb - symbol of ideas and innovation */}
    <path 
      d="M9 18h6"
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M9 22h6"
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M12 2v2"
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M17 3.5l-1.5 1.5"
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M7 3.5l1.5 1.5"
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M22 12h-2"
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M2 12h2"
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M12 6a6 6 0 0 1 4 10.5l-1 1.5h-6l-1-1.5A6 6 0 0 1 12 6z"
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

const CollaborationIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Handshake - universal symbol of partnership and collaboration */}
    <path 
      d="M8 13V17M16 13V17" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M8 13H16" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M12 13V10" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M7 10L9 13L12 10L15 13L17 10" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M5 7C6.10457 7 7 6.10457 7 5C7 3.89543 6.10457 3 5 3C3.89543 3 3 3.89543 3 5C3 6.10457 3.89543 7 5 7Z" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M19 7C20.1046 7 21 6.10457 21 5C21 3.89543 20.1046 3 19 3C17.8954 3 17 3.89543 17 5C17 6.10457 17.8954 7 19 7Z" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

const AuthenticityIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" 
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ExcellenceIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" 
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const DataIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 15V17M12 11V17M16 7V17M7.8 21H16.2C17.8802 21 18.7202 21 19.362 20.673C19.9265 20.3854 20.3854 19.9265 20.673 19.362C21 18.7202 21 17.8802 21 16.2V7.8C21 6.11984 21 5.27976 20.673 4.63803C20.3854 4.07354 19.9265 3.6146 19.362 3.32698C18.7202 3 17.8802 3 16.2 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V16.2C3 17.8802 3.32698 18.7202 3.6146 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21Z" 
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ImpactIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3M21 5c0 1.66-4 3-9 3s-9-1.34-9-3M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" 
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Data
const companyHistory = [
  {
    year: "2024",
    title: "The Vision Begins",
    description: "Riseklix was born from a passion for authentic digital storytelling and data-driven growth strategies. Founded by a team of digital marketing innovators in a modern co-working space."
  },
  {
    year: "2024 Q2",
    title: "First Major Client",
    description: "Partnered with an emerging lifestyle brand to transform their social media presence, resulting in 300% engagement growth and significant conversion improvements within 90 days."
  },
  {
    year: "2024 Q3",
    title: "AI & Content Innovation",
    description: "Pioneered our proprietary AI-enhanced content strategy system, blending cutting-edge technology with human creativity to identify viral trends before they peak."
  },
  {
    year: "2024 Q4",
    title: "Platform Specialization",
    description: "Expanded our expertise across emerging platforms while developing platform-specific strategies that leverage each network's unique algorithm and audience behaviors."
  },
  {
    year: "2025",
    title: "Future Growth",
    description: "Focusing on international expansion and bringing our data-driven approach to brands across global markets while staying at the forefront of social media innovation."
  }
];

const teamMembers = [
  {
    name: "Alex Morgan",
    role: "Founder & CEO",
    bio: "Former social media director at a global agency with a passion for creating content that connects brands with their communities.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
    socialLinks: [
      { platform: "LinkedIn", url: "https://linkedin.com" },
      { platform: "Twitter", url: "https://twitter.com" },
      { platform: "Instagram", url: "https://instagram.com" }
    ]
  },
  {
    name: "Sophia Chen",
    role: "Creative Director",
    bio: "Award-winning content creator with a background in film and photography. Specializes in storytelling that captures attention.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=988&q=80",
    socialLinks: [
      { platform: "Instagram", url: "https://instagram.com" },
      { platform: "TikTok", url: "https://tiktok.com" }
    ]
  },
  {
    name: "Marcus Johnson",
    role: "Head of Strategy",
    bio: "Data analyst turned strategist who combines analytical thinking with creative problem-solving to drive growth for our clients.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    socialLinks: [
      { platform: "LinkedIn", url: "https://linkedin.com" },
      { platform: "Twitter", url: "https://twitter.com" }
    ]
  },
  {
    name: "Zoe Williams",
    role: "TikTok Specialist",
    bio: "Former influencer with over 1M followers and a deep understanding of what makes content go viral on short-form video platforms.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1061&q=80",
    socialLinks: [
      { platform: "TikTok", url: "https://tiktok.com" },
      { platform: "Instagram", url: "https://instagram.com" }
    ]
  },
  {
    name: "Jamal Rodriguez",
    role: "Content Production Lead",
    bio: "Videographer and editor who brings ideas to life with stunning visuals and cutting-edge production techniques.",
    image: "https://images.unsplash.com/photo-1531891437562-4301cf35b7e4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80",
    socialLinks: [
      { platform: "Instagram", url: "https://instagram.com" },
      { platform: "LinkedIn", url: "https://linkedin.com" }
    ]
  },
  {
    name: "Emma Lewis",
    role: "Community Manager",
    bio: "Communication expert who excels at building engaged communities and fostering meaningful conversations around brands.",
    image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    socialLinks: [
      { platform: "LinkedIn", url: "https://linkedin.com" },
      { platform: "Twitter", url: "https://twitter.com" }
    ]
  }
];

const values = [
  {
    title: "Innovation",
    description: "We constantly explore new platforms, formats, and approaches to keep our clients at the cutting edge of social media trends.",
    icon: InnovationIcon
  },
  {
    title: "Collaboration",
    description: "We believe in true partnership with our clients, combining our expertise with their brand knowledge for optimal results.",
    icon: CollaborationIcon
  },
  {
    title: "Authenticity",
    description: "We prioritize genuine connections over gimmicks, creating content that authentically represents brands and resonates with audiences.",
    icon: AuthenticityIcon
  },
  {
    title: "Excellence",
    description: "We hold ourselves to the highest standards in everything we do, from strategy development to content production and reporting.",
    icon: ExcellenceIcon
  },
  {
    title: "Data-Driven",
    description: "We base our decisions on insights and analytics, constantly testing and optimizing to deliver measurable results.",
    icon: DataIcon
  },
  {
    title: "Impact-Focused",
    description: "We measure our success by the tangible business impact we create for our clients through social media growth.",
    icon: ImpactIcon
  }
];