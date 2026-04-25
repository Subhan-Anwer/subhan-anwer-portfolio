import type { MetadataRoute } from "next";

// UPDATE WHEN CUSTOM DOMAIN IS READY — replace with https://subhananwer.com
const SITE_URL = "https://subhan-anwer-portfolio.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1.0,
    },
    // TODO: Uncomment when /projects route is added
    // {
    //   url: `${SITE_URL}/projects`,
    //   lastModified: new Date(),
    //   changeFrequency: "weekly",
    //   priority: 0.8,
    // },
  ];
}
