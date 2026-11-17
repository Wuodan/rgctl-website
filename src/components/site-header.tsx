"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { DiscordIcon, GitHubIcon } from "@/components/social-icons";
import { ThemeToggle } from "@/components/theme-toggle";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { primaryNav } from "@/lib/nav";
import { cn, DISCORD_INVITE, GITHUB_REPO } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--hairline)] bg-[var(--canvas)]/92 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="flex shrink-0 items-center text-[var(--ink)]"
          >
            <Logo className="h-8 w-auto" />
          </Link>
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            {primaryNav.map((item) => {
              const active =
                pathname === item.href || pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-md px-2 py-1.5 text-[13px] font-medium transition-colors lg:px-2.5",
                    active
                      ? "border border-[var(--chip-border)] bg-[var(--chip)] text-[var(--chip-fg)]"
                      : "border border-transparent text-[var(--body)] hover:text-[var(--ink)]",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button variant="ghost" size="sm" asChild>
            <a href={GITHUB_REPO} target="_blank" rel="noreferrer">
              <GitHubIcon className="h-3.5 w-3.5" />
              <span className="hidden lg:inline">GitHub</span>
            </a>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <a
              href={DISCORD_INVITE}
              target="_blank"
              rel="noreferrer"
              aria-label="Join the rgctl Discord"
              title="Discord"
            >
              <DiscordIcon className="h-3.5 w-3.5" />
              <span className="hidden lg:inline">Discord</span>
            </a>
          </Button>
          <Button size="sm" asChild>
            <Link href="/install/">Install</Link>
          </Button>
        </div>
      </div>
      <nav
        className="flex gap-1 overflow-x-auto border-t border-[var(--hairline)] px-4 py-2 lg:hidden"
        aria-label="Mobile"
      >
        {primaryNav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="whitespace-nowrap rounded-[3px] px-2 py-1 text-xs text-[var(--body)]"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
