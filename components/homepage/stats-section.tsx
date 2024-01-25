import elipse1 from "@/assets/ellipse5.svg";
import elipse2 from "@/assets/ellipse6.svg";
import globeDark from "@/assets/globe-dark.svg";
import globe from "@/assets/globe.svg";
import Image from "next/image";
import { Typography } from "../ui/typography";
import { Card } from "../ui/card";

const stats = [
  {
    title: "100,000+",
    description: "On-chain transaction volume",
  },
  {
    title: "30+",
    description: "Chains Supported",
  },
  {
    title: "50,000+",
    description: "Monthly Active Users",
  },
];

export default function StatsSection() {
  return (
    <div className="relative z-10 flex flex-col items-center justify-center space-y-9 py-16 md:py-5">
      <Typography
        variant={"h2"}
        className=" text-xl font-bold tracking-wide md:text-4xl"
      >
        Expand our counts
      </Typography>
      <div className="z-10 mx-auto w-full  md:w-9/12">
        <Card className="flex flex-col items-center justify-around gap-4 rounded-xl bg-white/30 px-7 py-9 backdrop-blur-md dark:bg-black/40 dark:backdrop-blur-md md:flex-row">
          {stats.map((stat, idx) => (
            <div key={idx} className="space-y-1 text-center">
              <Typography variant={"h2"} className="text-gradient-reverse">
                {stat.title}
              </Typography>
              <Typography className="text-lg">{stat.description}</Typography>
            </div>
          ))}
        </Card>
      </div>
      <Image
        alt="globe-dark"
        src={globeDark}
        className="absolute -top-6 w-32 dark:hidden md:-top-32 md:bottom-16 md:w-72"
      />
      <Image
        alt="globe"
        src={globe}
        className="dark absolute -top-6  w-32 dark:block md:-top-32 md:bottom-16 md:w-72"
      />
      <Image
        alt="ellipse1"
        src={elipse1}
        className="absolute top-12 md:-top-20"
      />
      <Image
        alt="ellipse1"
        src={elipse2}
        className="absolute bottom-5 md:bottom-0 md:top-20"
      />
    </div>
  );
}
