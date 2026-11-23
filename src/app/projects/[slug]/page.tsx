import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { MermaidDiagram } from "@/components/mermaid-diagram";
import { TerminalBlock } from "@/components/terminal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { socialMetadata } from "@/lib/seo";
import { getProject, projects } from "@/lib/projects";

export const dynamicParams = false;

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  return {
    title: project.name,
    description: project.summary,
    alternates: { canonical: `/projects/${project.slug}/` },
    ...socialMetadata({
      title: `${project.name} — ${project.kind}`,
      description: project.summary,
      path: `/projects/${project.slug}/`,
    }),
  };
}

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

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <Link
        href="/projects/"
        className="inline-flex items-center gap-1 text-sm text-[var(--mute)] transition-colors hover:text-[var(--ink)]"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> All projects
      </Link>

      <div className="mt-6 flex flex-wrap items-baseline gap-x-3 gap-y-2">
        <h1 className="font-[family-name:var(--font-serif)] text-3xl font-semibold tracking-tight text-[var(--ink)] sm:text-4xl">
          {project.name}
        </h1>
        <Badge>{project.status}</Badge>
        <span className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-wide text-[var(--mute)]">
          {project.kind}
        </span>
      </div>

      <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-[var(--body)]">
        {project.summary}
      </p>
      <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-[var(--body)]">
        {project.description}
      </p>

      <ProjectDetails details={project.details} />

      <div className="mt-8">
        <h2 className="text-sm font-semibold text-[var(--ink)]">
          {project.terminalTitle}
        </h2>
        <TerminalBlock
          className="mt-3 max-w-3xl"
          lines={project.terminalLines}
        />
        <p className="mt-2 text-xs leading-relaxed text-[var(--mute)]">
          {project.terminalNote}
        </p>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {project.links.map((link) =>
          link.external ? (
            <Button
              key={link.href}
              variant={link.primary ? "default" : "ghost"}
              size="sm"
              asChild
            >
              <a href={link.href} target="_blank" rel="noreferrer">
                {link.label}
              </a>
            </Button>
          ) : (
            <Button
              key={link.href}
              variant={link.primary ? "default" : "ghost"}
              size="sm"
              asChild
            >
              <Link href={link.href}>{link.label}</Link>
            </Button>
          ),
        )}
      </div>

      <h2 className="mt-10 text-lg font-semibold text-[var(--ink)]">Flow</h2>
      <p className="mt-1 max-w-3xl text-sm leading-relaxed text-[var(--body)]">
        {project.flowNote}
      </p>
      <MermaidDiagram chart={project.flow} minWidth={640} />
      <p className="mt-2 text-xs text-[var(--mute)] sm:hidden">
        {project.flowHint}
      </p>
      <p className="mt-2 text-xs text-[var(--mute)]">
        Mirrors the Flow section in{" "}
        <a
          href={project.readmeUrl}
          className="underline hover:text-[var(--ink)]"
          target="_blank"
          rel="noreferrer"
        >
          {project.readmeLabel}
        </a>
        .
      </p>

      <div className="mt-14 border-t border-[var(--hairline)] pt-8">
        <Link
          href="/projects/#share"
          className="inline-flex items-center gap-1 text-sm font-medium text-[var(--primary)] hover:underline"
        >
          Built something with rgctl? Show it off{" "}
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}
