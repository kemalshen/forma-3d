import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
  title: 'Forma 3D — всё для вашей 3D-печати',
  description: 'Forma 3D: филамент Bambu Lab, расходники и запчасти для 3D-печати в Ташкенте и по Узбекистану. Демонстрационная версия магазина.',
  icons: { icon: '/favicon.svg', shortcut: '/favicon.svg' },
};
export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return <html lang="ru"><body>{children}</body></html>;
}
