import type { NextPage } from "next";
import React from "react";
import gridMobile from "@/assets/homepage-background/bg-grid-mobile.svg";
import grid from "@/assets/homepage-background/bg-grid.svg";
import ContactSection from "@/components/homepage/contact-section";
import FeaturesSection from "@/components/homepage/features";
import HeroSection from "@/components/homepage/hero-section";
import OnboardSection from "@/components/homepage/onboard-section";
import StatsSection from "@/components/homepage/stats-section";
import { Header } from "@/components/navigation/navbar";
import Image from "next/image";
import Hero from "../components/Landing/Hero";
import Process from "../components/Landing/Process";
import NewsLetter from "../components/Landing/NewsLetter";
import HeadComponent from "../common/components/elements/HeadComponent";
import { Container } from "@/components/ui/Container";
import { Footer } from "@/components/ui/footer";

const Home: NextPage = () => {
  return (
    <>
      <div className="relative h-auto ">
        <Header />
        <div className=" z-10 ">
          <HeroSection />
          <Container>
            <OnboardSection />
            <StatsSection />
            <FeaturesSection />
            <ContactSection />
          </Container>
        </div>
        <Image
          src={grid}
          alt="grid"
          className="absolute top-0 -z-10 hidden h-[100%] w-full md:block"
        />
        <Image
          src={gridMobile}
          alt="grid"
          className="absolute -top-0 -z-10 -ml-5 h-[100%] opacity-80 md:hidden"
        />
        <Footer />
      </div>
      {/* <HeadComponent />
      <Hero />
      <div className="divider divider-primary"></div>
      <Process />
      <div className="divider divider-primary"></div>
      <NewsLetter /> */}
    </>
  );
};

export default Home;
