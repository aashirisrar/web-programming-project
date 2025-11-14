"use client";

import { useState, forwardRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, ExternalLink, GripVertical } from "lucide-react";
import { FormInput } from "./FormInput";
import { toast } from "sonner";
import axios from "axios";
import { useRouter } from "next/navigation";

interface LinkCardProps {
  id: string;
  title: string;
  url: string;
  onDelete: (id: string) => void;
  isEditable?: boolean;
  isDragging?: boolean;
  dragHandleProps?: any;
  style?: React.CSSProperties;
}

export const LinkCard = forwardRef<HTMLDivElement, LinkCardProps>(
  ({ id, title, url, onDelete, isEditable = true, isDragging = false, dragHandleProps, style, ...props }, ref) => {
    const router = useRouter();
    const [isEditing, setIsEditing] = useState(false);
    const [linkTitle, setLinkTitle] = useState(title);
    const [linkUrl, setLinkUrl] = useState(url);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleEdit = async () => {
      if (isEditing) {
        try {
          setIsSubmitting(true);
          await axios.patch(`/api/links/${id}`, {
            title: linkTitle,
            url: linkUrl
          });
          toast.success("Link updated");
          setIsEditing(false);
          router.refresh();
        } catch (error) {
          console.error(error);
          toast.error("Failed to update link");
        } finally {
          setIsSubmitting(false);
        }
      } else {
        setIsEditing(true);
      }
    };

    const handleDelete = async () => {
      try {
        await axios.delete(`/api/links/${id}`);
        onDelete(id);
        toast.success("Link deleted");
        router.refresh();
      } catch (error) {
        console.error(error);
        toast.error("Failed to delete link");
      }
    };

    const handleLinkClick = async (e: React.MouseEvent) => {
      if (isEditable) return;

      try {
        await axios.post(`/api/links/${id}/click`);
      } catch (error) {
        console.error("Failed to record click", error);
      }
    }; return (
      <Card
        ref={ref}
        style={style}
        {...props}
        className={`w-full border border-dashed shadow-sm mb-4 ${isDragging ? 'opacity-50' : ''}`}
      >
        <CardContent className="p-4">
          {isEditing ? (
            <div className="space-y-4">
              <FormInput
                label="Title"
                value={linkTitle}
                onChange={(e) => setLinkTitle(e.target.value)}
              />
              <FormInput
                label="URL"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
              />
              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => {
                    setLinkTitle(title);
                    setLinkUrl(url);
                    setIsEditing(false);
                  }}
                  disabled={isSubmitting}
                  className="mr-2"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleEdit}
                  disabled={isSubmitting}
                >
                  Save
                </Button>
              </div>
            </div>) : (
            <div className="flex items-center gap-3">
              {/* Drag Handle */}
              {isEditable && (
                <div
                  {...dragHandleProps}
                  className="cursor-move p-1"
                >
                  <GripVertical className="h-4 w-4" />
                </div>
              )}

              {/* Link Content */}
              <div className="flex-1">
                <a
                  href={linkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-fit flex items-center gap-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                  onClick={handleLinkClick}
                >
                  <h3 className="font-medium text-lg">{linkTitle}</h3>
                  {!isEditable && <ExternalLink size={16} />}
                </a>
                {isEditable && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{linkUrl}</p>
                )}
              </div>

              {/* Action Buttons */}
              {isEditable && (
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={handleEdit}
                    className="h-8 w-8 p-0"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={handleDelete}
                    className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>)}
        </CardContent>
      </Card>
    );
  });

LinkCard.displayName = "LinkCard";
