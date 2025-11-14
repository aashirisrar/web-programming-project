"use client";

import { useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FormInput } from "./FormInput";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImageUpload } from "./ImageUpload";

interface ProfileEditorProps {
  username: string;
  bio: string | null;
  image: string | null;
}

export const ProfileEditor = ({
  username,
  bio,
  image,
}: ProfileEditorProps) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [profileUsername, setProfileUsername] = useState(username);
  const [profileBio, setProfileBio] = useState(bio || "");
  const [profileImage, setProfileImage] = useState(image || "");
  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      
      await axios.patch("/api/profile", {
        username: profileUsername,
        bio: profileBio,
        image: profileImage,
      });
      
      toast.success("Profile updated successfully");
      router.refresh();
    } catch (error: any) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to update profile");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Edit Your Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <FormInput
            label="Username"
            value={profileUsername}
            onChange={(e) => setProfileUsername(e.target.value)}
            required
          />
          
          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              value={profileBio}
              onChange={(e) => setProfileBio(e.target.value)}
              placeholder="Tell visitors about yourself"
              className="resize-none h-24"
            />
          </div>
          
          <div className="space-y-2">
            <Label>Profile Image</Label>
            <ImageUpload
              value={profileImage}
              onChange={(url) => setProfileImage(url)}
            />
          </div>
          
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white"
          >
            Save Profile
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
