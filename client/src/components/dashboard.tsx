"use client"

import { useState } from "react"
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  Home,
  LogOut,
  MapPin,
  Menu,
  MessageSquare,
  PlusCircle,
  Settings,
  ShoppingBag,
  Ticket,
  User,
  Users,
  X,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"

export default function Dashboard() {
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <div className="flex min-h-screen bg-muted/40">
      {/* Sidebar for desktop */}
      <aside
        className={`fixed inset-y-0 z-20 flex h-full flex-col border-r bg-background transition-all duration-300 ${isCollapsed ? "w-[70px]" : "w-64"} hidden md:flex`}
      >
        <div className="flex h-14 items-center border-b px-3">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            {!isCollapsed && <span className="text-xl">Jatra</span>}
            <Ticket className="h-6 w-6 text-primary" />
          </Link>
          <Button variant="ghost" size="icon" className="ml-auto" onClick={() => setIsCollapsed(!isCollapsed)}>
            {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-2 text-sm font-medium">
            <Link
              href="#"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${!isCollapsed ? "justify-start" : "justify-center"}`}
            >
              <Home className="h-4 w-4" />
              {!isCollapsed && <span>Dashboard</span>}
            </Link>
            <Link
              href="#"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-primary transition-all hover:text-primary ${!isCollapsed ? "justify-start" : "justify-center"}`}
            >
              <Ticket className="h-4 w-4" />
              {!isCollapsed && <span>Events</span>}
            </Link>
            <Link
              href="#"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${!isCollapsed ? "justify-start" : "justify-center"}`}
            >
              <MapPin className="h-4 w-4" />
              {!isCollapsed && <span>Venues</span>}
            </Link>
            <Link
              href="#"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${!isCollapsed ? "justify-start" : "justify-center"}`}
            >
              <Users className="h-4 w-4" />
              {!isCollapsed && <span>Users</span>}
            </Link>
            <Link
              href="#"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${!isCollapsed ? "justify-start" : "justify-center"}`}
            >
              <ShoppingBag className="h-4 w-4" />
              {!isCollapsed && <span>Shop</span>}
            </Link>
            <Link
              href="#"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${!isCollapsed ? "justify-start" : "justify-center"}`}
            >
              <MessageSquare className="h-4 w-4" />
              {!isCollapsed && <span>Messages</span>}
            </Link>
            <Link
              href="#"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${!isCollapsed ? "justify-start" : "justify-center"}`}
            >
              <Settings className="h-4 w-4" />
              {!isCollapsed && <span>Settings</span>}
            </Link>
          </nav>
        </div>
        <div className="mt-auto border-t p-2">
          <div
            className={`flex items-center gap-2 rounded-lg px-2 py-2 ${!isCollapsed ? "justify-start" : "justify-center"}`}
          >
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder-user.jpg" alt="User" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            {!isCollapsed && (
              <div className="flex flex-col">
                <span className="text-sm font-medium">John Doe</span>
                <span className="text-xs text-muted-foreground">Admin</span>
              </div>
            )}
            {!isCollapsed && (
              <Button variant="ghost" size="icon" className="ml-auto">
                <LogOut className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </aside>

      {/* Mobile sidebar */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="absolute left-4 top-3 z-40 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <div className="flex h-14 items-center border-b px-3">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <span className="text-xl">Jatra</span>
              <Ticket className="h-6 w-6 text-primary" />
            </Link>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="ml-auto">
                <X className="h-4 w-4" />
              </Button>
            </SheetTrigger>
          </div>
          <div className="flex-1 overflow-auto py-2">
            <nav className="grid items-start px-2 text-sm font-medium">
              <Link
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <Home className="h-4 w-4" />
                <span>Dashboard</span>
              </Link>
              <Link
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-primary transition-all hover:text-primary"
              >
                <Ticket className="h-4 w-4" />
                <span>Events</span>
              </Link>
              <Link
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <MapPin className="h-4 w-4" />
                <span>Venues</span>
              </Link>
              <Link
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <Users className="h-4 w-4" />
                <span>Users</span>
              </Link>
              <Link
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <ShoppingBag className="h-4 w-4" />
                <span>Shop</span>
              </Link>
              <Link
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <MessageSquare className="h-4 w-4" />
                <span>Messages</span>
              </Link>
              <Link
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </Link>
            </nav>
          </div>
          <div className="mt-auto border-t p-2">
            <div className="flex items-center gap-2 rounded-lg px-2 py-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder-user.jpg" alt="User" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-medium">John Doe</span>
                <span className="text-xs text-muted-foreground">Admin</span>
              </div>
              <Button variant="ghost" size="icon" className="ml-auto">
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Main content */}
      <main className={`flex-1 transition-all duration-300 ${isCollapsed ? "md:ml-[70px]" : "md:ml-64"}`}>
        {/* Header */}
        <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-4 sm:px-6">
          <div className="hidden md:block">
            <h1 className="text-lg font-semibold">Events Dashboard</h1>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-8 gap-1">
              <Bell className="h-4 w-4" />
              <span className="hidden sm:inline-block">Notifications</span>
              <Badge className="ml-1 rounded-full px-1">3</Badge>
            </Button>
            <Avatar className="h-8 w-8 md:hidden">
              <AvatarImage src="/placeholder-user.jpg" alt="User" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Dashboard content */}
        <div className="p-4 md:p-6">
          <Tabs defaultValue="overview">
            <div className="flex items-center justify-between">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="events">Events</TabsTrigger>
                <TabsTrigger value="venues">Venues</TabsTrigger>
                <TabsTrigger value="calendar">Calendar</TabsTrigger>
              </TabsList>
              <Button size="sm" className="gap-1">
                <PlusCircle className="h-4 w-4" />
                <span>New Event</span>
              </Button>
            </div>

            {/* Overview Tab */}
            <TabsContent value="overview" className="mt-6">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Events</CardTitle>
                    <Ticket className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">142</div>
                    <p className="text-xs text-muted-foreground">+22% from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Venues</CardTitle>
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">24</div>
                    <p className="text-xs text-muted-foreground">+4 new this month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                    <User className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">2,845</div>
                    <p className="text-xs text-muted-foreground">+12.5% from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Revenue</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$45,231.89</div>
                    <p className="text-xs text-muted-foreground">+18.2% from last month</p>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="lg:col-span-4">
                  <CardHeader>
                    <CardTitle>Upcoming Events</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {upcomingEvents.map((event) => (
                        <div key={event.id} className="flex items-center gap-4">
                          <div className="relative h-16 w-16 overflow-hidden rounded-md">
                            <Image
                              src={event.image || "/placeholder.svg"}
                              alt={event.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1 space-y-1">
                            <h3 className="font-medium">{event.name}</h3>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Calendar className="mr-1 h-3 w-3" />
                              {event.date}
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <MapPin className="mr-1 h-3 w-3" />
                              {event.venue}
                            </div>
                          </div>
                          <Badge variant={event.status === "Approved" ? "default" : "outline"}>{event.status}</Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      View All Events
                    </Button>
                  </CardFooter>
                </Card>

                <Card className="lg:col-span-3">
                  <CardHeader>
                    <CardTitle>Venue Availability</CardTitle>
                    <CardDescription>Top venues and their booking status</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {venues.map((venue) => (
                        <div key={venue.id} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="font-medium">{venue.name}</div>
                            <div className="text-sm text-muted-foreground">{venue.bookingPercentage}%</div>
                          </div>
                          <Progress value={venue.bookingPercentage} className="h-2" />
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <div>Capacity: {venue.capacity}</div>
                            <div>Bookings: {venue.bookings}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      Manage Venues
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>

            {/* Events Tab */}
            <TabsContent value="events" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>All Events</CardTitle>
                  <CardDescription>Manage your events and their status</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {allEvents.map((event) => (
                      <div key={event.id} className="flex items-center gap-4 rounded-lg border p-3">
                        <div className="relative h-16 w-16 overflow-hidden rounded-md">
                          <Image
                            src={event.image || "/placeholder.svg"}
                            alt={event.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 space-y-1">
                          <h3 className="font-medium">{event.name}</h3>
                          <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                            <div className="flex items-center">
                              <Calendar className="mr-1 h-3 w-3" />
                              {event.date}
                            </div>
                            <div className="flex items-center">
                              <Clock className="mr-1 h-3 w-3" />
                              {event.time}
                            </div>
                            <div className="flex items-center">
                              <MapPin className="mr-1 h-3 w-3" />
                              {event.venue}
                            </div>
                          </div>
                        </div>
                        <Badge variant={getStatusVariant(event.status)}>{event.status}</Badge>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">Showing 5 of 25 events</div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" disabled>
                      <ChevronLeft className="h-4 w-4" />
                      Previous
                    </Button>
                    <Button variant="outline" size="sm">
                      Next
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>

            {/* Venues Tab */}
            <TabsContent value="venues" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Venue Management</CardTitle>
                  <CardDescription>Manage your venues and their details</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {venues.map((venue) => (
                      <Card key={venue.id}>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">{venue.name}</CardTitle>
                          <CardDescription>Capacity: {venue.capacity}</CardDescription>
                        </CardHeader>
                        <CardContent className="pb-2">
                          <div className="space-y-2">
                            <div className="text-sm">Booking Status</div>
                            <Progress value={venue.bookingPercentage} className="h-2" />
                            <div className="flex items-center justify-between text-xs text-muted-foreground">
                              <div>Available</div>
                              <div>{venue.bookingPercentage}% Booked</div>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="flex gap-2 pt-2">
                          <Button variant="outline" size="sm" className="flex-1">
                            Details
                          </Button>
                          <Button size="sm" className="flex-1">
                            Book
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                    <Card className="flex flex-col items-center justify-center p-6">
                      <PlusCircle className="mb-2 h-8 w-8 text-muted-foreground" />
                      <h3 className="text-lg font-medium">Add New Venue</h3>
                      <p className="mb-4 text-center text-sm text-muted-foreground">
                        Create a new venue for your events
                      </p>
                      <Button>Add Venue</Button>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Calendar Tab */}
            <TabsContent value="calendar" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Event Calendar</CardTitle>
                  <CardDescription>View and manage your events in calendar view</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold">March 2025</h3>
                    <div className="flex gap-1">
                      <Button variant="outline" size="sm">
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-7 gap-1 text-center">
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                      <div key={day} className="py-2 text-sm font-medium">
                        {day}
                      </div>
                    ))}
                    {Array.from({ length: 35 }).map((_, i) => {
                      const day = i - 5 // Offset to start from the correct day
                      const hasEvent = calendarEvents.some((event) => event.day === day)
                      return (
                        <div
                          key={i}
                          className={`relative h-20 rounded-md border p-1 ${day < 1 || day > 31 ? "bg-muted/40" : "hover:bg-muted/60"} ${hasEvent ? "border-primary/30" : ""}`}
                        >
                          {day > 0 && day <= 31 && (
                            <>
                              <div className="text-xs">{day}</div>
                              {hasEvent && (
                                <div className="mt-1">
                                  {calendarEvents
                                    .filter((event) => event.day === day)
                                    .map((event) => (
                                      <div
                                        key={event.id}
                                        className="mb-1 truncate rounded bg-primary/10 px-1 py-0.5 text-xs"
                                        title={event.name}
                                      >
                                        {event.name}
                                      </div>
                                    ))}
                                </div>
                              )}
                            </>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}

// Mock data
const upcomingEvents = [
  {
    id: 1,
    name: "Music Festival 2025",
    date: "Mar 15, 2025",
    venue: "Central Park",
    status: "Approved",
    image: "/placeholder.svg?height=64&width=64",
  },
  {
    id: 2,
    name: "Cultural Dance Show",
    date: "Mar 18, 2025",
    venue: "City Hall",
    status: "Pending",
    image: "/placeholder.svg?height=64&width=64",
  },
  {
    id: 3,
    name: "Art Exhibition",
    date: "Mar 22, 2025",
    venue: "Gallery One",
    status: "Approved",
    image: "/placeholder.svg?height=64&width=64",
  },
  {
    id: 4,
    name: "Food Festival",
    date: "Mar 25, 2025",
    venue: "Riverside Park",
    status: "Approved",
    image: "/placeholder.svg?height=64&width=64",
  },
]

const venues = [
  {
    id: 1,
    name: "Central Park",
    capacity: 5000,
    bookings: 12,
    bookingPercentage: 75,
  },
  {
    id: 2,
    name: "City Hall",
    capacity: 1200,
    bookings: 8,
    bookingPercentage: 60,
  },
  {
    id: 3,
    name: "Gallery One",
    capacity: 500,
    bookings: 5,
    bookingPercentage: 40,
  },
  {
    id: 4,
    name: "Riverside Park",
    capacity: 3000,
    bookings: 10,
    bookingPercentage: 85,
  },
]

const allEvents = [
  {
    id: 1,
    name: "Music Festival 2025",
    date: "Mar 15, 2025",
    time: "4:00 PM - 10:00 PM",
    venue: "Central Park",
    status: "Approved",
    image: "/placeholder.svg?height=64&width=64",
  },
  {
    id: 2,
    name: "Cultural Dance Show",
    date: "Mar 18, 2025",
    time: "6:00 PM - 8:00 PM",
    venue: "City Hall",
    status: "Pending",
    image: "/placeholder.svg?height=64&width=64",
  },
  {
    id: 3,
    name: "Art Exhibition",
    date: "Mar 22, 2025",
    time: "10:00 AM - 6:00 PM",
    venue: "Gallery One",
    status: "Approved",
    image: "/placeholder.svg?height=64&width=64",
  },
  {
    id: 4,
    name: "Food Festival",
    date: "Mar 25, 2025",
    time: "11:00 AM - 8:00 PM",
    venue: "Riverside Park",
    status: "Approved",
    image: "/placeholder.svg?height=64&width=64",
  },
  {
    id: 5,
    name: "Tech Conference",
    date: "Mar 30, 2025",
    time: "9:00 AM - 5:00 PM",
    venue: "Convention Center",
    status: "Rejected",
    image: "/placeholder.svg?height=64&width=64",
  },
]

const calendarEvents = [
  { id: 1, day: 15, name: "Music Festival" },
  { id: 2, day: 18, name: "Dance Show" },
  { id: 3, day: 18, name: "Workshop" },
  { id: 4, day: 22, name: "Art Exhibition" },
  { id: 5, day: 25, name: "Food Festival" },
  { id: 6, day: 30, name: "Tech Conference" },
]

// Helper function to get badge variant based on status
function getStatusVariant(status:any) {
  switch (status) {
    case "Approved":
      return "default"
    case "Pending":
      return "secondary"
    case "Rejected":
      return "destructive"
    default:
      return "outline"
  }
}

// Missing component
function Bell(props:any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  )
}

function DollarSign(props:any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" x2="12" y1="2" y2="22" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  )
}

