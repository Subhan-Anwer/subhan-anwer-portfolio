"use client";
import React, { useEffect, useState, useRef } from "react";

interface ShootingStar {
  id: number;
  x: number;
  y: number;
  angle: number;
  scale: number;
  speed: number;
  distance: number;
}

export const ShootingStars = ({
  minSpeed = 15,
  maxSpeed = 35,
  minDelay = 500,
  maxDelay = 1500,
  starColor = "#ffffff",
  trailColor = "#766c77",
  starWidth = 20,
  starHeight = 2,
  className,
}: {
  minSpeed?: number;
  maxSpeed?: number;
  minDelay?: number;
  maxDelay?: number;
  starColor?: string;
  trailColor?: string;
  starWidth?: number;
  starHeight?: number;
  className?: string;
}) => {
  const [stars, setStars] = useState<ShootingStar[]>([]);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const createStar = () => {
      if (!svgRef.current) return;
      const rect = svgRef.current.getBoundingClientRect();
      const x = Math.random() * rect.width;
      const y = Math.random() * (rect.height / 2); // Spawns from top half
      
      const newStar: ShootingStar = {
        id: Date.now(),
        x,
        y,
        angle: 30 + Math.random() * 25, // angle between 30 and 55 degrees
        scale: Math.random() * 1.5 + 0.5, // much more random sizes
        speed: Math.random() * (maxSpeed - minSpeed) + minSpeed,
        distance: 0,
      };
      
      setStars((prev) => [...prev, newStar]);

      const delay = Math.random() * (maxDelay - minDelay) + minDelay;
      setTimeout(createStar, delay);
    };

    const timeout = setTimeout(createStar, minDelay);
    return () => clearTimeout(timeout);
  }, [minSpeed, maxSpeed, minDelay, maxDelay]);

  useEffect(() => {
    if (stars.length === 0) return;
    let animationFrame: number;
    const moveStars = () => {
      setStars((prevStars) => {
        return prevStars
          .map((star) => ({
            ...star,
            distance: star.distance + star.speed,
          }))
          .filter((star) => star.distance < 2500); // keep only stars on screen
      });
      animationFrame = requestAnimationFrame(moveStars);
    };
    animationFrame = requestAnimationFrame(moveStars);
    return () => cancelAnimationFrame(animationFrame);
  }, [stars.length]);

  return (
    <svg ref={svgRef} className={`absolute inset-0 w-full h-full pointer-events-none -z-10 ${className || ""}`}>
      {stars.map((star) => (
        <rect
          key={star.id}
          x={star.x}
          y={star.y}
          width={starWidth * star.scale}
          height={starHeight * star.scale}
          fill="url(#shooting-gradient)"
          transform={`rotate(${star.angle}, ${star.x}, ${star.y}) translate(${star.distance}, 0)`}
        />
      ))}
      <defs>
        <linearGradient id="shooting-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={trailColor} stopOpacity="0" />
          <stop offset="100%" stopColor={starColor} stopOpacity="1" />
        </linearGradient>
      </defs>
    </svg>
  );
};
