# Overview

This is a full-stack web application built with React, Express, and TypeScript featuring a cybersecurity-themed portfolio/landing page. The application uses a monorepo structure with separate client and server directories, implements modern UI components with shadcn/ui, and includes database integration with Drizzle ORM configured for PostgreSQL. The frontend showcases an interactive terminal-style interface with Matrix-style animations and typewriter effects, creating an immersive cybersecurity aesthetic.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **React SPA**: Single-page application built with React 18 and TypeScript
- **Routing**: Client-side routing using Wouter for lightweight navigation
- **State Management**: React Query (TanStack Query) for server state management and data fetching
- **UI Framework**: shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with custom cybersecurity theme (matrix green, cyber blue colors)
- **Build Tool**: Vite for fast development and optimized production builds

## Backend Architecture
- **Express Server**: Node.js Express server with TypeScript
- **API Structure**: RESTful API with routes prefixed under `/api`
- **Storage Layer**: Abstracted storage interface with in-memory implementation (MemStorage)
- **Error Handling**: Centralized error handling middleware
- **Request Logging**: Custom middleware for API request/response logging

## Database Layer
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema**: Defined in shared directory for type safety across client/server
- **Migrations**: Drizzle Kit for database schema migrations
- **Connection**: Neon Database serverless PostgreSQL connection

## Development Setup
- **Monorepo Structure**: Shared types and schemas between client and server
- **Hot Reload**: Vite dev server with HMR for frontend development
- **TypeScript**: Strict TypeScript configuration with path aliases
- **Development Tools**: TSX for server development, Replit integration plugins

## UI/UX Design Patterns
- **Terminal Interface**: Interactive command-line interface simulation
- **Matrix Theme**: cybersecurity aesthetic with falling code animations
- **Typewriter Effects**: Progressive text reveal animations
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints
- **Component Composition**: Reusable UI components with consistent styling

## Code Organization
- **Shared Directory**: Common types, schemas, and utilities
- **Client Directory**: React application with components, pages, hooks
- **Server Directory**: Express server with routes, storage, and middleware
- **Component Structure**: Atomic design with UI components, custom components, and page-level components

# External Dependencies

## Database
- **Neon Database**: Serverless PostgreSQL database service
- **Connection**: Environment variable `DATABASE_URL` required for database connectivity

## Frontend Libraries
- **React Query**: Server state management and caching
- **Radix UI**: Headless UI component primitives for accessibility
- **Lucide React**: Icon library for consistent iconography
- **Wouter**: Lightweight client-side routing
- **React Hook Form**: Form state management with validation

## Backend Libraries
- **Express**: Web framework for Node.js
- **Drizzle ORM**: Type-safe SQL ORM for database operations
- **connect-pg-simple**: PostgreSQL session store for Express sessions

## Development Tools
- **Vite**: Build tool and development server
- **TypeScript**: Static type checking
- **Tailwind CSS**: Utility-first CSS framework
- **PostCSS**: CSS processing with Autoprefixer

## Build and Deployment
- **esbuild**: Fast JavaScript bundler for server-side code
- **Replit Integration**: Runtime error overlay and cartographer plugins for development