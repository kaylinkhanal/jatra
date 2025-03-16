import EventMap from "@/components/event-map"
import { EventFilters } from "@/components/event-filters"
import { EventList } from "@/components/event-list"
import { MobileNavigation } from "@/components/mobile-navigation"
import { UserAvatar } from "@/components/user-avatar"

export default function HomePage() {
  return (
    <div className="relative h-screen w-screen overflow-hidden bg-background">
      {/* Header with avatar */}
      <header className="absolute right-4 top-4 z-[1001]">
        <UserAvatar />
      </header>

      {/* Main content area with map and sidebar */}
      <div className="flex h-full w-full flex-col md:flex-row">
        {/* Sidebar for events list and filters */}
        <div className="h-1/2 w-full md:h-full md:w-[400px] lg:w-[450px] overflow-hidden flex flex-col border-r">
          <EventFilters />
          <EventList />
        </div>

        {/* Map area */}
        <div className="relative h-1/2 w-full md:h-full md:flex-1">
          <EventMap />
        </div>
      </div>

      {/* Mobile bottom navigation */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden">
        <MobileNavigation />
      </div>
    </div>
  )
}

