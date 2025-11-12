"use client";

import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";

import {
  Check,
  FileText,
  Layout,
  Palette,
  PlayCircle,
  Zap,
  BarChart,
  Headset,
} from "lucide-react";

import { cn } from "@/lib/utils";

import { useProModal } from "@/app/hooks/useProModal";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const tools = [
  {
    label: "Unlimited LinksHubb Generation",
    icon: FileText,
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
  },
  {
    label: "Advanced LinksHubb Layouts",
    icon: Layout,
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
  },
  {
    label: "Client Engagement Analytics",
    icon: BarChart,
    color: "text-pink-500",
    bgColor: "bg-pink-500/10",
  },
  {
    label: "Custom LinksHubb Templates",
    icon: Palette,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
  },
  {
    label: "Priority Support",
    icon: Headset,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
];

export const ProModal = () => {
  const proModal = useProModal();
  const [loading, setLoading] = useState(false);

  const onSubscribe = async () => {
    try {
      setLoading(true);
      const response = axios.get("/api/polar");

      window.location.href = (await response).data.url;
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2">
            <div className="flex items-center gap-x-2 font-bold py-1">
              Upgrade to LinksHubb
              <Badge variant="premium" className="uppercase text-sm py-1">
                pro
              </Badge>
            </div>
          </DialogTitle>
          <DialogDescription className="text-center pt-2 space-y-2 text-zinc-900 font-medium">
            {tools.map((tool) => (
              <Card
                key={tool.label}
                className="p-3 border-black/5 flex items-center justify-between"
              >
                <div className="flex items-center gap-x-4">
                  <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                    <tool.icon className={cn("w-6 h-6", tool.color)} />
                  </div>
                  <div className="font-semibold text-sm">{tool.label}</div>
                </div>
                <Check className="text-primary w-5 h-5" />
              </Card>
            ))}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            disabled={loading}
            onClick={onSubscribe}
            variant="premium"
            size="lg"
            className="w-full"
          >
            Upgrade
            <Zap className="w-4 h-4 ml-2 fill-white" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
