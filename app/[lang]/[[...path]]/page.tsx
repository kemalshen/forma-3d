import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import Store from '../../store';
import {readContacts} from '../../contacts';
import {LANGS, breadcrumbJsonLd, buildMetadata, findProduct, isValidPath, organizationJsonLd, productJsonLd, type Lang} from '../../seo';

type Props = {params: Promise<{lang: string; path?: string[]}>; searchParams: Promise<Record<string, string | string[] | undefined>>};

const valid = (lang: string, path: string[]) => (LANGS as readonly string[]).includes(lang) && isValidPath(path);
const pageNumber = (path: string[], raw: unknown) => {
  const n = Number(Array.isArray(raw) ? raw[0] : raw);
  return path[0] === 'catalog' && Number.isInteger(n) && n > 1 && n < 100 ? n : 1;
};
const ld = (data: unknown) => JSON.stringify(data).replace(/</g, '\\u003c');

export async function generateMetadata({params, searchParams}: Props): Promise<Metadata> {
  const {lang, path = []} = await params;
  if (!valid(lang, path)) return {title: 'Страница не найдена | Forma 3D', robots: {index: false}};
  return buildMetadata(lang as Lang, path, pageNumber(path, (await searchParams).page));
}

export default async function Page({params, searchParams}: Props) {
  const {lang, path = []} = await params;
  if (!valid(lang, path)) notFound();
  const l = lang as Lang;
  const catalogPage = pageNumber(path, (await searchParams).page);
  const contacts = readContacts();
  const product = path[0] === 'product' ? findProduct(path[1]) : undefined;
  const blocks: unknown[] = [];
  if (product) blocks.push(productJsonLd(product, l));
  const crumbs = breadcrumbJsonLd(l, path, catalogPage);
  if (crumbs) blocks.push(crumbs);
  if (path.length === 0) blocks.push(organizationJsonLd(l, 'home', contacts));
  if (path[0] === 'contacts') blocks.push(organizationJsonLd(l, 'contacts', contacts));
  return (
    <>
      {blocks.map((b, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html: ld(b)}} />
      ))}
      <Store initialPath={`/${lang}/${path.join('/')}`} initialCatalogPage={catalogPage} contacts={contacts} />
    </>
  );
}
