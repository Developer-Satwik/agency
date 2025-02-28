import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '@/components/layout/Layout';
import { motion } from 'framer-motion';

// Import case studies data from the portfolio page
// In a real implementation, this would likely be fetched from an API or CMS
import { caseStudies } from '@/data/caseStudies';

export default function CaseStudy() {
  const router = useRouter();
  const { slug } = router.query;
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Find the case study that matches the slug
  const caseStudy = caseStudies.find(study => study.slug === slug);
  
  // GSAP animations
  useEffect(() => {
    if (!caseStudy) return;
    
    const initializeGSAP = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/dist/ScrollTrigger');
      
      gsap.registerPlugin(ScrollTrigger);
      
      // Animate content sections
      gsap.utils.toArray<HTMLElement>('.animate-section').forEach((section, i) => {
        gsap.fromTo(
          section,
          { 
            y: 50, 
            opacity: 0 
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              toggleActions: "play none none none"
            },
            delay: i * 0.1
          }
        );
      });
    };
    
    initializeGSAP();
  }, [caseStudy]);
  
  // Handle case when the case study is not found
  if (!caseStudy && typeof slug === 'string') {
    return (
      <Layout>
        <Head>
          <title>Case Study Not Found | Viral Growth Agency</title>
          <meta name="description" content="The requested case study could not be found." />
        </Head>
        
        <section className="pt-40 pb-20">
          <div className="container text-center">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">Case Study Not Found</h1>
            <p className="text-xl text-gray-600 mb-10">
              We couldn't find the case study you're looking for.
            </p>
            <Link href="/portfolio" className="btn-primary">
              Return to Portfolio
            </Link>
          </div>
        </section>
      </Layout>
    );
  }
  
  // Show loading state while waiting for case study data
  if (!caseStudy) {
    return (
      <Layout>
        <div className="pt-40 pb-20 flex justify-center items-center min-h-[50vh]">
          <div className="animate-pulse flex flex-col items-center">
            <div className="w-20 h-20 bg-primary-200 rounded-full mb-4"></div>
            <div className="h-8 bg-gray-200 rounded w-64 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-40"></div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Head>
        <title>{caseStudy.title} | Viral Growth Agency</title>
        <meta name="description" content={caseStudy.description} />
      </Head>
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-dark text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-radial from-primary-600/20 to-dark z-10"></div>
          <div className="absolute inset-0 bg-noise opacity-5 mix-blend-soft-light"></div>
        </div>
        
        <div className="container relative z-10">
          <Link 
            href="/portfolio"
            className="inline-flex items-center text-gray-300 hover:text-white mb-8 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Portfolio
          </Link>
          
          <motion.span 
            className="inline-block text-sm font-medium text-primary-400 uppercase tracking-wider mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {caseStudy.category}
          </motion.span>
          
          <motion.h1 
            className="text-4xl md:text-6xl font-display font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {caseStudy.title}
          </motion.h1>
          
          <motion.div 
            className="flex flex-wrap gap-3 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {caseStudy.tags.map((tag) => (
              <span key={tag} className="px-3 py-1 bg-white/10 rounded-full text-sm text-white">
                {tag}
              </span>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* Main Content */}
      <section className="py-20 bg-light" ref={containerRef}>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content Column */}
            <div className="lg:col-span-2 space-y-12">
              {/* Featured Image/Video */}
              <div className="animate-section rounded-xl overflow-hidden shadow-lg relative aspect-video">
                <Image
                  src={caseStudy.image}
                  alt={caseStudy.title}
                  fill
                  className="object-cover"
                />
                
                {caseStudy.videoUrl && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button 
                      className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-primary-600 shadow-lg hover:scale-110 transition-transform duration-300"
                      aria-label="Play video"
                    >
                      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
              
              {/* Overview */}
              <div className="animate-section">
                <h2 className="text-3xl font-display font-bold mb-6">Overview</h2>
                <p className="text-lg text-gray-700 mb-6">
                  {caseStudy.description}
                </p>
                <p className="text-lg text-gray-700">
                  In this case study, we'll explore how our team developed a comprehensive strategy that helped {caseStudy.title.split(':')[0]} 
                  achieve extraordinary growth in their social media presence and business results.
                </p>
              </div>
              
              {/* Challenge */}
              <div className="animate-section">
                <h2 className="text-3xl font-display font-bold mb-6">The Challenge</h2>
                <p className="text-lg text-gray-700 mb-6">
                  When {caseStudy.title.split(':')[0]} approached us, they were facing several challenges:
                </p>
                <ul className="list-disc pl-6 space-y-3 text-lg text-gray-700">
                  <li>Limited social media presence with minimal engagement</li>
                  <li>Difficulty translating their unique value proposition into compelling content</li>
                  <li>Stronger competitors dominating their category on key platforms</li>
                  <li>Need for rapid growth without compromising brand integrity</li>
                </ul>
              </div>
              
              {/* Strategy */}
              <div className="animate-section">
                <h2 className="text-3xl font-display font-bold mb-6">Our Strategy</h2>
                <p className="text-lg text-gray-700 mb-6">
                  We developed a multi-faceted approach tailored specifically to {caseStudy.title.split(':')[0]}'s brand and audience:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {strategies.map((strategy, index) => (
                    <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                      <div className="text-primary-600 mb-3">
                        <strategy.icon className="w-8 h-8" />
                      </div>
                      <h3 className="text-xl font-bold mb-2">{strategy.title}</h3>
                      <p className="text-gray-600">{strategy.description}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Execution */}
              <div className="animate-section">
                <h2 className="text-3xl font-display font-bold mb-6">Execution</h2>
                <p className="text-lg text-gray-700 mb-6">
                  Our team worked closely with {caseStudy.title.split(':')[0]} to implement a coordinated content strategy across multiple platforms:
                </p>
                
                <div className="space-y-8">
                  {executionSteps.map((step, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex-shrink-0 w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                        <p className="text-gray-700">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Gallery */}
              <div className="animate-section">
                <h2 className="text-3xl font-display font-bold mb-6">Content Showcase</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <div key={index} className="aspect-square rounded-lg overflow-hidden relative group">
                      <Image
                        src={`https://images.unsplash.com/photo-${1550000000 + index * 10000}?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80`}
                        alt={`Content example ${index + 1}`}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-dark/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                        <span className="text-white text-sm font-medium">Content {index + 1}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="space-y-8">
              {/* Results */}
              <div className="bg-white p-6 rounded-xl shadow-lg animate-section">
                <h3 className="text-2xl font-display font-bold mb-4">Results</h3>
                <div className="space-y-4">
                  {caseStudy.results.map((result) => (
                    <div key={result.label} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                      <div className="text-3xl font-display font-bold text-primary-600">
                        {result.value}
                      </div>
                      <div className="text-gray-500">{result.label}</div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Client Info */}
              <div className="bg-white p-6 rounded-xl shadow-lg animate-section">
                <h3 className="text-2xl font-display font-bold mb-4">Client</h3>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gray-200 mr-3"></div>
                  <div>
                    <div className="font-bold">{caseStudy.title.split(':')[0]}</div>
                    <div className="text-gray-500">{caseStudy.category}</div>
                  </div>
                </div>
                <div className="border-t border-gray-100 pt-4">
                  <h4 className="font-bold mb-2">Services Provided</h4>
                  <ul className="space-y-1 text-gray-600">
                    {caseStudy.tags.map((tag) => (
                      <li key={tag} className="flex items-center">
                        <svg className="w-4 h-4 text-primary-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              {/* Testimonial */}
              <div className="bg-primary-50 p-6 rounded-xl shadow-lg relative animate-section">
                <div className="absolute -top-4 -left-2 text-primary-200">
                  <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>
                <div className="pt-6">
                  <p className="text-gray-700 italic mb-4 relative z-10">
                    "Working with ViralGrowth has been a game-changer for our brand. Their strategic approach and creative execution helped us achieve results we didn't think were possible."
                  </p>
                  <div className="flex items-center">
                    <div className="font-bold">{getTestimonialName(caseStudy.title.split(':')[0])}</div>
                    <span className="mx-2">—</span>
                    <div className="text-gray-500">Marketing Director</div>
                  </div>
                </div>
              </div>
              
              {/* CTA */}
              <div className="bg-dark text-white p-8 rounded-xl shadow-lg animate-section">
                <h3 className="text-2xl font-display font-bold mb-4">Ready for similar results?</h3>
                <p className="text-gray-300 mb-6">
                  Let's discuss how we can help your brand achieve remarkable growth on social media.
                </p>
                <Link href="/contact" className="btn-primary w-full block text-center">
                  Get in Touch
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Related Case Studies */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <h2 className="text-3xl font-display font-bold mb-12 text-center">
            Explore More <span className="text-primary-600">Success Stories</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {caseStudies
              .filter(study => study.slug !== caseStudy.slug)
              .slice(0, 3)
              .map((study) => (
                <Link 
                  key={study.slug} 
                  href={`/case-study/${study.slug}`}
                  className="group block"
                >
                  <div className="relative h-64 rounded-t-xl overflow-hidden">
                    <Image
                      src={study.image}
                      alt={study.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark/70 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <span className="text-sm font-medium text-primary-300 uppercase tracking-wider block mb-2">
                        {study.category}
                      </span>
                      <h3 className="text-xl font-display font-bold text-white group-hover:text-primary-300 transition-colors">
                        {study.title.split(':')[0]}
                      </h3>
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-b-xl shadow-md">
                    <div className="flex justify-between items-center">
                      <div className="text-primary-600 font-bold">View Case Study</div>
                      <svg className="w-5 h-5 text-primary-600 transform group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}

// Helper function to generate a testimonial name based on the case study title
function getTestimonialName(brand: string) {
  const names = [
    "Alex Thompson",
    "Sophia Chen",
    "Michael Rodriguez",
    "Emma Wilson",
    "James Davis"
  ];
  
  // Use a deterministic approach to select a name based on the brand name
  const index = brand.charCodeAt(0) % names.length;
  return names[index];
}

// Strategy icons
const ContentIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const AnalyticsIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const CommunityIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

const TrendingIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
);

// Strategy data
const strategies = [
  {
    title: "Content Strategy",
    description: "We developed a content calendar focused on high-engagement formats and trend-driven topics.",
    icon: ContentIcon
  },
  {
    title: "Data-Driven Approach",
    description: "Continuous analysis of performance metrics allowed us to optimize content in real-time.",
    icon: AnalyticsIcon
  },
  {
    title: "Community Building",
    description: "We fostered authentic connections with followers through consistent engagement and conversation.",
    icon: CommunityIcon
  },
  {
    title: "Trend Capitalization",
    description: "Our team identified and leveraged emerging trends relevant to the brand's audience.",
    icon: TrendingIcon
  }
];

// Execution steps
const executionSteps = [
  {
    title: "Platform Strategy",
    description: "We identified the primary platforms for content distribution based on audience demographics and behavior."
  },
  {
    title: "Content Production",
    description: "Our creative team produced high-quality, platform-optimized content at scale, including photos, videos, and graphics."
  },
  {
    title: "Strategic Posting",
    description: "We implemented a data-backed posting schedule to maximize reach and engagement across all platforms."
  },
  {
    title: "Community Management",
    description: "Proactive engagement with followers built a loyal community and increased organic reach through positive sentiment."
  },
  {
    title: "Performance Tracking",
    description: "Detailed analytics dashboards monitored all KPIs in real-time, allowing for agile optimization."
  }
]; 