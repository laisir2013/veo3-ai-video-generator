FROM node:18-alpine AS base
RUN npm install -g pnpm
WORKDIR /app
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm build

FROM node:18-alpine AS production
RUN npm install -g pnpm
WORKDIR /app
COPY --from=base /app/package.json /app/pnpm-lock.yaml* ./
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/dist ./dist
COPY --from=base /app/server ./server
COPY --from=base /app/drizzle ./drizzle
ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000
CMD ["pnpm", "start"]
