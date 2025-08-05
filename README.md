# Create.xyz Dashboard Clone

This project is a clone of the Create.xyz dashboard, built with React, TypeScript, and Tailwind CSS.

## Features

- Responsive design that works on mobile and desktop
- Authentication system with demo users
- Dashboard with navigation
- Breadcrumb navigation
- Lazy loading for improved performance

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

## Project Structure

```
src/
├── components/
│   ├── features/      # Feature-specific components
│   ├── layout/        # Layout components (Header, Navigation)
│   ├── pages/         # Page components
│   └── ui/            # Reusable UI components
├── context/           # React context providers
├── data/              # Static data and constants
└── types/             # TypeScript type definitions
```

## Authentication

For development purposes, the app includes demo users:

- **Regular User**: Click "Demo User" on the login page
- **Admin User**: Click "Demo Admin" on the login page

In production, this would be replaced with a real authentication system.

## Roadmap

See the [TODO.md](./TODO.md) file for planned features and improvements.

## License

This project is for educational purposes only.
