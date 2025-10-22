<template>
  <div class="list-root">
    <div class="header-row">
      <h2>Notes</h2>
      <button class="btn btn-primary" @click="createNote">New</button>
    </div>

    <div v-if="loading" class="skeleton" style="height: 120px;"></div>

    <EmptyState
      v-else-if="!filtered.length"
      title="No notes found"
      description="Create a new note to get started or adjust your search."
      icon="🌊"
      :cta="{ label: 'Create note', action: createNote }"
    />

    <ul v-else class="list">
      <NoteListItem
        v-for="n in filteredSorted"
        :key="n.id"
        :note="n"
        :active="n.id === selectedId"
        @select="select(n.id)"
        @delete="remove(n.id)"
        @rename="rename(n.id)"
      />
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useNotes } from '@/composables/useNotes'
import EmptyState from './EmptyState.vue'
import NoteListItem from './NoteListItem.vue'

const props = defineProps<{ filter?: string }>()

const {
  notes, selectedId, createNote, select, remove, rename, loading
} = useNotes()

const filtered = computed(() => {
  const q = (props.filter || '').toLowerCase().trim()
  if (!q) return notes.value
  return notes.value.filter(n =>
    n.title.toLowerCase().includes(q) ||
    n.content.toLowerCase().includes(q)
  )
})

const filteredSorted = computed(() => {
  return [...filtered.value].sort((a, b) => b.updatedAt - a.updatedAt)
})
</script>

<style scoped>
.list-root {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.header-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

h2 {
  margin: 0;
  font-size: var(--text-lg);
}

.list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 6px;
}
</style>
