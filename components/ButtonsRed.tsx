"use client";

import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";

import Button from "./ButtonRed";

const Buttons = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  return (
    <div className="flex flex-row gap-8 w-1/2">
      <Button onClick={() => registerModal.onOpen()} label="Sign Up" />
      <Button onClick={() => loginModal.onOpen()} label="Log In" />
    </div>
  );
};

export default Buttons;
