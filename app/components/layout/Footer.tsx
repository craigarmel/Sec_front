import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full py-6 mt-12 fixed bottom-0 left-0 z-50">
      <div className="mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between px-4 text-sm">
        <div className="flex items-center gap-2 mb-2 md:mb-0">
          <span className="font-semibold text-white tracking-tight">SecureBlog</span>
          <span className="text-gray-400">&copy; {new Date().getFullYear()}</span>
        </div>
        <div className="flex gap-4">
          <Link href="/legal" className="text-white hover:text-gray-300 transition">
            Mentions légales
          </Link>
          <Link href="/legal" className="text-white hover:text-gray-300 transition">
            Politique de confidentialité
          </Link>
        </div>
      </div>
    </footer>
  );
}
