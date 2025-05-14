"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Download, Eye, Heart, Grid3X3, LayoutList } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { motion } from "framer-motion"

// Mock data for presets
const presets = Array.from({ length: 12 }, (_, i) => ({
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
  rating: (Math.random() * 1 + 4).toFixed(1),
  downloads: Math.floor(Math.random() * 5000) + 100,
  image: `/placeholder.svg?height=400&width=600&text=Preset+${i + 1}`,
  afterImage: `/placeholder.svg?height=400&width=600&text=After+Effect+${i + 1}`,
  tags:
    i % 3 === 0
      ? ["Portrait", "Warm", "Natural"]
      : i % 3 === 1
        ? ["Landscape", "Vibrant", "HDR"]
        : ["Urban", "Moody", "Film"],
}))

export function PresetGrid() {
  const [activePreview, setActivePreview] = useState<number | null>(null)
  const [favorites, setFavorites] = useState<number[]>([])
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("popular")

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  // Sort presets based on selected option
  const sortedPresets = [...presets].sort((a, b) => {
    switch (sortBy) {
      case "popular":
        return Number.parseInt(b.downloads.toString()) - Number.parseInt(a.downloads.toString())
      case "rating":
        return Number.parseFloat(b.rating) - Number.parseFloat(a.rating)
      case "newest":
        return b.id - a.id
      case "price-low":
        return (
          (a.price === "Free" ? 0 : Number.parseFloat(a.price.substring(1))) -
          (b.price === "Free" ? 0 : Number.parseFloat(b.price.substring(1)))
        )
      case "price-high":
        return (
          (b.price === "Free" ? 0 : Number.parseFloat(b.price.substring(1))) -
          (a.price === "Free" ? 0 : Number.parseFloat(a.price.substring(1)))
        )
      default:
        return 0
    }
  })

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold">All Presets</h1>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popular">Most Popular</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex border rounded-md">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="icon"
              className="rounded-r-none h-10 w-10"
              onClick={() => setViewMode("grid")}
            >
              <Grid3X3 className="h-4 w-4" />
              <span className="sr-only">Grid view</span>
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="icon"
              className="rounded-l-none h-10 w-10"
              onClick={() => setViewMode("list")}
            >
              <LayoutList className="h-4 w-4" />
              <span className="sr-only">List view</span>
            </Button>
          </div>
        </div>
      </div>

      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedPresets.map((preset, index) => (
            <motion.div
              key={preset.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Card className="overflow-hidden group h-full flex flex-col">
                <div className="relative h-[200px] overflow-hidden">
                  <Image
                    src={activePreview === preset.id ? preset.afterImage : preset.image}
                    alt={preset.name}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button
                      variant="secondary"
                      size="sm"
                      className="mr-2"
                      onMouseEnter={() => setActivePreview(preset.id)}
                      onMouseLeave={() => setActivePreview(null)}
                    >
                      <Eye className="h-4 w-4 mr-1" /> Preview
                    </Button>
                    <Button variant="default" size="sm" asChild>
                      <Link href={`/presets/${preset.id}`}>
                        <Download className="h-4 w-4 mr-1" /> Get
                      </Link>
                    </Button>
                  </div>
                  <Badge
                    className="absolute top-2 right-2"
                    variant={preset.category === "Premium" ? "default" : "secondary"}
                  >
                    {preset.category}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 left-2 h-8 w-8 bg-background/20 hover:bg-background/40 backdrop-blur-sm"
                    onClick={() => toggleFavorite(preset.id)}
                  >
                    <Heart className={`h-4 w-4 ${favorites.includes(preset.id) ? "fill-red-500 text-red-500" : ""}`} />
                    <span className="sr-only">Add to favorites</span>
                  </Button>
                </div>
                <CardHeader className="p-4 pb-0">
                  <CardTitle className="text-lg">{preset.name}</CardTitle>
                  <CardDescription>{preset.description}</CardDescription>
                </CardHeader>
                <CardContent className="p-4 pt-2 flex-grow">
                  <div className="flex flex-wrap gap-1 mb-2">
                    {preset.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex justify-between">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                    <span className="text-sm">{preset.rating}</span>
                    <span className="text-xs text-muted-foreground ml-2">({preset.downloads})</span>
                  </div>
                  <div className="font-medium">{preset.price}</div>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {sortedPresets.map((preset, index) => (
            <motion.div
              key={preset.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Card className="overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  <div className="relative w-full md:w-[200px] h-[200px]">
                    <Image
                      src={activePreview === preset.id ? preset.afterImage : preset.image}
                      alt={preset.name}
                      fill
                      className="object-cover"
                    />
                    <Badge
                      className="absolute top-2 right-2"
                      variant={preset.category === "Premium" ? "default" : "secondary"}
                    >
                      {preset.category}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 left-2 h-8 w-8 bg-background/20 hover:bg-background/40 backdrop-blur-sm"
                      onClick={() => toggleFavorite(preset.id)}
                    >
                      <Heart
                        className={`h-4 w-4 ${favorites.includes(preset.id) ? "fill-red-500 text-red-500" : ""}`}
                      />
                      <span className="sr-only">Add to favorites</span>
                    </Button>
                  </div>
                  <div className="flex-1 p-4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                      <div>
                        <h3 className="text-lg font-medium">{preset.name}</h3>
                        <p className="text-muted-foreground">{preset.description}</p>
                      </div>
                      <div className="font-medium mt-2 md:mt-0">{preset.price}</div>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-4 mt-2">
                      {preset.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                        <span className="text-sm">{preset.rating}</span>
                        <span className="text-xs text-muted-foreground ml-2">({preset.downloads} downloads)</span>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onMouseEnter={() => setActivePreview(preset.id)}
                          onMouseLeave={() => setActivePreview(null)}
                        >
                          <Eye className="h-4 w-4 mr-1" /> Preview
                        </Button>
                        <Button variant="default" size="sm" asChild>
                          <Link href={`/presets/${preset.id}`}>
                            <Download className="h-4 w-4 mr-1" /> Get
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
