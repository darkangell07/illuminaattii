"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Star, Download, Eye, Heart } from "lucide-react"

const featuredPresets = [
  {
    id: 1,
    name: "Summer Vibes",
    description: "Perfect for beach and outdoor summer photos",
    category: "Premium",
    price: "$19.99",
    rating: 4.8,
    downloads: 1243,
    image: "/placeholder.svg?height=400&width=600&text=Summer+Vibes",
    afterImage: "/placeholder.svg?height=400&width=600&text=After+Effect",
    tags: ["Summer", "Outdoor", "Vibrant"],
  },
  {
    id: 2,
    name: "Moody Portrait",
    description: "Create dramatic and moody portrait effects",
    category: "Premium",
    price: "$24.99",
    rating: 4.9,
    downloads: 2156,
    image: "/placeholder.svg?height=400&width=600&text=Moody+Portrait",
    afterImage: "/placeholder.svg?height=400&width=600&text=After+Effect",
    tags: ["Portrait", "Moody", "Dark"],
  },
  {
    id: 3,
    name: "Vintage Film",
    description: "Classic film look with authentic grain and colors",
    category: "Premium",
    price: "$14.99",
    rating: 4.7,
    downloads: 987,
    image: "/placeholder.svg?height=400&width=600&text=Vintage+Film",
    afterImage: "/placeholder.svg?height=400&width=600&text=After+Effect",
    tags: ["Vintage", "Film", "Retro"],
  },
  {
    id: 4,
    name: "Clean Minimal",
    description: "Clean and minimal look for product photography",
    category: "Free",
    price: "Free",
    rating: 4.5,
    downloads: 3421,
    image: "/placeholder.svg?height=400&width=600&text=Clean+Minimal",
    afterImage: "/placeholder.svg?height=400&width=600&text=After+Effect",
    tags: ["Minimal", "Clean", "Product"],
  },
]

export function FeaturedPresets() {
  const [activePreview, setActivePreview] = useState<number | null>(null)
  const [favorites, setFavorites] = useState<number[]>([])

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Featured Presets</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our most popular presets, handpicked by our team of professional photographers
          </p>
        </motion.div>

        <Tabs defaultValue="all" className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="premium">Premium</TabsTrigger>
              <TabsTrigger value="free">Free</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="all" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredPresets.map((preset, index) => (
                <motion.div
                  key={preset.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
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
                        <Heart
                          className={`h-4 w-4 ${favorites.includes(preset.id) ? "fill-red-500 text-red-500" : ""}`}
                        />
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
          </TabsContent>

          <TabsContent value="premium" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredPresets
                .filter((preset) => preset.category === "Premium")
                .map((preset, index) => (
                  <motion.div
                    key={preset.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
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
                        <Badge className="absolute top-2 right-2">{preset.category}</Badge>
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
          </TabsContent>

          <TabsContent value="free" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredPresets
                .filter((preset) => preset.category === "Free")
                .map((preset, index) => (
                  <motion.div
                    key={preset.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
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
                        <Badge className="absolute top-2 right-2" variant="secondary">
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
          </TabsContent>
        </Tabs>

        <div className="text-center mt-12">
          <Button asChild size="lg">
            <Link href="/presets">View All Presets</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
