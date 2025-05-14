"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Camera, Sparkles, Zap } from "lucide-react"

export function HeroSection() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <section className="relative py-20 md:py-32 px-4 overflow-hidden">
      <div className="container mx-auto text-center relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
            Elevate Your Photography with
            <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
              {" "}
              illuminaattii
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-10">
            Transform your photos with our professional Lightroom presets. One click to extraordinary results.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button asChild size="lg" className="text-lg group">
            <Link href="/presets">
              Browse Presets
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="text-lg">
            <Link href="/presets/free">Try Free Presets</Link>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
        >
          <div className="bg-card/50 backdrop-blur-sm p-6 rounded-lg border border-border/50 hover:border-primary/50 transition-colors">
            <div className="mb-4 bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto">
              <Camera className="text-primary h-6 w-6" />
            </div>
            <h3 className="text-xl font-medium mb-2">Professional Quality</h3>
            <p className="text-muted-foreground">Crafted by professional photographers for stunning results</p>
          </div>

          <div className="bg-card/50 backdrop-blur-sm p-6 rounded-lg border border-border/50 hover:border-primary/50 transition-colors">
            <div className="mb-4 bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto">
              <Zap className="text-primary h-6 w-6" />
            </div>
            <h3 className="text-xl font-medium mb-2">One-Click Magic</h3>
            <p className="text-muted-foreground">Instantly transform your photos with a single click</p>
          </div>

          <div className="bg-card/50 backdrop-blur-sm p-6 rounded-lg border border-border/50 hover:border-primary/50 transition-colors">
            <div className="mb-4 bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto">
              <Sparkles className="text-primary h-6 w-6" />
            </div>
            <h3 className="text-xl font-medium mb-2">Unique Style</h3>
            <p className="text-muted-foreground">Stand out with exclusive presets you won't find elsewhere</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
