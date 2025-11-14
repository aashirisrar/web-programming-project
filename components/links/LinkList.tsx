"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle } from "lucide-react";
import { LinkCard } from "./LinkCard";
import { FormInput } from "./FormInput";

// DnD Kit imports
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

// Link type definition
interface Link {
  id: string;
  title: string;
  url: string;
  position: number;
}

// SortableLink component
const SortableLink = ({ link, onDelete }: { link: Link; onDelete: (id: string) => void }) => {
  const { 
    attributes, 
    listeners, 
    setNodeRef, 
    transform, 
    transition,
    isDragging 
  } = useSortable({
    id: link.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <LinkCard
      ref={setNodeRef}
      style={style}
      id={link.id}
      title={link.title}
      url={link.url}
      onDelete={onDelete}
      isDragging={isDragging}
      dragHandleProps={{ ...attributes, ...listeners }}
    />
  );
};

export const LinkList = ({ initialLinks = [] }: { initialLinks?: Link[] }) => {
  const router = useRouter();
  const [links, setLinks] = useState<Link[]>(initialLinks);
  const [isAddingLink, setIsAddingLink] = useState(false);
  const [newLinkTitle, setNewLinkTitle] = useState("");
  const [newLinkUrl, setNewLinkUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Update local state when initialLinks change
  useEffect(() => {
    setLinks(initialLinks);
  }, [initialLinks]);
  // DnD sensors with better configuration
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // Requires 8px of movement before dragging starts
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      // Update the local state first for immediate feedback
      setLinks((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });

      try {
        // Update positions on the server
        const updatedLinks = links.map((link, index) => ({
          id: link.id,
          position: index,
        }));

        await axios.patch('/api/links/reorder', { links: updatedLinks });
        router.refresh();
      } catch (error) {
        console.error(error);
        toast.error("Failed to update link order");
        // Revert to the original order if the server update fails
        setLinks(initialLinks);
      }
    }
  };

  const handleAddLink = async () => {
    try {
      if (!newLinkTitle.trim() || !newLinkUrl.trim()) {
        toast.error("Title and URL are required");
        return;
      }

      // Add http:// prefix if missing
      let formattedUrl = newLinkUrl;
      if (!/^https?:\/\//i.test(formattedUrl)) {
        formattedUrl = `https://${formattedUrl}`;
      }

      setIsSubmitting(true);
      const response = await axios.post('/api/links', {
        title: newLinkTitle,
        url: formattedUrl,
        position: links.length
      });

      setLinks([...links, response.data]);
      setNewLinkTitle("");
      setNewLinkUrl("");
      setIsAddingLink(false);
      toast.success("Link added successfully");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Failed to add link");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteLink = (id: string) => {
    setLinks(links.filter(link => link.id !== id));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Your Links</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            {links.length > 0 ? (
              <SortableContext
                items={links.map(link => link.id)}
                strategy={verticalListSortingStrategy}
              >
                {links.map((link) => (
                  <SortableLink
                    key={link.id}
                    link={link}
                    onDelete={handleDeleteLink}
                  />
                ))}
              </SortableContext>
            ) : (
              <div className="text-center p-6 border border-dashed rounded-md">
                <p className="text-gray-500">You haven&apos;t added any links yet.</p>
              </div>
            )}
          </DndContext>

          {isAddingLink ? (
            <Card className="mt-4 border border-dashed">
              <CardContent className="p-4">
                <div className="space-y-4">
                  <FormInput
                    label="Link Title"
                    value={newLinkTitle}
                    onChange={(e) => setNewLinkTitle(e.target.value)}
                    placeholder="e.g. My Website"
                    required
                  />
                  <FormInput
                    label="URL"
                    value={newLinkUrl}
                    onChange={(e) => setNewLinkUrl(e.target.value)}
                    placeholder="e.g. https://example.com"
                    required
                  />
                  <div className="flex justify-between">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setIsAddingLink(false);
                        setNewLinkTitle("");
                        setNewLinkUrl("");
                      }}
                      disabled={isSubmitting}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleAddLink}
                      disabled={isSubmitting}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      Add Link
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Button
              onClick={() => setIsAddingLink(true)}
              className="w-full mt-4"
              variant="outline"
            >
              <PlusCircle className="mr-2 h-5 w-5" />
              Add New Link
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
