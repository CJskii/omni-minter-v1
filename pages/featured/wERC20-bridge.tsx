import React from "react";
import { Typography } from "@/components/ui/typography";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/dashboard/layout";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ArrowLeftRight, ArrowUpDown } from "lucide-react";
import DashboardCard from "@/components/dashboard/dashboard-card";

export default function WERCBridge() {
  const [selectedChain1, setSelectedChain1] = React.useState<string>("");
  const [selectedChain2, setSelectedChain2] = React.useState<string>("");

  function swapSelectedChain() {
    setSelectedChain1(selectedChain2);
    setSelectedChain2(selectedChain1);
  }

  return (
    <Layout className="px-0 pt-28 pb-16 min-h-[90vh">
      <div className=" z-10 py-20 md:py-16 flex items-center justify-center min-h-[90vh]">
        <div className="bg-gradient my-auto md:rounded-xl md:w-8/12 lg:w-5/12 w-full items-start">
          <div className="p-8 md:py-10 md:px-16 flex flex-col gap-8">
            <Typography variant={"h3"} className=" dark:text-black text-center">
              Step 3 : wERC20 Bridge
            </Typography>
            <DashboardCard className="px-6 py-4 mx-auto w-max  bg-white/30">
              <Typography
                variant={"smallTitle"}
                className="dark:text-black font-semibold"
              >
                Your Balance: 0
              </Typography>
            </DashboardCard>
            <div className=" flex items-center md:flex-row flex-col justify-between gap-4 md:gap-6">
              <Select
                value={selectedChain1}
                onValueChange={(value) => {
                  setSelectedChain1(value);
                }}
              >
                <SelectTrigger className="bg-white p-6 dark:bg-white dark:text-black dark:border-0">
                  <SelectValue placeholder="Select chain" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ethereum">Ethereum</SelectItem>
                  <SelectItem value="solana">Solana</SelectItem>
                  <SelectItem value="polkadot">Polkadot</SelectItem>
                </SelectContent>
              </Select>
              <div
                onClick={swapSelectedChain}
                className=" active:scale-90 transition-all ease-in-out cursor-pointer"
              >
                <ArrowUpDown className="md:hidden block md:h-12 md:w-12" />
                <ArrowLeftRight className="hidden md:block md:h-12 md:w-12" />
              </div>
              <Select
                value={selectedChain2}
                onValueChange={(value) => {
                  setSelectedChain2(value);
                }}
              >
                <SelectTrigger className="bg-white p-6 dark:bg-white dark:text-black dark:border-0">
                  <SelectValue placeholder="Select chain" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ethereum">Ethereum</SelectItem>
                  <SelectItem value="solana">Solana</SelectItem>
                  <SelectItem value="polkadot">Polkadot</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Label className=" space-y-2">
              <Typography
                variant={"smallTitle"}
                className="dark:text-black font-semibold"
              >
                Step 1 : Mint
              </Typography>
              <div className="relative">
                <Input
                  placeholder="Enter amount to mint"
                  className="p-6 py-7 rounded-xl dark:bg-white dark:text-black"
                />
                <Button
                  size={"sm"}
                  className="absolute right-4 top-3.5 h-8 dark:bg-black dark:text-white dark:hover:bg-black/80 rounded-lg "
                >
                  Mint
                </Button>
              </div>
            </Label>
            <Label className=" space-y-2">
              <Typography
                variant={"smallTitle"}
                className="dark:text-black font-semibold"
              >
                Step 2 : Bridge
              </Typography>
              <div className="relative">
                <Input
                  placeholder="Enter amount to bridge"
                  className="p-6 py-7 rounded-xl dark:bg-white dark:text-black"
                />
                <Button
                  size={"sm"}
                  className="absolute right-4 top-3.5 h-8 dark:bg-black dark:text-white dark:hover:bg-black/80 rounded-lg "
                >
                  Max
                </Button>
              </div>
            </Label>

            <Button className=" py-6 w-full dark:bg-black dark:text-white dark:hover:bg-black/80 rounded-xl">
              Send
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
