import { getPersonalDetails } from "@/sanity/lib/getPersonalDetails";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://subhan-anwer-portfolio.vercel.app";

export default async function JsonLd() {
  const pd = await getPersonalDetails();
  // Ensure we have an object to access properties from
  const details = Array.isArray(pd) ? pd[0] || {} : pd || {};

  const personSchema = {
    "@type": "Person",
    name: details.name || "Subhan Anwer",
    url: SITE_URL,
    image: `${SITE_URL}/og-image.png`,
    jobTitle: "Frontend Developer",
    description: details.about || "Subhan Anwer is a frontend developer in Karachi specializing in Next.js, React, and Tailwind CSS — building fast, responsive, SEO-optimized websites.",
    address: {
      "@type": "PostalAddress",
      addressLocality: details.address || "Karachi",
      addressCountry: "PK",
    },
    email: details.email || "subhananwersheikh@gmail.com",
    telephone: details.phoneNumber || "+92-319-2312746",
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
      details.githubUrl || "https://github.com/Subhan-Anwer",
      details.linkedinUrl || "https://linkedin.com/in/subhan-anwer",
    ],
    worksFor: { "@type": "Organization", name: "Freelance" },
    hasOccupation: {
      "@type": "Occupation",
      name: "Frontend Developer",
      occupationLocation: { "@type": "City", name: "Karachi" }
    }
  };

  const websiteSchema = {
    "@type": "WebSite",
    name: details.name ? `${details.name} - Portfolio` : "Subhan Anwer Portfolio",
    url: SITE_URL,
  };

  const schema = {
    "@context": "https://schema.org",
    "@graph": [personSchema, websiteSchema],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }}
    />
  );
}
