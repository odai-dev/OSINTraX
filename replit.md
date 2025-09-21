# OSINTraX - OSINT Intelligence Platform

## Overview

OSINTraX is an advanced OSINT (Open Source Intelligence) platform designed for cybersecurity analysts and intelligence agencies. The application provides comprehensive intelligence gathering and analysis capabilities with a professional dark-tech aesthetic inspired by military command centers. It features multiple analysis modules including profile finding, geolocation mapping, digital footprint analysis, and an advanced "DataHawk" military intelligence module. The platform simulates real-time data processing with mock scanning capabilities, network analysis visualizations, and live terminal output for demonstration purposes.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The application uses a React-based single-page application (SPA) architecture with TypeScript. The UI is built using shadcn/ui components with Radix UI primitives, providing a consistent and accessible component library. The design system implements a custom dark-tech theme with cyan accent colors and military-inspired styling using Tailwind CSS. React Query handles state management and data fetching, while Wouter provides lightweight client-side routing.

### Component Structure
The main application is structured around modular OSINT components:
- **OSINTSidebar**: Navigation between different intelligence modules
- **ScanInterface**: Central search and scanning functionality
- **DataCards**: Display of personal intelligence data
- **MapComponent**: Geolocation visualization
- **NetworkGraph**: Relationship and connection analysis
- **DataHawkModule**: Military-grade intelligence features
- **LiveTerminal**: Real-time command output simulation
- **ChartsSection**: Data visualization and analytics

### Styling and Theming
The application uses a sophisticated theming system built on CSS custom properties and Tailwind CSS. The design implements a dark mode by default with a cybersecurity-focused color palette featuring deep navy backgrounds, cyan accents, and professional typography using Inter and JetBrains Mono fonts. The component library supports both light and dark themes with comprehensive color token management.

### State Management
Real-time data simulation is handled through a custom React Context (`RealTimeDataContext`) that provides:
- Live connection counts and scan statistics
- Simulated terminal output with realistic OSINT commands
- Mock data updates for threat levels and network activity
- Time-based data generation for demonstration purposes

### Build System
The project uses Vite as the build tool with TypeScript support and React Fast Refresh for development. The configuration includes path aliases for clean imports and supports both development and production builds. ESBuild handles server-side bundling for the Express backend.

### Backend Architecture
The server runs on Express.js with a minimal API structure. Currently implements:
- Basic routing setup with placeholder for OSINT endpoints
- Memory-based storage interface for user management
- Session handling preparation for authentication
- Middleware for request logging and error handling

The storage layer uses an in-memory implementation but provides an interface that can be extended for database integration.

## External Dependencies

### UI and Styling
- **Radix UI**: Comprehensive set of accessible UI primitives for complex components like dialogs, dropdowns, and navigation
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development and consistent theming
- **class-variance-authority**: Type-safe variant management for component styling
- **Lucide React**: Modern icon library providing consistent iconography

### Data Visualization
- **Recharts**: React charting library for creating responsive data visualizations including bar charts, pie charts, and line graphs
- **Embla Carousel**: Touch-friendly carousel component for image galleries and content slideshows

### Form Management
- **React Hook Form**: Performant form library with minimal re-renders
- **Hookform Resolvers**: Validation resolver adapters
- **Zod**: TypeScript-first schema validation for form data and API responses

### Database and ORM
- **Drizzle ORM**: TypeScript ORM for SQL databases with excellent type safety
- **Neon Database**: Serverless PostgreSQL for production database hosting
- **Drizzle Kit**: Migration and introspection tools for database management

### Development Tools
- **TypeScript**: Static type checking for enhanced development experience
- **Vite**: Fast build tool with Hot Module Replacement for development
- **React Query**: Server state management and caching for API interactions

### Backend Dependencies
- **Express**: Web application framework for the API server
- **connect-pg-simple**: PostgreSQL session store for Express sessions
- **date-fns**: Modern date utility library for timestamp formatting