import { FluidBackground } from "@/components/FluidBackground";
import { About } from "@/sections/About";
import { Contact } from "@/sections/Contact";
import { Hero } from "@/sections/Hero";
import { Navbar } from "@/sections/Navbar";
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
          <About />
          <Contact />
        </main>
      </div>
    </>
  );
}
