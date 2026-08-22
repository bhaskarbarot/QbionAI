import Hero from "@/components/home/Hero";
import LogoMarquee from "@/components/home/LogoMarquee";
import ProductPreview from "@/components/home/ProductPreview";
import Services from "@/components/home/Services";
import Process from "@/components/home/Process";
import Stats from "@/components/home/Stats";
import CaseStudies from "@/components/home/CaseStudies";
import Testimonials from "@/components/home/Testimonials";
import FAQ from "@/components/shared/FAQ";
import CTABand from "@/components/shared/CTABand";

export default function Home() {
  return (
    <>
      <Hero />
      <LogoMarquee />
      <ProductPreview />
      <Services />
      <Process />
      <Stats />
      <CaseStudies />
      <Testimonials />
      <FAQ />
      <CTABand />
    </>
  );
}
