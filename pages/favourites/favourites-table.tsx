import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import milkyWay from "@/assets/dashboard/milkyway.svg";
import network1 from "@/assets/dashboard/eth.svg";
import network2 from "@/assets/dashboard/network2.svg";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Typography } from "@/components/ui/typography";

const mockData = [
  {
    protocol: {
      name: "MilkyWay",
      description:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti enim illum quod, nihil corporis optio repudiandae blanditiis ab repellendus, harum debitis, praesentium neque! Praesentium, ad. Eum molestiae vel accusamus in.",
      logo: milkyWay,
    },
    difficulty: "Easy",
    category: "Wallet",
    likelihood: "High",
    quest: "0/2",
    networks: [network1, network2],
  },
  {
    protocol: {
      name: "MilkyWay",
      description:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti enim illum quod, nihil corporis optio repudiandae blanditiis ab repellendus, harum debitis, praesentium neque! Praesentium, ad. Eum molestiae vel accusamus in.",
      logo: milkyWay,
    },
    difficulty: "Easy",
    category: "Wallet",
    likelihood: "High",
    quest: "0/2",
    networks: [network1, network2],
  },
  {
    protocol: {
      name: "MilkyWay",
      description:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti enim illum quod, nihil corporis optio repudiandae blanditiis ab repellendus, harum debitis, praesentium neque! Praesentium, ad. Eum molestiae vel accusamus in.",
      logo: milkyWay,
    },
    difficulty: "Easy",
    category: "Wallet",
    likelihood: "High",
    quest: "0/2",
    networks: [network1, network2],
  },
  {
    protocol: {
      name: "MilkyWay",
      description:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti enim illum quod, nihil corporis optio repudiandae blanditiis ab repellendus, harum debitis, praesentium neque! Praesentium, ad. Eum molestiae vel accusamus in.",
      logo: milkyWay,
    },
    difficulty: "Easy",
    category: "Wallet",
    likelihood: "High",
    quest: "0/2",
    networks: [network1, network2],
  },
];

export default function FavouritesTable() {
  return (
    <>
      <div className="space-y-6 md:space-y-12 py-6">
        <Typography variant={"h2"} className=" font-raleway">
          {mockData.length} Airdrops
        </Typography>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="">
            <TableHead></TableHead>
            <TableHead>#</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Difficulty</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Likelihood</TableHead>
            <TableHead>Quest</TableHead>
            <TableHead>Networks</TableHead>
          </TableRow>
        </TableHeader>
        <div className="my-2" />
        <TableBody>
          {mockData.map((data, idx) => (
            <React.Fragment key={idx}>
              <TableRow className="z-10 rounded-xl border-0 bg-[#b5b4b6]/30 px-8 py-7 backdrop-blur-md hover:bg-[#b5b4b6]/20 dark:bg-white/10 dark:text-white">
                <TableCell className=" cursor-pointer rounded-l-xl">
                  <Star />
                </TableCell>
                <TableCell className="font-medium">{idx + 1}</TableCell>
                <TableCell>
                  <Link
                    href={`/airdrop/${data.protocol.name}`}
                    className=" flex items-center gap-2"
                  >
                    <Image src={data.protocol.logo} alt={data.protocol.name} />
                    <span className="space-y-0 block">
                      <Typography variant={"large"}>
                        {data.protocol.name}
                      </Typography>
                      <Typography
                        variant={"paragraph"}
                        className=" max-w-[20ch] truncate"
                      >
                        {data.protocol.description}
                      </Typography>
                    </span>
                  </Link>
                </TableCell>
                <TableCell>{data.difficulty}</TableCell>
                <TableCell>{data.category}</TableCell>
                <TableCell>{data.likelihood}</TableCell>
                <TableCell>{data.quest}</TableCell>
                <TableCell className="rounded-r-xl text-center">
                  <span className="flex items-center">
                    {data.networks.map((network, idx) => (
                      <Image src={network} alt="network" key={idx} />
                    ))}
                  </span>
                </TableCell>
              </TableRow>
              <div className="my-4" />
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
