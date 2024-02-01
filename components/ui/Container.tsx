"use client";
import { ComponentProps, useState } from "react";
import { DashboardSidebar } from "../dashboard/sidebar";
import { DashboardHeader } from "../navigation/dashboard-header";

export function DashboardContainer({ children }: ComponentProps<"div">) {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  function collapse() {
    setIsCollapsed((prev) => !prev);
  }
  return (
    <div className="flex flex-col items-start justify-normal gap-6">
      <div className=" flex w-full items-start justify-normal">
        <div className="fixed z-50 hidden md:block">
          <DashboardSidebar />
        </div>
        <div className=" fixed z-40 w-full">
          <DashboardHeader />
        </div>
        <div className="w-full p-6 py-28 md:pl-[125px] md:py-24 lg:pl-[320px] 2xl:pl-[360px] lg:pr-9">
          {children}
        </div>
      </div>
    </div>
  );
}

export function Container({ children }: ComponentProps<"div">) {
  return (
    <div className=" font-raleway space-y-11 p-6 md:space-y-44 md:p-16">
      {children}
    </div>
  );
}
