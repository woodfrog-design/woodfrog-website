'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PresentationVideoProps {
  src?: string;
  poster?: string;
  className?: string;
}

export const PresentationVideo: React.FC<PresentationVideoProps> = ({ 
  src, 
  poster,
  className = "" 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
    }
  }, []);

  return (
    <div className={`relative w-full aspect-video rounded-2xl overflow-hidden group ${className}`}>
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#c9a961]/10 to-[#5eead4]/10 blur-3xl -z-10" />
      
      {/* Glass Frame */}
      <div className="absolute inset-0 border border-white/10 rounded-2xl z-20 pointer-events-none" />
      
      {/* Video Element */}
      <AnimatePresence mode="wait">
        {src ? (
          <motion.video
            ref={videoRef}
            key={src}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: isLoaded ? 1 : 0, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            onLoadedData={() => setIsLoaded(true)}
            onError={() => setError(true)}
            className="w-full h-full object-cover"
            src={src}
            poster={poster}
            autoPlay
            loop
            muted
            playsInline
          />
        ) : (
          <div className="w-full h-full bg-[#12161f] flex items-center justify-center relative overflow-hidden">
            {/* Placeholder Animated Gradient */}
            <motion.div 
              animate={{ 
                background: [
                  'linear-gradient(45deg, #12161f, #1a2030)',
                  'linear-gradient(45deg, #1a2030, #12161f)'
                ]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0"
            />
            <div className="z-10 flex flex-col items-center gap-4 text-center p-8">
              <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center">
                <motion.div 
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-8 h-8 rounded-full bg-[#5eead4]/20"
                />
              </div>
              <div>
                <h4 className="text-[#5eead4] font-mono text-xs uppercase tracking-widest mb-1">Visual Asset</h4>
                <p className="text-white/40 text-[10px] font-mono whitespace-pre-wrap uppercase">Cinematic Animation Placeholder</p>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Loading Overlay */}
      <AnimatePresence>
        {!isLoaded && src && !error && (
          <motion.div 
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-[#0a0d14] z-10 flex items-center justify-center"
          >
            <div className="w-8 h-8 border-2 border-[#5eead4]/20 border-t-[#5eead4] rounded-full animate-spin" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error State */}
      {error && (
        <div className="absolute inset-0 bg-red-900/20 flex items-center justify-center">
          <span className="text-red-400 font-mono text-[10px]">VIDEO_LOAD_ERROR</span>
        </div>
      )}

      {/* Overlay Effects */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0d14]/40 to-transparent pointer-events-none z-10" />
      <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.5)] pointer-events-none z-10" />
    </div>
  );
};
