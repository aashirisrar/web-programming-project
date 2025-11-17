"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Twitter, Linkedin, Youtube, Instagram, Send } from "lucide-react";
import { motion } from "framer-motion";

const footerLinks = [
  {
    title: "Product",
    links: [
      { name: "Features", href: "#features" },
      { name: "Pricing", href: "#pricing" },
      { name: "Link Analytics", href: "#analytics" },
      { name: "Roadmap", href: "#roadmap" }
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About", href: "#about" },
      { name: "Blog", href: "#blog" },
      { name: "Careers", href: "#careers" },
      { name: "Press", href: "#press" }
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "API Documentation", href: "#docs" },
      { name: "Help Center", href: "#help" },
      { name: "Integration Guide", href: "#integrations" },
      { name: "Contact", href: "#contact" }
    ],
  },
  {
    title: "Legal",
    links: [
      { name: "Privacy", href: "#privacy" },
      { name: "Terms", href: "#terms" },
      { name: "Security", href: "#security" },
      { name: "Link Policy", href: "#linkpolicy" }
    ],
  },
];

const socialLinks = [
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Youtube, href: "#", label: "YouTube" },
  { icon: Instagram, href: "#", label: "Instagram" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="border-t border-slate-700/50"
    >
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">            <Link href="/" className="text-2xl font-bold text-white">
              LinksHubb
            </Link>
            <p className="mt-4 max-w-sm text-slate-400">
              Organize all your important links in one central hub.
              Create custom short URLs, track engagement, and boost your online presence with powerful link management.
            </p>
            <div className="mt-6">
              <div className="text-sm font-semibold text-white">Stay Updated</div>
              <div className="mt-2 flex items-center max-w-md gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="mt-0 border-slate-700 bg-slate-800 text-white placeholder:text-slate-400"
                />
                <Button className="bg-primary hover:bg-primary/90">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="lg:col-span-3 flex flex-wrap justify-between gap-8">
            {footerLinks.map((section) => (
              <div key={section.title} className="min-w-[100px] sm:min-w-[150px]">
                <div className="text-sm font-semibold text-white">
                  {section.title}
                </div>
                <ul className="mt-4 space-y-3">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-sm text-slate-400 transition-colors hover:text-white"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-700/50 pt-8 sm:flex-row">
          <div className="text-sm text-slate-400">
            © {currentYear}. All rights reserved.
          </div>
          <div className="flex gap-4">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <Link
                  key={social.label}
                  href={social.href}
                  className="text-slate-400 transition-colors hover:text-white"
                  aria-label={social.label}
                >
                  <Icon className="h-5 w-5" />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
