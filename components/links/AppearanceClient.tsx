"use client";

import { useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ColorPicker } from "@/components/links/ColorPicker";

interface AppearanceClientProps {
  username: string;
  theme: string;
  backgroundColor: string;
  textColor: string;
}

const themes = [
  { id: "light", name: "Light" },
  { id: "dark", name: "Dark" },
  { id: "gradient-blue", name: "Blue Gradient" },
  { id: "gradient-purple", name: "Purple Gradient" },
  { id: "minimal", name: "Minimal" },
];

export const AppearanceClient = ({
  username,
  theme,
  backgroundColor,
  textColor,
}: AppearanceClientProps) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState(theme || "light");
  const [profileBackgroundColor, setProfileBackgroundColor] = useState(backgroundColor || "#ffffff");
  const [profileTextColor, setProfileTextColor] = useState(textColor || "#000000");

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      
      await axios.patch("/api/profile", {
        theme: selectedTheme,
        backgroundColor: profileBackgroundColor,
        textColor: profileTextColor,
      });
      
      toast.success("Appearance updated successfully");
      router.refresh();
    } catch (error: any) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to update appearance");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Customize Appearance</CardTitle>
          <CardDescription>Change how your profile looks to visitors</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <Label>Theme</Label>
            <RadioGroup
              value={selectedTheme}
              onValueChange={setSelectedTheme}
              className="grid grid-cols-2 gap-4"
            >
              {themes.map((item) => (
                <div key={item.id} className="flex items-center space-x-2">
                  <RadioGroupItem value={item.id} id={item.id} />
                  <Label htmlFor={item.id} className="cursor-pointer">
                    {item.name}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Background Color</Label>
              <ColorPicker 
                color={profileBackgroundColor} 
                onChange={setProfileBackgroundColor} 
              />
            </div>
            
            <div className="space-y-2">
              <Label>Text Color</Label>
              <ColorPicker 
                color={profileTextColor} 
                onChange={setProfileTextColor} 
              />
            </div>
          </div>
          
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white"
          >
            Save Appearance
          </Button>
        </CardContent>
      </Card>
    </>
  );
};
