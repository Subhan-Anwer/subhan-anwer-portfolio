'use client';

import { motion } from 'framer-motion'
import Image from 'next/image';

const baseImages = [
  { src: "/sp.png", alt: "Social Pulse" },
  {
    src: "/giaic.png",
    alt: "Governor Initiative for Artificial Intelligence, Web 3.0 and Metaverse",
  },
];

const images = Array.from({ length: 12 }, () => baseImages).flat();

const LogoAnimation = () => {
    return (
      <div className="py-8 bg-purple-200/10 opacity-80 glass">
        <div className="container mx-auto">
          <div className="overflow-hidden [mask-image:linear-gradient(to_right,_transparent,_black_25%,_black_75%,_transparent)]">
            <motion.div
              className="flex justify-center gap-14 flex-none pr-14"
              animate={{
                translateX: "-50%",
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "linear",
                repeatType: "loop",
              }}
            >
              {images.map((image, index) => (
                  <Image
                    key={index}
                    src={image.src}
                    alt={image.alt}
                    height={100}
                    width={100}
                    className="w-auto h-12"
                  />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    );
}

export default LogoAnimation