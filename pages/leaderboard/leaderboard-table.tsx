import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Typography } from "@/components/ui/typography";
import React from "react";

const mockData = [
  {
    rank: 1,
    walletAddress: "0xA9F65a8a1829F68607e4223F349545861216543c",
    level: "80",
  },
  {
    rank: 2,
    walletAddress: "0xA9F65a8a1829F68607e4223F349545861216543c",
    level: "80",
  },
  {
    rank: 3,
    walletAddress: "0xA9F65a8a1829F68607e4223F349545861216543c",
    level: "80",
  },
  {
    rank: 4,
    walletAddress: "0xA9F65a8a1829F68607e4223F349545861216543c",
    level: "80",
  },
  {
    rank: 5,
    walletAddress: "0xA9F65a8a1829F68607e4223F349545861216543c",
    level: "80",
  },
  {
    rank: 6,
    walletAddress: "0xA9F65a8a1829F68607e4223F349545861216543c",
    level: "80",
  },
];

export default function LeaderboardTable() {
  return (
    <>
      <div className="space-y-1 py-6 ">
        <Typography variant={"h2"} className=" font-raleway">
          Leaderboard
        </Typography>
        <Typography
          variant={"paragraph"}
          className="font-raleway font-[500] tracking-wide"
        >
          Your stats on Mintly
        </Typography>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="">
            <TableHead>
              <Typography variant={"large"}>Rank</Typography>
            </TableHead>
            <TableHead>
              <Typography variant={"large"}>Wallet Address</Typography>
            </TableHead>
            <TableHead>
              <Typography variant={"large"}>Level</Typography>
            </TableHead>
          </TableRow>
        </TableHeader>
        <div className="my-2" />
        <TableBody>
          {mockData.map(({ rank, walletAddress, level }, idx) => (
            <React.Fragment key={idx}>
              <TableRow className="border-0 bg-[#b5b4b6]/30 text-base hover:bg-[#b5b4b6]/20 dark:bg-white/10 dark:text-white">
                <TableCell className="cursor-pointer rounded-l-xl py-10">
                  {rank}
                </TableCell>
                <TableCell>{walletAddress}</TableCell>
                <TableCell className=" cursor-pointer rounded-r-xl">
                  {level}
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
