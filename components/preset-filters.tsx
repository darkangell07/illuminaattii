"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { Search, X, SlidersHorizontal } from "lucide-react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

const categories = [
  { id: "portrait", label: "Portrait" },
  { id: "landscape", label: "Landscape" },
  { id: "blackandwhite", label: "Black & White" },
  { id: "film", label: "Film" },
  { id: "urban", label: "Urban" },
  { id: "travel", label: "Travel" },
  { id: "wedding", label: "Wedding" },
  { id: "food", label: "Food" },
]

const tags = [
  { id: "vibrant", label: "Vibrant" },
  { id: "moody", label: "Moody" },
  { id: "vintage", label: "Vintage" },
  { id: "minimal", label: "Minimal" },
  { id: "warm", label: "Warm" },
  { id: "cool", label: "Cool" },
  { id: "cinematic", label: "Cinematic" },
  { id: "retro", label: "Retro" },
  { id: "pastel", label: "Pastel" },
  { id: "hdr", label: "HDR" },
]

export function PresetFilters() {
  const [searchTerm, setSearchTerm] = useState("")
  const [priceRange, setPriceRange] = useState([0, 50])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  const handleCategoryChange = (id: string) => {
    setSelectedCategories((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  const handleTagChange = (id: string) => {
    setSelectedTags((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  const clearFilters = () => {
    setSearchTerm("")
    setPriceRange([0, 50])
    setSelectedCategories([])
    setSelectedTags([])
  }

  const hasActiveFilters =
    searchTerm || selectedCategories.length > 0 || selectedTags.length > 0 || priceRange[0] > 0 || priceRange[1] < 50

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Search */}
      <div>
        <Label htmlFor="search" className="text-sm font-medium mb-2 block">
          Search
        </Label>
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            id="search"
            type="search"
            placeholder="Search presets..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-9 w-9"
              onClick={() => setSearchTerm("")}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Clear search</span>
            </Button>
          )}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <Label className="text-sm font-medium mb-2 block">Price Range</Label>
        <div className="pt-4 px-2">
          <Slider defaultValue={[0, 50]} max={50} step={1} value={priceRange} onValueChange={setPriceRange} />
        </div>
        <div className="flex items-center justify-between mt-2">
          <span className="text-sm">${priceRange[0]}</span>
          <span className="text-sm">${priceRange[1]}</span>
        </div>
      </div>

      {/* Categories */}
      <Accordion type="multiple" defaultValue={["categories"]}>
        <AccordionItem value="categories">
          <AccordionTrigger className="text-sm font-medium py-2">Categories</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pt-1">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`category-${category.id}`}
                    checked={selectedCategories.includes(category.id)}
                    onCheckedChange={() => handleCategoryChange(category.id)}
                  />
                  <Label htmlFor={`category-${category.id}`} className="text-sm cursor-pointer">
                    {category.label}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Tags */}
      <Accordion type="multiple" defaultValue={["tags"]}>
        <AccordionItem value="tags">
          <AccordionTrigger className="text-sm font-medium py-2">Tags</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pt-1">
              {tags.map((tag) => (
                <div key={tag.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`tag-${tag.id}`}
                    checked={selectedTags.includes(tag.id)}
                    onCheckedChange={() => handleTagChange(tag.id)}
                  />
                  <Label htmlFor={`tag-${tag.id}`} className="text-sm cursor-pointer">
                    {tag.label}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Type */}
      <Accordion type="multiple" defaultValue={["type"]}>
        <AccordionItem value="type">
          <AccordionTrigger className="text-sm font-medium py-2">Type</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pt-1">
              <div className="flex items-center space-x-2">
                <Checkbox id="type-free" />
                <Label htmlFor="type-free" className="text-sm cursor-pointer">
                  Free
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="type-premium" />
                <Label htmlFor="type-premium" className="text-sm cursor-pointer">
                  Premium
                </Label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Rating */}
      <Accordion type="multiple" defaultValue={["rating"]}>
        <AccordionItem value="rating">
          <AccordionTrigger className="text-sm font-medium py-2">Rating</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pt-1">
              <div className="flex items-center space-x-2">
                <Checkbox id="rating-4plus" />
                <Label htmlFor="rating-4plus" className="text-sm cursor-pointer">
                  4+ Stars
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="rating-3plus" />
                <Label htmlFor="rating-3plus" className="text-sm cursor-pointer">
                  3+ Stars
                </Label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )

  return (
    <>
      {/* Mobile filter button */}
      <div className="md:hidden mb-4 flex items-center justify-between">
        <div className="relative w-full mr-2">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search presets..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <SlidersHorizontal className="h-4 w-4" />
              <span className="sr-only">Filters</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px]">
            <SheetHeader className="mb-5">
              <SheetTitle>Filters</SheetTitle>
              <SheetDescription>Refine your preset search</SheetDescription>
            </SheetHeader>
            <div className="flex justify-end mb-4">
              {hasActiveFilters && (
                <Button variant="ghost" size="sm" onClick={clearFilters} className="h-8 px-2 text-xs">
                  Clear All
                </Button>
              )}
            </div>
            <FilterContent />
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop filters */}
      <div className="hidden md:block bg-card p-4 rounded-lg border sticky top-20">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-lg">Filters</h2>
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={clearFilters} className="h-8 px-2 text-xs">
              Clear All
            </Button>
          )}
        </div>

        <FilterContent />
      </div>
    </>
  )
}
