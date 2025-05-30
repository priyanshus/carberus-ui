import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Carberus",
  description: "Carberus App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
