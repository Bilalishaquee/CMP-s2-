import { Providers } from "@/components/providers";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "CrossMyPart — Part number search for electronics sourcing",
  description:
    "Find exact parts, Asian alternatives, and Zephyr recommended equivalents in one place. For sourcing evaluation—not guaranteed drop-in replacements.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="mesh-page min-h-full flex flex-col font-sans text-cmp-text">
        <script
          // Ensure the first paint uses the user's preferred theme.
          dangerouslySetInnerHTML={{
            __html: `(() => {
  try {
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = (saved === 'light' || saved === 'dark') ? saved : (prefersDark ? 'dark' : 'light');
    if (theme === 'light') document.documentElement.dataset.theme = 'light';
    else delete document.documentElement.dataset.theme;
  } catch (e) {}
})();`,
          }}
        />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
