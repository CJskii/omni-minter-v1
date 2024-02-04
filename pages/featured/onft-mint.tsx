import featured from "@/assets/homepage-background/featured.svg";
import logoLight from "@/assets/light-logo.svg";
import { Typography } from "@/components/ui/typography";
import { SparkleIcon } from "lucide-react";
import Image from "next/image";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/dashboard/layout";

export default function Featured() {
  return (
    <Layout className="px-0 pt-28 pb-16 min-h-[90vh]">
      <div className=" z-10 py-10 md:py-16  flex items-center justify-center">
        <div className="bg-gradient my-auto grid grid-cols-12 rounded-xl md:w-9/12 items-start">
          <div className="col-span-full md:col-span-5 relative flex items-start justify-start">
            <div className=" md:rounded-tl-xl absolute top-0 w-full py-2 px-5 bg-gradient-to-t from-black/0 via-black/50 to-black flex items-center flex-wrap gap-y-4 gap-x-6">
              <Image src={logoLight} alt="mintly logo" className="w-40" />
            </div>
            <Image
              src={featured}
              alt="featured"
              className=" h-[600px] w-full object-cover rounded-xl "
            />
            <div className=" md:rounded-bl-xl absolute bottom-0 py-14 px-8 bg-gradient-to-b from-black/5  to-black flex items-center flex-wrap gap-y-4 gap-x-6 text-white">
              <div className=" flex items-center gap-2">
                <SparkleIcon className=" w-5 h-5" />
                <Typography variant={"smallTitle"}>
                  Multi-Network Support
                </Typography>
              </div>
              <div className=" flex items-center gap-2">
                <SparkleIcon className=" w-5 h-5" />
                <Typography variant={"smallTitle"}>Distinct Visuals</Typography>
              </div>
              <div className=" flex items-center gap-2">
                <SparkleIcon className=" w-5 h-5" />
                <Typography variant={"smallTitle"}>
                  Instant Transfers
                </Typography>
              </div>
              <div className=" flex items-center gap-2">
                <SparkleIcon className=" w-5 h-5" />
                <Typography variant={"smallTitle"}>LayerZero Driven</Typography>
              </div>
            </div>
          </div>
          <div className="col-span-full md:col-span-7 px-8 py-10 md:p-14 space-y-6">
            <Typography variant={"h3"} className=" dark:text-black">
              Step 1 : Mint ONFT
            </Typography>
            <Select>
              <SelectTrigger className="bg-white p-6 dark:bg-white dark:text-black dark:border-0">
                <SelectValue placeholder="Select chain" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ethereum">Ethereum</SelectItem>
                <SelectItem value="solana">Solana</SelectItem>
                <SelectItem value="polkadot">Polkadot</SelectItem>
              </SelectContent>
            </Select>
            <Button className=" dark:bg-black dark:text-white dark:hover:bg-black/80 rounded-xl">
              Mint
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
