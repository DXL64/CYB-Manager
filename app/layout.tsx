import type { Metadata } from "next";
import localFont from "next/font/local";
import Navbar from "../components/Navbar";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "CYB Manager",
  description: "Trang quản lý hình ảnh và thông tin của trường Trung học phổ thông Chuyên Nguyễn Tất Thành",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased h-dvh`}>
        <Navbar />
        <div className="flex bg-gray-100 pt-16 h-full">
          <main className="flex-1 p-5 h-full">{children}</main>
        </div>
      </body>
    </html>
  );
}
