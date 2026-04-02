# NeoCalendar Playground

Interactive Next.js playground for testing and exploring the NeoCalendar library.

## 📍 Location

This app is part of the `@iterumarchive/calendar-monorepo` workspace, located in `apps/playground/`.

## 🚀 Getting Started

### From the monorepo root:

```bash
# Install all dependencies (if you haven't already)
yarn install

# Build the packages
yarn build

# Start the playground dev server
yarn dev:playground
```

### Or directly in the playground directory:

```bash
cd apps/playground
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## 📦 Package Imports

This app uses Yarn workspace protocol to import packages directly from the monorepo:

```typescript
import { NeoCalendar } from '@iterumarchive/neo-calendar-full';
```

Changes to packages will automatically reflect in the playground after rebuilding.

## 🏗️ Building

```bash
# From root
yarn workspace @iterumarchive/playground build

# Or in apps/playground
yarn build
```

## 🎯 Features

- **Today**: View current date across all 12 calendar systems
- **Inspector**: Convert between JDN and calendar dates
- **Arithmetic**: Test date calculations and operations
- **Dashboard**: Quick reference for calendar systems

## 🔗 Workspace Configuration

The playground is configured to:
- Import packages using `workspace:*` protocol
- Transpile `@iterumarchive/neo-calendar-full` with Next.js
- Support fast refresh during development

See [next.config.ts](next.config.ts) for configuration details.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
