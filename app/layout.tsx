import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL || 'https://forma-3d.uz'),
  title: 'Forma 3D — всё для вашей 3D-печати',
  description: 'Forma 3D: филамент Bambu Lab, расходники и запчасти для 3D-печати в Ташкенте и по Узбекистану.',
  // PNG/ICO нужны Google для значка в выдаче (кратно 48 px); SVG — для браузеров.
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48' },
      { url: '/icon-48.png', sizes: '48x48', type: 'image/png' },
      { url: '/icon-96.png', sizes: '96x96', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon.ico',
    apple: { url: '/apple-touch-icon.png', sizes: '180x180' },
  },
};
export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return <html lang="ru"><body>{children}</body></html>;
}
