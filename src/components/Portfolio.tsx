import { getFeaturedProjects } from "@/sanity/lib/getFeaturedProjects";
import PortfolioSection from "./PortfolioSection";

const Portfolio = async () => {
  const projects = await getFeaturedProjects();
  return <PortfolioSection projects={projects} />;
}

export default Portfolio;
