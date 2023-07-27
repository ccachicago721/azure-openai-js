import { Inter } from "next/font/google";
import Script from 'next/script'
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Azure Open AI ",
  description: "This example shows Azure Open AI integration with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Script id="ze-snippet" src="https://static.zdassets.com/ekr/snippet.js?key=a79e92e9-9e1a-43fa-b180-43cd7604f414"> </Script>
      <body className={`text-white bg-slate-900 ${inter.className}`}>
        {children}
      </body>
    </html>
  );
}
