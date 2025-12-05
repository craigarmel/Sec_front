// import Image from "next/image";
import BackgroundVideo from "@/components/ui/BackgroundVideo";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <BackgroundVideo />
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h1
          className="text-4xl md:text-5xl font-extrabold text-white mb-4 text-center"
          style={{ fontFamily: "'Playfair Display', 'Poppins', 'Segoe UI', Arial, sans-serif", letterSpacing: '0.03em' }}
        >
          Bienvenue sur <span className="text-blue-300">SecureBlog&nbsp;!</span>
        </h1>
        <p
          className="text-base md:text-lg lg:text-xl text-white/90 max-w-2xl text-center"
          style={{ fontFamily: "'Playfair Display', 'Nunito', 'Segoe UI', Arial, sans-serif" }}
        >
          Partageons ensemble l&apos;actualité du numérique et nos ressentis pour avancer en toute sécurité.
        </p>
        <Button size="lg" className="mt-15">
          <Link href="/auth/login" >
            Rejoignez-nous
          </Link>
        </Button>
      </div>
    </div>
  );
}
