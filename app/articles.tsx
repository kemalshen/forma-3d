// Статьи базы знаний: /ru|uz/knowledge/<slug>. Тексты — app/data/articles.json (Markdown).
// Порядок совпадает с массивом guides в store.tsx (карточки на /knowledge и на главной).
import React from 'react';
import articleData from './data/articles.json';

type Lang = 'ru' | 'uz';
export type Article = {slug: string; published: string; sources: {title: string; url: string}[]} & Record<Lang, {title: string; description: string; h1: string; body: string}>;

export const ARTICLES = articleData as Article[];
export const findArticle = (slug?: string) => ARTICLES.find((a) => a.slug === slug);

type LinkFn = (to: string, text: string, key: number) => React.ReactNode;

/** Inline Markdown: **bold** and [text](/ru/path). */
function inline(s: string, link: LinkFn): React.ReactNode[] {
  return s.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/).map((part, k) => {
    const b = part.match(/^\*\*([^*]+)\*\*$/);
    if (b) return <strong key={k}>{b[1]}</strong>;
    const l = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (l) return /^https?:/.test(l[2]) ? <a key={k} href={l[2]} target="_blank" rel="noopener noreferrer">{l[1]}</a> : link(l[2], l[1], k);
    return part;
  });
}

/** Block Markdown used in the articles: ## / ###, paragraphs, - and 1. lists, | tables. */
export function ArticleBody({md, link}: {md: string; link: LinkFn}) {
  const out: React.ReactNode[] = [];
  const lines = md.split('\n');
  for (let i = 0; i < lines.length; ) {
    const line = lines[i].trim();
    if (!line) { i++; continue; }
    const key = out.length;
    if (line.startsWith('### ')) { out.push(<h3 key={key}>{inline(line.slice(4), link)}</h3>); i++; continue; }
    if (line.startsWith('## ')) { out.push(<h2 key={key}>{inline(line.slice(3), link)}</h2>); i++; continue; }
    if (line.startsWith('|')) {
      const rows: string[][] = [];
      for (; i < lines.length && lines[i].trim().startsWith('|'); i++) {
        const cells = lines[i].trim().replace(/^\||\|$/g, '').split('|').map((c) => c.trim());
        if (!cells.every((c) => /^:?-+:?$/.test(c))) rows.push(cells);
      }
      const [head, ...body] = rows;
      out.push(<div key={key} className="article-table"><table><thead><tr>{head.map((c, k) => <th key={k}>{inline(c, link)}</th>)}</tr></thead><tbody>{body.map((r, n) => <tr key={n}>{r.map((c, k) => <td key={k}>{inline(c, link)}</td>)}</tr>)}</tbody></table></div>);
      continue;
    }
    const list = line.match(/^(-|\*|\d+\.)\s/);
    if (list) {
      const ordered = /\d/.test(list[1]);
      const items: string[] = [];
      for (; i < lines.length && /^\s*(-|\*|\d+\.)\s/.test(lines[i]); i++) items.push(lines[i].trim().replace(/^(-|\*|\d+\.)\s+/, ''));
      const li = items.map((t, k) => <li key={k}>{inline(t, link)}</li>);
      out.push(ordered ? <ol key={key}>{li}</ol> : <ul key={key}>{li}</ul>);
      continue;
    }
    const para: string[] = [];
    for (; i < lines.length && lines[i].trim() && !/^(#{2,3} |\||-\s|\*\s|\d+\.\s)/.test(lines[i].trim()); i++) para.push(lines[i].trim());
    out.push(<p key={key}>{inline(para.join(' '), link)}</p>);
  }
  return <div className="article-body">{out}</div>;
}
