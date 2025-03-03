import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '@/components/layout/Layout';
import { motion } from 'framer-motion';
import SEO from '@/components/shared/SEO';
import { caseStudies, categories } from '@/data/caseStudies';

// Import platform icons
import { InstagramIcon, TikTokIcon, TwitterIcon, YouTubeIcon } from '@/components/shared/SocialIcons';

export default function Portfolio() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState('All Projects');
  const [filteredCaseStudies, setFilteredCaseStudies] = useState(caseStudies);

  // Filter case studies when category changes
  useEffect(() => {
    if (activeCategory === 'All Projects') {
      setFilteredCaseStudies(caseStudies);
    } else {
      setFilteredCaseStudies(
        caseStudies.filter(study => study.category === activeCategory)
      );
    }
  }, [activeCategory]);

  useEffect(() => {
    // Initialize GSAP animations
    const initializeGSAP = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/dist/ScrollTrigger');
      
      gsap.registerPlugin(ScrollTrigger);
      
      gsap.utils.toArray<HTMLElement>('.case-study').forEach((study, i) => {
        const direction = i % 2 === 0 ? 1 : -1;
        
        gsap.fromTo(
          study,
          { 
            x: 100 * direction, 
            opacity: 0 
          },
          {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: study,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none none"
            },
          }
        );
      });
    };
    
    initializeGSAP();
  }, [filteredCaseStudies]);
  
  return (
    <Layout>
      <SEO 
        title="Our Portfolio | Viral Growth Agency"
        description="Explore our case studies and success stories of brands we've helped grow on Instagram and TikTok."
      />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-dark text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-radial from-primary-600/20 to-dark z-10"></div>
          <div className="absolute inset-0 bg-noise opacity-5 mix-blend-soft-light"></div>
        </div>
        
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1 
              className="text-5xl md:text-7xl font-retro font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Our <span className="text-primary-400">Success</span> Stories
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl text-gray-300 font-modern mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              See how we've helped brands transform their social media presence
              and achieve extraordinary growth.
            </motion.p>
          </div>
          
          <motion.div 
            className="flex flex-wrap justify-center gap-4 mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {categories.map((category, index) => (
              <motion.button 
                key={category}
                className={`px-6 py-2 rounded-full border transition-all duration-300 ${
                  activeCategory === category 
                    ? 'bg-primary-600 border-primary-600 text-white shadow-md' 
                    : 'border-gray-700 text-gray-300 hover:bg-primary-600/10 hover:border-primary-600/50 hover:text-white'
                }`}
                onClick={() => setActiveCategory(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  transition: { delay: 0.5 + (index * 0.1) }
                }}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* Case Studies */}
      <section className="py-20 bg-light" ref={containerRef}>
        <div className="container">
          {filteredCaseStudies.length > 0 ? (
            filteredCaseStudies.map((study, index) => (
              <div 
                key={study.slug} 
                className={`case-study mb-32 last:mb-0 ${
                  index % 2 === 0 ? '' : 'md:flex-row-reverse'
                }`}
              >
                <div className="flex flex-col md:flex-row gap-10 items-center">
                  {/* Image Section */}
                  <div className="md:w-1/2 relative">
                    <div className="relative w-full aspect-video overflow-hidden rounded-xl shadow-2xl group">
                      <Image
                        src={study.image}
                        alt={study.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-primary-600/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Link 
                            href={`/case-study/${study.slug}`}
                            className="px-6 py-3 bg-white text-primary-600 rounded-lg font-bold hover:bg-primary-50 transition-colors shadow-lg"
                          >
                            View Case Study
                          </Link>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Content Section */}
                  <div className="md:w-1/2">
                    <span className="text-sm font-medium text-primary-600 uppercase tracking-wider">
                      {study.category}
                    </span>
                    <h2 className="text-3xl md:text-4xl font-retro font-bold mt-2 mb-4">
                      {study.title}
                    </h2>
                    <p className="text-lg text-gray-600 font-modern mb-6">
                      {study.description}
                    </p>
                    
                    {/* Results */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                      {study.results.map((result) => (
                        <div key={result.label} className="text-center p-4 rounded-lg bg-gray-50">
                          <div className="text-3xl font-display font-bold text-primary-600">
                            {result.value}
                          </div>
                          <div className="text-sm text-gray-600">{result.label}</div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-8">
                      {study.tags.map((tag) => (
                        <span key={tag} className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <Link 
                      href={`/case-study/${study.slug}`}
                      className="btn-primary inline-flex items-center"
                    >
                      View Full Case Study
                      <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-20">
              <svg className="w-16 h-16 mx-auto text-gray-300 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <h3 className="text-2xl font-display font-bold mb-2">No case studies found</h3>
              <p className="text-gray-600 mb-6">We don't have any case studies in this category yet. Please check back later or select another category.</p>
              <button 
                onClick={() => setActiveCategory('All Projects')}
                className="btn-primary"
              >
                View All Projects
              </button>
            </div>
          )}
        </div>
      </section>
      
      {/* Featured Platforms Section */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-retro font-bold text-center mb-16">
              Platforms We <span className="text-primary-600">Specialize</span> In
            </h2>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {platforms.map((platform, index) => (
              <motion.div 
                key={platform.name} 
                className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5, backgroundColor: "#f8fafc" }}
              >
                <motion.div 
                  className="w-16 h-16 mx-auto mb-6 text-primary-600"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <platform.icon className="w-full h-full" />
                </motion.div>
                <h3 className="text-xl font-retro font-bold mb-3">{platform.name}</h3>
                <p className="text-gray-600 font-modern">{platform.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-6">
              What Our <span className="text-primary-600">Clients</span> Say
            </h2>
            <p className="text-gray-600 text-center max-w-2xl mx-auto mb-16">
              Don't just take our word for it. Here's what the brands we've worked with have to say about our partnership.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div 
                key={testimonial.name} 
                className="bg-white border border-gray-100 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                {/* Quote mark */}
                <div className="absolute -top-4 -left-4 text-primary-200">
                  <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>
                
                <p className="text-gray-600 mb-6 relative z-10 italic">"{testimonial.quote}"</p>
                
                <div className="flex items-center">
                  <div className="w-14 h-14 rounded-full overflow-hidden mr-4 border-2 border-primary-100">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={56}
                      height={56}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">{testimonial.name}</h4>
                    <p className="text-sm text-primary-600">{testimonial.role}, {testimonial.company}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-primary-600 text-white relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-700 to-primary-500"></div>
          <div className="absolute inset-0 bg-noise opacity-5 mix-blend-soft-light"></div>
          
          {/* Animated shapes */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary-400 rounded-full opacity-20 animate-pulse-slow"></div>
          <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-primary-400 rounded-full opacity-20 animate-float-slow"></div>
        </div>
        
        <div className="container relative z-10">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Ready to be our next success story?
            </h2>
            <p className="text-xl text-primary-100 mb-10">
              Let's create a growth strategy tailored to your brand and audience
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link 
                href="/contact"
                className="inline-block px-8 py-4 bg-white text-primary-600 font-display font-bold rounded-lg hover:bg-primary-50 transition-colors duration-300 shadow-lg"
              >
                Let's Talk Strategy
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}

// Data for platforms and testimonials sections
const platforms = [
  {
    name: "Instagram",
    icon: InstagramIcon,
    description: "We help brands create engaging feed posts, stories, and reels that drive follower growth and high engagement rates."
  },
  {
    name: "TikTok",
    icon: TikTokIcon,
    description: "Our TikTok strategies focus on trend-driven, authentic content that resonates with Gen Z and Millennial audiences."
  },
  {
    name: "Twitter",
    icon: TwitterIcon,
    description: "We craft punchy, relevant content that drives conversation and positions brands as thought leaders in their space."
  },
  {
    name: "YouTube",
    icon: YouTubeIcon,
    description: "From shorts to long-form content, we develop YouTube strategies that build loyal subscriber bases."
  }
];

const testimonials = [
  {
    quote: "The ViralGrowth team transformed our social presence completely. What used to be a chore for our marketing team is now our most effective customer acquisition channel.",
    name: "Sarah Johnson",
    role: "CMO",
    company: "FitLife",
    image: "/images/testimonials/testimonial-1.jpg"
  },
  {
    quote: "Their understanding of TikTok trends and algorithm is unmatched. We went from zero presence to being featured on TikTok's discover page in just two months.",
    name: "Michael Chen",
    role: "Founder",
    company: "StyleHaus",
    image: "/images/testimonials/testimonial-2.jpg"
  },
  {
    quote: "Working with ViralGrowth has been a game-changer for our brand. Their data-driven approach combined with creative content ideas helped us connect with our audience in ways we never thought possible.",
    name: "Emily Rodriguez",
    role: "Digital Director",
    company: "TastyBites",
    image: "/images/testimonials/testimonial-3.jpg"
  },
  {
    quote: "In just six months, our LinkedIn engagement increased by 320%. Their B2B social strategy completely changed how we approach lead generation.",
    name: "David Thompson",
    role: "VP of Marketing",
    company: "TechNova",
    image: "/images/testimonials/testimonial-4.jpg"
  }
];