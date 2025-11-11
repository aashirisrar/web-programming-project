import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prismadb";
import { ProfileEditor } from "@/components/links/ProfileEditor";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import EmptyState from "@/components/EmptyState";
import { getCurrentUser } from "@/app/actions/getCurrentUser";

export default async function ProfilePage() {
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

  const user = await prisma.user.findUnique({
    where: {
      email: currentUser.email!
    },
    select: {
      id: true,
      username: true,
      bio: true,
      image: true,
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
    redirect("/username");
  }
  
  return (
    <div className="container mx-auto py-8 px-4 md:px-8 max-w-6xl">
      <h1 className="text-3xl font-bold mb-8">Profile Settings</h1>
      <div className="grid gap-6 md:grid-cols-2">        <ProfileEditor
        username={user.username}
        bio={user.bio}
        image={user.image}
      />
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Profile Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border rounded-md overflow-hidden h-[500px]">
              <iframe
                src={`/${user.username}`}
                className="w-full h-full"
                title="Profile Preview"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
