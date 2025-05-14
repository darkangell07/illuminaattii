"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, UserCog, UserX, Mail, Eye } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"

// Mock data for users
const mockUsers = [
  {
    id: 1,
    name: "Admin User",
    email: "admin@illuminaattii.com",
    role: "admin",
    status: "active",
    downloads: 45,
    lastLogin: new Date(Date.now() - 1000000),
    avatar: "/placeholder.svg?height=40&width=40&text=AU",
  },
  {
    id: 2,
    name: "Test User",
    email: "user@example.com",
    role: "user",
    status: "active",
    downloads: 12,
    lastLogin: new Date(Date.now() - 5000000),
    avatar: "/placeholder.svg?height=40&width=40&text=TU",
  },
  {
    id: 3,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "user",
    status: "active",
    downloads: 28,
    lastLogin: new Date(Date.now() - 10000000),
    avatar: "/placeholder.svg?height=40&width=40&text=JS",
  },
  {
    id: 4,
    name: "John Doe",
    email: "john@example.com",
    role: "user",
    status: "inactive",
    downloads: 5,
    lastLogin: new Date(Date.now() - 50000000),
    avatar: "/placeholder.svg?height=40&width=40&text=JD",
  },
  {
    id: 5,
    name: "Sarah Johnson",
    email: "sarah@example.com",
    role: "user",
    status: "active",
    downloads: 32,
    lastLogin: new Date(Date.now() - 2000000),
    avatar: "/placeholder.svg?height=40&width=40&text=SJ",
  },
]

export function UserManagement() {
  const [users, setUsers] = useState(mockUsers)

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">User Management</h2>
        <Button>Add User</Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">
                  <Checkbox />
                </TableHead>
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Downloads</TableHead>
                <TableHead>Last Login</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <Checkbox />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-muted-foreground">{user.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={user.role === "admin" ? "default" : "outline"}>{user.role}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={user.status === "active" ? "outline" : "secondary"}>{user.status}</Badge>
                  </TableCell>
                  <TableCell>{user.downloads}</TableCell>
                  <TableCell>{user.lastLogin.toLocaleString()}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          View Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <UserCog className="mr-2 h-4 w-4" />
                          Edit User
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Mail className="mr-2 h-4 w-4" />
                          Send Email
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive focus:text-destructive">
                          <UserX className="mr-2 h-4 w-4" />
                          Deactivate
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
