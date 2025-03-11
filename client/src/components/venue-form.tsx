"use client"

import { MapPin } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function VenueForm() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Venue</CardTitle>
        <CardDescription>Create a new venue for hosting events</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Venue Name</Label>
            <Input id="name" placeholder="Enter venue name" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Textarea id="address" placeholder="Enter venue address" rows={3} />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input id="city" placeholder="City" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">State/Province</Label>
              <Input id="state" placeholder="State/Province" />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Input id="country" placeholder="Country" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="postal">Postal/Zip Code</Label>
              <Input id="postal" placeholder="Postal/Zip Code" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="capacity">Total Capacity</Label>
            <Input id="capacity" type="number" placeholder="0" />
          </div>

          <div className="space-y-2">
            <Label>Seat Types</Label>
            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="vvip-capacity">VVIP Capacity</Label>
                  <Input id="vvip-capacity" type="number" placeholder="0" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vip-capacity">VIP Capacity</Label>
                  <Input id="vip-capacity" type="number" placeholder="0" />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="normal-capacity">Normal Capacity</Label>
                  <Input id="normal-capacity" type="number" placeholder="0" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="free-capacity">Free Capacity</Label>
                  <Input id="free-capacity" type="number" placeholder="0" />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="venue-type">Venue Type</Label>
            <Select>
              <SelectTrigger id="venue-type">
                <SelectValue placeholder="Select venue type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="indoor">Indoor</SelectItem>
                <SelectItem value="outdoor">Outdoor</SelectItem>
                <SelectItem value="hybrid">Hybrid</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" placeholder="Describe the venue" rows={4} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="venue-image">Venue Images</Label>
            <Input id="venue-image" type="file" multiple />
          </div>

          <div className="space-y-2">
            <Label htmlFor="map-link">Google Maps Link</Label>
            <div className="flex gap-2">
              <Input id="map-link" placeholder="Paste Google Maps link" />
              <Button variant="outline" size="icon">
                <MapPin className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Add Venue</Button>
      </CardFooter>
    </Card>
  )
}

