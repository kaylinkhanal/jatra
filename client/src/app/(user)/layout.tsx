import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import CustomSidebar from "@/components/CoustomSidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <CustomSidebar>{children}</CustomSidebar>;
}
