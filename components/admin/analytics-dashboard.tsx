"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, Users, DollarSign, TrendingUp } from "lucide-react"

export function AnalyticsDashboard() {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
        <p className="text-muted-foreground">Monitor your marketplace performance</p>
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="downloads">Downloads</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <MetricCard
              title="Total Downloads"
              value="12,543"
              description="+15% from last month"
              icon={<Download className="h-5 w-5" />}
            />
            <MetricCard
              title="Active Users"
              value="2,845"
              description="+7% from last month"
              icon={<Users className="h-5 w-5" />}
            />
            <MetricCard
              title="Revenue"
              value="$8,432"
              description="+23% from last month"
              icon={<DollarSign className="h-5 w-5" />}
            />
            <MetricCard
              title="Conversion Rate"
              value="3.2%"
              description="+0.5% from last month"
              icon={<TrendingUp className="h-5 w-5" />}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Popular Presets</CardTitle>
                <CardDescription>Most downloaded presets this month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Summer Vibes", downloads: 1243, category: "Premium" },
                    { name: "Moody Portrait", downloads: 987, category: "Premium" },
                    { name: "Clean Minimal", downloads: 854, category: "Free" },
                    { name: "Vintage Film", downloads: 732, category: "Premium" },
                    { name: "Urban Street", downloads: 645, category: "Free" },
                  ].map((preset, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="bg-muted w-10 h-10 rounded-md flex items-center justify-center">
                          {index + 1}
                        </div>
                        <div>
                          <div className="font-medium">{preset.name}</div>
                          <div className="text-sm text-muted-foreground">{preset.category}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Download className="h-4 w-4 text-muted-foreground" />
                        <span>{preset.downloads}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Purchases</CardTitle>
                <CardDescription>Latest premium preset purchases</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { user: "Sarah J.", preset: "Moody Portrait", price: "$24.99", time: "2 hours ago" },
                    { user: "Michael C.", preset: "Summer Vibes", price: "$19.99", time: "5 hours ago" },
                    { user: "Emma R.", preset: "Vintage Film", price: "$14.99", time: "Yesterday" },
                    { user: "David W.", preset: "Urban Collection", price: "$39.99", time: "Yesterday" },
                    { user: "Olivia T.", preset: "Portrait Pro", price: "$29.99", time: "2 days ago" },
                  ].map((purchase, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{purchase.user}</div>
                        <div className="text-sm text-muted-foreground">{purchase.preset}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{purchase.price}</div>
                        <div className="text-sm text-muted-foreground">{purchase.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="downloads" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Download Analytics</CardTitle>
              <CardDescription>Detailed download statistics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center text-muted-foreground">
                Download chart visualization would go here
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="revenue" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Analytics</CardTitle>
              <CardDescription>Detailed revenue statistics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center text-muted-foreground">
                Revenue chart visualization would go here
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>User Analytics</CardTitle>
              <CardDescription>Detailed user statistics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center text-muted-foreground">
                User chart visualization would go here
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function MetricCard({
  title,
  value,
  description,
  icon,
}: {
  title: string
  value: string
  description: string
  icon: React.ReactNode
}) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
          <div className="bg-primary/10 p-2 rounded-full text-primary">{icon}</div>
        </div>
        <div className="text-2xl font-bold mb-1">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}
