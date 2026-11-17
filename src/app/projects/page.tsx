import type { Metadata } from "next";
import Link from "next/link";
import { MermaidDiagram } from "@/components/mermaid-diagram";
import { TerminalBlock } from "@/components/terminal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { socialMetadata } from "@/lib/seo";
import { DISCORD_INVITE, GITHUB_DISCUSSIONS } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Sub-projects built on rgctl: migIQ for agent-driven application migrations and pr-reviewer-agent for call-graph-aware GitLab and GitHub reviews.",
  alternates: { canonical: "/projects/" },
  ...socialMetadata({
    title: "Projects in the rgctl family",
    description:
      "Two sub-projects show the graph doing real work end to end — migIQ for migrations and pr-reviewer-agent for MR and PR reviews.",
    path: "/projects/",
  }),
};

/**
 * Mirrors the `Flow` diagrams in each project README:
 *   migIQ/README.md
 *   pr-reviewer-agent/README.md
 * Keep the Mermaid source in sync when those diagrams change.
 */
const MIGIQ_FLOW = `flowchart LR
  A["1 · Analyze<br/>rgctl discover + mig-rgctl"] --> B["2 · Requirements<br/>mig-prompt-builder"]
  B --> C["3 · Plan<br/>mig-plan"]
  C --> D["4 · Execute<br/>mig-execute"]
  D --> E["5 · Report<br/>summary, metrics, next steps"]`;

const REVIEW_FLOW = `flowchart LR
  F["GitLab MR / GitHub PR"] -->|webhook| T[Trigger]
  T -->|"clone + discover<br/>--with-limits"| A["OpenCode agent<br/>workspace + rgctl graph"]
  A -->|"rgctl review paths"| R["IMPACT_REPORT.md"]
  A -->|"posts review"| C["MR note / PR review"]`;

const MIGIQ_DETAILS = [
  {
    label: "Phases",
    value: "Analyze → Requirements → Plan → Execute → Report",
  },
  {
    label: "Skills",
    value:
      "mig-rgctl · mig-prompt-builder · mig-plan · mig-execute · mig-test-gen · mig-containerize · mig-deploy",
  },
  {
    label: "Examples",
    value:
      "Spring Boot → Quarkus · Java EE → Jakarta · Struts → Quarkus · .NET → 8 · Rails 5 → 7",
  },
  {
    label: "Requirements",
    value: "rgctl + Claude Code · Node.js 14+",
  },
];

const REVIEW_DETAILS = [
  {
    label: "Forges",
    value: "GitLab MR webhooks · GitHub App PR events and @mentions",
  },
  {
    label: "Outputs",
    value: "IMPACT_REPORT.md · four-section review note",
  },
  {
    label: "Analysis",
    value: "rgctl review paths · optional blast-radius / policy check",
  },
  {
    label: "Deploy",
    value: "OpenShift · agent + trigger images · resource-capped pods",
  },
];

function ProjectDetails({
  details,
}: {
  details: readonly { label: string; value: string }[];
}) {
  return (
    <dl className="mt-6 grid gap-x-10 gap-y-5 sm:grid-cols-2">
      {details.map((detail) => (
        <div key={detail.label}>
          <dt className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-wide text-[var(--mute)]">
            {detail.label}
          </dt>
          <dd className="mt-1 text-sm leading-relaxed text-[var(--body)]">
            {detail.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <Badge className="mb-4">Sub-projects</Badge>
      <h1 className="font-[family-name:var(--font-serif)] text-3xl font-semibold tracking-tight text-[var(--ink)] sm:text-4xl">
        Projects in the rgctl family
      </h1>
      <p className="mt-3 max-w-2xl text-[var(--body)]">
        rgctl is the engine. These separate projects show what a full workflow
        looks like once the graph is in place — one for migrations, one for
        reviews. Both are early-stage; the repositories are the source of truth
        for setup and current limitations.
      </p>

      <nav className="mt-6 flex flex-wrap gap-2" aria-label="Projects on this page">
        {[
          { href: "#migiq", label: "migIQ" },
          { href: "#pr-reviewer-agent", label: "PR Reviewer Agent" },
        ].map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="rounded-md border border-[var(--hairline)] bg-[var(--surface)] px-2.5 py-1 font-[family-name:var(--font-mono)] text-[11px] text-[var(--mute)] transition-colors hover:text-[var(--ink)]"
          >
            {item.label}
          </a>
        ))}
      </nav>

      <section
        id="migiq"
        aria-labelledby="migiq-heading"
        className="mt-14 scroll-mt-20 border-t border-[var(--hairline)] pt-10"
      >
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-2">
          <h2
            id="migiq-heading"
            className="font-[family-name:var(--font-serif)] text-2xl font-semibold tracking-tight text-[var(--ink)] sm:text-3xl"
          >
            migIQ
          </h2>
          <Badge>Experimental</Badge>
          <span className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-wide text-[var(--mute)]">
            Migration harness
          </span>
        </div>

        <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-[var(--body)]">
          An experimental harness that chains rgctl analysis with agent skills
          to plan and execute legacy application migrations. rgctl builds the
          graph; migration skills gather requirements, write a plan, change
          code, generate tests, containerize, and deploy — interactively in
          Claude Code or as an autonomous migrator agent.
        </p>

        <ProjectDetails details={MIGIQ_DETAILS} />

        <div className="mt-8">
          <h3 className="text-sm font-semibold text-[var(--ink)]">Try it</h3>
          <TerminalBlock
            className="mt-3 max-w-3xl"
            lines={[
              "npx @rgctl/migiq -g",
              '# in Claude Code: /migiq "Migrate this Spring Boot app to Quarkus"',
            ]}
          />
          <p className="mt-2 text-xs leading-relaxed text-[var(--mute)]">
            Installs the migration skills for Claude Code. The run itself is
            driven by rgctl, so index the target repo first.
          </p>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          <Button size="sm" asChild>
            <a
              href="https://github.com/rgctl/migIQ"
              target="_blank"
              rel="noreferrer"
            >
              GitHub repository
            </a>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <a
              href="https://www.npmjs.com/package/@rgctl/migiq"
              target="_blank"
              rel="noreferrer"
            >
              npm package
            </a>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <a
              href="https://github.com/rgctl/migIQ/tree/main/examples"
              target="_blank"
              rel="noreferrer"
            >
              Example migrations
            </a>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/docs/guides/migration-planning/">
              Migration planning guide
            </Link>
          </Button>
        </div>

        <h3 className="mt-10 text-lg font-semibold text-[var(--ink)]">Flow</h3>
        <p className="mt-1 max-w-3xl text-sm leading-relaxed text-[var(--body)]">
          Five phases from graph to report. Test generation, containerization,
          and deployment are supporting skills that run during or after
          execution.
        </p>
        <MermaidDiagram chart={MIGIQ_FLOW} minWidth={640} />
        <p className="mt-2 text-xs text-[var(--mute)] sm:hidden">
          Scroll the diagram horizontally to see all five phases.
        </p>
        <p className="mt-2 text-xs text-[var(--mute)]">
          Mirrors the Flow section in{" "}
          <a
            href="https://github.com/rgctl/migIQ#5-phase-migration-workflow"
            className="underline hover:text-[var(--ink)]"
            target="_blank"
            rel="noreferrer"
          >
            migIQ/README.md
          </a>
          .
        </p>
      </section>

      <section
        id="pr-reviewer-agent"
        aria-labelledby="pr-reviewer-agent-heading"
        className="mt-14 scroll-mt-20 border-t border-[var(--hairline)] pt-10"
      >
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-2">
          <h2
            id="pr-reviewer-agent-heading"
            className="font-[family-name:var(--font-serif)] text-2xl font-semibold tracking-tight text-[var(--ink)] sm:text-3xl"
          >
            PR Reviewer Agent
          </h2>
          <Badge>Reference deployment</Badge>
          <span className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-wide text-[var(--mute)]">
            Review agent
          </span>
        </div>

        <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-[var(--body)]">
          An OpenCode + rgctl agent that reviews GitLab merge requests and
          GitHub pull requests with call-graph impact analysis. A webhook
          trigger clones the change, seeds a base graph in the workspace, and
          hands off to an agent running the{" "}
          <code className="font-[family-name:var(--font-mono)] text-[0.9em] text-[var(--ink)]">
            rgctl-pr-reviewer-v2
          </code>{" "}
          skill. The agent writes{" "}
          <code className="font-[family-name:var(--font-mono)] text-[0.9em] text-[var(--ink)]">
            IMPACT_REPORT.md
          </code>{" "}
          and posts a short review back to the MR or PR.
        </p>

        <ProjectDetails details={REVIEW_DETAILS} />

        <div className="mt-8">
          <h3 className="text-sm font-semibold text-[var(--ink)]">Deploy it</h3>
          <TerminalBlock
            className="mt-3 max-w-3xl"
            lines={[
              "./deploy/openshift/deploy.sh          # GitLab MR path",
              "./deploy/openshift/deploy.sh github   # GitHub App path",
            ]}
          />
          <p className="mt-2 text-xs leading-relaxed text-[var(--mute)]">
            Self-hosted on OpenShift. You need a cluster, GitLab or a GitHub
            App, and model credentials; the deployment README covers secrets,
            webhooks, and resource limits.
          </p>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          <Button size="sm" asChild>
            <a
              href="https://github.com/rgctl/pr-reviewer-agent"
              target="_blank"
              rel="noreferrer"
            >
              GitHub repository
            </a>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <a
              href="https://github.com/rgctl/pr-reviewer-agent/blob/main/deploy/openshift/README.md"
              target="_blank"
              rel="noreferrer"
            >
              Deployment guide
            </a>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/docs/guides/pr-review/">PR review guide</Link>
          </Button>
        </div>

        <h3 className="mt-10 text-lg font-semibold text-[var(--ink)]">Flow</h3>
        <p className="mt-1 max-w-3xl text-sm leading-relaxed text-[var(--body)]">
          One trigger and one agent. GitLab and GitHub differ only at the
          webhook entry point and the comment API.
        </p>
        <MermaidDiagram chart={REVIEW_FLOW} minWidth={640} />
        <p className="mt-2 text-xs text-[var(--mute)] sm:hidden">
          Scroll the diagram horizontally to see the full flow.
        </p>
        <p className="mt-2 text-xs text-[var(--mute)]">
          Mirrors the Flow section in{" "}
          <a
            href="https://github.com/rgctl/pr-reviewer-agent#flow"
            className="underline hover:text-[var(--ink)]"
            target="_blank"
            rel="noreferrer"
          >
            pr-reviewer-agent/README.md
          </a>
          .
        </p>
      </section>

      <section className="mt-14 border-t border-[var(--hairline)] pt-10">
        <div className="flex flex-col gap-6 rounded-lg border border-[var(--hairline)] bg-[var(--surface)] p-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <h2 className="font-[family-name:var(--font-serif)] text-xl font-semibold text-[var(--ink)]">
              Built something on rgctl?
            </h2>
            <p className="max-w-lg text-sm text-[var(--body)]">
              These projects are early-stage. If you are building an agent,
              skill, or integration on top of the graph, tell us — we would
              like to link it here.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button asChild>
              <a href={DISCORD_INVITE} target="_blank" rel="noreferrer">
                Join Discord
              </a>
            </Button>
            <Button variant="ghost" asChild>
              <a href={GITHUB_DISCUSSIONS} target="_blank" rel="noreferrer">
                GitHub Discussions
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
