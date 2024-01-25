import { Typography } from "@/components/ui/typography";
import milkyway from "@/assets/dashboard/milkyway2.svg";
import Image from "next/image";
import {
  BarChart,
  ChevronLeft,
  Crosshair,
  LayoutGrid,
  Link as LinkIcon,
  LucideIcon,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import DashboardCard from "@/components/dashboard/dashboard-card";
import Link from "next/link";
import QuestsDetails from "./quests-details";

interface AboutProps {
  title: string;
  value: string;
  icon: LucideIcon;
}

const aboutProtocol: AboutProps[] = [
  {
    title: "Difficulty",
    value: "Easy",
    icon: Crosshair,
  },
  {
    title: "Category",
    value: "Wallet",
    icon: LayoutGrid,
  },
  {
    title: "Likelihood",
    value: "High",
    icon: BarChart,
  },
  {
    title: "Rating",
    value: "3.4",
    icon: Star,
  },
];

const links = [
  {
    label: "Website",
    href: "#",
  },
  {
    label: "Discord",
    href: "#",
  },
  {
    label: "Twitter",
    href: "#",
  },
];

export default function AirdropDetails() {
  const router = useRouter();
  return (
    <div className="space-y-14">
      <div className="space-y-8">
        <Button
          onClick={() => router.replace("/airdrops")}
          variant={"secondary"}
          className="flex items-center gap-1 rounded-xl"
        >
          <ChevronLeft className="h-4 w-4" />
          <div>Back</div>
        </Button>

        <div className="flex w-full items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Image src={milkyway} alt="protocol" />
            <div>
              <Typography variant={"h2"}>MilkyWay</Typography>
              <Typography variant={"muted"}>
                Lorem ipsum dolor sit amet consectetur.
              </Typography>
            </div>
          </div>
          <div className="cursor-pointer">
            <Star className="h-5 w-5" />
          </div>
        </div>

        <DashboardCard className="space-y-8">
          <div className="flex w-full flex-wrap items-center justify-between gap-4">
            {aboutProtocol.map(({ title, value, icon: Icon }, idx) => (
              <div key={idx} className="flex flex-col items-center gap-2">
                <div className="flex items-center gap-2">
                  <Icon className="h-5 w-5" />
                  <Typography variant={"h4"}>{title}</Typography>
                </div>
                <Typography variant={"smallTitle"} className="">
                  {value}
                </Typography>
              </div>
            ))}
          </div>

          <div className="flex w-full flex-col items-start gap-2">
            <div className="flex items-center gap-2">
              <LinkIcon className="h-5 w-5" />
              <Typography variant={"h3"}>Links</Typography>
            </div>
            <div className=" flex items-center gap-6 px-7">
              {links.map(({ label, href }, idx) => (
                <Link key={idx} href={href} className="text-lg underline">
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </DashboardCard>
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <Typography variant={"h4"}>About</Typography>
          <Typography variant={"paragraph"}>
            Magic Eden is one of the hottest projects on Solana right now, but
            its facing competition from Tensor, a Blur-like NFT marketplace
            thats rolled out its own points system ahead of a presumed airdrop.
            In a bid to keep up with platforms across the Ethereum, Bitcoin, and
            Solana NFT scenes, the project may eventually opt to release its own
            native governance token.
          </Typography>
        </div>
        <div className=" space-y-4">
          <Typography variant={"h4"}>More</Typography>
          <Typography variant={"paragraph"}>
            Magic Eden is one of the hottest projects on Solana right now, but
            its facing competition from Tensor, a Blur-like NFT marketplace
            thats rolled out its own points system ahead of a presumed airdrop.
            In a bid to keep up with platforms across the Ethereum, Bitcoin, and
            Solana NFT scenes, the project may eventually opt to release its own
            native governance token.
          </Typography>
        </div>
      </div>
    </div>
  );
}
