import fs from "node:fs";

/** Extract the `### N. Label` + blockquote questions from a question script. */
export function parseScript(file) {
  const text = fs.readFileSync(file, "utf8");
  const lines = text.split(/\r?\n/);
  const title = lines.find((line) => /^#\s+/.test(line))?.replace(/^#\s+/, "").trim() ?? file;
  const questions = [];

  for (let i = 0; i < lines.length; i += 1) {
    const heading = lines[i].match(/^###\s+(\d+)\.\s*(.*)$/);
    if (!heading) continue;

    const body = [];
    let j = i + 1;
    for (; j < lines.length; j += 1) {
      if (/^#{1,3}\s+/.test(lines[j])) break;
      const quote = lines[j].match(/^\s*>\s?(.*)$/);
      if (quote) body.push(quote[1].trim());
    }

    const question = body.join(" ").replace(/\s+/g, " ").trim();
    if (question) {
      questions.push({
        index: Number(heading[1]),
        label: heading[2].trim() || `Question ${heading[1]}`,
        text: question,
      });
    }
    i = j - 1;
  }

  if (questions.length === 0) {
    throw new Error(`No questions found in ${file}. Expected "### 1. Opening" and a blockquote.`);
  }
  return { title, questions };
}
