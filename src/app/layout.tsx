import type { Metadata } from "next";
import Script from "next/script";
import { Inter, JetBrains_Mono, Poppins, Source_Serif_4 } from "next/font/google";
import { Analytics } from "@/components/analytics";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import {
  ThemeProvider,
  themeInitScript,
} from "@/components/theme-provider";
import { SITE_URL, socialMetadata } from "@/lib/seo";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

/**
 * The brand lockup's wordmark is drawn in Poppins 600. Loading just that
 * weight keeps the supplied SVG's letterforms and fixed lockup width intact
 * without pulling a second family into body copy.
 */
const poppins = Poppins({
  subsets: ["latin"],
  weight: "600",
  variable: "--font-logo",
  display: "swap",
});

/**
 * JetBrains Mono is the upstream face of JetBrainsMono Nerd Font. Shipping the
 * upstream variable font keeps the terminal/code UI developer-native without
 * pulling in a multi-megabyte patched icon font.
 */
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "rgctl — code knowledge graph for AI agents",
    template: "%s · rgctl",
  },
  description:
    "Open-source code knowledge graph for LLM agents. Index once, query compact JSON — blast radius, structured find/callers, semantic search, migration planning.",
  metadataBase: new URL(SITE_URL),
  ...socialMetadata({
    title: "rgctl — code knowledge graph for AI agents",
    description:
      "Open-source code knowledge graph for LLM agents — accurate answers, fewer tokens.",
    path: "/",
  }),
};

const softwareApplicationLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "rgctl",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "macOS, Linux, Windows",
  license: "https://opensource.org/licenses/MIT",
  codeRepository: "https://github.com/rgctl/rgctl",
  url: "https://rgctl.io/",
  description:
    "Open-source code knowledge graph for LLM agents. Index once, query compact JSON — blast radius, structured find/callers, semantic search, migration planning.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${sourceSerif.variable} ${jetbrainsMono.variable} ${poppins.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col antialiased">
        <Script id="theme-init" strategy="beforeInteractive">
          {themeInitScript}
        </Script>
        <Script
          id="software-application-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(softwareApplicationLd),
          }}
        />
        <ThemeProvider>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
