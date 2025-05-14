"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

const categories = [
  {
    name: "Portrait",
    description: "Enhance skin tones and create stunning portrait effects",
    count: 24,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-primary"
      >
        <circle cx="12" cy="8" r="5"></circle>
        <path d="M20 21a8 8 0 1 0-16 0"></path>
      </svg>
    ),
  },
  {
    name: "Landscape",
    description: "Breathtaking presets for nature and landscape photography",
    count: 18,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-primary"
      >
        <path d="m2 22 1-1h18l1 1"></path>
        <path d="M7 8v14"></path>
        <path d="M17 8v14"></path>
        <path d="M12 2v20"></path>
        <path d="m2 12 20 10"></path>
        <path d="M2 12 12 2l10 10"></path>
      </svg>
    ),
  },
  {
    name: "Black & White",
    description: "Classic monochrome presets with various tonal ranges",
    count: 12,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-primary"
      >
        <circle cx="12" cy="12" r="10"></circle>
        <path d="M12 2v20"></path>
        <path d="M2 12h20"></path>
      </svg>
    ),
  },
  {
    name: "Film",
    description: "Vintage film emulations with authentic grain and colors",
    count: 15,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-primary"
      >
        <rect width="20" height="20" x="2" y="2" rx="2.18" ry="2.18"></rect>
        <line x1="7" x2="7" y1="2" y2="22"></line>
        <line x1="17" x2="17" y1="2" y2="22"></line>
        <line x1="2" x2="22" y1="12" y2="12"></line>
        <line x1="2" x2="7" y1="7" y2="7"></line>
        <line x1="2" x2="7" y1="17" y2="17"></line>
        <line x1="17" x2="22" y1="17" y2="17"></line>
        <line x1="17" x2="22" y1="7" y2="7"></line>
      </svg>
    ),
  },
  {
    name: "Urban",
    description: "Street photography presets for urban environments",
    count: 20,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-primary"
      >
        <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z"></path>
        <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9"></path>
        <path d="M12 3v6"></path>
      </svg>
    ),
  },
  {
    name: "Travel",
    description: "Vibrant presets for travel and adventure photography",
    count: 16,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-primary"
      >
        <path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"></path>
      </svg>
    ),
  },
  {
    name: "Wedding",
    description: "Elegant presets for wedding and event photography",
    count: 14,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-primary"
      >
        <path d="M12 2v8"></path>
        <path d="m4.93 10.93 1.41 1.41"></path>
        <path d="M2 18h2"></path>
        <path d="M20 18h2"></path>
        <path d="m19.07 10.93-1.41 1.41"></path>
        <path d="M22 22H2"></path>
        <path d="M16 6 8 14"></path>
        <path d="m16 14-2-2-6-6"></path>
        <path d="m8 6 8 8"></path>
      </svg>
    ),
  },
  {
    name: "Food",
    description: "Make your culinary photos look delicious and appetizing",
    count: 10,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-primary"
      >
        <path d="M15 11h.01"></path>
        <path d="M11 15h.01"></path>
        <path d="M16 16h.01"></path>
        <path d="m2 16 20 6-6-20A20 20 0 0 0 2 16"></path>
        <path d="M5.71 17.11a17.04 17.04 0 0 1 11.4-11.4"></path>
      </svg>
    ),
  },
]

export function Categories() {
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
          <h2 className="text-3xl font-bold mb-4">Browse by Category</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Find the perfect preset for your specific photography style
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <Card className="group hover:shadow-md transition-shadow h-full">
                <CardHeader className="pb-2">
                  <div className="mb-2 text-primary">{category.icon}</div>
                  <CardTitle>{category.name}</CardTitle>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{category.count} presets available</p>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="ghost"
                    className="group-hover:text-primary group-hover:bg-primary/10 w-full justify-between"
                    asChild
                  >
                    <Link href={`/presets/category/${category.name.toLowerCase()}`}>
                      Browse Category
                      <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
