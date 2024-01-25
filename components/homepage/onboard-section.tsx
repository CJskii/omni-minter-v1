import base from "@/assets/base-bg.svg";
import polygonZkEvm from "@/assets/polygon-bg.svg";
import mintly from "@/assets/homepage-background/mintly.svg";
import warmhole from "@/assets/warmhole-bg.svg";

import Image from "next/image";
import { Typography } from "../ui/typography";
import { Card } from "../ui/card";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

const ongoingChains = [
  {
    title: "Warmhole",
    description: "Lorem ipsum dolor sit amet consectetur.",
    background: warmhole,
  },
  {
    title: "Polygon zkEVM",
    description: "Lorem ipsum dolor sit amet consectetur.",
    background: polygonZkEvm,
  },
  {
    title: "Base",
    description: "Lorem ipsum dolor sit amet consectetur.",
    background: base,
  },
  {
    title: "Warmhole",
    description: "Lorem ipsum dolor sit amet consectetur.",
    background: warmhole,
  },
];

export default function OnboardSection() {
  return (
    <div className="z-10 w-full flex flex-col items-start justify-between gap-8 lg:gap-4 lg:flex-row">
      <div className=" space-y-8">
        <div>
          <Typography
            variant={"h2"}
            className="text-3xl font-bold tracking-wide md:text-5xl "
          >
            Onboard everyone to <br />{" "}
            <span className="text-gradient">Airdrop</span>, instantly
          </Typography>
          <Typography
            variant={"large"}
            className="border-secondary mt-4 rounded-l border-l-4 px-5 pt-6 font-normal lg:max-w-md"
          >
            Lorem ipsum dolor sit amet consectetur. Suscipit ultricies lacus
            tristique a feugiat nunc. Cursus mauris tempor pulvinar risus
            tincidunt. Dictum adipiscing dictum nulla in convallis ac nam urna
            est.
          </Typography>
        </div>
        <div>
          <div className="px-6 py-2">
            <Typography variant={"large"}>Ongoing Chains</Typography>
          </div>
          <div className="flex w-full max-w-[300px] grid-cols-6 flex-nowrap gap-4 overflow-x-auto md:grid md:max-w-2xl">
            {ongoingChains.map((chain, idx) => (
              <Card
                key={idx}
                className="relative w-52 min-w-[260px] rounded-2xl md:col-span-3 md:min-w-[300px] lg:w-auto"
              >
                <div className="absolute flex h-full flex-col items-start justify-between p-4 text-white">
                  <Typography
                    variant={"large"}
                    className="font-normal md:text-xl"
                  >
                    {chain.title}
                  </Typography>
                  <Typography
                    variant={"small"}
                    className="font-normal md:text-base"
                  >
                    {chain.description}
                  </Typography>
                </div>
                <Image src={chain.background} alt={chain.title} />
              </Card>
            ))}
          </div>

          <ScrollArea className=" whitespace-nowrap md:overflow-visible">
            <ScrollBar orientation="horizontal" className=" md:hidden" />
          </ScrollArea>
        </div>
      </div>
      <div className="">
        <Image src={mintly} alt="mintly" className=" ml-auto md:w-10/12" />
      </div>
    </div>
  );
}
