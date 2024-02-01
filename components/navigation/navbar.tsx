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

interface Path {
  label: string;
  path: string;
}

const paths: Path[] = [];

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
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="w-full">
          <Button className="" variant={"navbar"}>
            Layerzero
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="border-0 bg-white/30 dark:bg-black/30 backdrop-blur-xl">
          <DropdownMenuItem>
            <Link href={"/layerzero/onft-mint"}>ONFT Mint</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href={"/layerzero/onft-bridge"}>ONFT Bridge</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href={"https://layerzeroscan.com/"} target="_blank">
              Explorer
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem disabled>
            <Link href={"#"}>ONFT & Mint Bridge</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild className="w-full">
          <Button className="" variant={"navbar"}>
            Wormhole
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="border-0 bg-white/30 dark:bg-black/30 backdrop-blur-xl">
          <DropdownMenuItem>
            <Link href={"/wormhole/nft-mint"}>NFT Mint</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href={"/wormhole/nft-bridge"}>NFT Bridge</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href={"https://wormholescan.io/"}>Explorer</Link>
          </DropdownMenuItem>
          <DropdownMenuItem disabled>
            <Link href={"#"}>ERC20 & Mint Bridge</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Link
        href={"/dashboard"}
        className={cn(buttonVariants({ variant: "navbar" }))}
      >
        Airdrop
      </Link>
      <Link
        href={"/featured"}
        className={cn(buttonVariants({ variant: "navbar" }))}
      >
        Featured
      </Link>
    </>
  );
}
