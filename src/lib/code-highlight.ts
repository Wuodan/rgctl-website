/**
 * Line tokenizer copied from the universe dashboard (`dashboard/src/v2/highlight.ts`).
 * This site does not import that module.
 *
 * Five kinds only: plain, comment, string, number, keyword. Keyword lists for
 * source languages are the dashboard lists. Shell, JSON, YAML, and TOML do not
 * fall back to the TypeScript keyword set — a fence of commands would otherwise
 * light up ordinary words. `#` comments are recognized for languages that use
 * them; the dashboard only matches `//` and block comments on one line.
 *
 * Known limits, same as the dashboard: block comments and multi-line strings
 * are matched within a line only. A `//` inside a string is left alone, because
 * strings are matched before comments. This is a reading aid, not a parser.
 */

export type TokenKind = "plain" | "comment" | "string" | "number" | "keyword";

export interface Token {
  text: string;
  kind: TokenKind;
}

/** Keyword sets per language id, copied from the dashboard. */
const KEYWORDS: Record<string, string[]> = {
  typescript:
    "const let var function return if else for while await async export import from new class extends implements interface type enum throw try catch finally switch case default break continue of in typeof instanceof as satisfies declare readonly public private protected static void null undefined true false this super yield delete".split(
      " ",
    ),
  javascript:
    "const let var function return if else for while await async export import from new class extends throw try catch finally switch case default break continue of in typeof instanceof void null undefined true false this super yield delete".split(
      " ",
    ),
  rust: "fn let mut const struct enum impl trait for while loop if else match return pub use mod crate self super where async await move ref dyn box unsafe static type as in break continue".split(
    " ",
  ),
  python:
    "def class return if elif else for while import from as with try except finally raise lambda yield async await global nonlocal pass break continue in is not and or None True False self".split(
      " ",
    ),
  go: "func var const type struct interface map chan package import return if else for range go defer select switch case default break continue nil true false".split(
    " ",
  ),
  java: "public private protected class interface extends implements static final void new return if else for while try catch finally throw throws import package this super null true false int long double float boolean char byte short enum switch case default break continue".split(
    " ",
  ),
  csharp:
    "public private protected internal class interface struct record static readonly void new return if else for foreach while try catch finally throw using namespace var this base null true false async await".split(
      " ",
    ),
  cpp: "int long double float char bool void auto const constexpr static struct class public private protected namespace using return if else for while switch case default break continue new delete nullptr true false template typename".split(
    " ",
  ),
  c: "int long double float char void const static struct union enum typedef return if else for while switch case default break continue sizeof NULL".split(
    " ",
  ),
  php: "function class interface extends implements public private protected static return if else elseif for foreach while try catch finally throw new echo namespace use null true false array".split(
    " ",
  ),
  ruby: "def class module end if elsif else unless while until for do return yield begin rescue ensure raise require attr_accessor nil true false self new".split(
    " ",
  ),
};

const KEYWORD_SETS: Record<string, Set<string>> = Object.fromEntries(
  Object.entries(KEYWORDS).map(([id, words]) => [id, new Set(words)]),
);

const EMPTY = new Set<string>();

const ALIASES: Record<string, string> = {
  ts: "typescript",
  tsx: "typescript",
  js: "javascript",
  jsx: "javascript",
  mjs: "javascript",
  cjs: "javascript",
  rs: "rust",
  py: "python",
  cs: "csharp",
  cc: "cpp",
  cxx: "cpp",
  hpp: "cpp",
  hh: "cpp",
  h: "c",
  rb: "ruby",
  sh: "bash",
  shell: "bash",
  zsh: "bash",
  console: "bash",
  yml: "yaml",
  plaintext: "text",
  txt: "text",
  scm: "scheme",
  lisp: "scheme",
};

/** Fences that should stay one color. Output dumps, not source. */
const PLAIN = new Set(["text", "diff", "markdown", "md", "csv"]);

/** `#` to end of line, and no keyword painting. */
const HASH_ONLY = new Set([
  "bash",
  "yaml",
  "toml",
  "elixir",
  "perl",
  "r",
  "dockerfile",
  "ini",
  "properties",
  "conf",
]);

const IDENT = /[A-Za-z_$][A-Za-z0-9_$]*/;

type Comments = "slash" | "hash" | "both" | "semi" | "none";

function languageId(language: string): string {
  const id = language.trim().toLowerCase();
  return ALIASES[id] ?? id;
}

function commentsFor(id: string): Comments {
  if (PLAIN.has(id) || id === "json") return "none";
  if (id === "scheme") return "semi";
  if (id === "php") return "both";
  if (id === "python" || id === "ruby" || HASH_ONLY.has(id)) return "hash";
  if (KEYWORD_SETS[id]) return "slash";
  return "hash";
}

/** Tokenize one line. State does not carry across lines. */
export function highlightLine(line: string, language: string): Token[] {
  const id = languageId(language);
  if (PLAIN.has(id)) return [{ text: line, kind: "plain" }];

  const keywords = KEYWORD_SETS[id] ?? EMPTY;
  const comments = commentsFor(id);
  const out: Token[] = [];
  let i = 0;
  let plainStart = 0;

  const flushPlain = (end: number) => {
    if (end > plainStart) out.push({ text: line.slice(plainStart, end), kind: "plain" });
  };

  while (i < line.length) {
    const c = line[i]!;

    // Strings before comments, so `"// not a comment"` survives.
    if (c === '"' || c === "'" || c === "`") {
      flushPlain(i);
      let j = i + 1;
      while (j < line.length && line[j] !== c) {
        if (line[j] === "\\") j++;
        j++;
      }
      out.push({ text: line.slice(i, Math.min(j + 1, line.length)), kind: "string" });
      i = j + 1;
      plainStart = i;
      continue;
    }

    const slash = comments === "slash" || comments === "both";
    const hash = comments === "hash" || comments === "both";

    if (slash && c === "/" && line[i + 1] === "/") {
      flushPlain(i);
      out.push({ text: line.slice(i), kind: "comment" });
      return out;
    }

    if (slash && c === "/" && line[i + 1] === "*") {
      flushPlain(i);
      const close = line.indexOf("*/", i + 2);
      const end = close === -1 ? line.length : close + 2;
      out.push({ text: line.slice(i, end), kind: "comment" });
      i = end;
      plainStart = i;
      continue;
    }

    if ((hash && c === "#") || (comments === "semi" && c === ";")) {
      flushPlain(i);
      out.push({ text: line.slice(i), kind: "comment" });
      return out;
    }

    if (c >= "0" && c <= "9") {
      flushPlain(i);
      let j = i;
      while (j < line.length && /[0-9a-fA-FxX._]/.test(line[j]!)) j++;
      out.push({ text: line.slice(i, j), kind: "number" });
      i = j;
      plainStart = i;
      continue;
    }

    const m = IDENT.exec(line.slice(i));
    if (m && m.index === 0) {
      const word = m[0];
      if (keywords.has(word)) {
        flushPlain(i);
        out.push({ text: word, kind: "keyword" });
        i += word.length;
        plainStart = i;
        continue;
      }
      i += word.length;
      continue;
    }

    i++;
  }

  flushPlain(line.length);
  return out;
}

/**
 * rgctl invocations inside shell snippets. The binary, the verb, and flags use
 * the keyword color. Flag values, paths, and symbol arguments stay plain,
 * strings, or numbers. Other shell lines are unchanged.
 *
 * Verb list mirrors the CLI. A group verb (`vuln`, `semantic`, `cpg`, …)
 * keeps one more word for its subcommand.
 */
const RGCTL_SUBS = new Set(
  `discover writeback gql find callers callees relations inventory watch update query slice blast-radius taint inspect metrics semantic communities clones cpg check review pr-check export serve diff merge install completions vuln deps security status help version verify patch triage fetch analyze scan paths index distill label list function calls mutations flows ast pdg`.split(
    " ",
  ),
);

const RGCTL_EXPECTS_SUB = new Set([
  "semantic",
  "communities",
  "cpg",
  "vuln",
  "deps",
  "security",
  "review",
  "query",
  "writeback",
]);

/** Global options that take the next word, so that word is not the verb. */
const RGCTL_VALUE_FLAGS = new Set([
  "-d",
  "--db",
  "-r",
  "--repo",
  "-f",
  "--format",
  "-o",
  "--output",
  "-l",
  "--lang",
  "--language",
  "--languages",
]);

const SHELL_IDS = new Set(["bash", "sh", "shell", "zsh", "console", ""]);

interface ShellWord {
  start: number;
  end: number;
  text: string;
  sep: boolean;
}

interface CmdState {
  active: boolean;
  expectSub: boolean;
}

function lexShell(line: string): { words: ShellWord[]; commentAt: number | null } {
  const words: ShellWord[] = [];
  let i = 0;
  while (i < line.length) {
    const c = line[i]!;
    if (c === " " || c === "\t") {
      i++;
      continue;
    }
    if (c === "#") return { words, commentAt: i };
    if (c === '"' || c === "'" || c === "`") {
      const quote = c;
      const start = i++;
      while (i < line.length && line[i] !== quote) {
        if (line[i] === "\\") i += 2;
        else i++;
      }
      if (i < line.length) i++;
      words.push({ start, end: i, text: line.slice(start, i), sep: false });
      continue;
    }
    if (c === "&" && line[i + 1] === "&") {
      words.push({ start: i, end: i + 2, text: "&&", sep: true });
      i += 2;
      continue;
    }
    if (c === "|" && line[i + 1] === "|") {
      words.push({ start: i, end: i + 2, text: "||", sep: true });
      i += 2;
      continue;
    }
    if (c === "|" || c === ";") {
      words.push({ start: i, end: i + 1, text: c, sep: true });
      i++;
      continue;
    }
    const start = i++;
    while (i < line.length) {
      const d = line[i]!;
      if (
        d === " " ||
        d === "\t" ||
        d === "#" ||
        d === '"' ||
        d === "'" ||
        d === "`" ||
        d === "|" ||
        d === ";" ||
        (d === "&" && line[i + 1] === "&")
      ) {
        break;
      }
      i++;
    }
    words.push({ start, end: i, text: line.slice(start, i), sep: false });
  }
  return { words, commentAt: null };
}

function isRgctlBin(token: string): boolean {
  const base = token.split("/").pop() ?? token;
  return base === "rgctl";
}

function commandIndex(words: ShellWord[]): number {
  let i = 0;
  if (words[i]?.text === "$") i++;
  while (words[i] && /^[A-Za-z_][A-Za-z0-9_]*=/.test(words[i]!.text) && !words[i]!.sep) i++;
  if (words[i]?.text === "sudo") i++;
  return i;
}

function lineContinues(line: string, commentAt: number | null): boolean {
  const body = (commentAt == null ? line : line.slice(0, commentAt)).trimEnd();
  return body.endsWith("\\");
}

function segmentsOf(words: ShellWord[]): ShellWord[][] {
  const segs: ShellWord[][] = [];
  let cur: ShellWord[] = [];
  for (const word of words) {
    if (word.sep) {
      if (cur.length) segs.push(cur);
      segs.push([word]);
      cur = [];
    } else {
      cur.push(word);
    }
  }
  if (cur.length) segs.push(cur);
  return segs;
}

/** True when a shell line runs rgctl (including after `&&` or a path prefix). */
export function lineInvokesRgctl(line: string): boolean {
  const { words, commentAt } = lexShell(line);
  const visible = commentAt == null ? words : words.filter((w) => w.start < commentAt);
  for (const seg of segmentsOf(visible)) {
    if (seg[0]?.sep) continue;
    const cmd = seg[commandIndex(seg)];
    if (cmd && isRgctlBin(cmd.text)) return true;
  }
  return false;
}

function pushSlice(out: Token[], text: string) {
  if (text) out.push(...highlightLine(text, "bash"));
}

function paintCommandWords(
  line: string,
  words: ShellWord[],
  from: number,
  expectSub: boolean,
  out: Token[],
): { cursor: number; expectSub: boolean } {
  let cursor = words[from]?.start ?? line.length;
  let skipValue = false;
  for (let i = from; i < words.length; i++) {
    const word = words[i]!;
    if (word.start > cursor) out.push({ text: line.slice(cursor, word.start), kind: "plain" });
    const raw = word.text;
    if (raw === "\\") {
      out.push({ text: raw, kind: "plain" });
    } else if (/^--?[A-Za-z][A-Za-z0-9_-]*(?:=|$)/.test(raw) || /^--?[A-Za-z][A-Za-z0-9_-]*=/.test(raw)) {
      const eq = raw.indexOf("=");
      if (eq === -1) {
        out.push({ text: raw, kind: "keyword" });
        if (expectSub && RGCTL_VALUE_FLAGS.has(raw)) skipValue = true;
      } else {
        out.push({ text: raw.slice(0, eq), kind: "keyword" });
        pushSlice(out, raw.slice(eq));
      }
    } else if (skipValue) {
      pushSlice(out, raw);
      skipValue = false;
    } else if (expectSub && RGCTL_SUBS.has(raw)) {
      out.push({ text: raw, kind: "keyword" });
      expectSub = RGCTL_EXPECTS_SUB.has(raw);
    } else if (isRgctlBin(raw)) {
      const at = raw.lastIndexOf("rgctl");
      if (at > 0) out.push({ text: raw.slice(0, at), kind: "plain" });
      out.push({ text: "rgctl", kind: "keyword" });
      expectSub = true;
    } else {
      pushSlice(out, raw);
      if (expectSub) expectSub = false;
    }
    cursor = word.end;
  }
  return { cursor, expectSub };
}

function paintShellLine(line: string, carried: CmdState): { tokens: Token[]; carried: CmdState } {
  const { words, commentAt } = lexShell(line);
  const visible = commentAt == null ? words : words.filter((w) => w.start < commentAt);
  const invokes = segmentsOf(visible).some((seg) => {
    if (seg[0]?.sep) return false;
    const cmd = seg[commandIndex(seg)];
    return Boolean(cmd && isRgctlBin(cmd.text));
  });
  if (!carried.active && !invokes) {
    return {
      tokens: highlightLine(line, "bash"),
      carried: { active: false, expectSub: false },
    };
  }

  const out: Token[] = [];
  let cursor = 0;
  let inCommand = carried.active;
  let expectSub = carried.active ? carried.expectSub : false;

  for (const seg of segmentsOf(visible)) {
    if (seg[0]?.sep) {
      if (seg[0].start > cursor) out.push({ text: line.slice(cursor, seg[0].start), kind: "plain" });
      out.push({ text: seg[0].text, kind: "plain" });
      cursor = seg[0].end;
      inCommand = false;
      expectSub = false;
      continue;
    }
    const cmdAt = commandIndex(seg);
    const cmd = seg[cmdAt];
    const starts = Boolean(cmd && isRgctlBin(cmd.text));
    if (!inCommand && !starts) {
      const end = seg[seg.length - 1]!.end;
      pushSlice(out, line.slice(cursor, end));
      cursor = end;
      continue;
    }
    if (starts) {
      const rgctlAt = cmdAt;
      if (seg[rgctlAt]!.start > cursor) {
        pushSlice(out, line.slice(cursor, seg[rgctlAt]!.start));
      }
      cursor = seg[rgctlAt]!.start;
      const painted = paintCommandWords(line, seg, rgctlAt, false, out);
      cursor = painted.cursor;
      expectSub = painted.expectSub;
      inCommand = true;
      continue;
    }
    if (seg[0]!.start > cursor) out.push({ text: line.slice(cursor, seg[0]!.start), kind: "plain" });
    const painted = paintCommandWords(line, seg, 0, expectSub, out);
    cursor = painted.cursor;
    expectSub = painted.expectSub;
    inCommand = true;
  }

  if (commentAt != null) {
    if (commentAt > cursor) out.push({ text: line.slice(cursor, commentAt), kind: "plain" });
    out.push({ text: line.slice(commentAt), kind: "comment" });
  } else if (cursor < line.length) {
    out.push({ text: line.slice(cursor), kind: "plain" });
  }

  const cont = lineContinues(line, commentAt) && inCommand;
  return {
    tokens: out,
    carried: cont ? { active: true, expectSub } : { active: false, expectSub: false },
  };
}

/** `rgctl --help` listing: color only the command in the left column. */
function highlightHelpLine(line: string): Token[] {
  const match = /^( +)([a-z][a-z0-9-]*)( {2,})(.*)$/.exec(line);
  if (!match || !RGCTL_SUBS.has(match[2]!)) return [{ text: line, kind: "plain" }];
  return [
    { text: match[1]!, kind: "plain" },
    { text: match[2]!, kind: "keyword" },
    { text: match[3]! + match[4]!, kind: "plain" },
  ];
}

/** Tokenize a snippet. Shell fences highlight rgctl invocations across wrapped lines. */
export function highlightSource(source: string, language: string): Token[][] {
  const id = languageId(language);
  const lines = source.replace(/\n$/, "").split("\n");
  if (id === "rgctl-help" || id === "help") return lines.map(highlightHelpLine);
  if (!SHELL_IDS.has(id)) return lines.map((line) => highlightLine(line, language));

  let carried: CmdState = { active: false, expectSub: false };
  return lines.map((line) => {
    const painted = paintShellLine(line, carried);
    carried = painted.carried;
    return painted.tokens;
  });
}

/**
 * A command line that is an rgctl invocation, or the arguments after a
 * separate `rgctl` prompt (hero and command samples).
 */
export function highlightRgctlInvocation(line: string): Token[] {
  const carried: CmdState = lineInvokesRgctl(line)
    ? { active: false, expectSub: false }
    : { active: true, expectSub: true };
  return paintShellLine(line, carried).tokens;
}
