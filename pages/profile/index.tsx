import DashboardCard from "@/components/dashboard/dashboard-card";
import Image from "next/image";
import pfp from "@/assets/dashboard/pfp.svg";
import { Typography } from "@/components/ui/typography";
import { Input } from "@/components/ui/input";
import { EyeOff, PenIcon, Pencil, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import DashboardLayout from "@/components/dashboard/layout";

import { useUser, useAddress, useConnect } from "@thirdweb-dev/react";

export default function ProfilePage() {
  const { user, isLoggedIn, isLoading } = useUser();
  const address = useAddress();

  console.log({ user, isLoggedIn, isLoading, address });

  // if (!isLoggedIn) we display a message to log in
  // if (isLoading) we display a loading indicator
  // if (user) we display the user data

  return (
    <DashboardLayout>
      {isLoggedIn && <div>{user?.address}</div>}
      {isLoading && <div>Loading...</div>}
      {!isLoggedIn && address && <div>Not logged in</div>}
      {!address && <div>Please connect your wallet first</div>}

      <div className="space-y-6 md:space-y-12 px-1 py-2 md:px-0 md:py-6">
        <Typography variant={"h2"} className=" font-raleway">
          Profile
        </Typography>
        <DashboardCard className="flex flex-col items-center justify-between gap-8 md:flex-row md:items-start">
          <div className="flex flex-col items-center gap-8 md:flex-row">
            <Image src={pfp} alt="pfp" className="" />
            <div className="space-y-6 text-center md:text-start">
              <div className="space-y-2">
                <Typography variant={"h4"} className="block tracking-wide">
                  Username
                </Typography>
                <Typography
                  variant={"smallTitle"}
                  className="block tracking-wide"
                >
                  Sarahh232
                </Typography>
              </div>
              <Typography
                variant={"smallTitle"}
                className="block text-neutral-500"
              >
                Joined at 13 january
              </Typography>
            </div>
          </div>
          <Button
            variant={"outline"}
            className="flex w-full items-center gap-2 rounded-xl border-0 bg-[#00000021] hover:bg-[#00000016] dark:bg-[#FFFFFF21] dark:hover:bg-[#FFFFFF16] md:w-fit"
          >
            <Pencil className="h-4 w-4" />
            <div>Edit</div>
          </Button>
        </DashboardCard>
        <AccountDetails />
      </div>
    </DashboardLayout>
  );
}

const AccountDetails = () => {
  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-4 md:max-w-sm md:flex-row md:items-end md:justify-between">
        <div className="space-y-3">
          <Typography variant={"h4"}>Passward</Typography>
          <div className="flex items-center gap-4">
            <Input
              placeholder="**************"
              value={"**************"}
              disabled
              className="w-full border border-neutral-200 md:w-fit"
            />
            <EyeOff className="h-4 w-4 cursor-pointer md:hidden" />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <EyeOff className="h-4 w-4 hidden cursor-pointer md:block" />
          <Button variant={"secondary"} className="w-full md:w-fit">
            Change
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-start justify-between gap-4 md:max-w-sm md:flex-row">
        <div className="space-y-2">
          <Typography variant={"h4"}>Your Info</Typography>
          <Typography variant={"smallTitle"}>example23233@gmail.com</Typography>
        </div>
        <Button variant={"secondary"} className="w-full md:w-fit">
          Add Email
        </Button>
      </div>
    </div>
  );
};
