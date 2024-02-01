import base from "@/assets/base.svg";
import layerzero from "@/assets/layerzero-logo.svg";
import wormhole from "@/assets/warmhole-logo.svg";
import Image from "next/image";
import { Typography } from "../ui/typography";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import NewsletterSection from "./newsletter-section";
import Link from "next/link";

export default function ContactSection() {
  return (
    <div>
      <Card className="bg-gradient z-10 flex flex-col flex-wrap items-start justify-between rounded-xl rounded-b-none border-0 px-5 py-10  text-white md:flex-row md:p-12">
        <div className="z-10 max-w-md  space-y-6">
          <Typography variant={"h1"} className="font-semibold tracking-wide">
            Enterprise
          </Typography>
          <Typography variant={"paragraph"} className="tracking-wide">
            Lorem ipsum dolor sit amet consectetur. Suscipit ultricies lacus
            tristique a feugiat nunc. Cursus mauris tempor pulvinar risus
            tincidunt. Dictum adipiscing dictum nulla in convallis ac nam urna
            est.
          </Typography>
          <Link href={"/contact-us"}>
            <Button variant={"root"} className="w-32">
              Contact Us
            </Button>
          </Link>
        </div>
        <div className="z-10 flex flex-col md:max-w-lg md:flex-row md:items-start md:gap-4">
          <Typography variant={"list"}>
            <li>Lorem ipsum dolor sit amet psum dolor sit ame </li>
            <li>Lorem ipsum dolor sit amet </li>
            <li>Lorem ipsum dolor sit amet psum </li>
            <li>Lorem ipsum dolor sit </li>
            <li>Lorem ipsum dolor sit amet psum </li>
          </Typography>
          <Typography variant={"list"}>
            <li>Lorem ipsum dolor sit amet psum dolor sit ame </li>
            <li>Lorem ipsum dolor sit amet </li>
            <li>Lorem ipsum dolor sit amet psum </li>
            <li>Lorem ipsum dolor sit </li>
            <li>Lorem ipsum dolor sit amet psum </li>
          </Typography>
        </div>
      </Card>
      <Card className="bg-background-secondary z-10 flex flex-wrap items-center justify-center gap-5 rounded-xl rounded-t-none border-0 py-5 md:gap-16">
        <Image src={base} alt="" className=" w-20 md:w-auto " />
        <Image src={layerzero} alt="" className=" w-20 md:w-auto " />
        <Image src={wormhole} alt="" className=" w-20 md:w-auto " />
      </Card>
      <NewsletterSection />
    </div>
  );
}
