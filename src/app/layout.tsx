import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Next.js Form Demo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        <header className="bg-gray-500 text-white text-center py-4">
          <Link href="/">
          <h1 className="text-xl font-semibold">Next.js Form Demo</h1>
          </Link>
          <h2 className="font-medium">app/layout.tsx</h2>
        </header>
        {children}
      </body>
    </html>
  );
}
