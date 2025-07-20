# Use Bun official image
FROM oven/bun:alpine AS builder

# Initialize a working directory
WORKDIR /home/portfolio

# Copy package.json and bun.lock to the working directory
COPY package.json ./
COPY bun.lock ./

# Install dependencies
RUN bun install

# Copy project files
COPY . .

# Run format and lint
RUN bun run format
RUN bun run lint

# Build the Next.js app
RUN bun run build

# Production image
FROM oven/bun:alpine AS runner

WORKDIR /app

# Copy build output and necessary files from builder
COPY --from=builder /home/portfolio/.next ./.next
COPY --from=builder /home/portfolio/node_modules ./node_modules
COPY --from=builder /home/portfolio/package.json .
COPY --from=builder /home/portfolio/bun.lock .

# Expose ports
EXPOSE 3000

# Start the app
CMD ["bun", "start"]
