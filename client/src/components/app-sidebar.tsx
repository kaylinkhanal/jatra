'use client'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
  } from "@/components/ui/sidebar"
import { setNotification } from "@/lib/redux/features/notification/notificationSlice"
import { BellDotIcon, BellIcon, Calendar, ChartBar, Home, Inbox, MessageCircle } from "lucide-react"
import Link from "next/link"
import { useDispatch, useSelector } from "react-redux"
  const items = [
    {
      title: "Home",
      url: "/home",
      icon: Home,
    },
    {
      title: "Events",
      url: "/events",
      icon: Inbox,
    },
    {
      title: "Chat",
      url: "/chat",
      icon: MessageCircle,
    },
    {
      title: "Shop",
      url: "/shop",
      icon: Calendar,
    },
    {
      title: "Notification",
      url: "/notification",
  
    },
  ]



  export function AppSidebar() {
    const {isNotified} = useSelector((state) => state.notification)
    const dispatch = useDispatch()
    
    const NotificationAlert = () => {
      if (isNotified) return(
        <div className="relative">
          <BellIcon/>
          <span className="absolute -top-1 -right-0 w-3 h-3 bg-red-500 rounded-full"></span>
        </div>
      )
      return <BellIcon/>
    }
    
    const handleNotification = (title) => {
      if (title === 'Notification') {
        dispatch(setNotification(false))
      }
    }
     
    return (
        <Sidebar collapsible="icon" >
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Application</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link onClick={()=>handleNotification(item.title)} href={item.url}>
                       {item.title === 'Notification' ? <NotificationAlert/>: <item.icon />}
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    )
  }