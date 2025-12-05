import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full py-6 mt-12 relative bottom-0 left-0 z-50">
      <div className="mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between px-4 text-sm">
        <div className="flex items-center gap-2 mb-2 md:mb-0">
          <span className="font-semibold tracking-tight">SecureBlog</span>
          <span className="text-gray-400">&copy; {new Date().getFullYear()}</span>
        </div>
        <div className="flex gap-4">
          <Link href="/legal" className="hover:text-white/80 transition">Mentions légales</Link>
        </div>
      </div>
    </footer>
  );
}
