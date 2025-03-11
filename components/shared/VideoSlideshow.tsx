import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';

interface VideoSlideshowProps {
  videos: string[];
}

const VideoSlideshow: React.FC<VideoSlideshowProps> = ({ videos }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | undefined>(undefined);

  // Get previous and next indices
  const prevIndex = (currentIndex - 1 + videos.length) % videos.length;
  const nextIndex = (currentIndex + 1) % videos.length;

  // Auto-advance to next video
  useEffect(() => {
    if (isPlaying && !isHovering) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % videos.length);
      }, 5000); // Change video every 5 seconds
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, videos.length, isHovering]);

  // Play/pause current video when isPlaying state changes
  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play().catch((error) =>
          console.error('Error playing video:', error)
        );
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying, currentIndex]);

  // Handle video end
  const handleVideoEnd = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % videos.length);
  };

  // Navigate to specific slide
  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Go to next video
  const nextVideo = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % videos.length);
  };

  // Go to previous video
  const prevVideo = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + videos.length) % videos.length);
  };

  // Toggle play/pause
  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  // Mouse wheel navigation
  const handleWheel = (e: React.WheelEvent) => {
    if (e.deltaY > 0) {
      nextVideo();
    } else {
      prevVideo();
    }
  };

  return (
    <div 
      className="w-full h-full min-h-[250px] relative overflow-hidden rounded-xl bg-black/5 backdrop-blur-sm shadow-2xl border border-bone-100/30"
      onWheel={handleWheel}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      style={{ height: '100%', aspectRatio: '16/9' }}
    >
      {/* Interactive backdrop */}
      <div className="absolute inset-0 bg-noise opacity-10 mix-blend-overlay pointer-events-none"></div>
      <div className="absolute inset-0 bg-grid-dark opacity-10 pointer-events-none"></div>
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary-500/10 rounded-full filter blur-2xl animate-pulse-slow"></div>
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-accent-500/10 rounded-full filter blur-2xl animate-pulse-slow animation-delay-1000"></div>
      
      {/* Side video containers with transition effects */}
      <div className="absolute inset-0 flex items-stretch justify-between h-full">
        {/* Previous video - Left side */}
        <div className="h-full w-1/6 relative">
          <motion.div 
            className="absolute inset-0 overflow-hidden rounded-r-lg opacity-60 filter brightness-50 blur-[1px] transition-all duration-300 h-full"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 0.6, x: 0 }}
            whileHover={{ 
              opacity: 0.8,
              filter: "brightness(0.7) blur(0px)"
            }}
          >
            <video
              src={videos[prevIndex]}
              className="h-full w-full object-cover"
              autoPlay
              loop
              muted
              playsInline
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent pointer-events-none"></div>
            
            {/* Left side navigation arrow */}
            <motion.button
              onClick={prevVideo}
              className="absolute inset-0 flex items-center justify-center cursor-pointer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Previous video"
            >
              <div className="flex flex-col items-center">
                <svg className="w-8 h-8 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span className="text-xs text-white/80 font-medium mt-1 hidden md:block">Previous</span>
              </div>
            </motion.button>
          </motion.div>
        </div>

        {/* Main video - Center */}
        <div className="h-full w-4/6 px-2 relative z-10 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="w-full h-full relative rounded-lg overflow-hidden shadow-2xl border border-bone-100/20"
              style={{ height: '100%', minHeight: '200px' }}
            >
              <video
                ref={videoRef}
                src={videos[currentIndex]}
                className="w-full h-full object-cover"
                autoPlay
                muted
                playsInline
                onEnded={handleVideoEnd}
              />

              {/* Video overlay with gradient */}
              <div className="absolute inset-0 bg-gradient-to-b from-gray-900/10 via-transparent to-primary-900/60"></div>

              {/* Main video controls and info */}
              <div className="absolute inset-x-0 bottom-0 py-3 px-4 bg-gradient-to-t from-black/60 to-transparent backdrop-blur-[2px]">
                <div className="flex justify-between items-center">
                  <motion.div 
                    className="text-white text-xs md:text-sm font-medium bg-primary-900/40 backdrop-blur-sm px-3 py-1.5 rounded-lg"
                    whileHover={{ scale: 1.05, backgroundColor: "rgba(79, 70, 229, 0.6)" }}
                  >
                    {videos[currentIndex].split('/').pop()?.replace('.mp4', '').replace('.MP4', '')}
                  </motion.div>
                  
                  <div className="flex items-center space-x-3">
                    {/* Video progress indicator */}
                    <div className="hidden md:block w-24 h-1 bg-white/20 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-white rounded-full"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        key={currentIndex}
                        transition={{ duration: 5, ease: "linear" }}
                      />
                    </div>

                    {/* Thumbnail indicators */}
                    <div className="flex space-x-1.5">
                      {videos.map((_, index) => (
                        <motion.button
                          key={index}
                          onClick={() => goToSlide(index)}
                          className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                            index === currentIndex ? 'bg-white scale-125' : 'bg-white/40'
                          }`}
                          whileHover={{ scale: 1.5, backgroundColor: index === currentIndex ? "white" : "rgba(255, 255, 255, 0.6)" }}
                          aria-label={`Go to slide ${index + 1}`}
                        />
                      ))}
                    </div>

                    {/* Play/pause button */}
                    <motion.button
                      onClick={togglePlayPause}
                      className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-900/80 to-primary-700/80 text-white flex items-center justify-center backdrop-blur-sm"
                      whileHover={{ scale: 1.1, boxShadow: "0 0 12px rgba(79, 70, 229, 0.5)" }}
                      whileTap={{ scale: 0.9 }}
                      aria-label={isPlaying ? 'Pause' : 'Play'}
                    >
                      {isPlaying ? (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 9v6m4-6v6" />
                        </svg>
                      ) : (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        </svg>
                      )}
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Next video - Right side */}
        <div className="h-full w-1/6 relative">
          <motion.div 
            className="absolute inset-0 overflow-hidden rounded-l-lg opacity-60 filter brightness-50 blur-[1px] transition-all duration-300 h-full"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 0.6, x: 0 }}
            whileHover={{ 
              opacity: 0.8,
              filter: "brightness(0.7) blur(0px)"
            }}
          >
            <video
              src={videos[nextIndex]}
              className="h-full w-full object-cover"
              autoPlay
              loop
              muted
              playsInline
            />
            <div className="absolute inset-0 bg-gradient-to-l from-black/80 to-transparent pointer-events-none"></div>
            
            {/* Right side navigation arrow */}
            <motion.button
              onClick={nextVideo}
              className="absolute inset-0 flex items-center justify-center cursor-pointer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Next video"
            >
              <div className="flex flex-col items-center">
                <svg className="w-8 h-8 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <span className="text-xs text-white/80 font-medium mt-1 hidden md:block">Next</span>
              </div>
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Hint overlay - briefly shows on initial load */}
      <AnimatePresence>
        {currentIndex === 0 && (
          <motion.div 
            className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm pointer-events-none z-20"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 2, duration: 1 }}
          >
            <motion.div 
              className="text-white text-center p-6 rounded-xl"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <div className="flex space-x-10 items-center">
                <div className="flex flex-col items-center">
                  <svg className="w-6 h-6 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                  </svg>
                  <span className="text-xs font-medium opacity-80">Previous</span>
                </div>
                
                <div className="flex flex-col items-center">
                  <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-xs font-medium opacity-80">Auto-advance every 5s</span>
                </div>
                
                <div className="flex flex-col items-center">
                  <svg className="w-6 h-6 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                  </svg>
                  <span className="text-xs font-medium opacity-80">Next</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VideoSlideshow;