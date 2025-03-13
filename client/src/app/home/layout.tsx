import { ReactNode } from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/App-sidebar"

import "@/app/globals.css"

export const metadata = {
  title: "JATRA - Event Management System",
  description: "Manage and discover events across Nepal",
}

interface RootLayoutProps {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <SidebarProvider>
          <div className="flex min-h-screen">
            <AppSidebar />
            <div className="flex-1">{children}</div>
          </div>
        </SidebarProvider>
      </body>
    </html>
  )
}
