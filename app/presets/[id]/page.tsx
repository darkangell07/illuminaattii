"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { useParams } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { ParticleBackground } from "@/components/particle-background"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Star, Download, Heart, Share2, Instagram, AlertCircle, Check } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Footer } from "@/components/footer"
import { SupportChat } from "@/components/support-chat"

// Mock data for a single preset
const getPresetData = (id: string) => ({
  id: Number.parseInt(id),
  name: `Preset ${id}`,
  description:
    "Professional Lightroom preset perfect for portrait photography with natural light. Enhances skin tones and creates a warm, cinematic look.",
  longDescription:
    "This premium preset has been carefully crafted to enhance your portrait photography. It brings out natural skin tones while adding a warm, cinematic quality to your images. Perfect for outdoor portraits, wedding photography, and fashion shoots. The preset adjusts highlights, shadows, and color grading to create a consistent, professional look across all your images.",
  category: Number.parseInt(id) % 3 === 0 ? "Premium" : "Free",
  price: Number.parseInt(id) % 3 === 0 ? `$${(Math.random() * 20 + 10).toFixed(2)}` : "Free",
  rating: (Math.random() * 1 + 4).toFixed(1),
  downloads: Math.floor(Math.random() * 5000) + 100,
  image: `/placeholder.svg?height=600&width=800&text=Preset+${id}`,
  afterImage: `/placeholder.svg?height=600&width=800&text=After+Effect+${id}`,
  beforeImage: `/placeholder.svg?height=600&width=800&text=Before+${id}`,
  tags: ["Portrait", "Warm", "Natural", "Cinematic"],
  features: [
    "Enhanced skin tones",
    "Warm color grading",
    "Cinematic contrast",
    "Subtle film grain",
    "Optimized for all lighting conditions",
  ],
  compatibility: ["Lightroom Classic", "Lightroom Mobile", "Lightroom CC"],
  relatedPresets: [1, 2, 3, 4].filter((num) => num !== Number.parseInt(id)),
})

export default function PresetDetailPage() {
  const params = useParams()
  const id = params.id as string
  const preset = getPresetData(id)

  const [sliderValue, setSliderValue] = useState(50)
  const [isFavorite, setIsFavorite] = useState(false)
  const [accessCode, setAccessCode] = useState("")
  const [isDownloading, setIsDownloading] = useState(false)
  const [downloadProgress, setDownloadProgress] = useState(0)
  const [showCodeDialog, setShowCodeDialog] = useState(false)
  const [codeAttempts, setCodeAttempts] = useState(0)
  const [codeVerified, setCodeVerified] = useState(false)

  const sliderContainerRef = useRef<HTMLDivElement>(null)
  const dividerRef = useRef<HTMLDivElement>(null)

  const { toast } = useToast()

  // Fix for slider interaction bug
  useEffect(() => {
    const container = sliderContainerRef.current
    const divider = dividerRef.current

    if (!container || !divider) return

    const handleMouseDown = (e: MouseEvent) => {
      e.preventDefault()

      const startX = e.clientX
      const containerRect = container.getBoundingClientRect()
      const startPosition = ((e.clientX - containerRect.left) / containerRect.width) * 100

      setSliderValue(Math.max(0, Math.min(100, startPosition)))

      const handleMouseMove = (e: MouseEvent) => {
        const newPosition = ((e.clientX - containerRect.left) / containerRect.width) * 100
        setSliderValue(Math.max(0, Math.min(100, newPosition)))
      }

      const handleMouseUp = () => {
        document.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("mouseup", handleMouseUp)
      }

      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
    }

    divider.addEventListener("mousedown", handleMouseDown)

    return () => {
      divider.removeEventListener("mousedown", handleMouseDown)
    }
  }, [])

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite)
    toast({
      title: !isFavorite ? "Added to favorites" : "Removed from favorites",
      description: !isFavorite
        ? "This preset has been added to your favorites"
        : "This preset has been removed from your favorites",
    })
  }

  const handleCodeSubmit = () => {
    // For demo purposes, any 6-digit code works
    if (accessCode.length === 6 && /^\d+$/.test(accessCode)) {
      setCodeVerified(true)
      setShowCodeDialog(false)
      toast({
        title: "Access code verified",
        description: "You can now download this preset",
      })
    } else {
      setCodeAttempts((prev) => prev + 1)
      toast({
        title: "Invalid access code",
        description: `Please try again. ${3 - codeAttempts} attempts remaining.`,
        variant: "destructive",
      })

      if (codeAttempts >= 2) {
        toast({
          title: "Too many attempts",
          description: "Please try again later or contact support",
          variant: "destructive",
        })
        setShowCodeDialog(false)
      }
    }
  }

  const startDownload = () => {
    if (preset.category === "Premium" && !codeVerified) {
      setShowCodeDialog(true)
      return
    }

    setIsDownloading(true)
    setDownloadProgress(0)

    // Simulate download progress
    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsDownloading(false)
          toast({
            title: "Download complete",
            description: "Your preset has been downloaded successfully",
          })
          return 100
        }
        return prev + 10
      })
    }, 300)
  }

  return (
    <div className="relative min-h-screen">
      <ParticleBackground />
      <div className="relative z-10">
        <SiteHeader />
        <main className="container mx-auto py-8 px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Preset Preview */}
            <div>
              <div
                ref={sliderContainerRef}
                className="relative h-[400px] md:h-[500px] w-full rounded-lg overflow-hidden mb-4"
              >
                <div className="absolute inset-0 overflow-hidden">
                  <Image src={preset.beforeImage || "/placeholder.svg"} alt="Before" fill className="object-cover" />
                </div>
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{
                    clipPath: `inset(0 ${100 - sliderValue}% 0 0)`,
                  }}
                >
                  <Image src={preset.afterImage || "/placeholder.svg"} alt="After" fill className="object-cover" />
                </div>
                <div
                  ref={dividerRef}
                  className="absolute inset-y-0 w-1 bg-white cursor-ew-resize"
                  style={{
                    left: `${sliderValue}%`,
                    transform: "translateX(-50%)",
                  }}
                />
                <div className="absolute inset-x-0 bottom-6 px-6">
                  <Slider
                    value={[sliderValue]}
                    min={0}
                    max={100}
                    step={1}
                    onValueChange={(value) => setSliderValue(value[0])}
                    className="z-10"
                  />
                </div>

                <Badge
                  className="absolute top-4 right-4"
                  variant={preset.category === "Premium" ? "default" : "secondary"}
                >
                  {preset.category}
                </Badge>
              </div>

              <p className="text-sm text-center text-muted-foreground mb-8">
                Drag the slider to compare before and after
              </p>

              <div className="grid grid-cols-4 gap-2">
                {[1, 2, 3, 4].map((num) => (
                  <div key={num} className="relative aspect-square rounded-md overflow-hidden cursor-pointer">
                    <Image
                      src={`/placeholder.svg?height=150&width=150&text=Example+${num}`}
                      alt={`Example ${num}`}
                      fill
                      className="object-cover hover:scale-105 transition-transform"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Preset Details */}
            <div>
              <h1 className="text-3xl font-bold mb-2">{preset.name}</h1>

              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                  <span>{preset.rating}</span>
                </div>
                <span className="text-muted-foreground">|</span>
                <span className="text-muted-foreground">{preset.downloads} downloads</span>
              </div>

              <p className="text-lg mb-4">{preset.description}</p>

              <div className="flex flex-wrap gap-2 mb-6">
                {preset.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center gap-4 mb-8">
                <span className="text-2xl font-bold">{preset.price}</span>
                <Button size="lg" className="flex-1" onClick={startDownload} disabled={isDownloading}>
                  {isDownloading ? (
                    <>
                      <Download className="mr-2 h-4 w-4" />
                      Downloading...
                    </>
                  ) : (
                    <>
                      <Download className="mr-2 h-4 w-4" />
                      Download Now
                    </>
                  )}
                </Button>
                <Button variant="outline" size="icon" className="h-10 w-10" onClick={toggleFavorite}>
                  <Heart className={`h-5 w-5 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
                  <span className="sr-only">Add to favorites</span>
                </Button>
                <Button variant="outline" size="icon" className="h-10 w-10">
                  <Share2 className="h-5 w-5" />
                  <span className="sr-only">Share</span>
                </Button>
              </div>

              {isDownloading && (
                <div className="mb-8">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Downloading...</span>
                    <span>{downloadProgress}%</span>
                  </div>
                  <Progress value={downloadProgress} className="h-2" />
                </div>
              )}

              {preset.category === "Premium" && !codeVerified && (
                <Card className="mb-6">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h3 className="font-medium mb-1">Access Code Required</h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          This premium preset requires an access code to download.
                        </p>
                        <Button variant="outline" size="sm" className="gap-2" onClick={() => setShowCodeDialog(true)}>
                          <Instagram className="h-4 w-4" />
                          Need the Code?
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {preset.category === "Premium" && codeVerified && (
                <Card className="mb-6 border-green-500/50">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-green-500 mt-0.5" />
                      <div>
                        <h3 className="font-medium mb-1">Access Code Verified</h3>
                        <p className="text-sm text-muted-foreground">You can now download this premium preset.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Description</h3>
                  <p className="text-muted-foreground">{preset.longDescription}</p>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Features</h3>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    {preset.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Compatibility</h3>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    {preset.compatibility.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
        <SupportChat />
      </div>

      {/* Access Code Dialog */}
      <Dialog open={showCodeDialog} onOpenChange={setShowCodeDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enter Access Code</DialogTitle>
            <DialogDescription>
              Enter the 6-digit access code to download this premium preset. You can find the code in our Instagram
              post.
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <Label htmlFor="accessCode">Access Code</Label>
            <Input
              id="accessCode"
              value={accessCode}
              onChange={(e) => setAccessCode(e.target.value)}
              placeholder="Enter 6-digit code"
              className="mt-1"
              maxLength={6}
            />

            <div className="mt-4 flex items-center gap-2">
              <Instagram className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Don't have a code? Check our latest post on Instagram to get your access code.
              </span>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCodeDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleCodeSubmit}>Verify Code</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

// Helper component for the Label
function Label({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="text-sm font-medium">
      {children}
    </label>
  )
}
