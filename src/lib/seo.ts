import type { Metadata } from "next";

export const SITE_URL = "https://rgctl.io";
export const SOCIAL_IMAGE_PATH = "/og/default.png";
export const SOCIAL_IMAGE_ALT =
  "rgctl — a code knowledge graph for AI agents. Open source, MIT, Rust.";

const absoluteSocialImageUrl = new URL(SOCIAL_IMAGE_PATH, SITE_URL).toString();

export const socialImage = {
  url: SOCIAL_IMAGE_PATH,
  secureUrl: absoluteSocialImageUrl,
  width: 1200,
  height: 630,
  type: "image/png",
  alt: SOCIAL_IMAGE_ALT,
} as const;

type SocialOptions = {
  title: string;
  description: string;
  path?: string;
  type?: "website" | "article";
};

/**
 * One source of truth for per-page Open Graph and Twitter metadata.
 * The social card itself is a static 1200×630 PNG under `public/og/`, so
 * GitHub Pages serves it with the correct image MIME type.
 */
export function socialMetadata({
  title,
  description,
  path = "/",
  type = "website",
}: SocialOptions): Pick<Metadata, "openGraph" | "twitter" | "other"> {
  return {
    openGraph: {
      title,
      description,
      type,
      url: path,
      siteName: "rgctl",
      images: [socialImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [{ url: socialImage.url, alt: socialImage.alt }],
    },
    other: {
      "og:image:url": absoluteSocialImageUrl,
      "twitter:image:src": absoluteSocialImageUrl,
    },
  };
}
