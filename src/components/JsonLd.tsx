const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://subhan-anwer-portfolio.vercel.app";

export default function JsonLd() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Subhan Anwer",
    url: SITE_URL,
    image: `${SITE_URL}/profilepic.png`,
    jobTitle: "Frontend Developer",
    description:
      "Subhan Anwer is a frontend developer in Karachi specializing in Next.js, React, and Tailwind CSS — building fast, responsive, SEO-optimized websites.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Karachi",
      addressCountry: "PK",
    },
    email: "subhananwersheikh@gmail.com",
    telephone: "+92-319-2312746",
    knowsAbout: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Frontend Development",
      "Website Development",
      "SEO Optimization",
      "Responsive Design",
      "JavaScript",
      "HTML",
      "CSS",
    ],
    sameAs: [
      "https://github.com/Subhan-Anwer",
      "https://linkedin.com/in/subhan-anwer",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
    />
  );
}
