import { redirect } from "next/navigation";
import prisma from "@/lib/prismadb";
import { AppearanceClient } from "@/components/links/AppearanceClient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import EmptyState from "@/components/EmptyState";
import { getCurrentUser } from "@/app/actions/getCurrentUser";
import { getUserByUsername } from "@/app/actions/getUserByUsername";
import { PublicProfile } from "@/components/links/PublicProfile";

export default async function AppearancePage() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <EmptyState
        title="Not logged in."
        subtitle="Please login to continue."
        showLogin
      />
    );
  }

  const profile = await getUserByUsername(currentUser.username!!);

  const user = await prisma.user.findUnique({
    where: {
      email: currentUser.email!
    },
    select: {
      id: true,
      username: true,
      theme: true,
      backgroundColor: true,
      textColor: true,
    }
  });

  if (!user) {
    return (
      <EmptyState
        title="Not logged in."
        subtitle="Please login to continue."
        showLogin
      />
    );
  }

  // Redirect to username setup if no username set
  if (!user.username) {
    redirect("/settings");
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-8 max-w-6xl">
      <h1 className="text-3xl font-bold mb-8">Appearance</h1>

      <div className="grid gap-6 md:grid-cols-2">
        <AppearanceClient
          username={user.username}
          theme={user.theme || "light"}
          backgroundColor={user.backgroundColor || "#ffffff"}
          textColor={user.textColor || "#000000"}
        />
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Live Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border rounded-md overflow-hidden h-[500px]">
                <PublicProfile profile={profile!!} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
