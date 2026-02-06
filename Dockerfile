# Use the official Node.js version 18 base image
FROM node:18-alpine AS base

# Install dependencies using yarn
FROM base AS deps
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn --frozen-lockfile

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build the Next.js project
RUN yarn run build

# Production image, copy all the necessary files
FROM base AS runner
WORKDIR /app

# ENV NODE_ENV production

# Create a non-root user and set permissions
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy the build output from the builder stage
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

USER nextjs

EXPOSE 3000

ENV PORT 3000

# Start the Next.js application
CMD ["yarn", "--cwd", "run", "start"]
