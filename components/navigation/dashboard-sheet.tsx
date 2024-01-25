import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import { DashboardSidebar } from "../dashboard/sidebar";
import { ThemeToggler } from "../ui/toggle-theme";

export function DashboardSheet() {
  return (
    <Sheet>
      <SheetTrigger>
        <MenuIcon className="rotate-90" />
      </SheetTrigger>
      <SheetContent side={"left"} className=" border-neutral-600 p-0">
        <DashboardSidebar />
        <div className=" absolute bottom-4 right-4">
          <ThemeToggler />
        </div>
      </SheetContent>
    </Sheet>
  );
}
