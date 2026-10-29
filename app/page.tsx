import {permanentRedirect} from 'next/navigation';
// The store lives under /ru and /uz; the bare domain opens the Russian version.
export default function Home() {
  permanentRedirect('/ru');
}
