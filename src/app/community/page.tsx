import type { Metadata } from "next";
import Link from "next/link";
import { DiscordIcon } from "@/components/social-icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { socialMetadata } from "@/lib/seo";
import {
  DISCORD_INVITE,
  GITHUB_DISCUSSIONS,
  GITHUB_REPO,
  GITHUB_RELEASES,
} from "@/lib/utils";

export const metadata: Metadata = {
  title: "Community",
  description:
    "Join the rgctl Discord to ask questions, share what you're building, and meet other people using the project.",
  alternates: { canonical: "/community/" },
  ...socialMetadata({
    title: "Join the rgctl community",
    description:
      "Ask questions, share what you're building, and meet other developers using rgctl's code knowledge graph.",
    path: "/community/",
  }),
};

const starts = [
  {
    title: "New here",
    body: "Install rgctl, point it at a repo you know, and read a guide. If something is confusing, that is a useful thing to tell us.",
    links: [
      { href: "/install/", label: "Install" },
      { href: "/docs/guides/", label: "Guides" },
      { href: "/demo/", label: "Watch a demo" },
    ],
  },
  {
    title: "Have a question",
    body: "Discord is the fastest place to ask. GitHub Discussions keeps a searchable thread if you would rather write it down.",
    links: [
      { href: DISCORD_INVITE, label: "Ask on Discord", external: true },
      { href: GITHUB_DISCUSSIONS, label: "GitHub Discussions", external: true },
    ],
  },
  {
    title: "Want to help",
    body: "A bug report, a docs fix, or a note about a language we handle poorly is a real contribution. You do not need to know the whole codebase.",
    links: [
      { href: `${GITHUB_REPO}/issues`, label: "Open an issue", external: true },
      {
        href: `${GITHUB_REPO}/blob/main/CONTRIBUTING.md`,
        label: "Contributing guide",
        external: true,
      },
      { href: GITHUB_RELEASES, label: "Latest release", external: true },
    ],
  },
];

const tracks = [
  {
    title: "Languages",
    body: "Add or improve how rgctl reads a programming language.",
    links: [
      { href: "/docs/contributor-checklist/", label: "Contributor checklist" },
      { href: "/docs/tier-1-language-support/", label: "Tier 1 language support" },
      { href: "/docs/tier-2-language-support/", label: "Tier 2 language support" },
      { href: "/docs/language-testing-guide/", label: "Language testing guide" },
      { href: "/docs/languages/", label: "Languages" },
    ],
  },
  {
    title: "Security rules",
    body: "Help rgctl notice risky data flows and check architecture rules.",
    links: [
      { href: "/docs/guides/vulnerability-and-osv-analysis/", label: "OSV / vuln guide" },
      { href: "/docs/analysis-architecture/", label: "Analysis architecture" },
      { href: "/docs/policy-format/", label: "Policy format" },
    ],
  },
  {
    title: "Agent skills",
    body: "Make rgctl easier for coding agents to install and use.",
    links: [
      { href: "/docs/guides/agent-skill/", label: "Agent pack guide" },
      { href: "/agents/", label: "Agents" },
      {
        href: `${GITHUB_REPO}/blob/main/skills/rgctl/SKILL.md`,
        label: "skills/rgctl",
        external: true,
      },
      {
        href: `${GITHUB_REPO}/tree/main/skills`,
        label: "All skills",
        external: true,
      },
    ],
  },
  {
    title: "Graph analysis",
    body: "Work on reachability, clusters, clones, and how the graph is stored.",
    links: [
      { href: "/docs/analysis-architecture/", label: "Analysis architecture" },
      { href: "/docs/graph-storage-architecture/", label: "Graph storage" },
      { href: "/docs/guides/hybrid-cpg/", label: "Hybrid CPG guide" },
      { href: "/docs/guides/community-detection/", label: "Community detection" },
      { href: "/docs/guides/blast-radius-analysis/", label: "Blast radius guide" },
      { href: "/docs/guides/clone-detection/", label: "Clone detection" },
    ],
  },
];

function TextLink({
  href,
  external,
  children,
}: {
  href: string;
  external?: boolean;
  children: string;
}) {
  const className = "text-[var(--primary)] underline underline-offset-2";
  if (external) {
    return (
      <a href={href} className={className} target="_blank" rel="noreferrer">
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

export default function CommunityPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <Badge className="mb-4">Community</Badge>
      <h1 className="max-w-[18ch] text-3xl tracking-tight text-[var(--ink)] sm:text-4xl">
        Come say hello
      </h1>
      <p className="mt-4 max-w-[58ch] text-[17.5px] leading-relaxed text-[var(--body)]">
        You are welcome whether you just installed rgctl or you have been
        using it for months. Questions, half-formed ideas, and &ldquo;does this
        look right?&rdquo; all belong here.
      </p>

      <section className="mt-10 rounded-lg border border-[var(--chip-border)] bg-[var(--chip)] p-6 sm:p-8">
        <h2 className="text-2xl font-semibold text-[var(--chip-fg)]">
          Join the Discord
        </h2>
        <p className="mt-3 max-w-[62ch] text-[15px] leading-relaxed text-[var(--chip-fg)]">
          This is the place we actually talk. Ask for help, show what you are
          building, or introduce yourself. You do not need a project or a
          pull request to join.
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-4">
          <Button size="lg" asChild>
            <a href={DISCORD_INVITE} target="_blank" rel="noreferrer">
              <DiscordIcon className="h-4 w-4" />
              Join Discord
            </a>
          </Button>
          <p className="font-[family-name:var(--font-mono)] text-[12px] text-[var(--chip-fg)]">
            discord.gg/FVMcqbe4U
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-xl font-semibold text-[var(--ink)]">
          Start wherever you are
        </h2>
        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {starts.map((item) => (
            <div
              key={item.title}
              className="rounded-lg border border-[var(--hairline)] bg-[var(--surface)] p-5"
            >
              <h3 className="text-lg font-semibold text-[var(--ink)]">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--body)]">
                {item.body}
              </p>
              <ul className="mt-4 space-y-1.5 text-sm">
                {item.links.map((link) => (
                  <li key={link.href}>
                    <TextLink href={link.href} external={"external" in link && link.external}>
                      {link.label}
                    </TextLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-xl font-semibold text-[var(--ink)]">
          When you want to go deeper
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--body)]">
          These tracks are for people who want to change rgctl itself. Start
          with the{" "}
          <TextLink
            href={`${GITHUB_REPO}/blob/main/CONTRIBUTING.md`}
            external
          >
            contributing guide
          </TextLink>
          , or ask on Discord which one fits.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {tracks.map((track) => (
            <div
              key={track.title}
              className="rounded-lg border border-[var(--hairline)] p-5"
            >
              <h3 className="text-lg font-semibold text-[var(--ink)]">{track.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--body)]">
                {track.body}
              </p>
              <ul className="mt-3 space-y-1 text-sm">
                {track.links.map((link) => (
                  <li key={link.href}>
                    <TextLink
                      href={link.href}
                      external={"external" in link && link.external}
                    >
                      {link.label}
                    </TextLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
