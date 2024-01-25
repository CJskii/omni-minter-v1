import React from "react";
import AirdropDetails from "./airdrop-details";
import QuestsDetails from "./quests-details";
import DashboardLayout from "@/components/dashboard/layout";
import dynamic from "next/dynamic";

function AirdropPage() {
  return (
    <DashboardLayout>
      <div className="mx-auto md:max-w-7xl">
        <div className="airdrop-layout py-6">
          <AirdropDetails />
          <QuestsDetails />
        </div>
      </div>
    </DashboardLayout>
  );
}

export default dynamic(() => Promise.resolve(AirdropPage), {
  ssr: false,
});
