import ellipse1 from "@/assets/ellipse1.svg";
import ellipse2 from "@/assets/ellipse2.svg";
import layerzero from "@/assets/layerzero-logo.svg";
import wormhole from "@/assets/warmhole-logo.svg";
import { ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import { Typography } from "../ui/typography";
import { Button } from "../ui/button";

export default function HeroSection() {
  return (
    <div className="flex min-h-screen flex-col justify-start  pt-28 md:justify-between md:pt-40">
      <Image
        src={ellipse1}
        alt="ellipse1"
        className="absolute right-0 z-0 mt-16 h-auto w-9/12 md:-mt-16 md:w-3/12"
      />
      <Image
        src={ellipse2}
        alt="ellipse2"
        className="absolute left-0 z-0 -mt-28 hidden w-52 md:block"
      />
      <div className="z-10 space-y-6 p-6 pb-40 md:p-16">
        <Typography className="max-w-xs text-4xl font-extrabold leading-snug tracking-wide md:max-w-3xl md:text-7xl md:leading-none">
          Uniting <span className="text-secondary">Blockchain</span> Ecosystems
          on One Platform
        </Typography>
        <div className=" flex items-center gap-3">
          <Button variant={"mintly"}>Launch Airdrop</Button>
          <Button variant={"ghost"} className="md:w-32">
            Explore Chains <ChevronRightIcon />
          </Button>
        </div>
      </div>
      <div className=" w-auto md:mb-10">
        <Marquee autoFill pauseOnClick>
          <div className="bg-background-secondary flex w-full items-center py-5">
            <Image alt="layerzero-logo" src={layerzero} className="mx-6" />
            <Image alt="wormhole-logo" src={wormhole} className="mx-6" />
          </div>
        </Marquee>
      </div>
    </div>
  );
}
