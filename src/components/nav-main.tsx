"use client"

import { type LucideIcon } from "lucide-react"

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

import React from "react"
import Link from "next/link";

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: LucideIcon
  }[]
}) {
  const [currentPath, setCurrentPath] = React.useState("");

  React.useEffect(() => {
    // This runs only on the client
    setCurrentPath(window.location.pathname);
    console.log("currentPath:", window.location.pathname);
  }, []);

  console.log("Check current path: ", currentPath);

  console.log(currentPath);
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <Link href={item.url}>
                <SidebarMenuButton 
                  tooltip={item.title} 
                  onClick={() => setCurrentPath(item.url)}
                  className={`${item.url === currentPath ? "min-w-8 bg-primary text-primary-foreground duration-200 ease-linear hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground" : ""}`}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                  {/* <span>Check URL {item.url}</span> */}
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup >
  )
}
