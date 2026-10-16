import { spawn } from 'node:child_process';
import { cpSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const standalone = fileURLToPath(new URL('../.next/standalone/', import.meta.url));
const server = fileURLToPath(new URL('../.next/standalone/server.js', import.meta.url));
const port = process.env.PORT || '3000';

if (!existsSync(server)) {
  console.error('Production build is missing. Run pnpm build first.');
  process.exit(1);
}
cpSync(`${root}/public`, `${standalone}/public`, { recursive: true });
cpSync(`${root}/.next/static`, `${standalone}/.next/static`, { recursive: true });

const child = spawn(process.execPath, [server], {
  cwd: standalone,
  stdio: 'inherit',
  env: { ...process.env, PORT: port, HOSTNAME: '0.0.0.0', NODE_ENV: 'production' },
});

for (const signal of ['SIGINT', 'SIGTERM']) {
  process.on(signal, () => child.kill(signal));
}
child.on('error', (error) => {
  console.error(error);
  process.exit(1);
});
child.on('exit', (code, signal) => {
  process.exit(code ?? (signal ? 1 : 0));
});
