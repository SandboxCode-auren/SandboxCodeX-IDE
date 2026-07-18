"use client";

import { type ReactElement, useEffect, useMemo, useState } from "react";

import { docs, sidebarGroups, type DocSection } from "@/lib/docs/content";

type Heading = { id: string; level: 2 | 3; text: string };

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function getHeadings(markdown: string): Heading[] {
  return markdown
    .split("\n")
    .filter((line) => line.startsWith("## ") || line.startsWith("### "))
    .map((line) => {
      const level = line.startsWith("### ") ? 3 : 2;
      const text = line.replace(/^###?\s/, "");
      return { id: slugify(text), level, text };
    });
}

function InlineCode({ text }: { text: string }) {
  const parts = text.split(/(`[^`]+`)/g);
  return (
    <>
      {parts.map((part, index) =>
        part.startsWith("`") && part.endsWith("`") ? (
          <code key={index}>{part.slice(1, -1)}</code>
        ) : (
          <span key={index}>{part}</span>
        ),
      )}
    </>
  );
}

function highlightCode(language: string, code: string) {
  const keywordPattern = /\b(export|function|return|const|let|type|import|from)\b/g;

  return code.split("\n").map((line, lineIndex) => {
    if (language === "bash" && line.trim().startsWith("#")) {
      return <span className="token-comment" key={lineIndex}>{line}{lineIndex < code.split("\n").length - 1 ? "\n" : ""}</span>;
    }

    const parts = line.split(keywordPattern);
    return (
      <span key={lineIndex}>
        {parts.map((part, index) => keywordPattern.test(part) ? <span className="token-keyword" key={index}>{part}</span> : <span key={index}>{part}</span>)}
        {lineIndex < code.split("\n").length - 1 ? "\n" : ""}
      </span>
    );
  });
}

function CodeBlock({ language, code }: { language: string; code: string }) {
  const [copied, setCopied] = useState(false);

  async function copyCode() {
    await navigator.clipboard.writeText(code.trimEnd());
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  }

  return (
    <div className="docs-code-shell">
      <div className="docs-code-bar">
        <span>{language || "text"}</span>
        <button onClick={copyCode}>{copied ? "Copied" : "Copy"}</button>
      </div>
      <pre>
        <code className={`language-${language || "text"}`}>{highlightCode(language, code.trimEnd())}</code>
      </pre>
    </div>
  );
}

function MarkdownView({ markdown }: { markdown: string }) {
  const blocks: ReactElement[] = [];
  const lines = markdown.split("\n");
  let paragraph: string[] = [];
  let list: string[] = [];
  let code: string[] = [];
  let codeLanguage = "";
  let inCode = false;

  function flushParagraph(key: string) {
    if (paragraph.length) {
      blocks.push(
        <p key={key}>
          <InlineCode text={paragraph.join(" ")} />
        </p>,
      );
      paragraph = [];
    }
  }

  function flushList(key: string) {
    if (list.length) {
      blocks.push(
        <ul key={key}>
          {list.map((item, index) => (
            <li key={index}>
              <InlineCode text={item} />
            </li>
          ))}
        </ul>,
      );
      list = [];
    }
  }

  lines.forEach((line, index) => {
    if (line.startsWith("```")) {
      if (inCode) {
        blocks.push(<CodeBlock key={`code-${index}`} language={codeLanguage} code={code.join("\n")} />);
        code = [];
        codeLanguage = "";
        inCode = false;
      } else {
        flushParagraph(`p-${index}`);
        flushList(`ul-${index}`);
        codeLanguage = line.replace("```", "").trim();
        inCode = true;
      }
      return;
    }

    if (inCode) {
      code.push(line);
      return;
    }

    if (!line.trim()) {
      flushParagraph(`p-${index}`);
      flushList(`ul-${index}`);
      return;
    }

    if (line.startsWith("# ")) {
      flushParagraph(`p-${index}`);
      flushList(`ul-${index}`);
      blocks.push(<h1 key={index}>{line.replace("# ", "")}</h1>);
      return;
    }

    if (line.startsWith("## ")) {
      flushParagraph(`p-${index}`);
      flushList(`ul-${index}`);
      const text = line.replace("## ", "");
      blocks.push(<h2 id={slugify(text)} key={index}>{text}</h2>);
      return;
    }

    if (line.startsWith("### ")) {
      flushParagraph(`p-${index}`);
      flushList(`ul-${index}`);
      const text = line.replace("### ", "");
      blocks.push(<h3 id={slugify(text)} key={index}>{text}</h3>);
      return;
    }

    if (line.startsWith("- ")) {
      flushParagraph(`p-${index}`);
      list.push(line.replace("- ", ""));
      return;
    }

    paragraph.push(line);
  });

  flushParagraph("p-final");
  flushList("ul-final");

  return <article className="docs-prose">{blocks}</article>;
}

export default function DocsExperience() {
  const [activeId, setActiveId] = useState(docs[0].id);
  const [query, setQuery] = useState("");
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [activeHeading, setActiveHeading] = useState("");
  const activeDoc = docs.find((doc) => doc.id === activeId) ?? docs[0];
  const headings = useMemo(() => getHeadings(activeDoc.markdown), [activeDoc]);
  const filteredDocs = docs.filter((doc) => `${doc.title} ${doc.category} ${doc.excerpt} ${doc.markdown}`.toLowerCase().includes(query.toLowerCase()));

  useEffect(() => {
    const onScroll = () => {
      const visible = headings.filter((heading) => {
        const element = document.getElementById(heading.id);
        return element ? element.getBoundingClientRect().top <= 140 : false;
      });
      const current = visible[visible.length - 1];
      setActiveHeading(current?.id ?? headings[0]?.id ?? "");
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [headings]);

  async function copyMarkdown() {
    await navigator.clipboard.writeText(activeDoc.markdown);
  }

  return (
    <div className="docs-shell">
      <header className="docs-topbar">
        <button className="docs-logo" onClick={() => setActiveId(docs[0].id)}>
          <span className="docs-logo-mark">SX</span>
          <span>SandboxCodeX Docs</span>
        </button>
        <label className="docs-search">
          <span>⌘</span>
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Tìm kiếm tài liệu..." />
          <kbd>K</kbd>
        </label>
        <nav className="docs-actions" aria-label="Liên kết nhanh">
          <button>VI</button>
          <a href="https://github.com" target="_blank">GitHub</a>
          <a href="https://discord.com" target="_blank">Discord</a>
        </nav>
      </header>

      <div className="docs-layout">
        <aside className="docs-sidebar">
          {sidebarGroups.map((group) => (
            <section key={group.title}>
              <h2>{group.title}</h2>
              {group.items.map((id) => {
                const doc = docs.find((item) => item.id === id) as DocSection;
                return <button className={activeId === id ? "active" : ""} key={id} onClick={() => setActiveId(id)}>{doc.title}</button>;
              })}
            </section>
          ))}
        </aside>

        <main className="docs-main">
          {query && (
            <div className="docs-results">
              <strong>{filteredDocs.length} kết quả</strong>
              <div>
                {filteredDocs.slice(0, 5).map((doc) => <button key={doc.id} onClick={() => setActiveId(doc.id)}>{doc.title}</button>)}
              </div>
            </div>
          )}
          <div className="docs-page-tools">
            <span>{activeDoc.category}</span>
            <button onClick={copyMarkdown}>Copy page as Markdown for LLMs</button>
            <a download={`${activeDoc.id}.md`} href={`data:text/markdown;charset=utf-8,${encodeURIComponent(activeDoc.markdown)}`}>View as Markdown</a>
          </div>
          <MarkdownView markdown={activeDoc.markdown} />
        </main>

        <aside className="docs-toc">
          <h2>Trên trang này</h2>
          {headings.map((heading) => <a className={`${heading.level === 3 ? "nested" : ""} ${activeHeading === heading.id ? "active" : ""}`} key={heading.id} href={`#${heading.id}`}>{heading.text}</a>)}
        </aside>
      </div>

      <div className={`docs-ai ${assistantOpen ? "open" : ""}`}>
        {assistantOpen && <div className="docs-ai-panel"><strong>Ask Sandbox AI</strong><p>Hỏi nhanh về nội dung tài liệu, CLI hoặc workflow. Kết nối API AI thật có thể được thêm ở bước tiếp theo.</p><input placeholder="Ví dụ: Cách chạy build production?" /></div>}
        <button onClick={() => setAssistantOpen(!assistantOpen)}>✦ AI trợ giúp</button>
      </div>
    </div>
  );
}
