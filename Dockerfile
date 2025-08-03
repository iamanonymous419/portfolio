# ----------------------------
# 🏗️  Stage 1: Build stage
# ----------------------------
FROM oven/bun:alpine AS builder

WORKDIR /home/portfolio

# Copy package files and install all dependencies (dev + prod)
COPY bun.lock package.json ./
RUN bun install

# Copy all source files
COPY . .

# Run format and lint
RUN bun run format
RUN bun run lint

# Build the Next.js app
RUN bun run build


# ----------------------------
# 🧹 Stage 2: Prune stage (production deps only)
# ----------------------------
FROM oven/bun:alpine AS prune

WORKDIR /home/portfolio

# Copy only package files
COPY package.json bun.lock ./

# Install only production dependencies
RUN bun install --production


# ----------------------------
# 🚀 Stage 3: Final runner stage
# ----------------------------
FROM oven/bun:alpine AS runner

WORKDIR /app

# Copy production node_modules from prune stage
COPY --from=prune /home/portfolio/node_modules ./node_modules

# Copy only what's needed to run the app
COPY --from=builder /home/portfolio/.next ./.next
COPY --from=builder /home/portfolio/package.json .
COPY --from=builder /home/portfolio/bun.lock .

# Expose port
EXPOSE 3000

# Start the app
CMD ["bun", "start"]
