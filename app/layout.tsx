import type { Metadata } from "next";
import { Montserrat } from 'next/font/google'
import "@/app/globals.css";
import ThemeWrapper from "@/components/ThemeWrapper";
import { Toaster } from "sonner";

import LoginModal from "@/components/modals/LoginModal";
import RegisterModal from "@/components/modals/RegisterModal";
import { ProModal } from "@/components/dashboard/pro-modal";

import { cn } from "@/lib/utils";

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['500', '700'],
})

export const metadata: Metadata = {
  title: "LinksHubb - Your Personal Link Tree",
  description:
    "Create and share your personalized link tree. Gather all your important links in one place and share your profile with the world. Perfect for creators, professionals, and anyone who wants to showcase their online presence.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="relative" suppressHydrationWarning>
      <body className={cn(montserrat.className, "antialiased bg-[#0b0121]")}>
        <ThemeWrapper>
          <LoginModal />
          <RegisterModal />
          <ProModal />
          {children}
          <Toaster />
        </ThemeWrapper>
      </body>
    </html>
  );
}
