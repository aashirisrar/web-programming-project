import { DM_Sans } from "next/font/google";

import { Separator } from "@/components/ui/separator";
import { getCurrentUser } from "../actions/getCurrentUser";
import { getSubscription } from "../actions/getSubscription";

import SidebarDashboard from "@/components/dashboard/sidebar-dashboard";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

import { getApiCredits } from "@/lib/api-limit";

import { NavActions } from "@/components/dashboard/nav-actions";
import BreadcrumbComponent from "@/components/BreadcrumbComponent";
import ThemeWrapper from "@/components/ThemeWrapper";

const dmSans = DM_Sans({ subsets: ["latin"] });

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const currentUser = await getCurrentUser();
  const isPro = await getSubscription();
  const credits = await getApiCredits();

  return (
    <ThemeWrapper>
      <SidebarProvider className={dmSans.className}>
        {currentUser && <SidebarDashboard credits={credits} currentUser={currentUser} isPro={isPro} />}
        <SidebarInset>
          {currentUser && (
            <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
              <div className="flex flex-1 items-center gap-2">
                <SidebarTrigger className="p-[3px]" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <BreadcrumbComponent />
              </div>
              <div className="ml-auto md:px-4">
                <NavActions currentUser={currentUser} />
              </div>
            </header>
          )}
          <div className="flex flex-1 flex-col gap-4 md:p-4">
            {children}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </ThemeWrapper>
  );
};

export default DashboardLayout;