import DashboardHome from "@/components/dashboard/dashboard-home";
import DashboardLayout from "@/components/dashboard/layout";
import Provider from "@/components/dashboard/provider";
import { DashboardContainer } from "@/components/ui/Container";
import { Footer } from "@/components/ui/footer";

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="flex items-center justify-center md:py-6 ">
        <DashboardHome />
      </div>
    </DashboardLayout>
  );
}
