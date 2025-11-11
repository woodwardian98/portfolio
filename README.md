# Visible Venus Security - Monorepo

A streamlined monorepo for cybersecurity analysis and research platform built with Astro, TypeScript, and Tailwind CSS.

## 🏗️ Monorepo Structure

```
/vercel/sandbox/
├── packages/
│   ├── web/                    # Main Astro application
│   │   ├── src/               # Application source code
│   │   ├── public/            # Static assets
│   │   ├── astro.config.mjs   # Astro configuration
│   │   ├── tailwind.config.js # Tailwind configuration
│   │   └── package.json       # Web app dependencies
│   │
│   ├── ui/                     # Shared UI components (future)
│   │   ├── src/
│   │   │   ├── components/    # Reusable Astro/Preact components
│   │   │   └── index.ts       # Component exports
│   │   └── package.json
│   │
│   ├── utils/                  # Shared utilities and constants
│   │   ├── src/
│   │   │   ├── constants.ts   # Site constants and configuration
│   │   │   └── index.ts       # Utility exports
│   │   └── package.json
│   │
│   └── config/                 # Shared configurations
│       ├── tailwind/          # Base Tailwind config
│       │   ├── base.config.js
│       │   └── package.json
│       └── typescript/        # Base TypeScript config
│           ├── base.json
│           └── package.json
│
├── package.json               # Root workspace configuration
├── tsconfig.json              # Root TypeScript project references
└── README.md                  # This file
```

## 📦 Packages

### @workspace/web
Main Astro application containing the website, blog, and all pages.

**Key Features:**
- Astro 5.14.4 with SSG
- DaisyUI + Tailwind CSS for styling
- MDX support for blog posts
- RSS feed generation
- Sitemap generation

### @workspace/utils
Shared utilities, constants, and configuration used across packages.

**Exports:**
- `SITE_TITLE`, `SITE_DESCRIPTION`, `SITE_AUTHOR`
- `MAIN_NAV` - Navigation configuration
- `SOCIAL_LINKS` - Social media links
- `BREADCRUMB_MAP` - Breadcrumb configuration

### @workspace/ui
Shared UI components (infrastructure ready, components to be migrated as needed).

### @workspace/config-tailwind
Base Tailwind CSS configuration that can be extended by other packages.

### @workspace/config-typescript
Base TypeScript configuration with common compiler options.

## 🚀 Getting Started

### Installation

```bash
# Install all dependencies across all packages
npm install
```

### Development

```bash
# Start the web application dev server
npm run dev

# Or explicitly run the web package
npm run dev:web
```

The dev server will start at `http://localhost:4321`

### Building

```bash
# Build all packages
npm run build

# Build only the web package
npm run build:web
```

### Type Checking

```bash
# Type check all packages
npm run type-check
```

### Cleaning

```bash
# Remove all build artifacts and node_modules
npm run clean
```

## 🔧 Workspace Configuration

This monorepo uses **npm workspaces** (native to npm 7+) for package management.

### Adding Dependencies

```bash
# Add to root (shared dev dependencies)
npm install -D <package> -w root

# Add to specific package
npm install <package> -w @workspace/web
npm install <package> -w @workspace/utils
```

### Cross-Package Dependencies

Packages reference each other using the `workspace:*` protocol:

```json
{
  "dependencies": {
    "@workspace/utils": "workspace:*"
  }
}
```

### Importing from Workspace Packages

```typescript
// Import from utils package
import { SITE_TITLE, MAIN_NAV } from '@workspace/utils';

// Import from UI package (when components are added)
import { Button } from '@workspace/ui';
```

## 📝 Package Naming Convention

- `@workspace/web` - Main application
- `@workspace/ui` - UI components
- `@workspace/utils` - Utilities and constants
- `@workspace/config-*` - Configuration packages

## 🎯 Benefits of This Structure

1. **Scalability**: Easy to add new packages (API, mobile app, admin panel)
2. **Code Reuse**: Share components, utilities, and configs across packages
3. **Type Safety**: Full TypeScript support with proper module resolution
4. **Independent Deployment**: Each package can be built/deployed separately
5. **Clear Boundaries**: Logical separation of concerns
6. **Zero Overhead**: Uses native npm workspaces (no additional tools required)

## 🔮 Future Expansion

This monorepo is designed to easily accommodate:

- **@workspace/api** - Backend API server (Node.js/Express or Python/FastAPI)
- **@workspace/mobile** - Mobile application (React Native/Flutter)
- **@workspace/admin** - Admin dashboard
- **@workspace/cli** - Command-line tools
- **@workspace/shared-types** - Shared TypeScript types
- **@workspace/testing** - Shared test utilities

## 📚 Technology Stack

- **Framework**: Astro 5.14.4
- **UI Library**: Preact 10.27.2
- **Styling**: Tailwind CSS 3.4.18 + DaisyUI 5.3.0
- **Language**: TypeScript 5.9.3
- **Content**: MDX for blog posts
- **Package Manager**: npm with workspaces
- **Build Tool**: Astro (Vite under the hood)

## 🤝 Contributing

When adding new features:

1. Determine if code should be shared (utils/ui) or app-specific (web)
2. Update package.json dependencies appropriately
3. Use workspace imports (`@workspace/*`) for cross-package references
4. Run `npm run type-check` before committing
5. Ensure `npm run build` succeeds

## 📄 License

Copyright © 2025 Ian Woodward

---

**Built with ❤️ using Astro and TypeScript**
