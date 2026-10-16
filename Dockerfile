# Upload this file and forma-3d-source.tar.gz to the repository root.
# Keep forma-3d-source.tar.gz compressed. Docker extracts it during the build.
FROM node:22-bookworm-slim AS base
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

FROM base AS source
ADD forma-3d-source.tar.gz /app/
RUN test -f app/page.tsx && test -f app/layout.tsx && test -d public/images

FROM base AS dependencies
RUN npm install --global pnpm@11.25.0
COPY --from=source /app/package.json /app/pnpm-lock.yaml /app/pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

FROM base AS build
COPY --from=dependencies /app/node_modules ./node_modules
COPY --from=source /app/ ./
RUN node node_modules/next/dist/bin/next build --webpack

FROM base AS runtime
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
COPY --from=build --chown=node:node /app/.next/standalone ./
COPY --from=build --chown=node:node /app/.next/static ./.next/static
COPY --from=build --chown=node:node /app/public ./public
USER node
EXPOSE 3000
CMD ["node", "server.js"]
