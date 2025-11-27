"use client";

import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";

import Heading from "./HeroHeading";
import Button from "./ButtonRed";
import { SubscriptionButton } from "./subscription-button";

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
  showLogin?: boolean;
  showRegister?: boolean;
  showPro?: boolean
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title = "No exact matches",
  subtitle = "Try changing or removing some of your filters",
  showLogin,
  showRegister,
  showPro
}) => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  return (
    <div className="h-[60vh] flex flex-col justify-center items-center">
      <Heading center title={title} subtitle={subtitle} />
      <div className="w-48 mt-4">
        {showLogin && (
          <Button outline label="Login" onClick={() => loginModal.onOpen()} />
        )}
        {showRegister && (
          <Button
            outline
            label="Sign Up"
            onClick={() => registerModal.onOpen()}
          />
        )}
        {showPro && (<div className="flex items-center justify-center">
          <SubscriptionButton isPro={!showPro} />
        </div>
        )}
      </div>
    </div>
  );
};

export default EmptyState;
