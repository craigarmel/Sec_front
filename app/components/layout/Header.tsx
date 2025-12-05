import Link from "next/link";

import { NavigationMenu, NavigationMenuList } from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Newspaper } from "lucide-react";

export default function Header() {
  return (
    <header className="w-full h-10 to-transparent backdrop-blur-sm sticky top-0 z-50">
      <div className="mx-auto flex max-w-6xl items-center justify-between p-4">
        <Link href="/" className="text-xl font-semibold tracking-tight text-white">
          SecureBlog
        </Link>
        <NavigationMenu>
          <NavigationMenuList className="hidden md:flex gap-6 text-sm font-medium text-white">
            <Link href="/articles" className="hover:text-white/80 transition">
              <Newspaper/>
            </Link>
          </NavigationMenuList>
        </NavigationMenu>
        <div className="hidden md:flex gap-3">
          <Link href="/auth/login">
            <Button>Connexion</Button>
          </Link>
          <Link href="/auth/register">
            <Button>S&apos;inscrire</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
