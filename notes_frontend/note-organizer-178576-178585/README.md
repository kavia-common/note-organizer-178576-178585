# note-organizer-178576-178585

This workspace contains the Nuxt 3 frontend for Ocean Notes — a modern, responsive notes organizer with an Ocean Professional theme.

## Getting Started

1) Install dependencies
npm install

2) Run the development server
npm run dev

The app runs on http://localhost:3000

## Features

- Sidebar with search and notes list
- Editor with title and content
- Create, rename, delete, duplicate notes
- Keyboard shortcut: Ctrl/Cmd + N to create a note
- LocalStorage persistence (no backend required)
- Responsive and accessible styling

## Structure

- notes_frontend/app.vue: mounts layout and global CSS
- notes_frontend/layouts/default.vue: header + responsive sidebar/content
- notes_frontend/pages/index.vue: main editor view
- notes_frontend/components/: UI components (AppHeader, NotesSidebar, NotesList, NoteEditor, etc.)
- notes_frontend/composables/useNotes.ts: local state and persistence
- notes_frontend/assets/css/: design tokens and global styles

No environment variables are required. If any are added later, also update notes_frontend/.env.example accordingly.
