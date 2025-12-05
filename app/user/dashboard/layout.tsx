import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import Dashboard from "./page"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <Dashboard />
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  )
}