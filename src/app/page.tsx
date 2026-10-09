import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Projects } from "@/components/sections/projects";
import { ScrollSpy } from "@/components/scroll-spy";

export default function Home() {
  return (
    <>
      <ScrollSpy />
      <Hero />
      <About />
      <Projects />
    </>
  );
}
