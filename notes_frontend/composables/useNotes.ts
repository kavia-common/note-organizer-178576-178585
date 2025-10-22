import { ref, computed, watch } from 'vue'
import { useRouter } from '#imports'

export type Note = {
  id: string
  title: string
  content: string
  updatedAt: number
}

type UpdatePayload = Partial<Omit<Note, 'id'>>

/**
 * PUBLIC_INTERFACE
 * useNotes
 * A simple local state manager for notes with localStorage persistence.
 * - Manages CRUD operations
 * - Tracks selected note
 * - Exposes helpers for UI integration
 */
export function useNotes() {
  /** This is a public function. */
  const STORAGE_KEY = 'ocean-notes:v1'

  const router = useRouter()
  const loading = ref<boolean>(true)
  const notes = ref<Note[]>([])
  const selectedId = ref<string | null>(null)

  // Derived state
  const selected = computed(() => notes.value.find(n => n.id === selectedId.value) || null)

  // Initialize from localStorage with slight delay for skeleton
  if (loading.value) {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw) as { notes: Note[], selectedId: string | null }
        notes.value = parsed.notes || []
        selectedId.value = parsed.selectedId || parsed.notes?.[0]?.id || null
      } else {
        // Seed example note
        const id = crypto.randomUUID()
        notes.value = [{
          id,
          title: 'Welcome to Ocean Notes',
          content: [
            'This is your modern Nuxt notes app.',
            '',
            '- Create new notes with the button or Ctrl/Cmd+N',
            '- Search and filter from the sidebar',
            '- Click a note to edit its content',
            '',
            'Enjoy the Ocean Professional theme! 🌊'
          ].join('\n'),
          updatedAt: Date.now(),
        }]
        selectedId.value = id
      }
    } catch (e) {
      // Fallback to empty state
      notes.value = []
      selectedId.value = null
    } finally {
      // Simulate brief loading for skeleton
      setTimeout(() => { loading.value = false }, 180)
    }
  }

  // Persist to localStorage
  watch([notes, selectedId], () => {
    const payload = JSON.stringify({
      notes: notes.value,
      selectedId: selectedId.value,
    })
    localStorage.setItem(STORAGE_KEY, payload)
  }, { deep: true })

  function touch(id: string) {
    const n = notes.value.find(n => n.id === id)
    if (n) n.updatedAt = Date.now()
  }

  // PUBLIC_INTERFACE
  function createNote(): string {
    /** Create a new note and select it. */
    const id = crypto.randomUUID()
    const n: Note = { id, title: 'Untitled', content: '', updatedAt: Date.now() }
    notes.value.unshift(n)
    selectedId.value = id
    return id
  }

  // PUBLIC_INTERFACE
  function update(id: string, payload: UpdatePayload) {
    /** Update a note by id with partial data. */
    const idx = notes.value.findIndex(n => n.id === id)
    if (idx === -1) return
    notes.value[idx] = { ...notes.value[idx], ...payload, updatedAt: Date.now() }
  }

  // PUBLIC_INTERFACE
  function remove(id: string) {
    /** Delete a note by id and adjust selection. */
    const idx = notes.value.findIndex(n => n.id === id)
    if (idx === -1) return
    const wasSelected = selectedId.value === id
    notes.value.splice(idx, 1)
    if (!notes.value.length) {
      selectedId.value = null
    } else if (wasSelected) {
      const next = notes.value[Math.max(0, idx - 1)]
      selectedId.value = next?.id ?? notes.value[0].id
    }
  }

  // PUBLIC_INTERFACE
  function rename(id: string, title?: string) {
    /** Rename a note with a new title. */
    const clean = (title ?? '').trim()
    update(id, { title: clean || 'Untitled' })
  }

  // PUBLIC_INTERFACE
  function select(id: string) {
    /** Select a note by id. */
    if (id) selectedId.value = id
  }

  // PUBLIC_INTERFACE
  function duplicate() {
    /** Duplicate the currently selected note. */
    if (!selected.value) return
    const base = selected.value
    const id = crypto.randomUUID()
    const copy: Note = {
      id,
      title: `${base.title} (copy)`,
      content: base.content,
      updatedAt: Date.now(),
    }
    notes.value.unshift(copy)
    selectedId.value = id
  }

  return {
    loading,
    notes,
    selected,
    selectedId,
    // actions
    createNote,
    update,
    remove,
    rename: (id: string, title?: string) => rename(id, title),
    select,
    duplicate,
  }
}
