import { getFeaturedProjects } from "@/sanity/lib/getFeaturedProjects";
import PortfolioSection from "./PortfolioSection";

const COLORS_TOP = ["#1367C6", "#13FFAA", "#CE84CF", "#DD335C"];

const Portfolio = async () => {
  const projects = await getFeaturedProjects();
  return <PortfolioSection projects={projects} />;
}

export default Portfolio;
