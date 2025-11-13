"use client"

import { useState } from "react"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { NotificationsPanel } from "@/components/NotifcationsPanel"

interface NotificationBellProps {
  totalNotifications: number;
  notificationDetails: any[];
  onMarkAsRead: (notificationId: string) => Promise<void>;
  onMarkAllAsRead: () => Promise<void>;
}

export function NotificationBell({
  totalNotifications,
  notificationDetails,
  onMarkAsRead,
  onMarkAllAsRead
}: NotificationBellProps) {
  const [showNotifications, setShowNotifications] = useState(false)

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setShowNotifications(!showNotifications)}
        className="relative"
      >
        <Bell className="h-5 w-5" />
        {totalNotifications > 0 && (
          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
            {totalNotifications > 99 ? "99+" : totalNotifications}
          </span>
        )}
      </Button>

      {showNotifications && (
        <NotificationsPanel
          notifications={notificationDetails}
          onClose={() => setShowNotifications(false)}
          onMarkAsRead={onMarkAsRead}
          onMarkAllAsRead={onMarkAllAsRead}
        />
      )}
    </div>
  )
}