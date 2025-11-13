"use client"

import { useState, useEffect, useRef } from "react"
import { formatDistanceToNow } from "date-fns"
import { X, Check, Bell, Layers, Lightbulb, Mail, Star, UserRound } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"

interface Notification {
  id: string
  type: string
  title: string
  description: string
  timestamp: Date
  read: boolean
  link: string
}

interface NotificationsPanelProps {
  notifications: Notification[]
  onClose: () => void
  onMarkAsRead: (id: string) => void
  onMarkAllAsRead: () => void
}

const getNotificationIcon = (type: string) => {
  switch (type) {
    case "messages":
      return <Mail className="h-4 w-4" />
    case "projects":
      return <Layers className="h-4 w-4" />
    case "interests":
      return <Star className="h-4 w-4" />
    case "ideas":
      return <Lightbulb className="h-4 w-4" />
    case "profile":
      return <UserRound className="h-4 w-4" />
    default:
      return <Bell className="h-4 w-4" />
  }
}

const getNotificationColor = (type: string) => {
  switch (type) {
    case "messages":
      return "bg-pink-500"
    case "projects":
      return "bg-purple-500"
    case "interests":
      return "bg-green-500"
    case "ideas":
      return "bg-yellow-500"
    case "profile":
      return "bg-orange-500"
    default:
      return "bg-blue-500"
  }
}

export function NotificationsPanel({ notifications, onClose, onMarkAsRead, onMarkAllAsRead }: NotificationsPanelProps) {
  const router = useRouter()
  const [hoveredNotification, setHoveredNotification] = useState<string | null>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  // Handle clicks outside the panel
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    // Add event listener
    document.addEventListener("mousedown", handleClickOutside)

    // Clean up event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [onClose])

  const handleNotificationClick = (notification: Notification) => {
    onMarkAsRead(notification.id)
    router.push(notification.link)
    onClose()
  }

  return (
    <Card ref={panelRef} className="absolute right-0 sm:left-3 top-full mt-2 w-[270px] sm:w-80 z-50 shadow-lg">
      <div className="flex items-center justify-between p-4 border-b gap-2 sm:gap-0">
        <h3 className="font-semibold">Notifications</h3>
        <div className="flex items-center sm:gap-2">
          {notifications.length > 0 && (
            <Button variant="ghost" size="sm" onClick={onMarkAllAsRead} className="text-xs h-8">
              Mark all as read
            </Button>
          )}
          <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <ScrollArea className="max-h-[400px] overflow-auto">
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-6 text-center text-muted-foreground">
            <Bell className="h-8 w-8 mb-2 opacity-50" />
            <p>No new notifications</p>
          </div>
        ) : (
          <div className="divide-y">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={cn(
                  "p-4 relative cursor-pointer transition-colors",
                  !notification.read && "bg-muted/50",
                  hoveredNotification === notification.id && "bg-muted",
                )}
                onClick={() => handleNotificationClick(notification)}
                onMouseEnter={() => setHoveredNotification(notification.id)}
                onMouseLeave={() => setHoveredNotification(null)}
              >
                <div className="flex gap-3">
                  <div
                    className={cn(
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                      getNotificationColor(notification.type),
                      "text-white",
                    )}
                  >
                    {getNotificationIcon(notification.type)}
                  </div>

                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">{notification.title}</p>
                    <p className="text-xs text-muted-foreground">{notification.description}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(notification.timestamp), { addSuffix: true })}
                    </p>
                  </div>

                  {hoveredNotification === notification.id && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 absolute top-2 right-2 opacity-70 hover:opacity-100"
                      onClick={(e) => {
                        e.stopPropagation()
                        onMarkAsRead(notification.id)
                      }}
                    >
                      <Check className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>
    </Card>
  )
}