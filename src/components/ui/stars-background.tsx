"use client";
import React, { useRef, useEffect, useState } from "react";

export const StarsBackground = ({
  starDensity = 0.0002,
  allStarsTwinkle = true,
  twinkleProbability = 0.7,
  minTwinkleSpeed = 0.5,
  maxTwinkleSpeed = 1,
  className,
}: {
  starDensity?: number;
  allStarsTwinkle?: boolean;
  twinkleProbability?: number;
  minTwinkleSpeed?: number;
  maxTwinkleSpeed?: number;
  className?: string;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stars, setStars] = useState<any[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const generateStars = () => {
      const area = window.innerWidth * window.innerHeight;
      const numStars = Math.floor(area * starDensity);
      return Array.from({ length: numStars }).map(() => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        radius: Math.random() * 0.7 + 0.1, // Reduced size for 25% zoom feel
        opacity: Math.random() * 0.5 + 0.5,
        twinkleSpeed:
          Math.random() * (maxTwinkleSpeed - minTwinkleSpeed) + minTwinkleSpeed,
        twinkleOffset: Math.random() * Math.PI * 2,
      }));
    };

    setStars(generateStars());

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      setStars(generateStars());
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [starDensity, maxTwinkleSpeed, minTwinkleSpeed]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((star) => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();

        if (allStarsTwinkle || Math.random() < twinkleProbability) {
          star.opacity =
            0.5 + Math.sin(Date.now() * 0.001 * star.twinkleSpeed + star.twinkleOffset) * 0.5;
        }
      });
      animationFrameId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationFrameId);
  }, [stars, allStarsTwinkle, twinkleProbability]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none -z-10 ${className || ""}`}
    />
  );
};
