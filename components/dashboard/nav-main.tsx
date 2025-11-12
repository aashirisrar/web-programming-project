"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { Settings, LayoutDashboard, Link2, User, PaintBucket, LineChart } from "lucide-react"
import {
    SidebarGroup,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuBadge,
    useSidebar,
} from "@/components/ui/sidebar"
import { useEffect } from "react"
import axios from "axios"

export const routes = [
    {
        label: "Dashboard",
        icon: LayoutDashboard,
        href: "/dashboard",
        notificationKey: "dashboard",
    },    
    {
        label: "Profile",
        icon: User,
        href: "/profile",
        notificationKey: "profile",
    },
    {
        label: "Analytics",
        icon: LineChart,
        href: "/analytics",
        notificationKey: "analytics",
    },
    {
        label: "Appearance",
        icon: PaintBucket,
        href: "/appearance",
        notificationKey: "appearance",
    },
    {
        label: "Settings",
        icon: Settings,
        href: "/settings",
        notificationKey: "settings",
    },
]

interface NavMainProps {
    notifications: Record<string, number>;
    notificationDetails?: any[];
    onMarkAsRead?: (notificationId: string) => Promise<void>;
    onClearRouteNotifications?: (route: string, currentPath?: string) => void;
}

export function NavMain({
    notifications,
    notificationDetails = [],
    onMarkAsRead,
    onClearRouteNotifications
}: NavMainProps) {
    const pathName = usePathname()
    const sidebar = useSidebar()

    // Effect to clear notifications when route changes
    // useEffect(() => {
    //     const clearNotificationsForRoute = async () => {
    //         // Find matching route by checking if current path starts with route href
    //         // This will match both exact routes and their subdirectories
    //         const matchingRoute = routes.find(route =>
    //             pathName === route.href ||
    //             pathName.startsWith(`${route.href}/`)
    //         )

    //         if (!matchingRoute) return

    //         const routeKey = matchingRoute.notificationKey

    //         // 1. Get all notifications for this route
    //         const notificationsForRoute = notificationDetails.filter(
    //             notification => notification.type === routeKey
    //         )

    //         if (notificationsForRoute.length === 0) return

    //         // 2. Mark each notification as read in DB using the API
    //         for (const notification of notificationsForRoute) {
    //             try {
    //                 const apiNotificationId = `${notification.id}`
    //                 if (onMarkAsRead) {
    //                     await onMarkAsRead(apiNotificationId)
    //                 } else {
    //                     // Fallback direct API call if onMarkAsRead not provided
    //                     await axios.post(`/api/notifications/${apiNotificationId}/mark-read`)
    //                 }
    //             } catch (error) {
    //                 console.error(`Failed to mark notification ${notification.id} as read:`, error)
    //             }
    //         }

    //         // 3. Update UI notifications (if callback provided)
    //         if (onClearRouteNotifications) {
    //             onClearRouteNotifications(routeKey)
    //         }
    //     }

    //     clearNotificationsForRoute()
    // }, [pathName, notificationDetails, onMarkAsRead, onClearRouteNotifications])

    return (
        <SidebarGroup>
            <SidebarMenu>
                {routes.map((route) => {
                    const hasNotification = notifications[route.notificationKey] > 0

                    return (
                        <SidebarMenuItem key={route.href}>
                            <SidebarMenuButton isActive={pathName === route.href || pathName.startsWith(`${route.href}/`)} asChild tooltip={route.label}>
                                <Link
                                    onClick={() => sidebar.setOpenMobile(false)}
                                    href={route.href}
                                    className="flex items-center relative"
                                >
                                    <route.icon className="h-4 w-4 mr-2" />
                                    <span>{route.label}</span>
                                    {hasNotification && (
                                        <span className="absolute top-0 left-6 h-2 w-2 rounded-full bg-red-400" />)}

                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    )
                })}
            </SidebarMenu>
        </SidebarGroup>
    )
}