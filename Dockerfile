FROM node:14-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
RUN apk add git
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

FROM node:14-alpine AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN yarn build

FROM node:14-alpine AS runner

ENV NODE_ENV production

WORKDIR /app

COPY --from=builder /app/.env.production ./.env.production
COPY --from=builder /app/build ./build
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/next.config.js ./next.config.js
COPY --from=builder /app/next-i18next.config.js ./next-i18next.config.js
COPY --from=builder /app/package.json ./package.json

ENV NEXT_TELEMETRY_DISABLED 1

CMD ["yarn", "start"]
