import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getUserByUsername } from "@/app/actions/getUserByUsername";
import { PublicProfile } from "@/components/links/PublicProfile";

interface ProfilePageParams {
    username: string;
}

export const generateMetadata = async ({ params }: { params: Promise<ProfilePageParams> }): Promise<Metadata> => {
  const { username } = await params;
  const profile = await getUserByUsername(username);

  if (!profile) {
    return {
      title: "Profile Not Found",
    };
  }

  return {
    title: `${profile.name || profile.username} | Links`,
    description: profile.bio || `Check out ${profile.username}'s links`,
  };
}

const ProfilePage = async ({ params }: { params: Promise<ProfilePageParams> }) => {
  const { username } = await params;
  const profile = await getUserByUsername(username);

  if (!profile) {
    notFound();
  }

  return (
    <PublicProfile profile={profile} />
  );
}

export default ProfilePage;