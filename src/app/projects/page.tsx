import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { socialMetadata } from "@/lib/seo";
import {
  projects,
  SHOWCASE_ISSUE_URL,
  SHOWCASE_PR_URL,
} from "@/lib/projects";
import { DISCORD_INVITE } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Projects built with rgctl: migIQ for agent-driven application migrations and the PR Reviewer Agent for call-graph-aware GitLab and GitHub reviews.",
  alternates: { canonical: "/projects/" },
  ...socialMetadata({
    title: "Projects in the rgctl family",
    description:
      "Two projects show the graph doing real work end to end — migIQ for migrations and the PR Reviewer Agent for MR and PR reviews.",
    path: "/projects/",
  }),
};

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <Badge className="mb-4">Projects</Badge>
      <h1 className="font-[family-name:var(--font-serif)] text-3xl font-semibold tracking-tight text-[var(--ink)] sm:text-4xl">
        Projects in the rgctl family
      </h1>
      <p className="mt-3 max-w-2xl text-[var(--body)]">
        rgctl is the engine. These separate projects show what a full workflow
        looks like once the graph is in place — one for migrations, one for
        reviews. Open a card for the details, commands, and flow.
      </p>

      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {projects.map((project) => (
          <Link
            key={project.slug}
            id={project.slug}
            href={`/projects/${project.slug}/`}
            className="group flex scroll-mt-20 flex-col rounded-lg border border-[var(--hairline)] bg-[var(--surface)] p-6 transition-colors hover:border-[var(--mute)]"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-wide text-[var(--mute)]">
                  {project.kind}
                </p>
                <h2 className="mt-1 font-[family-name:var(--font-serif)] text-2xl font-semibold tracking-tight text-[var(--ink)]">
                  {project.name}
                </h2>
              </div>
              <Badge>{project.status}</Badge>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-[var(--body)]">
              {project.summary}
            </p>

            <ul className="mt-5 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-md border border-[var(--hairline)] px-2 py-1 font-[family-name:var(--font-mono)] text-[10px] text-[var(--mute)]"
                >
                  {tag}
                </li>
              ))}
            </ul>

            <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-[var(--primary)] group-hover:underline">
              Open project <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </Link>
        ))}
      </div>

      <section
        id="share"
        aria-labelledby="share-heading"
        className="mt-14 scroll-mt-20 border-t border-[var(--hairline)] pt-10"
      >
        <div className="rounded-lg border border-[var(--hairline)] bg-[var(--surface)] p-8">
          <Badge className="mb-4">Community</Badge>
          <h2
            id="share-heading"
            className="font-[family-name:var(--font-serif)] text-2xl font-semibold tracking-tight text-[var(--ink)] sm:text-3xl"
          >
            Built something with rgctl? Show it off.
          </h2>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-[var(--body)]">
            We would love to feature what the community is building — an agent,
            a skill, a CI check, a dashboard, a migration harness, or anything
            else that uses the graph. Tell us what you made and how rgctl
            helped, and we will help you turn it into a project page so others
            can learn from it.
          </p>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-[var(--body)]">
            Start with a showcase issue in the rgctl repository. Once the shape
            is clear, send a pull request to the website — project entries live
            in{" "}
            <code className="font-[family-name:var(--font-mono)] text-[0.9em] text-[var(--ink)]">
              src/lib/projects.ts
            </code>
            .
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <Button asChild>
              <a
                href={SHOWCASE_ISSUE_URL}
                target="_blank"
                rel="noreferrer"
              >
                Open a showcase issue
              </a>
            </Button>
            <Button variant="ghost" asChild>
              <a href={SHOWCASE_PR_URL} target="_blank" rel="noreferrer">
                Start a PR
              </a>
            </Button>
            <Button variant="link" asChild>
              <a href={DISCORD_INVITE} target="_blank" rel="noreferrer">
                Not sure? Ask on Discord
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
