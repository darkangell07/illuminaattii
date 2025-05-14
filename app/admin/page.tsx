import { redirect } from "next/navigation"
import { getServerSession } from "next-auth/next"
import { AdminDashboard } from "@/components/admin/admin-dashboard"
import { SiteHeader } from "@/components/site-header"
import { Footer } from "@/components/footer"
import { ParticleBackground } from "@/components/particle-background"

export default async function AdminPage() {
  const session = await getServerSession()

  // Check if user is authenticated and has admin role
  if (!session || session.user?.role !== "admin") {
    redirect("/login?callbackUrl=/admin")
  }

  return (
    <div className="relative min-h-screen">
      <ParticleBackground />
      <div className="relative z-10">
        <SiteHeader />
        <main className="container mx-auto py-8 px-4">
          <AdminDashboard />
        </main>
        <Footer />
      </div>
    </div>
  )
}
