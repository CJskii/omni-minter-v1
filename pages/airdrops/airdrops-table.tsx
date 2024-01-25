import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import milkyWay from "@/assets/dashboard/milkyway.svg";
import network1 from "@/assets/dashboard/eth.svg";
import network2 from "@/assets/dashboard/network2.svg";
import { Search, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
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

const difficulty = [
  {
    label: "Esay",
    value: "esay",
  },
  {
    label: "Medium",
    value: "medium",
  },
  {
    label: "Hard",
    value: "hard",
  },
];
const likelihood = [
  {
    label: "Esay",
    value: "esay",
  },
  {
    label: "Medium",
    value: "medium",
  },
  {
    label: "Hard",
    value: "hard",
  },
];
const category = [
  {
    label: "Wallet",
    value: "wallet",
  },
  {
    label: "NFT",
    value: "nft",
  },
  {
    label: "DEX",
    value: "dex",
  },
];
const network = [
  {
    label: "Network 1",
    value: "network1",
    logo: network1,
  },
  {
    label: "Network 2",
    value: "network2",
    logo: network2,
  },
];

export default function AirdropsTable() {
  const filters = (
    <>
      <Select>
        <SelectTrigger className=" w-32 md:w-[180px]">
          <SelectValue placeholder="Difficulty" />
        </SelectTrigger>
        <SelectContent>
          {difficulty.map(({ label, value }, idx) => (
            <SelectItem key={idx} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select>
        <SelectTrigger className=" w-32 md:w-[180px]">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          {category.map(({ label, value }, idx) => (
            <SelectItem key={idx} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select>
        <SelectTrigger className=" w-32 md:w-[180px]">
          <SelectValue placeholder="Likelihood" />
        </SelectTrigger>
        <SelectContent className="">
          {likelihood.map(({ label, value }, idx) => (
            <SelectItem key={idx} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select>
        <SelectTrigger className=" w-32 md:w-[180px]">
          <SelectValue placeholder="Network" className=" " />
        </SelectTrigger>
        <SelectContent>
          {network.map(({ label, value, logo }, idx) => (
            <SelectItem key={idx} value={value}>
              <div className=" flex items-center gap-2">
                <Image src={logo} alt={label} /> <span>{label}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );

  return (
    <>
      <div className=" space-y-6 md:space-y-12 py-6">
        <div className="flex w-full justify-between gap-4 md:items-center md:flex-row flex-col">
          <Typography variant={"h2"} className=" font-raleway">
            {mockData.length} Airdrops
          </Typography>
          <div className="relative">
            <Input
              type="text"
              placeholder="Search..."
              className=" rounded-xl bg-[#E9E9E9] pl-10 pr-28 text-black dark:bg-white/30"
            />
            <Search className="h-4 w-4 absolute left-3 top-3" />
          </div>
        </div>
        {/* <div className="flex md:w-full items-center flex-wrap md:flex-row justify-normal gap-4">
          {filters}
        </div> */}
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
        <TableBody className="">
          {mockData.map((data, idx) => (
            <React.Fragment key={idx}>
              <TableRow
                className="z-10 rounded-xl border-0 bg-[#b5b4b6]/30 px-8 py-7 backdrop-blur-md hover:bg-[#b5b4b6]/20 dark:bg-white/10 dark:text-white"
              >
                <TableCell className=" cursor-pointer rounded-l-xl">
                  <Star />
                </TableCell>
                <TableCell className="font-medium">{idx + 1}</TableCell>
                <TableCell>
                  <Link
                    href={`/airdrops/${data.protocol.name}`}
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
