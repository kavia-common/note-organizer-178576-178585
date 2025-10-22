# Ocean Notes (Nuxt 3)

A modern Nuxt 3 notes organizer with an Ocean Professional theme. Features:
- Sidebar with search and notes list
- Editor with title and content
- Create, rename, delete, duplicate
- Keyboard shortcut: Ctrl/Cmd + N to create a note
- LocalStorage persistence (no backend required)
- Responsive and accessible styling

## Development

1) Install deps
npm install

2) Run
npm run dev

App runs on http://localhost:3000

## Structure

- app.vue: mounts layout and global CSS
- layouts/default.vue: header + responsive sidebar/content
- pages/index.vue: main editor view
- components/: UI components (AppHeader, NotesSidebar, NotesList, NoteEditor, etc.)
- composables/useNotes.ts: local state and persistence
- assets/css/: design tokens and global styles

No environment variables are required. If introducing any, also create/update .env.example accordingly.
