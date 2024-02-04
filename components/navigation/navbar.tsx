import logoDark from "@/assets/dark-logo.svg";
import logoLight from "@/assets/light-logo.svg";
import logo from "@/assets/logo-symbol.svg";
import Image from "next/image";
import Link from "next/link";
import { ThemeToggler } from "../ui/toggle-theme";
import { Button, buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";
import { HeaderSheet } from "./header-sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NavLinks {
  label: string;
  paths: {
    href: string;
    label: string;
  }[];
}

const navLinks: NavLinks[] = [
  {
    label: "Layerzero",
    paths: [
      {
        href: "/layerzero/onft-mint",
        label: "",
      },
      {
        href: "/layerzero/onft-bridge",
        label: "",
      },
      {
        href: "https://layerzeroscan.com/",
        label: "",
      },
      {
        href: "#",
        label: "",
      },
    ],
  },
];

export function Header() {
  return (
    <div className="fixed z-50 flex w-full items-center justify-between border-b border-neutral-400/50 bg-white/50 p-4 backdrop-blur-xl dark:bg-black/50 md:px-16 md:py-4">
      <Link href={"/"}>
        <div className="hidden md:block">
          <Image
            src={logoDark}
            alt="mintly logo"
            className="block w-40 dark:hidden"
          />
          <Image
            src={logoLight}
            alt="mintly logo"
            className="hidden w-40 dark:block"
          />
        </div>
        <Image src={logo} alt="Icon" className="block w-10 md:hidden" />
      </Link>
      <div className="hidden items-center gap-3 md:flex">
        <NavLinks />
      </div>
      <div className="hidden items-center gap-3 md:flex">
        <ThemeToggler />
        <Link href={"/contact-us"}>
          <Button className="bg-gradient rounded-xl font-normal  text-white hover:opacity-90">
            Contact Us
          </Button>
        </Link>
      </div>
      <div className="block md:hidden">
        <HeaderSheet />
      </div>
    </div>
  );
}

export function NavLinks() {
  return (
    <>
      <Link
        href={"/dashboard"}
        className={cn(buttonVariants({ variant: "navbar" }))}
      >
        Airdrop
      </Link>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="w-full">
          <Button className="" variant={"navbar"}>
            Layerzero
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="border-0 bg-[#E8E8E8]/70 dark:bg-black/30 backdrop-blur-xl">
          <Link href={"/layerzero/onft-mint"}>
            <DropdownMenuItem className=" cursor-pointer">
              ONFT Mint
            </DropdownMenuItem>
          </Link>

          <Link href={"/layerzero/onft-bridge"}>
            <DropdownMenuItem className=" cursor-pointer">
              ONFT Bridge
            </DropdownMenuItem>
          </Link>
          <Link href={"https://layerzeroscan.com/"} target="_blank">
            <DropdownMenuItem className=" cursor-pointer">
              Explorer
            </DropdownMenuItem>
          </Link>

          <DropdownMenuItem disabled>
            <Link aria-disabled href={"#"}>
              ONFT & Mint Bridge
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild className="w-full">
          <Button className="" variant={"navbar"}>
            Wormhole
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="border-0 bg-[#E8E8E8]/70 dark:bg-black/30 backdrop-blur-xl">
          <Link href={"/wormhole/nft-mint"}>
            <DropdownMenuItem className=" cursor-pointer">
              NFT Mint
            </DropdownMenuItem>
          </Link>
          <Link href={"/wormhole/nft-bridge"}>
            <DropdownMenuItem className=" cursor-pointer">
              wNFT Bridge
            </DropdownMenuItem>
          </Link>
          <Link href={"https://wormholescan.io/"}>
            <DropdownMenuItem className=" cursor-pointer">
              Explorer
            </DropdownMenuItem>
          </Link>
          <Link href={"#"}>
            <DropdownMenuItem disabled className=" cursor-pointer">
              ERC20 & Mint Bridge
            </DropdownMenuItem>
          </Link>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild className="w-full">
          <Button className="" variant={"navbar"}>
            Featured
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="border-0 bg-[#E8E8E8]/70 dark:bg-black/30 backdrop-blur-xl">
          <Link href={"/featured/onft-mint"}>
            <DropdownMenuItem className=" cursor-pointer">
              oNFT Mint
            </DropdownMenuItem>
          </Link>
          <Link href={"/featured/wnft-bridge"}>
            <DropdownMenuItem className=" cursor-pointer">
              wNFT Bridge
            </DropdownMenuItem>
          </Link>
          <Link href={"/featured/wERC20-bridge"}>
            <DropdownMenuItem className=" cursor-pointer">
              wERC20 Bridge
            </DropdownMenuItem>
          </Link>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild className="w-full">
          <Button className="" variant={"navbar"}>
            Resources
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="border-0 bg-[#E8E8E8]/70 dark:bg-black/30 backdrop-blur-xl">
          <Link href={"/blogs"}>
            <DropdownMenuItem className=" cursor-pointer">
              Blogs
            </DropdownMenuItem>
          </Link>
          <Link href={"/chains"}>
            <DropdownMenuItem className=" cursor-pointer">
              Supported Chains
            </DropdownMenuItem>
          </Link>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
