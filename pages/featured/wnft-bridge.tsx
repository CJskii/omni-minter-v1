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

export default function WNFTBridge() {
  return (
    <Layout className="px-0 pt-24 pb-8 min-h-[90vh]">
      <div className=" z-10 py-20 md:py-16 flex items-center justify-center min-h-[90vh]">
        <div className="bg-gradient my-auto md:rounded-xl md:w-7/12 lg:w-5/12 w-full items-start">
          <div className="p-8 md:p-14 md:px-16 flex flex-col gap-6">
            <Typography variant={"h3"} className=" dark:text-black text-center">
              Step 2 : Bridge wNFT
            </Typography>
            <Label className=" space-y-2">
              <Typography variant={"large"} className="dark:text-black">
                Bridge From
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
            </Label>
            <Label className=" space-y-2">
              <Typography variant={"large"} className="dark:text-black">
                Bridge To
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
            </Label>
            <Label className=" space-y-2">
              <Typography variant={"large"} className="dark:text-black">
                NFT ID
              </Typography>
              <Input
                placeholder="ID"
                className="p-6 rounded-xl dark:bg-white dark:text-black"
              />
            </Label>

            <Button className=" py-6 w-full dark:bg-black dark:text-white dark:hover:bg-black/80 rounded-xl">
              Bridge
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
