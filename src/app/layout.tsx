import type { Metadata } from "next";
import { Noto_Sans} from 'next/font/google';
import './global.css';
import { QueryProvider } from "./query.provider";

const font = Noto_Sans({
  weight: '400',
  subsets: ['latin'],
})


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
    <html lang="en" className={`${font.className} bg-background-light`}>
      <body>
        <QueryProvider>
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
