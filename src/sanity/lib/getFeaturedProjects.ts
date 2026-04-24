import { defineQuery } from "next-sanity";
import { sanityFetch } from "./live";

export const getFeaturedProjects = async () => {
  const FEATURED_PROJECTS_QUERY = defineQuery(`
            *[_type == "featuredProjects"] | order(serialOrder asc)
        `);

  try {
    //use Sanity Fetch to send the query
    const featuredProjects = await sanityFetch({
      query: FEATURED_PROJECTS_QUERY,
    });

    //Return the list of featured projects or an empty array if none found
    return featuredProjects.data || [];
  } catch (error) {
    console.log("Error fetching featured projects:", error);
    return [];
  }
};
