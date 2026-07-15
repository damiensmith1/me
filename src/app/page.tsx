import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Services } from "@/components/sections/services";
import { Technologies } from "@/components/sections/technologies";
import { Process } from "@/components/sections/process";
import { Why } from "@/components/sections/why";
import { Contact } from "@/components/sections/contact";
import { ScrollSpy } from "@/components/scroll-spy";

export default function Home() {
  return (
    <>
      <ScrollSpy />
      <Hero />
      <About />
      <Services />
      <Technologies />
      <Process />
      <Why />
      <Contact />
    </>
  );
}
