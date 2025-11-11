"use client"

import { LinkList } from "@/components/links/LinkList";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "@prisma/client";
import { SafeUser } from "@/types";
import { Profile, PublicProfile } from "@/components/links/PublicProfile";

interface DashboardClientProps {
  links: Link[];
  currentUser: SafeUser
  profile: Profile
}

const DashboardClient: React.FC<DashboardClientProps> = ({ links, currentUser, profile }) => {
  return (
    <div className="container mx-auto py-8 px-4 md:px-8 max-w-6xl">
      <h1 className="text-3xl font-bold mb-8">Manage Your Links</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <LinkList initialLinks={links} />
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Preview Your Page</CardTitle>
              <CardDescription>
                This is how your page looks to visitors
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-md overflow-hidden h-[500px]">
                <PublicProfile profile={profile} />
              </div>
              <div className="mt-4">
                <p className="text-sm text-muted-foreground">
                  Your public link: <a
                    href={`/${currentUser.username}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-blue-600 hover:underline"
                  >
                    {`${process.env.NEXT_PUBLIC_APP_URL ?? window.location.origin}/${currentUser.username}`}
                  </a>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardClient;
