import type {MetadataRoute} from 'next';
import {products} from './catalog';
import {LANGS, SITEMAP_PAGES, SITE_URL} from './seo';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const entry = (rest: string, priority: number): MetadataRoute.Sitemap =>
    LANGS.map((lang) => ({
      url: `${SITE_URL}/${lang}${rest ? '/' + rest : ''}`,
      priority,
      alternates: {languages: {ru: `${SITE_URL}/ru${rest ? '/' + rest : ''}`, uz: `${SITE_URL}/uz${rest ? '/' + rest : ''}`, 'x-default': `${SITE_URL}/ru${rest ? '/' + rest : ''}`}},
    }));
  return [
    ...SITEMAP_PAGES.flatMap((p) => entry(p, p === '' ? 1 : p.startsWith('catalog') ? 0.9 : 0.5)),
    ...products.flatMap((p) => entry(`product/${p.id}`, 0.8)),
  ];
}
