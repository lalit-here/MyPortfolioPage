import { FluidBackground } from "@/components/FluidBackground";
import { ScrollChoreography } from "@/components/ScrollChoreography";
import {
  getBlogFeaturedUrl,
  getContactLinks,
  getResumeUrl,
} from "@/lib/site-config";
import { About } from "@/sections/About";
import { Blog } from "@/sections/Blog";
import { Contact } from "@/sections/Contact";
import { Education } from "@/sections/Education";
import { Hero } from "@/sections/Hero";
import { Navbar } from "@/sections/Navbar";
import { Skills } from "@/sections/Skills";
import { Work } from "@/sections/Work";

export default function Home() {
  const contactLinks = getContactLinks();
  const blogFeaturedUrl = getBlogFeaturedUrl();
  const resumeUrl = getResumeUrl();

  return (
    <>
      <FluidBackground />
      <ScrollChoreography />
      <div className="relative z-10">
        <Navbar />
        <main className="relative">
          <Hero />
          <Work />
          <Skills />
          <Education />
          <Blog featuredHref={blogFeaturedUrl} />
          <About />
          <Contact links={contactLinks} resumeUrl={resumeUrl} />
        </main>
      </div>
    </>
  );
}
