'use client';
import dynamic from 'next/dynamic';
import { useMemo } from 'react';

export default function Page() {
    const Map = useMemo(
        () =>
            dynamic(() => import('@/components/map'), {
                loading: () => <p>A map is loading</p>,
                ssr: false,
            }),
        []
    );

    return (
        <>
            <div className="bg-white-700 mx-auto w-[100vw] h-[100vh]">
                {Map && <Map posix={[4.79029, -75.69003]} />}
            </div>
        </>
    );
}


// import { Calendar, MapPin, Users } from "lucide-react"
// import Image from "next/image"
// import Link from "next/link"

// import { Badge } from "@/components/ui/badge"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// // Sample data for events
// const ongoingEvents = [
//   {
//     id: 1,
//     title: "Kathmandu Music Festival",
//     type: "Concert",
//     location: "Tundikhel Ground, Kathmandu",
//     date: "March 15-17, 2025",
//     image: "/roshan.jpg?height=200&width=400",
//     participants: 1200,
//   },
//   {
//     id: 2,
//     title: "Blood Donation Camp",
//     type: "Health",
//     location: "Red Cross Center, Lalitpur",
//     date: "March 20, 2025",
//     image: "/roshan.jpg?height=200&width=400",
//     participants: 350,
//   },
//   {
//     id: 3,
//     title: "Bagmati River Cleanup",
//     type: "Social Work",
//     location: "Pashupati Area, Kathmandu",
//     date: "March 22, 2025",
//     image: "/roshan.jpg?height=200&width=400",
//     participants: 500,
//   },
//   {
//     id: 4,
//     title: "Traditional Jatra Festival",
//     type: "Cultural",
//     location: "Basantapur Durbar Square",
//     date: "March 25-27, 2025",
//     image: "/roshan.jpg?height=200&width=400",
//     participants: 5000,
//   },
// ]

// const upcomingEvents = [
//   {
//     id: 5,
//     title: "Tech Conference 2025",
//     type: "Conference",
//     location: "Hyatt Regency, Kathmandu",
//     date: "April 5-7, 2025",
//     image: "/roshan.jpg?height=200&width=400",
//     participants: 800,
//   },
//   {
//     id: 6,
//     title: "Himalayan Marathon",
//     type: "Sports",
//     location: "Pokhara",
//     date: "April 12, 2025",
//     image: "/roshan.jpg?height=200&width=400",
//     participants: 1500,
//   },
//   {
//     id: 7,
//     title: "Food Festival",
//     type: "Cultural",
//     location: "Bhrikutimandap, Kathmandu",
//     date: "April 18-20, 2025",
//     image: "/roshan.jpg?height=200&width=400",
//     participants: 3000,
//   },
//   {
//     id: 8,
//     title: "Art Exhibition",
//     type: "Cultural",
//     location: "Nepal Art Council, Babar Mahal",
//     date: "April 25-30, 2025",
//     image: "/roshan.jpg?height=200&width=400",
//     participants: 1200,
//   },
// ]

// export default function Home() {
//   return (
//     <div className="flex min-h-screen flex-col">
//       <main className="flex-1 p-4 md:p-6">
//         <div className="mx-auto max-w-7xl">
//           {/* Hero Section */}
//           <section className="mb-8 rounded-lg bg-gradient-to-r from-[#FF4500]/20 to-[#FF4500]/5 p-6 md:p-10">
//             <div className="grid gap-6 md:grid-cols-2 md:gap-10">
//               <div className="flex flex-col justify-center space-y-4">
//                 <div>
//                   <Badge variant="outline" className="mb-2">
//                     Featured Event
//                   </Badge>
//                   <h1 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
//                     Kathmandu Music Festival
//                   </h1>
//                   <p className="mt-2 text-muted-foreground md:text-lg">
//                     The biggest music festival in Nepal featuring local and international artists.
//                   </p>
//                 </div>
//                 <div className="flex flex-col gap-2 md:flex-row md:gap-4">
//                   <div className="flex items-center gap-2">
//                     <Calendar className="h-4 w-4 text-muted-foreground" />
//                     <span className="text-sm text-muted-foreground">March 15-17, 2025</span>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <MapPin className="h-4 w-4 text-muted-foreground" />
//                     <span className="text-sm text-muted-foreground">Tundikhel Ground, Kathmandu</span>
//                   </div>
//                 </div>
//                 <div className="flex flex-col gap-3 pt-2 sm:flex-row ">
//                   <Button size="lg">Get Tickets</Button>
//                   <Button variant="outline" size="lg">
//                     Learn More
//                   </Button>
//                 </div>
//               </div>
//               <div className="flex items-center justify-center">
//                 <div className="overflow-hidden rounded-lg">
//                   <Image
//                     src="/roshan.jpg?height=200&width=300"
//                     alt="Kathmandu Music Festival"
//                     width={300}
//                     height={200}
//                     className="object-cover"
//                   />
//                 </div>
//               </div>
//             </div>
//           </section>

//           {/* Events Tabs */}
//           <section className="mb-8">
//             <Tabs defaultValue="ongoing">
//               <div className="flex items-center justify-between">
//                 <h2 className="text-2xl font-bold tracking-tight">Events</h2>
//                 <TabsList>
//                   <TabsTrigger value="ongoing">Ongoing</TabsTrigger>
//                   <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
//                 </TabsList>
//               </div>
//               <TabsContent value="ongoing" className="mt-6">
//                 <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
//                   {ongoingEvents.map((event) => (
//                     <EventCard key={event.id} event={event} />
//                   ))}
//                 </div>
//               </TabsContent>
//               <TabsContent value="upcoming" className="mt-6">
//                 <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
//                   {upcomingEvents.map((event) => (
//                     <EventCard key={event.id} event={event} />
//                   ))}
//                 </div>
//               </TabsContent>
//             </Tabs>
//           </section>

//           {/* Categories Section */}
//           <section className="mb-8">
//             <h2 className="mb-6 text-2xl font-bold tracking-tight">Browse by Category</h2>
//             <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
//               <CategoryCard title="Concerts" icon="🎵" count={12} />
//               <CategoryCard title="Cultural" icon="🪔" count={8} />
//               <CategoryCard title="Sports" icon="🏆" count={5} />
//               <CategoryCard title="Health" icon="❤️" count={7} />
//               <CategoryCard title="Social Work" icon="🌱" count={9} />
//               <CategoryCard title="Conferences" icon="💼" count={4} />
//             </div>
//           </section>

//           {/* Vendors Section */}
//           <section>
//             <div className="flex items-center justify-between">
//               <h2 className="text-2xl font-bold tracking-tight">Event Partners</h2>
//               <Button variant="ghost" size="sm">
//                 View All
//               </Button>
//             </div>
//             <div className="mt-6 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
//               <VendorCard
//                 name="Sound System Pro"
//                 type="Sound Equipment"
//                 image="/roshan.jpg?height=100&width=100"
//                 events={24}
//               />
//               <VendorCard
//                 name="Security Solutions"
//                 type="Event Security"
//                 image="/roshan.jpg?height=100&width=100"
//                 events={18}
//               />
//               <VendorCard
//                 name="Stage Masters"
//                 type="Stage Setup"
//                 image="/roshan.jpg?height=100&width=100"
//                 events={32}
//               />
//               <VendorCard
//                 name="Food Catering Deluxe"
//                 type="Catering"
//                 image="/roshan.jpg?height=100&width=100"
//                 events={45}
//               />
//             </div>
//           </section>
//         </div>
//       </main>
//     </div>
//   )
// }

// function EventCard({ event }) {
//   return (
//     <Card className="overflow-hidden">
//       <div className="aspect-video overflow-hidden">
//         <Image
//           src={event.image || "/placeholder.svg"}
//           alt={event.title}
//           width={400}
//           height={200}
//           className="object-cover transition-transform hover:scale-105"
//         />
//       </div>
//       <CardHeader className="p-4">
//         <div className="flex items-center justify-between">
//           <Badge variant="outline">{event.type}</Badge>
//           <div className="flex items-center gap-1 text-sm text-muted-foreground">
//             <Users className="h-3 w-3" />
//             <span>{event.participants}</span>
//           </div>
//         </div>
//         <CardTitle className="line-clamp-1 text-lg">{event.title}</CardTitle>
//       </CardHeader>
//       <CardContent className="p-4 pt-0">
//         <div className="flex flex-col gap-2">
//           <div className="flex items-center gap-2">
//             <Calendar className="h-4 w-4 text-muted-foreground" />
//             <span className="text-sm text-muted-foreground">{event.date}</span>
//           </div>
//           <div className="flex items-center gap-2">
//             <MapPin className="h-4 w-4 text-muted-foreground" />
//             <span className="text-sm text-muted-foreground line-clamp-1">{event.location}</span>
//           </div>
//         </div>
//       </CardContent>
//       <CardFooter className="p-4 pt-0">
//         <Button variant="outline" className="w-full">
//           View Details
//         </Button>
//       </CardFooter>
//     </Card>
//   )
// }

// function CategoryCard({ title, icon, count }) {
//   return (
//     <Link href={`/events/category/${title.toLowerCase()}`}>
//       <Card className="group transition-colors hover:border-primary">
//         <CardContent className="flex flex-col items-center justify-center p-6">
//           <span className="text-3xl">{icon}</span>
//           <h3 className="mt-3 font-medium">{title}</h3>
//           <p className="text-sm text-muted-foreground">{count} events</p>
//         </CardContent>
//       </Card>
//     </Link>
//   )
// }

// function VendorCard({ name, type, image, events }) {
//   return (
//     <Card>
//       <CardContent className="flex items-center gap-4 p-4">
//         <div className="h-12 w-12 overflow-hidden rounded-full">
//           <Image
//             src={image || "/roshan.jpg"}
//             alt={name}
//             width={100}
//             height={100}
//             className="h-full w-full object-cover"
//           />
//         </div>
//         <div className="flex-1">
//           <h3 className="font-medium">{name}</h3>
//           <p className="text-sm text-muted-foreground">{type}</p>
//           <p className="text-xs text-muted-foreground">{events} events</p>
//         </div>
//       </CardContent>
//     </Card>
//   )
// }