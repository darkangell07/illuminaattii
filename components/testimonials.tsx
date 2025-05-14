"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Professional Photographer",
    image: "/placeholder.svg?height=100&width=100&text=SJ",
    content:
      "These presets have completely transformed my workflow. I can now edit an entire photoshoot in half the time it used to take me. The results are consistently stunning!",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Travel Blogger",
    image: "/placeholder.svg?height=100&width=100&text=MC",
    content:
      "As someone who travels constantly, I need efficient editing solutions. illuminaattii presets give my photos that professional look with just one click. Highly recommended!",
    rating: 5,
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    role: "Wedding Photographer",
    image: "/placeholder.svg?height=100&width=100&text=ER",
    content:
      "The wedding collection presets are absolutely perfect. They create a consistent, elegant look across all my client photos. My clients are thrilled with the results!",
    rating: 4,
  },
  {
    id: 4,
    name: "David Wilson",
    role: "Instagram Influencer",
    image: "/placeholder.svg?height=100&width=100&text=DW",
    content:
      "These presets have helped me develop a consistent aesthetic for my Instagram feed. My engagement has increased significantly since I started using illuminaattii!",
    rating: 5,
  },
  {
    id: 5,
    name: "Olivia Taylor",
    role: "Portrait Photographer",
    image: "/placeholder.svg?height=100&width=100&text=OT",
    content:
      "The portrait presets are incredible. They enhance skin tones beautifully while maintaining a natural look. My clients have never been happier with their photos.",
    rating: 5,
  },
]

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const visibleTestimonials = 3
  const maxIndex = testimonials.length - visibleTestimonials

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, maxIndex))
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0))
  }

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
          <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Hear from photographers who have transformed their work with our presets
          </p>
        </motion.div>

        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * (100 / visibleTestimonials)}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="w-full md:w-1/3 flex-shrink-0 px-4"
                >
                  <Card className="h-full">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                          <Image
                            src={testimonial.image || "/placeholder.svg"}
                            alt={testimonial.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-medium">{testimonial.name}</h4>
                          <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                        </div>
                      </div>
                      <div className="flex mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < testimonial.rating ? "text-yellow-500 fill-yellow-500" : "text-muted-foreground"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-muted-foreground">{testimonial.content}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {currentIndex > 0 && (
            <Button
              variant="outline"
              size="icon"
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-background shadow-md z-10 hidden md:flex"
              onClick={prevSlide}
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Previous testimonials</span>
            </Button>
          )}

          {currentIndex < maxIndex && (
            <Button
              variant="outline"
              size="icon"
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 bg-background shadow-md z-10 hidden md:flex"
              onClick={nextSlide}
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Next testimonials</span>
            </Button>
          )}
        </div>

        <div className="flex justify-center mt-6 md:hidden">
          <Button variant="outline" size="icon" className="mr-2" onClick={prevSlide} disabled={currentIndex === 0}>
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous testimonials</span>
          </Button>
          <Button variant="outline" size="icon" onClick={nextSlide} disabled={currentIndex >= maxIndex}>
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next testimonials</span>
          </Button>
        </div>
      </div>
    </section>
  )
}
