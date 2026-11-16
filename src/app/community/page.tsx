import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
};

function DiscordIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M20.32 4.37a19.8 19.8 0 0 0-4.89-1.52.07.07 0 0 0-.08.04c-.21.37-.44.86-.6 1.25a18.27 18.27 0 0 0-5.5 0 12.6 12.6 0 0 0-.61-1.25.08.08 0 0 0-.08-.04 19.74 19.74 0 0 0-4.88 1.52.07.07 0 0 0-.03.03C.53 9.05-.32 13.58.1 18.06a.08.08 0 0 0 .03.05 19.9 19.9 0 0 0 5.99 3.03.08.08 0 0 0 .09-.03c.46-.63.87-1.3 1.22-1.99a.08.08 0 0 0-.04-.1 13.1 13.1 0 0 1-1.87-.9.08.08 0 0 1-.01-.12c.12-.1.25-.2.37-.29a.07.07 0 0 1 .08-.01c3.93 1.8 8.18 1.8 12.06 0a.07.07 0 0 1 .08.01c.12.09.24.2.37.29a.08.08 0 0 1-.01.13 12.3 12.3 0 0 1-1.87.89.08.08 0 0 0-.04.1c.36.7.77 1.36 1.23 2a.08.08 0 0 0 .08.02 19.84 19.84 0 0 0 6-3.03.08.08 0 0 0 .03-.05c.5-5.18-.84-9.68-3.55-13.66a.06.06 0 0 0-.03-.03zM8.02 15.33c-1.18 0-2.16-1.08-2.16-2.42 0-1.33.96-2.42 2.16-2.42 1.21 0 2.18 1.1 2.16 2.42 0 1.34-.96 2.42-2.16 2.42zm7.97 0c-1.18 0-2.16-1.08-2.16-2.42 0-1.33.96-2.42 2.16-2.42 1.21 0 2.17 1.1 2.15 2.42 0 1.34-.94 2.42-2.15 2.42z" />
    </svg>
  );
}

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
