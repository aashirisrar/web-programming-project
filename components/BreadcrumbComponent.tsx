"use client"

import React from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"

const BreadcrumbComponent = () => {
  const pathname = usePathname()
  const segments = pathname.split("/").filter(Boolean)

  const getDisplayText = (segment: string, fullPath: string) => {
    // Handle script routes
    if (fullPath.match(/^\/scripts\/[^/]+$/)) {
      return "Script Details"
    }
    if (fullPath.match(/^\/scripts\/[^/]+\/edit$/)) {
      return "Edit"
    }

    // Handle other dynamic routes
    if (fullPath.match(/^\/projects\/[^/]+$/)) {
      return "Project Details"
    }
    if (fullPath.match(/^\/ideas\/[^/]+$/)) {
      return "Idea Details"
    }

    // Handle standard routes
    switch (segment) {
      case "scripts":
        return "Scripts"
      case "bookmarks":
        return "Bookmarks"
      case "explore":
        return "Explore"
      default:
        // Capitalize first letter and add spaces between camelCase
        return segment
          .replace(/([A-Z])/g, ' $1')
          .replace(/^./, str => str.toUpperCase())
    }
  }

  return (
    <div className="w-full overflow-x-auto scrollbar-none">
      <nav className="flex items-center space-x-1 text-sm text-muted-foreground min-w-max">
        <Link
          href="/"
          className="flex items-center hover:text-foreground transition-colors"
        >
          <Home className="h-4 w-4" />
          <span className="hidden sm:inline ml-1">Home</span>
        </Link>

        {segments.map((segment, index) => {
          const path = `/${segments.slice(0, index + 1).join("/")}`
          const isLast = index === segments.length - 1
          const displayText = getDisplayText(segment, path)

          return (
            <div key={path} className="flex items-center">
              <ChevronRight className="h-4 w-4 mx-1 flex-shrink-0" />
              {isLast ? (
                <span className="font-medium text-foreground">
                  {displayText}
                </span>
              ) : (
                <Link
                  href={path}
                  className="hover:text-foreground transition-colors"
                >
                  {displayText}
                </Link>
              )}
            </div>
          )
        })}
      </nav>
    </div>
  )
}

export default BreadcrumbComponent;