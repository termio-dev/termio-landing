type Block =
  | { type: "heading"; level: 2 | 3; content: string }
  | { type: "paragraph"; content: string }
  | { type: "list"; items: string[] }
  | { type: "code"; content: string };

function renderInline(content: string) {
  const parts: Array<
    | { type: "text"; value: string }
    | { type: "code"; value: string }
    | { type: "strong"; value: string }
    | { type: "em"; value: string }
    | { type: "link"; label: string; href: string }
  > = [];

  const pattern =
    /(`[^`]+`)|(\*\*[^*]+\*\*)|(\*[^*\s][^*]*\*)|(\[[^\]]+\]\([^)]+\))/g;
  let lastIndex = 0;

  for (const match of content.matchAll(pattern)) {
    const index = match.index ?? 0;

    if (index > lastIndex) {
      parts.push({ type: "text", value: content.slice(lastIndex, index) });
    }

    const value = match[0];

    if (value.startsWith("`")) {
      parts.push({ type: "code", value: value.slice(1, -1) });
    } else if (value.startsWith("**")) {
      parts.push({ type: "strong", value: value.slice(2, -2) });
    } else if (value.startsWith("*")) {
      parts.push({ type: "em", value: value.slice(1, -1) });
    } else {
      const [, label, href] = value.match(/^\[([^\]]+)\]\(([^)]+)\)$/) ?? [];
      parts.push({ type: "link", label, href });
    }

    lastIndex = index + value.length;
  }

  if (lastIndex < content.length) {
    parts.push({ type: "text", value: content.slice(lastIndex) });
  }

  return parts.map((part, index) => {
    if (part.type === "code") {
      return (
        <code
          key={index}
          className="rounded bg-card px-1.5 py-0.5 text-[0.95em] text-amber"
        >
          {part.value}
        </code>
      );
    }

    if (part.type === "strong") {
      return <strong key={index}>{part.value}</strong>;
    }

    if (part.type === "em") {
      return <em key={index}>{part.value}</em>;
    }

    if (part.type === "link") {
      return (
        <a
          key={index}
          href={part.href}
          className="text-amber underline underline-offset-4"
        >
          {part.label}
        </a>
      );
    }

    return <span key={index}>{part.value}</span>;
  });
}

function parseMarkdown(markdown: string) {
  const lines = markdown.split("\n");
  const blocks: Block[] = [];
  let paragraph: string[] = [];
  let listItems: string[] = [];
  let codeLines: string[] = [];
  let inCodeBlock = false;

  const flushParagraph = () => {
    if (paragraph.length > 0) {
      blocks.push({ type: "paragraph", content: paragraph.join(" ") });
      paragraph = [];
    }
  };

  const flushList = () => {
    if (listItems.length > 0) {
      blocks.push({ type: "list", items: listItems });
      listItems = [];
    }
  };

  const flushCode = () => {
    if (codeLines.length > 0) {
      blocks.push({ type: "code", content: codeLines.join("\n") });
      codeLines = [];
    }
  };

  for (const line of lines) {
    if (line.startsWith("```")) {
      flushParagraph();
      flushList();

      if (inCodeBlock) {
        flushCode();
      }

      inCodeBlock = !inCodeBlock;
      continue;
    }

    if (inCodeBlock) {
      codeLines.push(line);
      continue;
    }

    if (!line.trim()) {
      flushParagraph();
      flushList();
      continue;
    }

    if (line.startsWith("## ")) {
      flushParagraph();
      flushList();
      blocks.push({ type: "heading", level: 2, content: line.slice(3).trim() });
      continue;
    }

    if (line.startsWith("### ")) {
      flushParagraph();
      flushList();
      blocks.push({ type: "heading", level: 3, content: line.slice(4).trim() });
      continue;
    }

    if (line.startsWith("- ")) {
      flushParagraph();
      listItems.push(line.slice(2).trim());
      continue;
    }

    paragraph.push(line.trim());
  }

  flushParagraph();
  flushList();
  flushCode();

  return blocks;
}

export function MarkdownContent({ markdown }: { markdown: string }) {
  const blocks = parseMarkdown(markdown);

  return (
    <div className="space-y-6">
      {blocks.map((block, index) => {
        if (block.type === "heading") {
          if (block.level === 2) {
            return (
              <h2 key={index} className="text-2xl font-bold tracking-tight">
                {block.content}
              </h2>
            );
          }

          return (
            <h3 key={index} className="text-xl font-semibold tracking-tight">
              {block.content}
            </h3>
          );
        }

        if (block.type === "list") {
          return (
            <ul key={index} className="space-y-3 pl-5 text-muted-foreground">
              {block.items.map((item) => (
                <li key={item} className="list-disc">
                  {renderInline(item)}
                </li>
              ))}
            </ul>
          );
        }

        if (block.type === "code") {
          return (
            <pre
              key={index}
              className="overflow-x-auto rounded-2xl border border-border bg-card p-4 text-sm text-foreground"
            >
              <code>{block.content}</code>
            </pre>
          );
        }

        return (
          <p
            key={index}
            className="text-base leading-8 text-muted-foreground"
          >
            {renderInline(block.content)}
          </p>
        );
      })}
    </div>
  );
}
