import DashboardClient from "./DashboardClient";
import EmptyState from "@/components/EmptyState";
import { getSubscription } from "@/app/actions/getSubscription";
import { getCurrentUser } from "@/app/actions/getCurrentUser";
import prisma from "@/lib/prismadb"
import { getUserByUsername } from "@/app/actions/getUserByUsername";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const currentUser = await getCurrentUser();
  const isPro = await getSubscription();

  if (!currentUser) {
    return (
      <EmptyState
        title="Not logged in."
        subtitle="Please login to continue."
        showLogin
      />
    );
  }

  if (!currentUser.username) {
    redirect("/settings");
  }

  const profile = await getUserByUsername(currentUser.username!!);

  if (!profile) {
    return (
      <EmptyState
        title="Not logged in."
        subtitle="Please login to continue."
        showLogin
      />
    )
  }

  const links = await prisma.link.findMany({
    where: {
      userId: currentUser.id
    },
    orderBy: {
      position: "asc"
    },
    include: {
      analytics: true
    }
  });

  return <div className="py-3 sm:p-6 lg:p-8"> <DashboardClient links={links} profile={profile} currentUser={currentUser} /></div>;
}
