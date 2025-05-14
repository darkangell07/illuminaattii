import { ParticleBackground } from "@/components/particle-background"
import { SiteHeader } from "@/components/site-header"
import { HeroSection } from "@/components/hero-section"
import { FeaturedPresets } from "@/components/featured-presets"
import { PresetShowcase } from "@/components/preset-showcase"
import { Categories } from "@/components/categories"
import { Testimonials } from "@/components/testimonials"
import { Newsletter } from "@/components/newsletter"
import { Footer } from "@/components/footer"
import { SupportChat } from "@/components/support-chat"

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <ParticleBackground />
      <div className="relative z-10">
        <SiteHeader />
        <main>
          <HeroSection />
          <FeaturedPresets />
          <PresetShowcase />
          <Categories />
          <Testimonials />
          <Newsletter />
        </main>
        <Footer />
        <SupportChat />
      </div>
    </div>
  )
}
