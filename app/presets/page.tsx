import { SiteHeader } from "@/components/site-header"
import { Footer } from "@/components/footer"
import { PresetGrid } from "@/components/preset-grid"
import { PresetFilters } from "@/components/preset-filters"
import { ParticleBackground } from "@/components/particle-background"
import { SupportChat } from "@/components/support-chat"

export default function PresetsPage() {
  return (
    <div className="relative min-h-screen">
      <ParticleBackground />
      <div className="relative z-10">
        <SiteHeader />
        <main className="container mx-auto py-8 px-4">
          <div className="flex flex-col md:flex-row gap-8">
            <aside className="w-full md:w-64 shrink-0">
              <PresetFilters />
            </aside>
            <div className="flex-1">
              <PresetGrid />
            </div>
          </div>
        </main>
        <Footer />
        <SupportChat />
      </div>
    </div>
  )
}
