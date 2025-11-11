"use client";

import { LoadingSpinner } from "@/components/ui/loading-spinner";

export default function RouteLoader() {
  return (
    <div className="h-[70vh] flex flex-col justify-center items-center">
      <LoadingSpinner size="lg" text="Loading..." />
    </div>
  );
} 