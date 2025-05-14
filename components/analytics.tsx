"use client"

import { usePathname, useSearchParams } from "next/navigation"
import { useEffect } from "react"

export function Analytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // This is where you would typically initialize and track page views
    // with services like Google Analytics, Plausible, etc.
    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "")

    // Example tracking code (replace with actual implementation)
    console.log(`Page view tracked: ${url}`)

    // For actual implementation:
    // if (typeof window.gtag === 'function') {
    //   window.gtag('config', 'GA-MEASUREMENT-ID', {
    //     page_path: url,
    //   })
    // }
  }, [pathname, searchParams])

  return null
}
