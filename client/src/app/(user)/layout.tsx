import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider  open={false}>
      <AppSidebar />
      <main>
        {children}
      </main>
    </SidebarProvider>
  )
}