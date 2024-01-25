import Image from "next/image";
import logoBlack from "@/assets/logo-black.svg";
import logoWhite from "@/assets/logo-white.svg";
import logo from "@/assets/logo-symbol.svg";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ThemeToggler } from "../ui/toggle-theme";
import { ConnectWalletButton } from "../ui/connect-button";
import { DashboardSheet } from "./dashboard-sheet";

interface DashboardHeaderProps {
  showLogo?: boolean;
}

export function DashboardHeader({ showLogo }: DashboardHeaderProps) {
  return (
    <div
      className={cn(
        showLogo ? "md:px-0" : "md:px-10",
        "border-foreground/10 flex w-full items-center justify-between gap-3 border-b bg-white px-4 py-5  backdrop-blur-md dark:border-neutral-700 dark:bg-[#110E14] md:justify-end",
      )}
    >
      <Link href={"/"}>
        <Image src={logo} alt="Icon" className="block w-10 md:hidden" />
      </Link>

      {showLogo && (
        <Link href={"/airdrops"} className="mr-auto hidden self-start md:block">
          <div>
            <Image
              src={logoBlack}
              alt="mintly logo"
              className="block w-40 dark:hidden"
            />
            <Image
              src={logoWhite}
              alt="mintly logo"
              className="hidden w-40 dark:block"
            />
          </div>
        </Link>
      )}

      <div className="hidden items-center gap-3 md:flex">
        <ThemeToggler />
        <ConnectWalletButton />
      </div>
      <div className="block md:hidden">
        <DashboardSheet />
      </div>
    </div>
  );
}
