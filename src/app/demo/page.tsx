import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { DemoMedia } from "@/components/demo-media";
import { DemoPlayground } from "@/components/demo-playground";
import { socialMetadata } from "@/lib/seo";
import { GITHUB_REPO } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Demo",
  description:
    "Watch rgctl index a real repository, trace blast radius, slice CFG/PDG, and query compact JSON in recorded and interactive demos.",
  alternates: { canonical: "/demo/" },
  ...socialMetadata({
    title: "See rgctl in action — graph queries in a real terminal",
    description:
      "A 77-second terminal walkthrough plus interactive agent scenarios: discovery, blast radius, CPG slices, and JSON queries.",
    path: "/demo/",
  }),
};

export default function DemoPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <Badge className="mb-4">Recorded + interactive</Badge>
      <h1 className="text-3xl tracking-tight text-[var(--ink)] sm:text-4xl">
        See rgctl in action
      </h1>
      <p className="mt-3 max-w-2xl text-[var(--body)]">
        Watch the 77-second terminal walkthrough recorded on the in-tree{" "}
        <code className="font-mono text-sm">ecommerce-java</code> fixture (
        <a
          href={`${GITHUB_REPO}/blob/main/docs/videos/user-guide-cli.tape`}
          className="text-[var(--ink)] underline"
          target="_blank"
          rel="noreferrer"
        >
          user-guide-cli.tape
        </a>
        ), then step through interactive agent prompt →{" "}
        <code className="font-mono text-sm">-f json</code> scenarios below.
      </p>

      <div className="mt-8">
        <DemoMedia
          kind="cli"
          className="mx-auto max-w-5xl"
          caption="CLI (VHS) — discover, status, find, callers, blast-radius, communities, PageRank, Hybrid CPG, program slicing, clones, semantic search, CI policy gates, PR review & AI agent skills."
        />
      </div>

      <p className="mx-auto mt-4 max-w-5xl text-sm text-[var(--mute)]">
        rgctl is CLI-first for coding agents; an interactive Universe architecture UI is also available when you run{" "}
        <code className="font-mono text-xs">rgctl discover . --with-universe</code> followed by{" "}
        <code className="font-mono text-xs">rgctl serve --open</code>.
      </p>

      <h2 className="mt-16 text-2xl tracking-tight text-[var(--ink)]">
        Interactive agent pack scenarios
      </h2>
      <p className="mt-2 max-w-2xl text-sm text-[var(--body)]">
        Prompt → tool call → schema-aligned JSON → reasoning (blast-radius,
        Fast-Leiden communities, lazy <code className="font-mono text-xs">slice</code>,
        fragment clones, <code className="font-mono text-xs">review check</code>).
      </p>
      <div className="mt-8">
        <DemoPlayground />
      </div>
    </div>
  );
}
