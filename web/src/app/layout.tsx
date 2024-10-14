import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "Text",
  description: "share text easily",
  icons: {
    icon: "/Logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased flex flex-col">
        <div className="flex flex-col h-screen">
          <Header />
          <main className="flex-grow p-4">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}