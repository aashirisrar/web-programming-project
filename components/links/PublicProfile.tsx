"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { LinkCard } from "./LinkCard";
import { getThemeStyles } from "@/lib/utils";

interface Link {
  id: string;
  title: string;
  url: string;
  position: number;
}

export interface Profile {
  id: string;
  name: string | null;
  username: string | null;
  image: string | null;
  bio: string | null;
  theme: string | null;
  backgroundColor: string | null;
  textColor: string | null;
  links: Link[];
}

interface PublicProfileProps {
  profile: Profile;
}

export const PublicProfile = ({ profile }: PublicProfileProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const themeStyles = getThemeStyles(
    profile.theme || "light",
    profile.backgroundColor || "#ffffff",
    profile.textColor || "#000000"
  );

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center py-8 px-4 transition-colors"
      style={themeStyles.container}
    >
      <div className="w-full max-w-md mx-auto">
        <div className="flex flex-col items-center mb-8">
          {profile.image && (
            <div className="relative w-24 h-24 mb-4 overflow-hidden rounded-full border-2 border-white shadow-md">
              <Image
                src={profile.image}
                alt={profile.username || "Profile"}
                fill
                style={{ objectFit: "cover" }}
                className="rounded-full"
                priority
              />
            </div>
          )}
          
          <h1 className="text-2xl font-bold" style={{ color: themeStyles.text.color }}>
            {profile.name || `@${profile.username}`}
          </h1>
          
          {profile.username && profile.name && (
            <p className="text-sm opacity-70 mb-2" style={{ color: themeStyles.text.color }}>
              @{profile.username}
            </p>
          )}
          
          {profile.bio && (
            <p 
              className="text-center max-w-sm mt-2 text-sm"
              style={{ color: themeStyles.text.color }}
            >
              {profile.bio}
            </p>
          )}
        </div>
        
        <div className="space-y-4">
          {profile.links.map((link) => (
            <LinkCard
              key={link.id}
              id={link.id}
              title={link.title}
              url={link.url}
              onDelete={() => {}}
              isEditable={false}
            />
          ))}
          
          {profile.links.length === 0 && (
            <div 
              className="text-center p-6 border border-dashed rounded-md"
              style={{ borderColor: themeStyles.text.color, color: themeStyles.text.color }}
            >
              <p>No links added yet</p>
            </div>
          )}
        </div>
        
        <footer className="mt-12 text-center text-xs opacity-50" style={{ color: themeStyles.text.color }}>
          <a href="/" target="_blank" rel="noopener noreferrer" className="hover:underline">
            Create your own link page
          </a>
        </footer>
      </div>
    </div>
  );
};
