"use client";
import {
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
} from "framer-motion";
import { useEffect } from "react";
import Image from "next/image";
import { FiArrowRight } from "react-icons/fi";
import Link from "next/link";
import { PersonalDetails } from "../../sanity.types";
import { imageUrl, fileUrl } from "@/app/lib/imageUrl";

const COLORS_TOP = ["#1367C6", "#13FFAA", "#CE84CF", "#DD335C"];

const Hero = ({ personalDetails }: { personalDetails: PersonalDetails }) => {
  const color = useMotionValue(COLORS_TOP[0]);

  useEffect(() => {
    animate(color, COLORS_TOP, {
      ease: "easeInOut",
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror",
    });
  }, []);

  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #000 50%, ${color})`;
  const border = useMotionTemplate`1px solid ${color}`;
  const boxShadow = useMotionTemplate`0px 4px 24px ${color}`;

  return (
    <motion.section
      id="home"
      style={{
        backgroundImage,
      }}
      className="relative grid min-h-screen place-content-center overflow-hidden px-4 py-24 text-gray-200"
    >
      <div className="z-10 flex flex-col items-center text-center">
        <span className="sm:mb-4 mb-5 inline-block rounded-full bg-gray-600/50 px-3 py-1.5 mt-2 sm:text-sm text-xs">
          Open for Work
        </span>

        <p className="text-white/40 text-3xl sm:text-5xl md:text-7xl font-black sm:mb-1 mb-0">
          Hi, I am
        </p>
        <h1 className="max-w-3xl bg-gradient-to-br from-white to-gray-400 bg-clip-text font-black sm:leading-tight leading-[42px] text-transparent text-4xl sm:text-5xl md:text-7xl">
          {personalDetails.name}
        </h1>
        {/* SEO tags - Not Visible */}
        <p className="sr-only">
          Frontend Developer in Karachi, Website Developer, Next.js Expert,
          Tailwind CSS UI Designer, JavaScript Coder, Subhan Anwer Portfolio
        </p>

        {personalDetails.profileImage && (
          <Image
            src={imageUrl(personalDetails.profileImage).url()}
            alt="Subhan Anwer profile photo - frontend website developer"
            width={250}
            height={250}
            loading="eager"
            fetchPriority="high"
          />
        )}
        <div className="flex flex-col sm:flex-row bg-white/10 shadow-xl p-3 rounded-3xl justify-center items-center sm:space-x-2 gap-3 mb-4 sm:mt-0 mt-6">
          <div className="flex items-center justify-center space-x-2">
            <Image
              src="/obj1.png"
              alt=""
              role="presentation"
              width={30}
              height={30}
              className="rounded-2xl mx-auto w-auto h-auto"
            />
            <Image
              src="/obj1.png"
              alt=""
              role="presentation"
              width={30}
              height={30}
              className="rounded-2xl mx-auto w-auto h-auto"
            />
            <Image
              src="/obj1.png"
              alt=""
              role="presentation"
              width={30}
              height={30}
              className="rounded-2xl mx-auto w-auto h-auto"
            />
          </div>
          <p>{personalDetails.happyClients}+ Happy Clients</p>
        </div>

        <p className="my-6 max-w-xl ">{personalDetails.about}</p>

        <Link
          href={
            fileUrl(personalDetails.cv)?.url
              ? `${fileUrl(personalDetails.cv).url}?dl=Subhan_Anwer_Resume.pdf`
              : "/SUBHAN_ANWER_RESUME.pdf"
          }
          rel="noopener noreferrer"
        >
          <motion.button
            style={{
              border,
              boxShadow,
            }}
            whileHover={{
              scale: 1.015,
            }}
            whileTap={{
              scale: 0.985,
            }}
            className="flex w-fit items-center gap-2 rounded-full px-4 py-2"
          >
            Download CV
            <FiArrowRight />
          </motion.button>
        </Link>
      </div>

      <div className="bg-circle-container">
        <div className="bg-circle-background"></div>
        <div className="bg-circle"></div>
      </div>
    </motion.section>
  );
};

export default Hero;
