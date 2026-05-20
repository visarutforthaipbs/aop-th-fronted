"use client";

import { motion } from "framer-motion";

export const SkeletonSOP = ({ className = "" }) => {
  return (
    <div className={`relative overflow-hidden bg-gray-100 rounded-3xl ${className}`}>
      <motion.div
        className="absolute inset-0 z-10"
        initial={{ x: "-100%" }}
        animate={{ x: "100%" }}
        transition={{
          repeat: Infinity,
          duration: 1.5,
          ease: "linear",
        }}
        style={{
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
        }}
      />
      {/* Hand-drawn motif overlay (subtle) */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: "url('/pattern/pattern-green.svg')", backgroundSize: '100px' }}></div>
    </div>
  );
};

export const CardSkeleton = () => (
  <div className="space-y-4">
    <SkeletonSOP className="aspect-video w-full" />
    <SkeletonSOP className="h-6 w-3/4 rounded-full" />
    <SkeletonSOP className="h-4 w-1/2 rounded-full" />
  </div>
);

export const ArticleSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {[...Array(6)].map((_, i) => (
      <CardSkeleton key={i} />
    ))}
  </div>
);
