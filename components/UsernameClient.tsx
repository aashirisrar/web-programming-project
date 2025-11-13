"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const formSchema = z.object({
    username: z.string()
        .min(3, {
            message: "Username must be at least 3 characters.",
        })
        .max(30, {
            message: "Username must not be longer than 30 characters.",
        })
        .regex(/^[a-zA-Z0-9_]+$/, {
            message: "Username can only contain letters, numbers, and underscores.",
        }),
})

const UsernameClient = () => {
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
        },
    })

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        setIsLoading(true);

        axios
            .post("/api/updateusername", values)
            .then(() => {
                toast.success("Success!");
                router.push("/dashboard")
            })
            .catch((error) => {
                toast.error("Something went wrong!");
            })
            .finally(() => {
                setIsLoading(false);
                router.refresh();
            });
    };

    return (
        <Card className="w-full max-w-md">
            <CardHeader>
                <CardTitle className="text-2xl font-bold text-center">Choose your username</CardTitle>
                <CardDescription className="text-center">Enter a unique username to get started</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter your username" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button disabled={isLoading} type="submit" className="w-full">Continue</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}

export default UsernameClient