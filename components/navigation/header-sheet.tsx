import Image from "next/image";
import logoBlack from "@/assets/logo-black.svg";
import logoWhite from "@/assets/logo-white.svg";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import { NavLinks } from "./navbar";
import { Button } from "../ui/button";
import { ThemeToggler } from "../ui/toggle-theme";

export function HeaderSheet() {
  return (
    <Sheet>
      <SheetTrigger>
        <MenuIcon className="rotate-90" />
      </SheetTrigger>
      <SheetContent className=" border-neutral-600">
        <div className="mb-6">
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
        <div className="flex flex-col items-stretch gap-4">
          <NavLinks />
          <Button className="bg-gradient rounded-xl font-normal text-white hover:opacity-90">
            Subscribe
          </Button>
        </div>
        <div className=" absolute bottom-4 left-4">
          <ThemeToggler />
        </div>
      </SheetContent>
    </Sheet>
  );
}
