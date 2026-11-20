import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, GitFork, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DemoMedia } from "@/components/demo-media";
import { HeroDemoPanel } from "@/components/hero-demo-panel";
import { TerminalBlock } from "@/components/terminal";
import { DISCORD_INVITE, GITHUB_REPO } from "@/lib/utils";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

/** 3×3 capability matrix — rows = depth, cells = differentiators vs grep-only tooling. */
const capabilityRows = [
  {
    label: "Index & ask",
    blurb: "Give your agent a map of the repo instead of making it read every file.",
    cells: [
      {
        title: "discover",
        body: "Index once, query later. A single Rust pass builds the graph and reachability caches, so follow-up questions are lookups, not fresh greps.",
      },
      {
        title: "find · callers",
        body: "Exact relationships, no guesswork. Get callers and typed symbol references in stable -f json with schema_version.",
      },
      {
        title: "semantic",
        body: "Search by intent when you don’t know the name. Opt-in offline embeddings over functions or communities, paired with structural facts so similar names aren’t mistaken for real dependencies.",
      },
    ],
  },
  {
    label: "Program analysis",
    blurb: "Trace what breaks, what changes state, and where untrusted data goes.",
    cells: [
      {
        title: "blast-radius",
        body: "Know what a refactor will break. Deterministic upstream impact at any depth — the call sites an agent must update, in compact JSON it can gate edits on.",
      },
      {
        title: "cpg · slice · inspect",
        body: "See which lines actually touch a value. Statement slices, field mutations, and branch dominance without reading the whole file; slice builds CFG/PDG lazily, discover --with-cfg prebuilds the archive.",
      },
      {
        title: "taint · security",
        body: "Follow untrusted input to the sink. Source→sink paths with --with-taint / --with-security; pair with vuln for OSV/CVE reachability — not just “who calls whom.”",
      },
    ],
  },
  {
    label: "Architecture & change",
    blurb: "Help your agent see the big picture — and keep risky PRs in check.",
    cells: [
      {
        title: "communities",
        body: "Automatic subsystem boundaries. Hub-stripped Fast-Leiden clustering groups tightly coupled code so agents reason about modules, not a flat bag of functions.",
      },
      {
        title: "metrics",
        body: "Rank load-bearing code with centrality, not guesses. FastPageRank, betweenness, harmonic centrality, and git churn identify the files most likely to hurt when changed.",
      },
      {
        title: "migration · review",
        body: "Plan the refactor, then guard it. Export a dependency-ordered migration_plan.json, or gate PRs with review check / check --policy-file.",
      },
    ],
  },
] as const;

export default function HomePage() {
  return (
    <>
      <section className="border-b border-[var(--hairline)]">
        <div className="mx-auto max-w-6xl px-4 pb-10 pt-14 sm:px-6 sm:pb-12 sm:pt-20">
          <Badge className="mb-5">Open source · MIT · Rust</Badge>
          <h1 className="max-w-[21ch] font-[family-name:var(--font-serif)] text-[clamp(1.875rem,4.2vw,2.625rem)] font-semibold leading-[1.18] tracking-[-0.015em] text-[var(--ink)]">
            A code knowledge graph built for agents
          </h1>
          <p className="mt-5 max-w-[58ch] text-[17.5px] leading-relaxed text-[var(--body)]">
            Stop making your coding agent grep in the dark. rgctl indexes call
            paths and dependencies once, then answers impact questions in
            compact JSON — so Cursor, Claude Code, and Codex use{" "}
            <b className="font-semibold text-[var(--ink)]">fewer tokens</b> and
            make{" "}
            <b className="font-semibold text-[var(--ink)]">
              fewer confident mistakes
            </b>
            .
          </p>
          <TerminalBlock
            className="mt-8 max-w-3xl"
            lines={[
              "curl -fsSL https://rgctl.io/install.sh | sh",
              "rgctl --version",
              "rgctl install --skill --tools cursor,claude,codex,antigravity,agents",
            ]}
          />
          <p className="mt-2 text-xs text-[var(--mute)]">
            Prefer a release tarball or a source build?{" "}
            <Link href="/install/" className="underline hover:text-[var(--ink)]">
              See install options
            </Link>
            .
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <Button size="lg" asChild>
              <Link href="/install/">
                Install <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="ghost" size="lg" asChild>
              <a href={GITHUB_REPO} target="_blank" rel="noreferrer">
                <Star className="h-4 w-4" /> Star on GitHub
              </a>
            </Button>
            <Button variant="link" asChild>
              <Link href="/demo/">Watch demos →</Link>
            </Button>
          </div>

          <div className="mt-12">
            <HeroDemoPanel />
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--hairline)] bg-[var(--canvas-soft)]/60">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-3 font-[family-name:var(--font-serif)] text-2xl font-semibold tracking-tight text-[var(--ink)]">
              See it run in a real terminal
            </h2>
            <p className="mb-8 max-w-[65ch] text-[var(--body)]">
              77-second VHS walkthrough on the in-tree{" "}
              <code className="font-[family-name:var(--font-mono)] text-[0.9em] text-[var(--ink)]">
                ecommerce-java
              </code>{" "}
              fixture — sub-second indexing, call-graph lookups, upstream blast
              radius, Fast-Leiden communities, Hybrid CPG program slicing,
              structural clones, offline semantic search, policy gates,
              and AI agent skill installation.
            </p>
            <DemoMedia
              kind="cli"
              caption="Recorded from docs/videos/user-guide-cli.tape — discover, status, find, callers, blast-radius, communities, PageRank, CPG slicing, clones, semantic search, policy gates & agent skills."
            />
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--hairline)]">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
          <h2 className="mb-3 font-[family-name:var(--font-serif)] text-2xl font-semibold tracking-tight text-[var(--ink)]">
            Why rgctl instead of grep?
          </h2>
          <p className="mb-8 max-w-[62ch] text-[var(--body)]">
            Text search shows where a string appears — not what breaks when you
            change it. Give your agent precomputed structure instead of raw file
            dumps.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[32rem] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-[var(--hairline)] text-[var(--mute)]">
                  <th className="py-2 pr-4 font-medium"> </th>
                  <th className="py-2 pr-4 font-medium">Typical agent</th>
                  <th className="py-2 font-medium">Agent with rgctl</th>
                </tr>
              </thead>
              <tbody className="text-[var(--body)]">
                <tr className="border-b border-[var(--hairline)]">
                  <td className="py-3 pr-4 font-medium text-[var(--ink)]">
                    Finding dependencies
                  </td>
                  <td className="py-3 pr-4">Repeated grep + file reads</td>
                  <td className="py-3">
                    1–2 graph lookups (
                    <code className="font-mono text-xs">discover</code> once,
                    then query)
                  </td>
                </tr>
                <tr className="border-b border-[var(--hairline)]">
                  <td className="py-3 pr-4 font-medium text-[var(--ink)]">
                    Context window cost
                  </td>
                  <td className="py-3 pr-4">Whole files into the prompt</td>
                  <td className="py-3">
                    Compact <code className="font-mono text-xs">-f json</code>{" "}
                    rows
                  </td>
                </tr>
                <tr className="border-b border-[var(--hairline)]">
                  <td className="py-3 pr-4 font-medium text-[var(--ink)]">
                    Refactoring safety
                  </td>
                  <td className="py-3 pr-4">Indirect callers missed or guessed</td>
                  <td className="py-3">Exact upstream blast radius at any depth</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-medium text-[var(--ink)]">
                    Answer reliability
                  </td>
                  <td className="py-3 pr-4">Relationships inferred from names</td>
                  <td className="py-3">Deterministic facts from the typed graph</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-10">
            <h3 className="mb-3 font-[family-name:var(--font-serif)] text-lg font-semibold text-[var(--ink)]">
              Battle-tested at scale
            </h3>
            <ul className="grid gap-3 text-sm text-[var(--body)] sm:grid-cols-2 lg:grid-cols-3">
              <li className="rounded-[4px] border border-[var(--hairline)] p-4">
                <b className="font-semibold text-[var(--ink)]">Linux kernel</b>{" "}
                (72.4k files, 1.76M nodes) cold discover in{" "}
                <b className="font-semibold text-[var(--ink)]">~48.1 s</b> ·{" "}
                <b className="font-semibold text-[var(--ink)]">rustc</b> in{" "}
                <b className="font-semibold text-[var(--ink)]">~23.5 s</b> ·{" "}
                <b className="font-semibold text-[var(--ink)]">metasfresh</b> in{" "}
                <b className="font-semibold text-[var(--ink)]">~9.3 s</b>
              </li>
              <li className="rounded-[4px] border border-[var(--hairline)] p-4">
                <b className="font-semibold text-[var(--ink)]">
                  Zero-cold-touch mmap queries
                </b>{" "}
                on RGCL v2 columnar snapshots + content-addressed{" "}
                <code className="font-mono text-xs">FileFacts</code> cache &{" "}
                <code className="font-mono text-xs">rgctl watch</code>
              </li>
              <li className="rounded-[4px] border border-[var(--hairline)] p-4">
                <b className="font-semibold text-[var(--ink)]">
                  69 languages across two tiers
                </b>{" "}
                — 24 Tier-1 deep CFG/PDG plugins + Mainframe (COBOL/PL/I/JCL) +
                42 Tier-2 <code className="font-mono text-xs">tags.scm</code>{" "}
                packs
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--hairline)]">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
          <h2 className="mb-3 font-[family-name:var(--font-serif)] text-2xl font-semibold tracking-tight text-[var(--ink)]">
            What sets it apart
          </h2>
          <p className="mb-10 max-w-[62ch] text-[var(--body)]">
            Most code graphs stop at symbols, callers, and impact. rgctl adds
            precomputed reachability, on-demand CFG/PDG slicing, subsystem
            clustering, centrality and churn rankings, and migration/CI
            artifacts — served as deterministic{" "}
            <code className="font-[family-name:var(--font-mono)] text-[0.9em] text-[var(--ink)]">
              -f json
            </code>{" "}
            so your agent gets a verified answer instead of reading the tree.
          </p>
          <div className="space-y-10">
            {capabilityRows.map((row) => (
              <div key={row.label}>
                <div className="mb-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 className="font-[family-name:var(--font-serif)] text-lg font-semibold text-[var(--ink)]">
                    {row.label}
                  </h3>
                  <p className="text-sm text-[var(--mute)]">{row.blurb}</p>
                </div>
                <div className="grid gap-6 border-t border-[var(--hairline)] pt-5 md:grid-cols-3">
                  {row.cells.map((cell) => (
                    <div key={cell.title} className="space-y-2">
                      <h4 className="font-[family-name:var(--font-mono)] text-sm text-[var(--primary)]">
                        {cell.title}
                      </h4>
                      <p className="text-[15px] leading-relaxed text-[var(--body)]">
                        {cell.body}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--hairline)]">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 sm:py-16 lg:grid-cols-2 lg:items-center">
          <div className="space-y-4">
            <h2 className="font-[family-name:var(--font-serif)] text-2xl font-semibold tracking-tight text-[var(--ink)] sm:text-3xl">
              From prompt → graph facts → edit
            </h2>
            <p className="text-[var(--body)]">
              Install the agent pack (
              <code className="font-mono text-sm">
                rgctl install --skill
              </code>
              ): core skill{" "}
              <code className="font-mono text-sm">rgctl</code> plus{" "}
              <code className="font-mono text-sm">/rgctl:review</code>,{" "}
              <code className="font-mono text-sm">/rgctl:vuln</code>, and{" "}
              <code className="font-mono text-sm">/rgctl:migrate</code> — or
              drop{" "}
              <Link
                href="/agents/"
                className="font-medium text-[var(--primary)] underline"
              >
                AGENTS.md
              </Link>{" "}
              into your repo. The model calls rgctl instead of grepping
              blindly — then reasons on structured impact.
            </p>
            <Button variant="ghost" asChild>
              <Link href="/agents/">
                Agent guide <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <TerminalBlock
            lines={[
              "cd your-repo",
              "rgctl install --skill --tools cursor",
              "rgctl discover .",
              'rgctl -f json blast-radius "priceShoppingCart" --depth 2',
            ]}
          />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
        <div className="flex flex-col gap-6 rounded-lg border border-[var(--hairline)] bg-[var(--surface)] p-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <h2 className="font-[family-name:var(--font-serif)] text-xl font-semibold text-[var(--ink)]">
              Help grow the project
            </h2>
            <p className="max-w-lg text-sm text-[var(--body)]">
              Questions and ideas are welcome on Discord. Star the repo, try
              the ecommerce-java fixture, and share what you build.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button asChild>
              <a href={DISCORD_INVITE} target="_blank" rel="noreferrer">
                Join Discord
              </a>
            </Button>
            <Button variant="ghost" asChild>
              <a href={GITHUB_REPO} target="_blank" rel="noreferrer">
                <Star className="h-4 w-4" /> Star
              </a>
            </Button>
            <Button variant="ghost" asChild>
              <a href={`${GITHUB_REPO}/fork`} target="_blank" rel="noreferrer">
                <GitFork className="h-4 w-4" /> Fork
              </a>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/community/">Community</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
