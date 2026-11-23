export type ProjectDetail = {
  label: string;
  value: string;
};

export type ProjectLink = {
  label: string;
  href: string;
  external?: boolean;
  primary?: boolean;
};

export type Project = {
  slug: string;
  name: string;
  kind: string;
  status: string;
  summary: string;
  description: string;
  tags: string[];
  details: ProjectDetail[];
  terminalTitle: string;
  terminalLines: string[];
  terminalNote: string;
  links: ProjectLink[];
  flow: string;
  flowNote: string;
  flowHint: string;
  readmeUrl: string;
  readmeLabel: string;
};

/**
 * Project pages for the rgctl family.
 *
 * The Mermaid diagrams mirror the `Flow` sections in each project README:
 *   migIQ/README.md
 *   pr-reviewer-agent/README.md
 * Keep the source in sync when those diagrams change.
 */
export const projects: Project[] = [
  {
    slug: "migiq",
    name: "migIQ",
    kind: "Migration harness",
    status: "Experimental",
    summary:
      "An experimental harness that chains rgctl analysis with agent skills to plan and execute legacy application migrations.",
    description:
      "rgctl builds the graph; migration skills gather requirements, write a plan, change code, generate tests, containerize, and deploy — interactively in Claude Code or as an autonomous migrator agent.",
    tags: ["5-phase workflow", "Claude Code skills", "npm package"],
    details: [
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
    ],
    terminalTitle: "Try it",
    terminalLines: [
      "npx @rgctl/migiq -g",
      '# in Claude Code: /migiq "Migrate this Spring Boot app to Quarkus"',
    ],
    terminalNote:
      "Installs the migration skills for Claude Code. The run itself is driven by rgctl, so index the target repo first.",
    links: [
      {
        label: "GitHub repository",
        href: "https://github.com/rgctl/migIQ",
        external: true,
        primary: true,
      },
      {
        label: "npm package",
        href: "https://www.npmjs.com/package/@rgctl/migiq",
        external: true,
      },
      {
        label: "Example migrations",
        href: "https://github.com/rgctl/migIQ/tree/main/examples",
        external: true,
      },
      {
        label: "Migration planning guide",
        href: "/docs/guides/migration-planning/",
      },
    ],
    flow: `flowchart LR
  A["1 · Analyze<br/>rgctl discover + mig-rgctl"] --> B["2 · Requirements<br/>mig-prompt-builder"]
  B --> C["3 · Plan<br/>mig-plan"]
  C --> D["4 · Execute<br/>mig-execute"]
  D --> E["5 · Report<br/>summary, metrics, next steps"]`,
    flowNote:
      "Five phases from graph to report. Test generation, containerization, and deployment are supporting skills that run during or after execution.",
    flowHint: "Scroll the diagram horizontally to see all five phases.",
    readmeUrl: "https://github.com/rgctl/migIQ#5-phase-migration-workflow",
    readmeLabel: "migIQ/README.md",
  },
  {
    slug: "pr-reviewer-agent",
    name: "PR Reviewer Agent",
    kind: "Review agent",
    status: "Reference deployment",
    summary:
      "An OpenCode + rgctl agent that reviews GitLab merge requests and GitHub pull requests with call-graph impact analysis.",
    description:
      "A webhook trigger clones the change, seeds a base graph in the workspace, and hands off to an agent running the rgctl-pr-reviewer-v2 skill. The agent writes IMPACT_REPORT.md and posts a short review back to the MR or PR.",
    tags: ["GitLab MRs", "GitHub App", "OpenShift"],
    details: [
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
    ],
    terminalTitle: "Deploy it",
    terminalLines: [
      "./deploy/openshift/deploy.sh          # GitLab MR path",
      "./deploy/openshift/deploy.sh github   # GitHub App path",
    ],
    terminalNote:
      "Self-hosted on OpenShift. You need a cluster, GitLab or a GitHub App, and model credentials; the deployment README covers secrets, webhooks, and resource limits.",
    links: [
      {
        label: "GitHub repository",
        href: "https://github.com/rgctl/pr-reviewer-agent",
        external: true,
        primary: true,
      },
      {
        label: "Deployment guide",
        href: "https://github.com/rgctl/pr-reviewer-agent/blob/main/deploy/openshift/README.md",
        external: true,
      },
      {
        label: "PR review guide",
        href: "/docs/guides/pr-review/",
      },
    ],
    flow: `flowchart LR
  F["GitLab MR / GitHub PR"] -->|webhook| T[Trigger]
  T -->|"clone + discover<br/>--with-limits"| A["OpenCode agent<br/>workspace + rgctl graph"]
  A -->|"rgctl review paths"| R["IMPACT_REPORT.md"]
  A -->|"posts review"| C["MR note / PR review"]`,
    flowNote:
      "One trigger and one agent. GitLab and GitHub differ only at the webhook entry point and the comment API.",
    flowHint: "Scroll the diagram horizontally to see the full flow.",
    readmeUrl: "https://github.com/rgctl/pr-reviewer-agent#flow",
    readmeLabel: "pr-reviewer-agent/README.md",
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

const showcaseIssueBody = `## Project

**Name:**

**Repository:**

## What it does

Tell us what you built and who it is for.

## How it uses rgctl

Which commands, outputs, or workflows does it rely on?

## Demo or screenshots

Links, a short recording, or a screenshot are welcome.

## Anything else

What should other people know before trying it?
`;

export const SHOWCASE_ISSUE_URL = `https://github.com/rgctl/rgctl/issues/new?${new URLSearchParams({
  title: "Project showcase: ",
  body: showcaseIssueBody,
}).toString()}`;

/** Opens the project data file on GitHub; contributors can propose a PR from there. */
export const SHOWCASE_PR_URL =
  "https://github.com/rgctl/rgctl-website/edit/main/src/lib/projects.ts";
