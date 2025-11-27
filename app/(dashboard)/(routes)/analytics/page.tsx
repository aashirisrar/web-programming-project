import { redirect } from "next/navigation";
import { AlertTriangle } from "lucide-react";

import prisma from "@/lib/prismadb";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { getCurrentUser } from "@/app/actions/getCurrentUser";
import EmptyState from "@/components/EmptyState";

import { getSubscription } from "@/app/actions/getSubscription";

export default async function AnalyticsPage() {
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

  if (!isPro) return (
    <EmptyState
      title="No premium subscription found."
      subtitle="Please upgrade to premium continue."
      showPro={!isPro}
    />
  );

  const user = await prisma.user.findUnique({
    where: {
      email: currentUser.email!
    },
    select: {
      id: true,
      username: true,
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

  const links = await prisma.link.findMany({
    where: {
      userId: user.id
    },
    orderBy: {
      position: "asc"
    },
    include: {
      analytics: true
    }
  });

  // Get analytics summary for all links
  const totalClicks = links.reduce((sum, link) => {
    const clicks = link.analytics?.[0]?.clickCount || 0;
    return sum + clicks;
  }, 0);
  return (
    <div className="container mx-auto py-8 px-4 md:px-8 max-w-6xl">
      <h1 className="text-3xl font-bold mb-8">Analytics</h1>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Link Analytics</CardTitle>
          <CardDescription>
            Track how your links are performing
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <h3 className="text-sm text-muted-foreground font-medium">Total Links</h3>
                    <p className="text-3xl font-bold mt-2">{links.length}</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <h3 className="text-sm text-muted-foreground font-medium">Total Clicks</h3>
                    <p className="text-3xl font-bold mt-2">{totalClicks}</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <h3 className="text-sm text-muted-foreground font-medium">Avg. Clicks Per Link</h3>
                    <p className="text-3xl font-bold mt-2">
                      {links.length > 0 ? (totalClicks / links.length).toFixed(1) : "0"}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Link Performance</h3>
              {links.length > 0 ? (
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="py-2 text-left">Link</th>
                      <th className="py-2 text-right">Clicks</th>
                      <th className="py-2 text-right">Last Clicked</th>
                    </tr>
                  </thead>
                  <tbody>
                    {links.map((link) => (
                      <tr key={link.id} className="border-b">
                        <td className="py-3">
                          <div className="font-medium">{link.title}</div>
                          <div className="text-sm text-muted-foreground truncate max-w-xs">
                            {link.url}
                          </div>
                        </td>
                        <td className="py-3 text-right">
                          {link.analytics?.[0]?.clickCount || 0}
                        </td>
                        <td className="py-3 text-right">
                          {link.analytics?.[0]?.lastClickedAt ?
                            new Date(link.analytics[0].lastClickedAt).toLocaleDateString() :
                            "Never"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    You haven&apos;t added any links yet. Add links to start tracking analytics.
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
