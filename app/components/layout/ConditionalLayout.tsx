"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";

interface ConditionalLayoutProps {
  children: React.ReactNode;
}

export default function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith("/admin");
  const isUserPage = pathname?.startsWith("/user");
  const isAuthPage = pathname?.startsWith("/auth");
  const isIdAriclePage = pathname?.startsWith("/articles/");

  if (isAdminPage || isUserPage || isAuthPage) {
    return <div className="h-screen w-full">{children}</div>;
  }
  else if(isIdAriclePage) {
    return <>
        <Header />
        {children}
    </>
  }

  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}

