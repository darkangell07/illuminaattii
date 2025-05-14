"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Card, CardDescription, CardFooter, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export function PresetShowcase() {
  const [sliderValue, setSliderValue] = useState(50)

  return (
    <section className="py-16 px-4 bg-muted/30">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">See the Difference</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Drag the slider to see the before and after effect of our premium presets
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card className="overflow-hidden border-0 shadow-lg">
              <div className="relative h-[500px] w-full">
                <div className="absolute inset-0 overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=500&width=800&text=Before"
                    alt="Before"
                    fill
                    className="object-cover"
                  />
                </div>
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{
                    clipPath: `inset(0 ${100 - sliderValue}% 0 0)`,
                  }}
                >
                  <Image
                    src="/placeholder.svg?height=500&width=800&text=After"
                    alt="After"
                    fill
                    className="object-cover"
                  />
                </div>
                <div
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
              </div>
              <CardFooter className="justify-center p-4">
                <p className="text-sm text-center text-muted-foreground">Drag the slider to compare before and after</p>
              </CardFooter>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div>
              <Badge variant="outline" className="mb-3">
                Featured
              </Badge>
              <CardTitle className="text-3xl">Moody Portrait Preset</CardTitle>
              <CardDescription className="text-lg mt-2">
                Transform your portraits with our professional-grade preset, designed to add depth, mood, and cinematic
                quality to your photos.
              </CardDescription>
            </div>

            <div className="space-y-4 mt-6">
              <div>
                <h4 className="font-medium mb-2">Perfect for:</h4>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Portrait photography</li>
                  <li>Urban settings</li>
                  <li>Low light conditions</li>
                  <li>Fashion shoots</li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium mb-2">Features:</h4>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Enhanced shadows and highlights</li>
                  <li>Rich color grading</li>
                  <li>Subtle skin tone adjustments</li>
                  <li>Film-inspired contrast</li>
                </ul>
              </div>
            </div>

            <div className="pt-6 flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="sm:flex-1" asChild>
                <Link href="/presets/2">Get This Preset</Link>
              </Button>
              <Button variant="outline" size="lg" className="sm:flex-1">
                View More Examples
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
