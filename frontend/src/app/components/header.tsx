import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-[1200px] mx-auto flex justify-between items-center px-8 py-3">
        <h1 className="sr-only">JustRooms - Find the Best Hotels</h1>
        <Link href="/" className="flex items-center">
          <Image src="/logo.webp" alt="JustRooms Logo" width={160} height={40} className="object-contain" />
        </Link>
        <nav className="flex items-center gap-4">
          <Link href="/support" className="text-gray-600 hover:text-[#009DD9] font-medium">
            Support
          </Link>
          <Link
            href="/login"
            className="border border-[#009DD9] text-[#009DD9] px-4 py-1 rounded hover:bg-[#009DD9] hover:text-white font-medium"
          >
            Login
          </Link>
        </nav>
      </div>
    </header>
  );
}
