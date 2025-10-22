<template>
  <li
    :class="['item', active ? 'active' : '']"
    @click="emit('select')"
    @keydown.enter="emit('select')"
    tabindex="0"
    role="button"
    :aria-pressed="active"
  >
    <div class="title-row">
      <template v-if="editing">
        <input
          ref="inputEl"
          class="input"
          v-model="localTitle"
          @keydown.enter.stop.prevent="confirmRename"
          @keydown.escape.stop.prevent="cancelRename"
        />
      </template>
      <template v-else>
        <strong>{{ note.title || 'Untitled' }}</strong>
      </template>

      <div class="actions" @click.stop>
        <button class="btn btn-ghost" title="Rename" @click="startRename">✎</button>
        <button class="btn btn-ghost" title="Delete" @click="emit('delete')">🗑️</button>
      </div>
    </div>
    <div class="meta">
      <small class="text-muted">Updated {{ timeAgo }}</small>
    </div>
  </li>
</template>

<script setup lang="ts">
import { ref, computed, nextTick } from 'vue'

const props = defineProps<{
  note: { id: string; title: string; content: string; updatedAt: number }
  active?: boolean
}>()

const emit = defineEmits<{
  (e: 'select'): void
  (e: 'delete'): void
  (e: 'rename', value: string): void
}>()

const editing = ref(false)
const localTitle = ref(props.note.title)
const inputEl = ref<HTMLInputElement | null>(null)

const timeAgo = computed(() => {
  const delta = Date.now() - props.note.updatedAt
  const m = Math.floor(delta / 60000)
  if (m < 1) return 'just now'
  if (m < 60) return `${m}m ago`
  const h = Math.floor(m / 60)
  if (h < 24) return `${h}h ago`
  const d = Math.floor(h / 24)
  return `${d}d ago`
})

function startRename() {
  editing.value = true
  localTitle.value = props.note.title
  nextTick(() => inputEl.value?.focus())
}
function confirmRename() {
  editing.value = false
  emit('rename', localTitle.value.trim())
}
function cancelRename() {
  editing.value = false
}
</script>

<style scoped>
.item {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 10px;
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  box-shadow: var(--shadow-xs);
  transition: border-color var(--transition), box-shadow var(--transition), transform var(--transition-fast);
  cursor: pointer;
}
.item:hover {
  box-shadow: var(--shadow-sm);
  transform: translateY(-1px);
}
.item.active {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(37,99,235,0.15), var(--shadow-sm);
}

.title-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}
.actions {
  display: flex; gap: 6px;
}
.meta { display: flex; justify-content: space-between; }
</style>
