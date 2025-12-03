import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ToDo App",
  description: "A modern todo application built with Next.js, Prisma, and MongoDB",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="min-h-screen "
      >
        {children}
      </body>
    </html>
  );
}
