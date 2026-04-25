"use client";
import { client } from "@/sanity/lib/client";
import {
  animate,
  useMotionTemplate,
  motion,
  useMotionValue,
  AnimatePresence,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { FeaturedProjects } from "../../sanity.types";
import { imageUrl } from "@/app/lib/imageUrl";

const COLORS_TOP = ["#1367C6", "#13FFAA", "#CE84CF", "#DD335C"];

const Portfolio = () => {
  const [featuredProjects, setFeaturedProjects] = useState<FeaturedProjects[]>(
    [],
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projects = await client.fetch(
          `*[_type == "featuredProjects"] | order(serialOrder asc)`,
        );
        setFeaturedProjects(projects);
      } catch (error) {
        console.log("Error fetching featured projects:", error);
      }
    };
    fetchProjects();
  }, []);

  const color = useMotionValue(COLORS_TOP[0]);
  useEffect(() => {
    animate(color, COLORS_TOP, {
      ease: "easeInOut",
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror",
    });
  }, []);

  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #0a0a0a 50%, ${color})`;

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying && featuredProjects.length > 0) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % featuredProjects.length);
      }, 5000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isAutoPlaying, featuredProjects.length]);

  const goToNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % featuredProjects.length);
  };

  const goToPrev = () => {
    setDirection(-1);
    setCurrentIndex(
      (prev) => (prev - 1 + featuredProjects.length) % featuredProjects.length,
    );
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const selectedProject = featuredProjects[currentIndex];

  // Animation variants for slide transitions
  const slideVariants = {
    hiddenRight: { opacity: 0, x: 200, rotateY: 90 },
    hiddenLeft: { opacity: 0, x: -200, rotateY: -90 },
    visible: { opacity: 1, x: 0, rotateY: 0 },
    exit: { opacity: 0, scale: 0.8, rotateY: 90 },
  };

  if (!selectedProject) {
    return <div>Loading...</div>; // Or a proper loading state
  }

  return (
    <motion.section
      style={{ backgroundImage }}
      id="portfolio"
      className="py-20 text-white relative overflow-hidden"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Project Info Panel */}
          <div className="lg:w-1/2 space-y-8">
            <div>
              <h2 className="text-5xl md:text-6xl font-bold mb-4">
                Featured <span className="text-purple-400">Projects</span>
              </h2>
              <div className="w-24 h-1 bg-purple-500 rounded-full mt-4"></div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4 mb-6">
                <span className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm font-medium border border-gray-700">
                  {selectedProject.category}
                </span>
                <span className="text-gray-400">{selectedProject.year}</span>
              </div>

              <h3 className="text-3xl font-bold text-white mb-4">
                {selectedProject.title}
              </h3>

              <p className="text-gray-300 leading-relaxed text-lg mb-8">
                {selectedProject.description}
              </p>

              <Link
                href={selectedProject.link || "#"}
                target="_blank"
                className="inline-block px-8 py-3 bg-purple-400 rounded-full font-semibold hover:bg-purple-500 text-gray-900 hover:text-black transition-all duration-300 transform hover:scale-105"
              >
                View Project
              </Link>
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center justify-between mt-12">
              <button
                onClick={goToPrev}
                className="p-3 rounded-full bg-gray-800 border border-gray-700 hover:bg-gray-700 transition-all duration-300 group"
                aria-label="Previous project"
              >
                <svg
                  className="w-6 h-6 text-white group-hover:rotate-[-4deg] transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              <div className="flex">
                {featuredProjects.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className="p-2 flex items-center justify-center"
                    aria-label={`Go to project ${index + 1}`}
                  >
                    <span className={`block w-4 h-4 rounded-full transition-all duration-300 ${index === currentIndex ? "bg-purple-500 scale-125" : "bg-gray-600 hover:bg-gray-500"}`}
                    />
                  </button>
                ))}
              </div>

              <button
                onClick={goToNext}
                className="p-3 rounded-full bg-gray-800 border border-gray-700 hover:bg-gray-700 transition-all duration-300 group"
                aria-label="Next project"
              >
                <svg
                  className="w-6 h-6 text-white group-hover:rotate-[4deg] transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Project Showcase */}
          <div className="lg:w-1/2 relative">
            <div className="relative h-[500px] overflow-hidden rounded-2xl border border-white/20 backdrop-blur-3xl bg-gray-900/30">
              <AnimatePresence mode="sync" custom={direction}>
                <motion.div
                  key={selectedProject._id}
                  custom={direction}
                  variants={slideVariants}
                  initial={direction === 1 ? "hiddenRight" : "hiddenLeft"}
                  animate="visible"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 400, damping: 25 },
                    opacity: { duration: 0.3 },
                    rotateY: { duration: 0.4, ease: "easeInOut" },
                  }}
                  className="absolute inset-0 flex items-center justify-center p-4"
                >
                  <Link
                    href={selectedProject.link || "#"}
                    target="_blank"
                    className="w-full h-full flex items-center justify-center group"
                  >
                    <div className="relative w-full h-full rounded-xl overflow-hidden flex items-center justify-center">
                      {selectedProject.image && (
                        <Image
                          src={
                            imageUrl(selectedProject.image).url() ||
                            "/placeholder.png"
                          }
                          alt={`Screenshot of ${selectedProject.title || "featured project"}`}
                          className="max-h-full max-w-full object-contain transition-transform duration-700 group-hover:scale-105"
                          width={800}
                          height={450}
                          priority={selectedProject.serialOrder === 1}
                          sizes="(max-width: 1024px) 100vw, 50vw"
                          loading={
                            selectedProject.serialOrder &&
                            selectedProject.serialOrder <= 3
                              ? "eager"
                              : "lazy"
                          }
                        />
                      )}

                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 flex items-center justify-center">
                        <div className="text-center">
                          <div className="inline-block px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full text-white text-lg font-medium border border-white/30 mb-4">
                            Click to view
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Portfolio;
