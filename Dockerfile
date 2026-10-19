# Forma 3D deployment v3
FROM node:22-bookworm-slim AS base
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

FROM base AS source
ADD forma-3d-source.tar.gz /app/
RUN test -s /app/app/page.tsx && test -s /app/app/layout.tsx

FROM base AS dependencies
RUN npm install --global pnpm@11.25.0
COPY --from=source /app/package.json /app/pnpm-lock.yaml /app/pnpm-workspace.yaml /app/
RUN pnpm install --frozen-lockfile

FROM base AS build
WORKDIR /app
COPY --from=dependencies /app/node_modules /app/node_modules
COPY --from=source /app/ /app/
RUN echo "FORMA_3D_BUILD_V3" \
    && pwd \
    && ls -la /app/app \
    && test -s /app/app/page.tsx \
    && node /app/node_modules/next/dist/bin/next build /app --webpack

FROM base AS runtime
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
COPY --from=build --chown=node:node /app/.next/standalone /app/
COPY --from=build --chown=node:node /app/.next/static /app/.next/static
COPY --from=build --chown=node:node /app/public /app/public
USER node
EXPOSE 3000
CMD ["node", "server.js"]
