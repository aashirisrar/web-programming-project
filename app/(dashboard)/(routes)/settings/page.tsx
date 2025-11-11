import { getCurrentUser } from "@/app/actions/getCurrentUser";
import { getSubscription } from "@/app/actions/getSubscription";

import Heading from "@/components/HeroHeading";
import EmptyState from "@/components/EmptyState";
import SettingsClient from "./SettingsClient";
import { SubscriptionButton } from "@/components/subscription-button";
import ThemeToggleButton from "@/components/ThemeToggleButton"
import UsernameClient from "@/components/UsernameClient";

const SettingsPage = async () => {
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
    return <UsernameClient />
  }

  return (
    <section className="p-6 sm:p-10 lg:p-14">
      <Heading title="Settings" subtitle="Customize your preferences." />
      <SettingsClient username={currentUser?.username!!} />
      <div className="py-6 space-y-6">
        <Heading title="Your Profile" subtitle="Manage your subscriptions." />
        <div className="space-y-4">
          <div className="text-muted-foreground text-sm">
            {isPro
              ? "You are currently on a pro plan."
              : "You are currently on a free plan."}
          </div>
          <SubscriptionButton isPro={isPro} />
        </div>
      </div>
      <div className="py-6 space-y-4">
        <Heading title="Theme" subtitle="Change your theme." />
        <ThemeToggleButton />
      </div>
    </section>
  );
};

export default SettingsPage;
