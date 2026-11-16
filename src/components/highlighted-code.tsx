import type { Token } from "@/lib/code-highlight";
import { highlightSource } from "@/lib/code-highlight";

export function TokenSpans({ tokens }: { tokens: Token[] }) {
  return tokens.map((tok, i) => (
    <span key={i} className={`tok-${tok.kind}`}>
      {tok.text}
    </span>
  ));
}

export function HighlightedCode({
  source,
  language,
}: {
  source: string;
  language: string;
}) {
  const lines = highlightSource(source, language);
  return lines.map((tokens, i) => (
    <span key={i}>
      <TokenSpans tokens={tokens} />
      {i < lines.length - 1 ? "\n" : null}
    </span>
  ));
}
