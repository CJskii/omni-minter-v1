import React from "react";
import { DashboardContainer } from "../ui/Container";
import { Footer } from "../ui/footer";
import { Header } from "@/components/navigation/navbar";
import gridMobile from "@/assets/homepage-background/bg-grid-mobile.svg";
import grid from "@/assets/homepage-background/bg-grid.svg";
import Image from "next/image";
import ellipse1 from "@/assets/ellipse1.svg";
import ellipse2 from "@/assets/ellipse2.svg";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <DashboardContainer>
        <div className="min-h-screen pt-6 md:pt-0">{children}</div>
        <Image
          src={grid}
          alt="grid"
          className="absolute top-0 -z-10 hidden max-h-[130vh] object-bottom -bottom-20 object-cover w-full md:block"
        />
        <Image
          src={gridMobile}
          alt="grid"
          className="absolute -top-0 -z-10 -ml-5 max-h-[130vh] object-cover opacity-80 md:hidden"
        />
      </DashboardContainer>
      <div className="">
        <Footer isDashboard />
      </div>
    </>
  );
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="relative h-auto ">
        <Header />
        <div className=" z-10 pt-24 p-6 ">
          <Image
            src={ellipse1}
            alt="ellipse1"
            className="absolute right-0 -z-10 mt-24 h-auto w-9/12 md:-mt-16 md:w-3/12"
          />
          <Image
            src={ellipse2}
            alt="ellipse2"
            className="absolute left-0 z-0 -mt-20 hidden w-52 md:block"
          />
          {children}
        </div>
        <Image
          src={grid}
          alt="grid"
          className="absolute top-0 -z-10 hidden max-h-[130vh] object-bottom -bottom-20 object-cover w-full md:block"
        />
        <Image
          src={gridMobile}
          alt="grid"
          className="absolute -top-0 -z-10 -ml-5 max-h-[130vh] object-cover opacity-80 md:hidden"
        />
        <Footer />
      </div>
    </>
  );
}
