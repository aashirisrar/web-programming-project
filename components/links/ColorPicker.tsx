"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
}

const predefinedColors = [
  "#ffffff", "#000000", "#f43f5e", "#ec4899", 
  "#8b5cf6", "#6366f1", "#3b82f6", "#10b981", 
  "#84cc16", "#eab308", "#f59e0b", "#ef4444",
];

export const ColorPicker = ({ color, onChange }: ColorPickerProps) => {
  const [selectedColor, setSelectedColor] = useState(color || "#ffffff");

  useEffect(() => {
    setSelectedColor(color);
  }, [color]);

  const handleColorChange = (newColor: string) => {
    setSelectedColor(newColor);
    onChange(newColor);
  };

  return (
    <div className="flex items-center space-x-2">
      <div 
        className="h-8 w-8 rounded-md border border-gray-300 cursor-pointer"
        style={{ backgroundColor: selectedColor }}
        onClick={() => document.getElementById("color-input")?.click()}
      />
      <Input 
        id="color-input"
        type="color"
        value={selectedColor}
        onChange={(e) => handleColorChange(e.target.value)}
        className="w-0 h-0 opacity-0 absolute"
      />
      <Input 
        type="text"
        value={selectedColor}
        onChange={(e) => handleColorChange(e.target.value)}
        className="flex-1"
        placeholder="#ffffff"
      />
      
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="icon" className="h-8 w-8">
            <ChevronDown className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-64 p-3">
          <div className="grid grid-cols-4 gap-2">
            {predefinedColors.map((presetColor) => (
              <div
                key={presetColor}
                className="h-8 w-8 rounded-md cursor-pointer border border-gray-300"
                style={{ backgroundColor: presetColor }}
                onClick={() => handleColorChange(presetColor)}
              />
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
