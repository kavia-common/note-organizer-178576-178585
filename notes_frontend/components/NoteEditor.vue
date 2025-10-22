<template>
  <div v-if="selected" class="editor surface">
    <div class="toolbar">
      <input
        class="input title"
        v-model="draft.title"
        placeholder="Note title..."
        @input="commit"
      />
      <div class="toolbar-actions">
        <button class="btn" @click="duplicate">Duplicate</button>
        <button class="btn" @click="remove(selected.id)">Delete</button>
        <button class="btn btn-primary" @click="createNote">New</button>
      </div>
    </div>
    <textarea
      class="textarea content"
      v-model="draft.content"
      placeholder="Start writing..."
      rows="16"
      @input="commit"
    />
  </div>

  <EmptyState
    v-else
    title="Select or create a note"
    description="Pick an existing note from the sidebar or create a new one."
    icon="📄"
    :cta="{ label: 'Create note', action: createNote }"
  />
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue'
import { useNotes } from '@/composables/useNotes'
import EmptyState from './EmptyState.vue'

const { selected, update, createNote, remove, duplicate } = useNotes()

const draft = reactive({
  title: '',
  content: '',
})

watch(() => selected.value?.id, () => {
  draft.title = selected.value?.title || ''
  draft.content = selected.value?.content || ''
}, { immediate: true })

function commit() {
  if (selected.value) {
    update(selected.value.id, { title: draft.title, content: draft.content })
  }
}
</script>

<style scoped>
.editor {
  padding: 16px;
}

.toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.title {
  font-size: var(--text-xl);
  font-weight: 700;
}

.content {
  min-height: calc(80vh - 160px);
  resize: vertical;
}

.toolbar-actions {
  display: flex;
  gap: 8px;
}
</style>
