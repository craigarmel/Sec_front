"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import Dashboard from "./page"
import { ProtectedRoute } from "@/app/components/security/ProtectedRoute"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute user>
      <SidebarProvider>
        <Dashboard />
        <main>
          <SidebarTrigger />
          {children}
        </main>
      </SidebarProvider>
    </ProtectedRoute>
  )
}