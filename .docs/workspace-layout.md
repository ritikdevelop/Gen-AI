# Workspace Layout

The repository contains both the backend API and the frontend application within a monorepo-style structure.

## Root Directory Structure

```text
Gen-AI/backend/
├── .docs/                  # Documentation files (architecture, layout, API references)
├── _tests/                 # Backend root test files
├── config/                 # (Inside src) Database and overarching backend configurations
├── frontend/               # React (Vite) frontend application
├── node_modules/           # Backend dependencies
├── src/                    # Backend source code
│   ├── config/             # DB connection, etc.
│   ├── controllers/        # Request handlers mapping to specific routes
│   ├── middlewares/        # Express middlewares (auth, error handling)
│   ├── models/             # Mongoose schemas (user, interview, blacklist)
│   ├── routes/             # Express API route definitions
│   └── services/           # Business logic and external API integrations (AI service)
├── .env                    # Environment variables (Backend)
├── package.json            # Backend scripts and dependencies
└── server.js               # Application entry point (starts server)
```

## Frontend Directory Structure (`backend/frontend/`)

```text
frontend/
├── node_modules/           # Frontend dependencies
├── public/                 # Static assets (favicons, etc.)
├── src/                    # Frontend source code
│   ├── assets/             # Images, SVGs, etc.
│   ├── features/           # Feature-based architecture (e.g., auth, interview)
│   │   ├── auth/           # Components, hooks, and services related to authentication
│   │   └── interview/      # Components, hooks, and services related to the AI interview
│   ├── style/              # Global SCSS/CSS configurations
│   ├── App.jsx             # Main React component
│   ├── index.html          # HTML entry point for Vite
│   ├── main.jsx            # React root DOM rendering
│   └── style.scss          # Primary stylesheet imports
├── package.json            # Frontend scripts and dependencies
└── vite.config.js          # Vite build and dev server configuration
```
