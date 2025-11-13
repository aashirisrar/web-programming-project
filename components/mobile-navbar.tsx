"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { Package2 } from "lucide-react";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { BiMenu } from "react-icons/bi";
import Image from "next/image";

const MobileDashboard = () => {
  const routess = [
    {
      label: "About",
      href: "#",
    },
    {
      label: "Features",
      href: "#product",
    },
    {
      label: "Pricing",
      href: "#pricing",
    },
    {
      label: "Testimonials",
      href: "#testimonials",
    },
    {
      label: "Help",
      href: "#",
    },
  ];

  const pathName = usePathname();

  return (
    <header className="md:hidden flex h-14 items-center gap-4 lg:h-[60px] lg:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <BiMenu className="h-5 w-5 md:hidden" />
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <nav className="grid gap-2 text-lg font-medium">
            <SheetClose asChild>
            <Link href="/dashboard">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg text-sidebar-primary-foreground">
                  <Image
                    src="/images/icon.png"
                    alt="LinksHubb Logo"
                    width={32}
                    height={32}
                    className="object-contain"
                  />
                </div>
                <span className="truncate font-semibold">LinksHubb</span>
              </Link>
            </SheetClose>
            {routess.map((route) => (
              <SheetClose asChild key={route.href}>
                <Link
                  href={route.href}
                  key={route.href}
                  className={cn(
                    "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground",
                    pathName === route.href
                      ? "bg-muted text-primary"
                      : "text-muted-foreground "
                  )}
                >
                  {route.label}
                </Link>
              </SheetClose>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  );
};

export default MobileDashboard;
