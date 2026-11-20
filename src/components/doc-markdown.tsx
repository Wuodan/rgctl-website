"use client";

import { Children, isValidElement, type ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { HighlightedCode } from "@/components/highlighted-code";
import { lineInvokesRgctl } from "@/lib/code-highlight";
import { MermaidDiagram } from "@/components/mermaid-diagram";

function extractText(node: ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(extractText).join("");
  if (isValidElement<{ children?: ReactNode }>(node)) {
    return extractText(node.props.children);
  }
  return "";
}

function isMermaidCode(node: ReactNode): node is React.ReactElement<{
  className?: string;
  children?: ReactNode;
}> {
  if (!isValidElement(node)) return false;
  const className = (node.props as { className?: string }).className ?? "";
  return typeof className === "string" && className.split(/\s+/).includes("language-mermaid");
}

export function DocMarkdown({ children }: { children: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        code({ className, children: codeChildren }) {
          if (className) {
            return <code className={className}>{codeChildren}</code>;
          }
          const text = extractText(codeChildren).replace(/\n$/, "");
          if (lineInvokesRgctl(text)) {
            return (
              <code>
                <HighlightedCode source={text} language="bash" />
              </code>
            );
          }
          return <code>{codeChildren}</code>;
        },
        table({ children: tableChildren }) {
          return (
            <div className="my-4 overflow-x-auto">
              <table>{tableChildren}</table>
            </div>
          );
        },
        pre({ children: preChildren }) {
          const only = Children.toArray(preChildren)[0];
          if (isMermaidCode(only)) {
            return <MermaidDiagram chart={extractText(only.props.children)} />;
          }
          if (isValidElement<{ className?: string; children?: ReactNode }>(only)) {
            const className = only.props.className ?? "";
            const language =
              /language-([\w#+.-]+)/.exec(className)?.[1] ?? "";
            return (
              <pre>
                <code className={className || undefined}>
                  <HighlightedCode
                    source={extractText(only.props.children)}
                    language={language}
                  />
                </code>
              </pre>
            );
          }
          return <pre>{preChildren}</pre>;
        },
      }}
    >
      {children}
    </ReactMarkdown>
  );
}
