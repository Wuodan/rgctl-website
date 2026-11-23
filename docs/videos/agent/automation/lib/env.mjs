import fs from "node:fs";

/**
 * Load a small dotenv file without adding a dependency.
 *
 * Supports:
 *   KEY=value
 *   KEY="value with spaces"
 *   export KEY=value
 *   ${OTHER_KEY} expansion from the same file or process.env
 *
 * Intentionally does not support multi-line values; the demo config is flat.
 */
export function expand(value, vars) {
  return value.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)\}/g, (_, name) => {
    return vars[name] ?? process.env[name] ?? "";
  });
}

export function loadEnv(file) {
  const vars = {};
  if (!fs.existsSync(file)) return vars;

  for (const raw of fs.readFileSync(file, "utf8").split(/\r?\n/)) {
    let line = raw.trim();
    if (!line || line.startsWith("#")) continue;
    if (line.startsWith("export ")) line = line.slice(7).trim();

    const eq = line.indexOf("=");
    if (eq <= 0) continue;

    const key = line.slice(0, eq).trim();
    let value = line.slice(eq + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    vars[key] = expand(value, { ...process.env, ...vars });
  }

  return vars;
}

export function value(env, key, fallback = "") {
  return env[key] ?? process.env[key] ?? fallback;
}

export function required(env, keys, label) {
  const found = keys.map((key) => value(env, key)).find(Boolean);
  if (!found) {
    throw new Error(
      `Missing ${label}. Set ${keys.join(" or ")} in docs/videos/agent/.env.demo.agent.`,
    );
  }
  return found;
}

export function bool(env, key, fallback = false) {
  const raw = value(env, key, fallback ? "1" : "0").toLowerCase();
  return raw === "1" || raw === "true" || raw === "yes";
}

export function number(env, key, fallback) {
  const raw = value(env, key, String(fallback));
  const parsed = Number(raw);
  return Number.isFinite(parsed) ? parsed : fallback;
}
