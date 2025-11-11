"use client";

import * as React from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingSpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "default" | "lg";
  fullScreen?: boolean;
  text?: string;
  color?: "primary" | "white" | "muted" | "default";
}

export function LoadingSpinner({
  size = "default",
  fullScreen = false,
  text,
  color = "primary",
  className,
  ...props
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    default: "h-6 w-6",
    lg: "h-8 w-8",
  };

  const colorClasses = {
    primary: "text-primary",
    white: "text-white",
    muted: "text-muted-foreground",
    default: "text-foreground",
  };

  const spinner = (
    <div
      className={cn(
        "flex items-center justify-center gap-2",
        fullScreen && "fixed inset-0 bg-background/80 backdrop-blur-sm",
        className
      )}
      {...props}
    >
      <Loader2 
        className={cn(
          "animate-spin",
          sizeClasses[size],
          colorClasses[color]
        )} 
      />
      {text && (
        <p className="text-sm text-muted-foreground animate-pulse">
          {text}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {spinner}
      </div>
    );
  }

  return spinner;
} 