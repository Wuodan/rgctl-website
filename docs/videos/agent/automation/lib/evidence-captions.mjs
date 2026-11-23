const RULES = [
  {
    test: /\bblast-radius\b/,
    title: "Call-graph impact, not a text search",
    body: "Follows resolved callers and boundary entry points instead of matching a name.",
    priority: 100,
    key: "blast-radius",
  },
  {
    test: /\bcallers\b/,
    title: "Resolved call edges, not grep hits",
    body: "Direct and transitive callers come from the graph, with file and line context.",
    priority: 70,
    key: "callers",
  },
  {
    test: /\bslice\b|\btaint\b/,
    title: "Program dependence, not line matching",
    body: "Only statements that influence the value or carry untrusted data are included.",
    priority: 80,
    key: "slice-taint",
  },
  {
    test: /\bvuln\b|\bscan\b/,
    title: "Reachability verdicts, not a CVE list",
    body: "Each advisory gets an OpenVEX verdict and code evidence — not just a version match.",
    priority: 90,
    key: "vuln",
  },
  {
    test: /\breview\b|\bcheck\b/,
    title: "Graph deltas, not just a diff",
    body: "Compares base and head call paths for retargeted calls and new policy violations.",
    priority: 60,
    key: "review",
  },
  {
    test: /\bsemantic\b/,
    title: "Intent search, grounded by the graph",
    body: "Semantic hits are verified against callers and edges — embeddings alone are not proof.",
    priority: 50,
    key: "semantic",
  },
  {
    test: /\bmigrate\b|\bmetrics\b|\bpagerank\b/,
    title: "Dependency order from graph signals",
    body: "Coupling, centrality, and blast radius replace guesswork about what to extract first.",
    priority: 40,
    key: "migration-metrics",
  },
  {
    test: /\brelations\b|\binventory\b|\bfind\b/,
    title: "Typed symbols and edges, not text matches",
    body: "Results are graph entities with stable JSON, not lines that happen to contain a string.",
    priority: 30,
    key: "structured-query",
  },
];

export function captionForTool(tool) {
  const input = tool?.input ?? {};
  const command =
    typeof input === "string"
      ? input
      : typeof input.command === "string"
        ? input.command
        : JSON.stringify(input);
  const rule = RULES.find((candidate) => candidate.test.test(command));
  if (!rule) return null;
  return { key: rule.key, priority: rule.priority, title: rule.title, body: rule.body };
}
