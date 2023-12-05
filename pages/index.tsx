import type { NextPage } from "next";
import React from "react";
import Hero from "../components/Landing/Hero";
import Process from "../components/Landing/Process";
import NewsLetter from "../components/Landing/NewsLetter";
import HeadComponent from "../common/components/elements/HeadComponent";

const Home: NextPage = () => {
  return (
    <>
      <HeadComponent />
      <Hero />
      <div className="divider divider-primary"></div>
      <Process />
      <div className="divider divider-primary"></div>
      <NewsLetter />
    </>
  );
};

export default Home;
