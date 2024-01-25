import React from "react";
import { DashboardContainer } from "../ui/Container";
import { Footer } from "../ui/footer";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <DashboardContainer>
        <div className="min-h-screen">{children}</div>
      </DashboardContainer>
      <div className="">
        <Footer isDashboard />
      </div>
    </>
  );
}
