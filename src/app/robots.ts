import type { MetadataRoute } from "next";

// UPDATE WHEN CUSTOM DOMAIN IS READY — replace with https://subhananwer.com
const SITE_URL = "https://subhan-anwer-portfolio.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/studio", "/studio/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
