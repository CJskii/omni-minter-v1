import ellipse1 from "@/assets/ellipse3.svg";
import ellipse2 from "@/assets/ellipse4.svg";
import bgDark from "@/assets/features-bg-dark.svg";
import bgLight from "@/assets/features-bg-light.svg";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Typography } from "../ui/typography";
import { Card } from "../ui/card";

const features = [
  {
    title: "Multi-Network Support",
    description:
      "Mintly offers a wide variety of chains for interaction, including not only the main chains but also those you may have overlooked.",
  },
  {
    title: "Instant Transfer",
    description:
      "No more waiting around for confirmations or experiencing frustrating delays. Mintly leverages cutting-edge technology and innovative solutions to provide users with seamless experiences across various chains.",
  },
  {
    title: "Leaderboard",
    description:
      "Leaderboard that showcases the top 100 wallets based on the total number of XP earned. The XP can be converted into levels, creating a more gamified experience for all participants.",
  },
];

export default function FeaturesSection() {
  return (
    <div className="relative z-10 min-h-screen space-y-16 md:space-y-32">
      <Image
        src={ellipse1}
        alt="ellipse1"
        className="absolute -left-16 -top-40 z-0 hidden w-32 md:block"
      />
      <Image
        src={ellipse2}
        alt="ellipse1"
        className="absolute -bottom-40 -left-16 z-0 hidden w-48 md:block"
      />
      <Image
        alt="bgDark"
        src={bgDark}
        className="absolute top-28 z-0 ml-16 hidden md:dark:block "
      />
      <Image
        alt="bgLight"
        src={bgLight}
        className="absolute top-28 z-0 ml-16 hidden md:block md:dark:hidden"
      />

      <Typography
        variant={"h2"}
        className="text-start  text-3xl font-bold tracking-wide"
      >
        Other Features
      </Typography>
      <div className="grid-cols-12 space-y-10 md:grid">
        {features.map((feature, idx) => (
          <div key={idx} className="z-10 md:col-span-full">
            <Card
              className={cn(
                idx === 1
                  ? "bg-primary dark:bg-primary md:ml-[20vw]"
                  : "bg-secondary dark:bg-secondary",
                idx === 2 && "md:ml-[40vw]",
                " space-y-6 rounded-xl border-0 px-6 py-7 text-start text-white  md:w-5/12 md:p-10",
              )}
            >
              <Typography variant={"h3"}>{feature.title}</Typography>
              <Typography variant={"paragraph"}>
                {feature.description}
              </Typography>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
