import Link from 'next/link';
import { motion } from 'framer-motion';
import { InstagramIcon, TikTokIcon, TwitterIcon, LinkedInIcon } from '@/components/shared/SocialIcons';

const navigationItems = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

const socialLinks = [
  { name: 'Instagram', href: 'https://instagram.com', icon: 'instagram' },
  { name: 'TikTok', href: 'https://tiktok.com', icon: 'tiktok' },
  { name: 'Twitter', href: 'https://twitter.com', icon: 'twitter' },
  { name: 'LinkedIn', href: 'https://linkedin.com', icon: 'linkedin' },
];

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
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
      staggerChildren: 0.1,
      delayChildren: 0.1,
    }
  }
};

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-b from-dark via-dark/95 to-dark/90 text-white pt-24 pb-12 overflow-hidden backdrop-blur-xl border-t border-white/5">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-dark/80 to-transparent opacity-90"></div>
        <div className="absolute bottom-0 right-0 w-[30rem] h-[30rem] rounded-full bg-primary-600/10 blur-[120px] animate-float-slow"></div>
        <div className="absolute top-40 -left-24 w-[25rem] h-[25rem] rounded-full bg-accent-600/10 blur-[100px] animate-float-slow animation-delay-2000"></div>
        <div className="absolute inset-0 bg-noise opacity-[0.02] mix-blend-soft-light"></div>
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:20px_20px] mix-blend-overlay"></div>
      </div>
      
      <div className="container relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Enhanced Logo and About Section */}
          <motion.div 
            className="lg:col-span-5"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <Link href="/" className="inline-block group">
              <span className="text-4xl font-display font-bold flex items-center relative">
                <span className="text-white group-hover:text-primary-400 transition-colors duration-300">RISE</span>
                <span className="bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent group-hover:from-accent-400 group-hover:to-primary-400 transition-all duration-500">KLIX</span>
                <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-primary-500/0 via-primary-500 to-primary-500/0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              </span>
            </Link>
            <p className="mt-8 text-gray-300/90 max-w-md text-lg leading-relaxed backdrop-blur-sm">
              We help brands create viral content for Instagram and TikTok that drives organic growth and real engagement.
            </p>
            <div className="mt-8 flex items-center space-x-6">
              {socialLinks.map((social) => (
                <motion.a 
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-all duration-300 hover:scale-110 transform relative group"
                  aria-label={social.name}
                  whileHover={{ y: -3 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <span className="sr-only">{social.name}</span>
                  <div className="absolute -inset-2 bg-white/5 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  {social.icon === 'instagram' && <InstagramIcon className="w-6 h-6 relative" />}
                  {social.icon === 'tiktok' && <TikTokIcon className="w-6 h-6 relative" />}
                  {social.icon === 'twitter' && <TwitterIcon className="w-6 h-6 relative" />}
                  {social.icon === 'linkedin' && <LinkedInIcon className="w-6 h-6 relative" />}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links with Enhanced Hover Effects */}
          <motion.div 
            className="lg:col-span-2 md:mt-0"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <h3 className="text-xl font-display font-bold mb-6 text-white relative inline-block">
              Navigate
              <div className="absolute -bottom-1 left-0 w-12 h-0.5 bg-primary-500/50"></div>
            </h3>
            <ul className="space-y-4">
              {navigationItems.map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href}
                    className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-300 inline-flex items-center group"
                  >
                    <span className="relative">
                      {item.name}
                      <span className="absolute left-0 bottom-0 w-full h-0.5 bg-primary-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                    </span>
                    <svg className="w-4 h-4 ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
          
          {/* Services with Enhanced Visual Effects */}
          <motion.div 
            className="lg:col-span-2 md:mt-0"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <h3 className="text-xl font-display font-bold mb-6 text-white relative inline-block">
              Services
              <div className="absolute -bottom-1 left-0 w-12 h-0.5 bg-primary-500/50"></div>
            </h3>
            <ul className="space-y-4">
              {[
                { href: '/services#content-strategy', label: 'Content Strategy' },
                { href: '/services#growth-management', label: 'Growth Management' },
                { href: '/services#analytics', label: 'Analytics & Insights' },
                { href: '/services#community', label: 'Community Building' }
              ].map((service) => (
                <li key={service.label}>
                  <Link 
                    href={service.href} 
                    className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-300 inline-flex items-center group"
                  >
                    <span className="relative">
                      {service.label}
                      <span className="absolute left-0 bottom-0 w-full h-0.5 bg-primary-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                    </span>
                    <svg className="w-4 h-4 ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Enhanced Contact Section */}
          <motion.div 
            className="lg:col-span-3 md:mt-0"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <h3 className="text-xl font-display font-bold mb-6 text-white relative inline-block">
              Get in Touch
              <div className="absolute -bottom-1 left-0 w-12 h-0.5 bg-primary-500/50"></div>
            </h3>
            <ul className="space-y-4 text-gray-300">
              <motion.li 
                className="flex items-start group"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-primary-500/20 rounded-full blur group-hover:bg-primary-500/30 transition-colors duration-300"></div>
                  <svg className="w-5 h-5 text-primary-400 mt-1 mr-3 relative" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <span className="group-hover:text-white transition-colors duration-300">satwik@riseklix.com</span>
              </motion.li>
              {/* ... existing contact items ... */}
            </ul>
            <div className="mt-8">
              <Link 
                href="/contact"
                className="inline-flex items-center px-6 py-3 bg-primary-600/10 hover:bg-primary-600/20 border border-primary-500/20 hover:border-primary-500/40 rounded-xl text-white transition-all duration-300 group relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center">
                  Contact Us
                  <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary-600/0 via-primary-600/10 to-primary-600/0 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Enhanced Newsletter Section */}
        <motion.div 
          className="mt-20 p-8 rounded-2xl bg-white/[0.02] backdrop-blur-lg border border-white/10 relative overflow-hidden group"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary-600/10 via-transparent to-accent-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="grid md:grid-cols-2 gap-8 items-center relative z-10">
            <div>
              <h3 className="text-2xl font-display font-bold mb-2">Stay Updated</h3>
              <p className="text-gray-300">Get the latest social media growth strategies and industry news.</p>
            </div>
            <form className="flex flex-col sm:flex-row gap-3">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-white/5 text-white border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent flex-grow placeholder-gray-400 transition-all duration-300"
                required
              />
              <button 
                type="submit" 
                className="inline-flex items-center px-6 py-3 bg-primary-600 hover:bg-primary-500 rounded-xl text-white transition-all duration-300 group relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center">
                  Subscribe
                  <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary-500/0 via-primary-400/20 to-primary-500/0 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              </button>
            </form>
          </div>
        </motion.div>

        {/* Enhanced Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} RiseKlix Agency. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm text-gray-400">
            {[
              { href: '/privacy', label: 'Privacy Policy' },
              { href: '/terms', label: 'Terms of Service' },
              { href: '/sitemap', label: 'Sitemap' }
            ].map((link) => (
              <Link 
                key={link.label}
                href={link.href} 
                className="hover:text-white transition-colors duration-300 relative group"
              >
                {link.label}
                <span className="absolute left-0 bottom-0 w-full h-0.5 bg-primary-500/50 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </Link>
            ))}
          </div>
        </div>
      </div>
      
      {/* Enhanced Decorative Elements */}
      <div className="absolute -bottom-20 left-0 w-40 h-40 rounded-full bg-primary-500/5 blur-3xl animate-pulse-slow"></div>
      <div className="absolute top-40 right-20 w-60 h-60 rounded-full bg-accent-500/5 blur-3xl animate-float-slow"></div>
    </footer>
  );
};

// Simple social media icons component
const SocialIcon = ({ name, className = "w-6 h-6" }: { name: string, className?: string }) => {
  switch(name) {
    case 'instagram':
      return <InstagramIcon className={className} />;
    case 'tiktok':
      return <TikTokIcon className={className} />;
    case 'twitter':
      return <TwitterIcon className={className} />;
    case 'linkedin':
      return <LinkedInIcon className={className} />;
    default:
      return null;
  }
};

export default Footer;