import Hero from "@/components/Hero";
import CodeStats from "@/components/CodeStats";
import LogoAnimation from "@/components/LogoAnimation";
import Portfolio from "@/components/Portfolio";
import Stack from "@/components/Stack";
import Services from "@/components/Services";
import Contact from "@/components/Contact";
import { getPersonalDetails } from "@/sanity/lib/getPersonalDetails";
import { PersonalDetails } from "../../../sanity.types";

export default async function Home() {
  const personalDetails = (await getPersonalDetails()) as PersonalDetails;

  return (
    <>
      <Hero personalDetails={personalDetails} />
      <Stack />
      <LogoAnimation />
      <Portfolio />
      <CodeStats />
      <Services />
      <Contact personalDetails={personalDetails} />
    </>
  );
}
