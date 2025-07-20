# Variables
CONTAINER_NAME = portfolio:latest

# Default target
default: setup

# ------------------------------
# 📦 Docker Image Management
# ------------------------------

# Build Docker image
docker-build:
	@echo "🚀 Building Docker image: $(CONTAINER_NAME) ..."
	docker build -t $(CONTAINER_NAME) .
	@echo "✅ Docker build completed!"

# Push Docker image to registry
docker-image-push:
	@echo "📤 Pushing Docker image: $(CONTAINER_NAME) ..."
	docker push $(CONTAINER_NAME)
	@echo "✅ Docker image pushed successfully!"

# ------------------------------
# 🚀 Project Setup & Development
# ------------------------------

# Install dependencies
install:
	@echo "📦 Installing dependencies..."
	bun install
	@echo "✅ Dependencies installed!"

# Format code using Bun
format:
	@echo "📝 Formatting code..."
	bun run format
	@echo "✅ Code formatted successfully!"

# Lint the project
lint:
	@echo "🔍 Running linter..."
	bun run lint
	@echo "✅ Linting completed!"

# Build the project
build:
	@echo "🔨 Building the project..."
	bun run build
	@echo "✅ Build completed!"

# Run the project in development mode
dev:
	@echo "🚀 Running the project in development mode..."
	bun run dev

# Run the tests
test:
	@echo "🧪 Running tests..."
	bun run test
	@echo "✅ Tests completed!"

# Watch for changes and run tests
test-watch:
	@echo "👀 Watching for changes and running tests..."
	bun run test:watch
	@echo "✅ Watching for changes and tests running!"

# Generate test coverage report
coverage:
	@echo "📊 Generating test coverage report..."
	bun run test:coverage
	@echo "✅ Coverage report generated!"

# Start the project in production mode
start:
	@echo "🚀 Starting the project..."
	bun run start

# Build and start in production
production: build start
	@echo "🚀 Running in production mode..."
	@echo "✅ Portfolio is live!"

# ------------------------------
# 🐳 Docker Compose Commands
# ------------------------------

# Setup for bun environment
setup: install format lint test build start

# for docker environment
docker: compose-build compose-run

# Start all services using Docker Compose
compose-run:
	@echo "🚀 Starting all services with Docker Compose..."
	docker compose up -d
	@echo "✅ All services are up and running!"

# Build and start services using Docker Compose
compose-build:
	@echo "🔨 Building and starting services with Docker Compose..."
	docker compose build
	@echo "✅ Services built and started!"

# Stop all services using Docker Compose
compose-stop:
	@echo "🛑 Stopping all services..."
	docker compose down -v
	@echo "✅ Services stopped!"

# Stop all services and remove containers
compose-down:
	@echo "🛑 Bringing down all services and removing containers..."
	docker compose down
	@echo "✅ Services and containers removed!"

# ------------------------------
# 🧹 Cleanup
# ------------------------------

# Remove unused Docker data
clean:
	@echo "🧹 Cleaning up Docker system..."
	docker system prune -f
	@echo "✅ Cleanup complete!"

# ------------------------------
# ✅ Mark targets as phony
# ------------------------------
.PHONY: default docker setup docker-build docker-image-push install format lint build dev start production \
		test test-watch coverage compose-run compose-build compose-stop compose-down clean
