"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { Loader2 } from "lucide-react"
import { generateRandomCode } from "@/lib/utils"

interface AdminPresetFormProps {
  presetId?: string
}

export function AdminPresetForm({ presetId }: AdminPresetFormProps) {
  const [isLoading, setIsLoading] = useState(false)
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

  useEffect(() => {
    if (presetId) {
      // Simulate fetching preset data
      setIsLoading(true)
      setTimeout(() => {
        // Mock preset data
        const mockPreset = {
          id: presetId,
          name: `Preset ${presetId}`,
          description: "Mock description",
          category: "Premium",
          price: "19.99",
          accessCode: generateRandomCode(6),
          status: "Published",
          tags: "tag1, tag2",
        }

        setFormData({
          name: mockPreset.name,
          description: mockPreset.description,
          category: mockPreset.category,
          price: mockPreset.price,
          accessCode: mockPreset.accessCode,
          status: mockPreset.status,
          tags: mockPreset.tags,
        })
        setIsLoading(false)
      }, 500)
    }
  }, [presetId])

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Preset saved",
        description: `Preset ${formData.name} has been saved successfully.`,
      })
      setIsLoading(false)
    }, 1000)
  }

  return (
    <Card>
      <CardContent className="p-8">
        {isLoading ? (
          <div className="flex items-center justify-center h-48">
            <Loader2 className="mr-2 h-6 w-6 animate-spin" />
            Loading preset data...
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="name">Preset Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleFormChange}
                placeholder="Enter preset name"
                required
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleFormChange}
                placeholder="Enter preset description"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="category">Category</Label>
                <Select value={formData.category} onValueChange={(value) => handleSelectChange("category", value)}>
                  <SelectTrigger id="category">
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
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Draft">Draft</SelectItem>
                    <SelectItem value="Published">Published</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {formData.category === "Premium" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="price">Price ($)</Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.price}
                    onChange={handleFormChange}
                    placeholder="Enter price"
                  />
                </div>

                <div>
                  <Label htmlFor="accessCode">Access Code</Label>
                  <div className="flex gap-2">
                    <Input
                      id="accessCode"
                      name="accessCode"
                      value={formData.accessCode}
                      onChange={handleFormChange}
                      placeholder="Enter access code"
                    />
                    <Button type="button" variant="outline" onClick={generateAccessCode}>
                      Generate
                    </Button>
                  </div>
                </div>
              </div>
            )}

            <div>
              <Label htmlFor="tags">Tags (comma separated)</Label>
              <Input id="tags" name="tags" value={formData.tags} onChange={handleFormChange} placeholder="Enter tags" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="presetFile">Preset File</Label>
                <Input id="presetFile" type="file" accept=".xmp,.lrtemplate,.dng" />
              </div>

              <div>
                <Label htmlFor="previewImages">Preview Images</Label>
                <Input id="previewImages" type="file" accept="image/*" multiple />
              </div>
            </div>

            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Preset"
              )}
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  )
}
