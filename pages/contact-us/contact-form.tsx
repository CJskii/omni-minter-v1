import layerzero from "@/assets/layerzero-logo.svg";
import wormhole from "@/assets/warmhole-logo.svg";
import layerzeroDark from "@/assets/homepage-background/layerzerk-dark.svg";
import wormholeDark from "@/assets/homepage-background/wormhole-dark.png";
import { Typography } from "@/components/ui/typography";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import { Button } from "@/components/ui/button";

export default function Contact() {
  return (
    <div className="flex min-h-screen py-6 md:py-16 gap-10 md:pb-40 flex-col md:flex-row md:items-center md:justify-around">
      <div className="z-10 space-y-12 md:w-5/12">
        <Typography className="max-w-xs text-4xl font-extrabold leading-snug tracking-wide md:max-w-4xl lg:max-w-3xl lg:text-7xl md:text-5xl md:leading-none">
          Speak to our team and learn{" "}
          <span className="text-secondary">more about our work</span>
        </Typography>
        <div className="md:max-w-xl space-y-2">
          <Typography variant={"large"}>
            Trusted by leading companies
          </Typography>
          <div className="bg-background-secondary dark:bg-white rounded-xl ">
            <Marquee autoFill pauseOnClick>
              <div className=" flex w-full items-center py-5">
                <Image
                  alt="layerzero-logo"
                  src={layerzero}
                  className="mx-6 dark:hidden block"
                />
                <Image
                  alt="wormhole-logo"
                  src={wormhole}
                  className="mx-6 dark:hidden block"
                />
                <Image
                  alt="layerzero-logo"
                  src={layerzeroDark}
                  className="mx-6 hidden dark:block"
                />
                <Image
                  alt="wormhole-logo"
                  src={wormholeDark}
                  className="mx-6 hidden dark:block w-40"
                />
              </div>
            </Marquee>
          </div>
        </div>
      </div>
      <ContactForm />
    </div>
  );
}

const ContactForm = () => {
  return (
    <div className="w-full md:w-5/12 bg-gradient p-4 md:p-6 rounded-xl">
      <div className=" space-y-5 md:space-y-8 p-6 md:p-10 bg-white/30 rounded-xl">
        <div className="flex items-center gap-5 md:gap-3 md:flex-row flex-col">
          <Input
            placeholder="First Name"
            className=" dark:bg-white dark:border-0"
          />
          <Input
            placeholder="Last Name"
            className=" dark:bg-white dark:border-0"
          />
        </div>
        <Input
          placeholder="Your Company Name"
          className=" dark:bg-white dark:border-0"
        />
        <Input
          placeholder="Your Company Email "
          className=" dark:bg-white dark:border-0"
        />
        <Input
          placeholder="Your Company  Website"
          className=" dark:bg-white dark:border-0"
        />
        <Input
          placeholder="Job Title"
          className=" dark:bg-white dark:border-0"
        />
        <Input
          placeholder="What industry  is your company is most closley aligned with?"
          className=" dark:bg-white dark:border-0"
        />
        <Input
          placeholder="Your message..."
          className=" dark:bg-white dark:border-0"
        />
        <Button className=" dark:bg-black dark:text-white dark:hover:bg-black/80 rounded-xl">
          Submit
        </Button>
      </div>
    </div>
  );
};
