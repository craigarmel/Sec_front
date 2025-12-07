"use client";

import { SidebarProvider } from "@/components/ui/sidebar"
import { ProtectedRoute } from "@/app/components/security/ProtectedRoute"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute requireAuth>
      <SidebarProvider>
        {children}
      </SidebarProvider>
    </ProtectedRoute>
  )
}
