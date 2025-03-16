"use client"

import { Home, Search, Calendar, User, Plus } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

export function MobileNavigation() {
  // In a real app, you'd use usePathname() to determine the active route
  const activeRoute = "/"

  const navItems = [
    { icon: Home, label: "Home", href: "/" },
    { icon: Search, label: "Explore", href: "/explore" },
    { icon: Plus, label: "Create", href: "/create" },
    { icon: Calendar, label: "Events", href: "/events" },
    { icon: User, label: "Profile", href: "/profile" },
  ]

  return (
    <div className="flex h-16 items-center justify-around bg-background border-t">
      {navItems.map((item) => {
        const Icon = item.icon
        const isActive = activeRoute === item.href

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-col items-center justify-center",
              isActive ? "text-primary" : "text-muted-foreground",
            )}
          >
            <Icon className="h-5 w-5" />
            <span className="mt-1 text-xs">{item.label}</span>
          </Link>
        )
      })}
    </div>
  )
}

