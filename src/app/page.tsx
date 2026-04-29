import { FluidBackground } from "@/components/FluidBackground";
import { About } from "@/sections/About";
import { Blog } from "@/sections/Blog";
import { Contact } from "@/sections/Contact";
import { Education } from "@/sections/Education";
import { Hero } from "@/sections/Hero";
import { Navbar } from "@/sections/Navbar";
import { Skills } from "@/sections/Skills";
import { Work } from "@/sections/Work";

export default function Home() {
  return (
    <>
      <FluidBackground />
      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <Work />
          <Skills />
          <Education />
          <Blog />
          <About />
          <Contact />
        </main>
      </div>
    </>
  );
}
