import type { Metadata } from "next";
import { Poppins as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import ModalProvider from "@/providers/ModalProvider";
import ClientProvider from "@/providers/ClientProvider";
import LoginSync from "@/components/login/LoginSync";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "techbazer",
  description: "your ultimate gadgets shop",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased hide-scrollbar",
          fontSans.variable
        )}
      >
        <ClientProvider>
          {children}
          <ModalProvider />
          <LoginSync />
        </ClientProvider>
      </body>
    </html>
  );
}
