"use client"

import type React from "react"
import Link from "next/link"
import { useState, useEffect } from "react"
// import axios from "axios"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar"

import type { SafeUser } from "@/types"
import { NavUser } from "./nav-user"
import { NavMain } from "./nav-main"
import { NotificationBell } from "../NotificationBell"
import { NavProModal } from "./nav-pro-modal"
import Image from "next/image"

interface SidebarDashboardProps {
  currentUser?: SafeUser | null;
  isPro?: boolean;
  credits: number;
}

const SidebarDashboard: React.FC<SidebarDashboardProps> = ({
  currentUser,
  isPro,
  credits
}) => {
  const { state } = useSidebar()
  const isCollapsed = state === "collapsed"

  // Centralized notifications state
  const [notifications, setNotifications] = useState<Record<string, number>>({})
  const [notificationDetails, setNotificationDetails] = useState<any[]>([])
  const [totalNotifications, setTotalNotifications] = useState(0)

  // // Fetch notifications data
  // useEffect(() => {
  //   let isMounted = true;

  //   const fetchNotifications = async () => {
  //     try {
  //       const response = await axios.get("/api/notifications")
  //       if (response.data && isMounted) {
  //         const { counts, details } = response.data
  //         setNotifications(counts)
  //         setNotificationDetails(details)

  //         // Calculate total notifications
  //         const total = Object.values(counts).reduce(
  //           (sum: number, count: any) => sum + (count || 0),
  //           0
  //         )
  //         setTotalNotifications(total)
  //       }
  //     } catch (error) {
  //       console.error("Failed to fetch notifications:", error)
  //     }
  //   }

  //   // Initial fetch
  //   fetchNotifications()

  //   // Set up polling for notifications
  //   const intervalId = setInterval(fetchNotifications, 30000) // Poll every 30 seconds

  //   return () => {
  //     isMounted = false;
  //     clearInterval(intervalId)
  //   }
  // }, [])

  const handleMarkAsRead = async (notificationId: string) => {
    // try {
    //   await axios.post(`/api/notifications/${notificationId}/mark-read`)

    //   // Extract the type and id from the notificationId
    //   const parts = notificationId.split("-")
    //   const actualId = parts.slice(1).join("-")

    //   // Update local state to remove the marked notification
    //   setNotificationDetails((prev) =>
    //     prev.filter((notification) => notification.id !== actualId)
    //   )

    //   // Recalculate notification counts
    //   const updatedCounts = { ...notifications }
    //   Object.keys(updatedCounts).forEach((key) => {
    //     const count = notificationDetails.filter(
    //       (notification) => notification.type === key && notification.id !== actualId
    //     ).length
    //     updatedCounts[key] = count
    //   })

    //   setNotifications(updatedCounts)
    //   setTotalNotifications((prev) => Math.max(0, prev - 1))
    // } catch (error) {
    //   console.error("Failed to mark notification as read:", error)
    // }
  }

  const handleMarkAllAsRead = async () => {
  //   try {
  //     await axios.post("/api/notifications/mark-all-read")
  //     setNotificationDetails([])
  //     setNotifications({})
  //     setTotalNotifications(0)
  //   } catch (error) {
  //     console.error("Failed to mark all notifications as read:", error)
  //   }
  }

  const handleClearRouteNotifications = (routeKey: string, currentPath?: string) => {
  //   // If currentPath is provided, check if it's a route or subdirectory
  //   const isRouteOrSubdirectory = currentPath
  //     ? currentPath === `/${routeKey}` || currentPath.startsWith(`/${routeKey}/`)
  //     : true; // If no path provided, always clear

  //   if (isRouteOrSubdirectory) {
  //     // Update notification counts
  //     setNotifications(prev => ({
  //       ...prev,
  //       [routeKey]: 0
  //     }));

  //     // Remove notifications of this type from details array
  //     setNotificationDetails(prev =>
  //       prev.filter(notification => notification.type !== routeKey)
  //     );

  //     // Recalculate total notifications
  //     const removedCount = notifications[routeKey] || 0;
  //     setTotalNotifications(prev => Math.max(0, prev - removedCount));
  //   }
  }

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className="flex flex-row items-center justify-between">
            <SidebarMenuButton size="lg" asChild>
              <Link href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">                  <Image 
                    src="/images/icon.png" 
                    alt="LinksHubb Logo"
                    width={32}
                    height={32}
                    className="object-contain"
                  />
                </div>
                <span className="truncate font-semibold">LinksHubb</span>
              </Link>
            </SidebarMenuButton>
            <div className={isCollapsed ? "hidden" : "block"}>
              <SidebarMenuButton size="lg" asChild>
                <NotificationBell
                  totalNotifications={totalNotifications}
                  notificationDetails={notificationDetails}
                  onMarkAsRead={handleMarkAsRead}
                  onMarkAllAsRead={handleMarkAllAsRead}
                />
              </SidebarMenuButton>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain
          notifications={notifications}
          notificationDetails={notificationDetails}
          onMarkAsRead={handleMarkAsRead}
          onClearRouteNotifications={handleClearRouteNotifications}
        />
      </SidebarContent>
      <SidebarFooter>
        <NavProModal credits={credits} currentUser={currentUser} isPro={isPro} />
        <NavUser currentUser={currentUser} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};

export default SidebarDashboard;