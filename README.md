# Portfolio Website

A modern, responsive portfolio website built with Next.js and Bun, featuring a sleek design and smooth user experience. This project showcases my work, skills, and professional journey in an engaging and interactive format.

## 🚀 Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) - React framework for production
- **Runtime**: [Bun](https://bun.sh/) - Fast all-in-one JavaScript runtime
- **Testing**: [Jest](https://jestjs.io/) – Unit & integration testing powered by [Node.js](https://nodejs.org/)
- **Development**: Vibe coding approach with [v0](https://v0.dev/) AI assistance
- **Styling**: Modern CSS/Tailwind CSS (depending on implementation)
- **Deployment**: Optimized for modern hosting platforms

## ✨ Features

- **Responsive Design**: Fully responsive across all devices
- **Modern UI/UX**: Clean, professional interface with smooth animations
- **Fast Performance**: Optimized with Next.js and Bun for lightning-fast loading
- **SEO Optimized**: Built-in SEO best practices
- **Interactive Elements**: Engaging user interactions and smooth transitions
- **Project Showcase**: Dedicated sections for highlighting work and skills
- **Contact Integration**: Easy-to-use contact forms and social links

## 📋 Prerequisites

### For Bun Environment:

- [Bun](https://bun.sh/) installed on your system
- [Node.js](https://nodejs.org/) installed — required for running Jest tests (Bun does **not** fully support Jest)
  → Download from [https://nodejs.org](https://nodejs.org) or install via your system’s package manager (e.g., `apt`, `brew`, etc.)

### For Docker Environment:

- [Docker](https://www.docker.com/) installed and running
- ✅ **Install the newer Docker Compose v2 CLI** — used via `docker compose` (with a space)
  🔗 Follow the official guide: [Install Docker Compose (v2)](https://docs.docker.com/compose/install/)
  ❌ **Do not use** the older `docker-compose` (with a hyphen), which is now deprecated

## 🛠️ Quick Setup

This project supports two setup methods depending on your environment preference.

### Method 1: Bun Environment (Recommended)

If you have Bun installed on your system:

```bash
# Clone the repository
git clone https://github.com/iamanonymous419/portfolio.git portfolio
cd portfolio

# Setup and run (single command)
make
```

### Method 2: Docker Environment

If you prefer using Docker:

```bash
# Clone the repository
git clone https://github.com/iamanonymous419/portfolio.git portfolio
cd portfolio

# Setup and run with Docker
make docker
```

## 🚦 Getting Started

1. **Clone the repository**

   ```bash
    git clone https://github.com/iamanonymous419/portfolio.git portfolio
    cd portfolio
   ```

2. **Choose your setup method**
   - For Bun: Run `make`
   - For Docker: Run `make docker`

3. **Access the application**
   - Open your browser and navigate to `http://localhost:3000`
   - The development server will automatically reload when you make changes

## 📁 Project Structure

```
portfolio/
|── __tests__/          # Test files and test utilities
|── .github/            # GitHub workflows and configuration
├── components/         # Reusable React components
├── hooks/              # Custom React hooks
├── app/                # Next.js pages and API routes
├── public/             # Static assets (images, icons, etc.)
├── lib/                # Utility functions and configurations
├── Makefile            # Build and setup automation
├── Dockerfile          # Docker configuration
├── package.json        # Project dependencies and scripts
├── next.config.js      # Next.js configuration
└── README.md           # Project documentation
```

## 🔧 Available Scripts

The project uses a Makefile for easy command execution:

- `make` - Setup and start development server (Bun environment)
- `make docker` - Setup and start with Docker
- `make build` - Build the project for production
- `make start` - Start the production server
- `make clean` - Clean build artifacts and dependencies
- `make test` - To run the test's

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

> [!NOTE]
> This README serves as both documentation and inspiration. Feel free to adapt it for your own projects!
