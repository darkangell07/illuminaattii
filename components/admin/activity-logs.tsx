"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, Upload, User, Trash2, Pencil, Search } from "lucide-react"

// Mock data for activity logs
const mockLogs = Array.from({ length: 20 }, (_, i) => {
  const actions = [
    { type: "download", icon: Download, description: "Downloaded a preset" },
    { type: "upload", icon: Upload, description: "Uploaded a new preset" },
    { type: "user", icon: User, description: "User login" },
    { type: "delete", icon: Trash2, description: "Deleted a preset" },
    { type: "edit", icon: Pencil, description: "Edited a preset" },
  ]

  const action = actions[Math.floor(Math.random() * actions.length)]
  const users = ["Admin User", "Test User", "Jane Smith", "John Doe", "Sarah Johnson"]
  const user = users[Math.floor(Math.random() * users.length)]
  const presets = ["Summer Vibes", "Moody Portrait", "Vintage Film", "Clean Minimal", "Urban Street"]
  const preset = presets[Math.floor(Math.random() * presets.length)]

  return {
    id: i + 1,
    timestamp: new Date(Date.now() - Math.floor(Math.random() * 10000000000)),
    user,
    action: action.type,
    actionIcon: action.icon,
    description: action.description,
    details:
      action.type === "download" || action.type === "upload" || action.type === "edit" || action.type === "delete"
        ? `${preset} preset`
        : "",
    ipAddress: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
  }
})

export function ActivityLogs() {
  const [logs, setLogs] = useState(mockLogs)
  const [searchTerm, setSearchTerm] = useState("")
  const [actionFilter, setActionFilter] = useState("all")

  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details.toLowerCase().includes(searchTerm.toLowerCase())

    if (actionFilter !== "all") {
      return log.action === actionFilter && matchesSearch
    }

    return matchesSearch
  })

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Activity Logs</h2>
          <p className="text-muted-foreground">Track all actions in your marketplace</p>
        </div>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export Logs
        </Button>
      </div>

      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search logs..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={actionFilter} onValueChange={setActionFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter by action" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Actions</SelectItem>
                <SelectItem value="download">Downloads</SelectItem>
                <SelectItem value="upload">Uploads</SelectItem>
                <SelectItem value="user">User Activity</SelectItem>
                <SelectItem value="delete">Deletions</SelectItem>
                <SelectItem value="edit">Edits</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Activity History</CardTitle>
          <CardDescription>
            Showing {filteredLogs.length} of {logs.length} activities
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Time</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>IP Address</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLogs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                    No activities found
                  </TableCell>
                </TableRow>
              ) : (
                filteredLogs.map((log) => {
                  const ActionIcon = log.actionIcon

                  return (
                    <TableRow key={log.id}>
                      <TableCell className="whitespace-nowrap">{log.timestamp.toLocaleString()}</TableCell>
                      <TableCell>{log.user}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={`
                            ${log.action === "download" ? "bg-blue-500/10 text-blue-500" : ""}
                            ${log.action === "upload" ? "bg-green-500/10 text-green-500" : ""}
                            ${log.action === "user" ? "bg-yellow-500/10 text-yellow-500" : ""}
                            ${log.action === "delete" ? "bg-red-500/10 text-red-500" : ""}
                            ${log.action === "edit" ? "bg-purple-500/10 text-purple-500" : ""}
                          `}
                        >
                          <ActionIcon className="mr-1 h-3 w-3" />
                          {log.action}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div>{log.description}</div>
                        {log.details && <div className="text-sm text-muted-foreground">{log.details}</div>}
                      </TableCell>
                      <TableCell className="text-muted-foreground">{log.ipAddress}</TableCell>
                    </TableRow>
                  )
                })
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
