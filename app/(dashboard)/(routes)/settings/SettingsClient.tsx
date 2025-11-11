"use client";

import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SettingsClientProps {
  username: string;
}

const SettingsClient: React.FC<SettingsClientProps> = ({ username }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const router = useRouter();

  const formSchema = z.object({
    username: z
      .string()
      .min(2)
      .max(25)
      .refine((val) => !val.includes(" "), {
        message: "Username cannot contain spaces",
      }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: username,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    axios
      .post("/api/updateusername", values)
      .then(() => {
        toast.success("Success!");
        setHasChanges(false);
        router.refresh();
      })
      .catch((error) => {
        toast.error("Something went wrong!");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4 md:w-[350px] w-auto mt-6"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input disabled={isLoading} required {...field} onChange={(e) => {
                  field.onChange(e);
                  setHasChanges(e.target.value !== username);
                }} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          disabled={!hasChanges || isLoading}
          className="w-full"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              Save
            </>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default SettingsClient;
