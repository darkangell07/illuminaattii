"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"
import { Loader2, Plus, Pencil, Trash2, Upload, Download, Eye, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Checkbox } from "@/components/ui/checkbox"
import { generateRandomCode } from "@/lib/utils"

// Mock data for presets
const mockPresets = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  name: `Preset ${i + 1}`,
  description:
    i % 3 === 0
      ? "Perfect for portrait photography with natural light"
      : i % 3 === 1
        ? "Ideal for landscape and nature photography"
        : "Great for urban and street photography",
  category: i % 3 === 0 ? "Premium" : "Free",
  price: i % 3 === 0 ? `$${(Math.random() * 20 + 10).toFixed(2)}` : "Free",
  accessCode: i % 3 === 0 ? generateRandomCode(6) : null,
  status: i % 5 === 0 ? "Draft" : "Published",
  downloads: Math.floor(Math.random() * 5000) + 100,
  createdAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000)),
  tags:
    i % 3 === 0
      ? ["Portrait", "Warm", "Natural"]
      : i % 3 === 1
        ? ["Landscape", "Vibrant", "HDR"]
        : ["Urban", "Moody", "Film"],
}))

export function PresetManagement() {
  const [presets, setPresets] = useState(mockPresets)
  const [isLoading, setIsLoading] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [selectedPreset, setSelectedPreset] = useState<any>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isAddEditDialogOpen, setIsAddEditDialogOpen] = useState(false)
  const [isBulkUploadDialogOpen, setIsBulkUploadDialogOpen] = useState(false)
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "Free",
    price: "",
    accessCode: "",
    status: "Draft",
    tags: "",
  })

  const { toast } = useToast()

  const handleAddPreset = () => {
    setSelectedPreset(null)
    setFormData({
      name: "",
      description: "",
      category: "Free",
      price: "",
      accessCode: "",
      status: "Draft",
      tags: "",
    })
    setIsAddEditDialogOpen(true)
  }

  const handleEditPreset = (preset: any) => {
    setSelectedPreset(preset)
    setFormData({
      name: preset.name,
      description: preset.description,
      category: preset.category,
      price: preset.price === "Free" ? "" : preset.price.substring(1),
      accessCode: preset.accessCode || "",
      status: preset.status,
      tags: preset.tags.join(", "),
    })
    setIsAddEditDialogOpen(true)
  }

  const handleDeletePreset = (preset: any) => {
    setSelectedPreset(preset)
    setIsDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (!selectedPreset) return

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setPresets(presets.filter((p) => p.id !== selectedPreset.id))
      setIsDeleteDialogOpen(false)
      setIsLoading(false)

      toast({
        title: "Preset deleted",
        description: `${selectedPreset.name} has been deleted successfully.`,
      })
    }, 1000)
  }

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const generateAccessCode = () => {
    const code = generateRandomCode(6)
    setFormData((prev) => ({ ...prev, accessCode: code }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Validate form
    if (!formData.name) {
      toast({
        title: "Validation error",
        description: "Preset name is required.",
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }

    if (formData.category === "Premium" && !formData.price) {
      toast({
        title: "Validation error",
        description: "Price is required for premium presets.",
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }

    if (formData.category === "Premium" && !formData.accessCode) {
      toast({
        title: "Validation error",
        description: "Access code is required for premium presets.",
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }

    // Simulate API call
    setTimeout(() => {
      if (selectedPreset) {
        // Update existing preset
        setPresets(
          presets.map((p) =>
            p.id === selectedPreset.id
              ? {
                  ...p,
                  name: formData.name,
                  description: formData.description,
                  category: formData.category,
                  price: formData.category === "Free" ? "Free" : `$${formData.price}`,
                  accessCode: formData.category === "Premium" ? formData.accessCode : null,
                  status: formData.status,
                  tags: formData.tags.split(",").map((tag) => tag.trim()),
                }
              : p,
          ),
        )

        toast({
          title: "Preset updated",
          description: `${formData.name} has been updated successfully.`,
        })
      } else {
        // Add new preset
        const newPreset = {
          id: Math.max(...presets.map((p) => p.id)) + 1,
          name: formData.name,
          description: formData.description,
          category: formData.category,
          price: formData.category === "Free" ? "Free" : `$${formData.price}`,
          accessCode: formData.category === "Premium" ? formData.accessCode : null,
          status: formData.status,
          downloads: 0,
          createdAt: new Date(),
          tags: formData.tags.split(",").map((tag) => tag.trim()),
        }

        setPresets([newPreset, ...presets])

        toast({
          title: "Preset added",
          description: `${formData.name} has been added successfully.`,
        })
      }

      setIsAddEditDialogOpen(false)
      setIsLoading(false)
    }, 1500)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles(Array.from(e.target.files))
    }
  }

  const handleBulkUpload = () => {
    if (selectedFiles.length === 0) {
      toast({
        title: "No files selected",
        description: "Please select preset files to upload.",
        variant: "destructive",
      })
      return
    }

    setIsUploading(true)
    setUploadProgress(0)

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)

          // Simulate processing time after upload completes
          setTimeout(() => {
            setIsUploading(false)
            setIsBulkUploadDialogOpen(false)
            setSelectedFiles([])

            // Add new presets
            const newPresets = selectedFiles.map((file, index) => ({
              id: Math.max(...presets.map((p) => p.id)) + index + 1,
              name: file.name.replace(/\.[^/.]+$/, ""),
              description: "Newly uploaded preset",
              category: "Free",
              price: "Free",
              accessCode: null,
              status: "Draft",
              downloads: 0,
              createdAt: new Date(),
              tags: ["New", "Upload"],
            }))

            setPresets([...newPresets, ...presets])

            toast({
              title: "Upload complete",
              description: `${selectedFiles.length} presets have been uploaded successfully.`,
            })
          }, 1000)

          return 100
        }
        return prev + 100 / (selectedFiles.length * 5)
      })
    }, 200)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Preset Management</h2>
        <div className="flex gap-2">
          <Button onClick={handleAddPreset}>
            <Plus className="mr-2 h-4 w-4" />
            Add Preset
          </Button>
          <Button variant="outline" onClick={() => setIsBulkUploadDialogOpen(true)}>
            <Upload className="mr-2 h-4 w-4" />
            Bulk Upload
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Presets</TabsTrigger>
          <TabsTrigger value="premium">Premium</TabsTrigger>
          <TabsTrigger value="free">Free</TabsTrigger>
          <TabsTrigger value="draft">Drafts</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <PresetTable presets={presets} onEdit={handleEditPreset} onDelete={handleDeletePreset} />
        </TabsContent>

        <TabsContent value="premium" className="mt-6">
          <PresetTable
            presets={presets.filter((p) => p.category === "Premium")}
            onEdit={handleEditPreset}
            onDelete={handleDeletePreset}
          />
        </TabsContent>

        <TabsContent value="free" className="mt-6">
          <PresetTable
            presets={presets.filter((p) => p.category === "Free")}
            onEdit={handleEditPreset}
            onDelete={handleDeletePreset}
          />
        </TabsContent>

        <TabsContent value="draft" className="mt-6">
          <PresetTable
            presets={presets.filter((p) => p.status === "Draft")}
            onEdit={handleEditPreset}
            onDelete={handleDeletePreset}
          />
        </TabsContent>
      </Tabs>

      {/* Add/Edit Preset Dialog */}
      <Dialog open={isAddEditDialogOpen} onOpenChange={setIsAddEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedPreset ? "Edit Preset" : "Add New Preset"}</DialogTitle>
            <DialogDescription>
              {selectedPreset ? "Update the details of your preset" : "Fill in the details to add a new preset"}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="col-span-2">
                <Label htmlFor="name">Preset Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  placeholder="Enter preset name"
                  className="mt-1"
                  required
                />
              </div>

              <div className="col-span-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleFormChange}
                  placeholder="Enter preset description"
                  className="mt-1"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="category">Category</Label>
                <Select value={formData.category} onValueChange={(value) => handleSelectChange("category", value)}>
                  <SelectTrigger id="category" className="mt-1">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Free">Free</SelectItem>
                    <SelectItem value="Premium">Premium</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="status">Status</Label>
                <Select value={formData.status} onValueChange={(value) => handleSelectChange("status", value)}>
                  <SelectTrigger id="status" className="mt-1">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Draft">Draft</SelectItem>
                    <SelectItem value="Published">Published</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {formData.category === "Premium" && (
                <div>
                  <Label htmlFor="price">Price ($)</Label>
                  <Input
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleFormChange}
                    placeholder="19.99"
                    className="mt-1"
                    type="number"
                    step="0.01"
                    min="0"
                  />
                </div>
              )}

              {formData.category === "Premium" && (
                <div>
                  <Label htmlFor="accessCode">Access Code</Label>
                  <div className="flex gap-2 mt-1">
                    <Input
                      id="accessCode"
                      name="accessCode"
                      value={formData.accessCode}
                      onChange={handleFormChange}
                      placeholder="123456"
                    />
                    <Button type="button" variant="outline" onClick={generateAccessCode}>
                      Generate
                    </Button>
                  </div>
                </div>
              )}

              <div className="col-span-2">
                <Label htmlFor="tags">Tags (comma separated)</Label>
                <Input
                  id="tags"
                  name="tags"
                  value={formData.tags}
                  onChange={handleFormChange}
                  placeholder="Portrait, Warm, Natural"
                  className="mt-1"
                />
              </div>

              <div className="col-span-2">
                <Label htmlFor="presetFile">Preset File</Label>
                <Input id="presetFile" type="file" accept=".xmp,.lrtemplate,.dng" className="mt-1" />
              </div>

              <div className="col-span-2">
                <Label htmlFor="previewImages">Preview Images</Label>
                <Input id="previewImages" type="file" accept="image/*" multiple className="mt-1" />
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsAddEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {selectedPreset ? "Updating..." : "Adding..."}
                  </>
                ) : selectedPreset ? (
                  "Update Preset"
                ) : (
                  "Add Preset"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{selectedPreset?.name}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete} disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Bulk Upload Dialog */}
      <Dialog open={isBulkUploadDialogOpen} onOpenChange={setIsBulkUploadDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Bulk Upload Presets</DialogTitle>
            <DialogDescription>
              Upload multiple preset files at once. They will be added as drafts that you can edit later.
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <Label htmlFor="bulkFiles">Select Preset Files</Label>
            <Input
              id="bulkFiles"
              type="file"
              accept=".xmp,.lrtemplate,.dng"
              multiple
              className="mt-1"
              onChange={handleFileChange}
              disabled={isUploading}
            />

            {selectedFiles.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-medium mb-2">Selected Files ({selectedFiles.length})</h4>
                <ScrollArea className="h-[100px] border rounded-md p-2">
                  <ul className="text-sm">
                    {selectedFiles.map((file, index) => (
                      <li key={index} className="py-1">
                        {file.name} ({(file.size / 1024).toFixed(1)} KB)
                      </li>
                    ))}
                  </ul>
                </ScrollArea>
              </div>
            )}

            {isUploading && (
              <div className="mt-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>Uploading...</span>
                  <span>{Math.round(uploadProgress)}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: `${uploadProgress}%` }}></div>
                </div>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsBulkUploadDialogOpen(false)} disabled={isUploading}>
              Cancel
            </Button>
            <Button onClick={handleBulkUpload} disabled={isUploading || selectedFiles.length === 0}>
              {isUploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Upload {selectedFiles.length > 0 ? `(${selectedFiles.length})` : ""}
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function PresetTable({
  presets,
  onEdit,
  onDelete,
}: {
  presets: any[]
  onEdit: (preset: any) => void
  onDelete: (preset: any) => void
}) {
  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                <Checkbox />
              </TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Downloads</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {presets.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                  No presets found
                </TableCell>
              </TableRow>
            ) : (
              presets.map((preset) => (
                <TableRow key={preset.id}>
                  <TableCell>
                    <Checkbox />
                  </TableCell>
                  <TableCell className="font-medium">{preset.name}</TableCell>
                  <TableCell>
                    <Badge variant={preset.category === "Premium" ? "default" : "secondary"}>{preset.category}</Badge>
                  </TableCell>
                  <TableCell>{preset.price}</TableCell>
                  <TableCell>
                    <Badge variant={preset.status === "Published" ? "outline" : "secondary"}>{preset.status}</Badge>
                  </TableCell>
                  <TableCell>{preset.downloads.toLocaleString()}</TableCell>
                  <TableCell>{preset.createdAt.toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onEdit(preset)}>
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive"
                          onClick={() => onDelete(preset)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
