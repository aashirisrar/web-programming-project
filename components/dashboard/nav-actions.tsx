"use client"

// import * as React from "react"
// import { ArrowDown, ArrowUp, Bell, CirclePlus, Copy, CornerUpLeft, CornerUpRight, ExternalLink, FileText, GalleryVerticalEnd, LineChart, MoreHorizontal, PanelTop, Settings2, Star, Trash, Trash2, Wand2 } from 'lucide-react'
// import useAiPromptModal from "@/app/hooks/useAiPromptModal"
// import Link from "next/link"

import { SafeUser } from "@/types"
// import { usePathname } from "next/navigation"
// import useThemeModal from "@/app/hooks/useThemeModal"

// import useCreateProjectPostModal from "@/app/hooks/useCreateProjectPostModal"
// import useCreateIdeaModal from "@/app/hooks/useCreateIdeaModal"
// import { Button } from "../ui/button"

// import { Button } from "@/components/ui/button"
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover"
// import {
//   Sidebar,
//   SidebarContent,
//   SidebarGroup,
//   SidebarGroupContent,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
// } from "@/components/ui/sidebar"

// const data = [
//   [
//     {
//       label: "Customize Page",
//       icon: Settings2,
//     },
//     {
//       label: "Turn into wiki",
//       icon: FileText,
//     },
//   ],
//   [
//     {
//       label: "Copy Link",
//       icon: Link,
//     },
//     {
//       label: "Duplicate",
//       icon: Copy,
//     },
//     {
//       label: "Move to",
//       icon: CornerUpRight,
//     },
//     {
//       label: "Move to Trash",
//       icon: Trash2,
//     },
//   ],
//   [
//     {
//       label: "Undo",
//       icon: CornerUpLeft,
//     },
//     {
//       label: "View analytics",
//       icon: LineChart,
//     },
//     {
//       label: "Version History",
//       icon: GalleryVerticalEnd,
//     },
//     {
//       label: "Show delete pages",
//       icon: Trash,
//     },
//     {
//       label: "Notifications",
//       icon: Bell,
//     },
//   ],
//   [
//     {
//       label: "Import",
//       icon: ArrowUp,
//     },
//     {
//       label: "Export",
//       icon: ArrowDown,
//     },
//   ],
// ]

interface NavActionsProps {
  currentUser?: SafeUser | null;
}

export function NavActions({ currentUser }: NavActionsProps) {
  // const [isOpen, setIsOpen] = React.useState(false)
  // const themeModal = useThemeModal()
  // const createProjectPostModal = useCreateProjectPostModal()
  // const createIdeaModal = useCreateIdeaModal()
  // const aiPromptModal = useAiPromptModal()
  // const pathname = usePathname()

  // if (pathname !== "/profile") return null

  return (
    null
    // <div className="flex items-center gap-4 text-sm">
    //   <Link
    //     className="bg-blue-700 hover:bg-blue-800 transition text-white px-3 py-2 group rounded-lg inline-flex items-center justify-center"
    //     target="_blank"
    //     href={"/" + currentUser?.username}
    //   >
    //     <div className="flex gap-1 items-center justify-center">
    //       <ExternalLink className="w-4 h-4" />
    //       <div className="hidden md:block">Preview in new tab</div>
    //     </div>
    //   </Link>
    //   <div
    //     onClick={() => aiPromptModal.onOpen()}
    //     className="hover:cursor-pointer transition bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 group rounded-lg inline-flex items-center justify-center "
    //   >
    //     <div className="flex gap-1 items-center justify-center">
    //       <Wand2 className="w-4 h-4" />
    //       <div className="hidden md:block">Generate</div>
    //     </div>
    //   </div>
    //   <div
    //     onClick={() => themeModal.onOpen(resume?.theme!!, resume?.template!!)}
    //     className="hover:cursor-pointer transition bg-black hover:bg-gray-800 text-white px-3 py-2 group rounded-lg inline-flex items-center justify-center "
    //   >
    //     <div className="flex gap-1 items-center justify-center">
    //       <PanelTop className="w-4 h-4" />
    //       <div className="hidden md:block">Change Theme</div>
    //     </div>
    //   </div>
    //   {/* <Popover open={isOpen} onOpenChange={setIsOpen}>
    //     <PopoverTrigger asChild>
    //       <Button
    //         variant="ghost"
    //         size="icon"
    //         className="h-7 w-7 data-[state=open]:bg-accent"
    //       >
    //         <MoreHorizontal />
    //       </Button>
    //     </PopoverTrigger>
    //     <PopoverContent
    //       className="w-56 overflow-hidden rounded-lg p-0"
    //       align="end"
    //     >
    //       <Sidebar collapsible="none" className="bg-transparent">
    //         <SidebarContent>
    //           {data.map((group, index) => (
    //             <SidebarGroup key={index} className="border-b last:border-none">
    //               <SidebarGroupContent className="gap-0">
    //                 <SidebarMenu>
    //                   {group.map((item, index) => (
    //                     <SidebarMenuItem key={index}>
    //                       <SidebarMenuButton>
    //                       <item.icon href={item.label} /> <span>{item.label}</span>
    //                       </SidebarMenuButton>
    //                     </SidebarMenuItem>
    //                   ))}
    //                 </SidebarMenu>
    //               </SidebarGroupContent>
    //             </SidebarGroup>
    //           ))}
    //         </SidebarContent>
    //       </Sidebar>
    //     </PopoverContent>
    //   </Popover> */}
    // </div>
  )
}

