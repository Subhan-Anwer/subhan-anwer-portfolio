"use client";

import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { FaHome } from "react-icons/fa";
import { Poppins } from "next/font/google";
import { StarsBackground } from "@/components/ui/stars-background";
import { ShootingStars } from "@/components/ui/shooting-stars";
import "@/app/globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "400", "700", "900"],
});

export default function NotFound() {
  const containerRef = useRef<HTMLBodyElement>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for 3D and magnetic effects
  const smoothMouseX = useSpring(mouseX, { damping: 50, stiffness: 400 });
  const smoothMouseY = useSpring(mouseY, { damping: 50, stiffness: 400 });

  // Map mouse position to 3D rotation (-15deg to +15deg)
  const rotateX = useTransform(smoothMouseY, [-500, 500], [15, -15]);
  const rotateY = useTransform(smoothMouseX, [-500, 500], [-15, 15]);

  // Map mouse position to subtle movement of the text (magnetic pull)
  const textX = useTransform(smoothMouseX, [-500, 500], [-30, 30]);
  const textY = useTransform(smoothMouseY, [-500, 500], [-30, 30]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      // Calculate from center
      const x = clientX - innerWidth / 2;
      const y = clientY - innerHeight / 2;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <html lang="en" className={poppins.className}>
      <body 
        ref={containerRef}
        className="relative min-h-screen bg-[#000000] overflow-hidden flex flex-col items-center justify-center text-white m-0 p-0 antialiased z-0"
      >
        {/* Aceternity UI Space Background Components */}
        <StarsBackground starDensity={0.0009} allStarsTwinkle={true} twinkleProbability={0.8} />
        <ShootingStars trailColor="#766c77" starColor="#ffffff" minSpeed={15} maxSpeed={35} minDelay={400} maxDelay={1200} />

        {/* SVG Noise Filter for Banding Prevention */}
        <svg
          className="pointer-events-none fixed isolate z-50 w-full h-full opacity-[0.13] mix-blend-soft-light"
          style={{ top: 0, left: 0 }}
        >
          <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>

        {/* Nebula-like Glowing Gradient Orbs */}
        <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none overflow-hidden">
          {/* Central Deep Purple Glow */}
          {/* <div className="absolute w-[70vw] h-[70vw] max-w-[800px] max-h-[800px] bg-[#766c77] rounded-full mix-blend-screen opacity-[0.25] blur-[100px]" /> */}
          
          {/* Top Left Deep Purple Glow */}
          <div className="absolute top-[-20%] left-[-18%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-[#432f45] rounded-full mix-blend-screen opacity-[0.5] blur-[130px]" />
          
          {/* Bottom Right Deep Purple Glow */}
          <div className="absolute bottom-[-55%] right-[-20%] w-[60vw] h-[60vw] max-w-[700px] max-h-[700px] bg-[#766c77] rounded-full mix-blend-screen opacity-[0.20] blur-[130px]" />
        </div>

        {/* 3D Container for Content */}
        <motion.div 
          className="z-10 flex flex-col items-center px-6 w-full max-w-4xl"
          style={{
            rotateX,
            rotateY,
            perspective: 1200,
          }}
        >
          {/* Magnetic 404 Text */}
          <motion.div
            style={{ x: textX, y: textY }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative select-none"
          >
            <h1
              className="text-[7.5rem] sm:text-[10.5rem] md:text-[13.5rem] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-[#766c77] drop-shadow-2xl"
            >
              404
            </h1>
          </motion.div>

          {/* Proper Typographic Hierarchy */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="mt-2 text-center"
            style={{ translateZ: 50 }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 tracking-wide text-white/90">
              Lost in the Void
            </h2>
            <p className="text-[#a19ba2] text-base md:text-lg max-w-md mx-auto leading-relaxed">
              The page you're looking for doesn't exist in this coordinate space.
              Let's navigate back to familiar territory.
            </p>
          </motion.div>

          {/* Primary Action Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-10"
            style={{ translateZ: 80 }}
          >
            <Link
              href="/"
              className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#050505] overflow-hidden rounded-full font-medium transition-all duration-300 border border-[#766c77]/30 hover:border-[#766c77]/80 hover:bg-[#766c77]/10"
            >
              <FaHome className="text-xl text-[#766c77] group-hover:text-white transition-colors" />
              <span className="text-white/90 group-hover:text-white transition-colors tracking-wide">
                Return to Portfolio
              </span>
            </Link>
          </motion.div>
        </motion.div>
      </body>
    </html>
  );
}
