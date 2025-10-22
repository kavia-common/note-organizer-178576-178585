<template>
  <header class="header">
    <div class="header-inner">
      <div class="brand">
        <div class="logo">🗒️</div>
        <div class="titles">
          <h1 class="app-title">Ocean Notes</h1>
          <span class="badge">Nuxt 3</span>
        </div>
      </div>

      <div class="actions">
        <button class="btn btn-ghost" @click="createNote" aria-label="New note">
          <span class="icon">＋</span>
          New
          <span class="kbd-hint"><kbd>Ctrl/Cmd</kbd> + <kbd>N</kbd></span>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue'
import { useNotes } from '@/composables/useNotes'

const { createNote } = useNotes()

function handleKeydown(e: KeyboardEvent) {
  const isMac = navigator.platform.toUpperCase().includes('MAC')
  if ((isMac ? e.metaKey : e.ctrlKey) && e.key.toLowerCase() === 'n') {
    e.preventDefault()
    createNote()
  }
}

onMounted(() => window.addEventListener('keydown', handleKeydown))
onBeforeUnmount(() => window.removeEventListener('keydown', handleKeydown))
</script>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 20;
  backdrop-filter: saturate(180%) blur(6px);
  background: rgba(255,255,255,0.7);
  border-bottom: 1px solid var(--color-border);
}

.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 14px 16px;
  max-width: 1400px;
  margin: 0 auto;
}

.brand {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo {
  font-size: 22px;
  width: 40px;
  height: 40px;
  border-radius: 12px;
  display: grid;
  place-items: center;
  background: rgba(37,99,235,0.12);
  color: var(--color-primary);
  box-shadow: var(--shadow-xs);
}

.titles {
  display: flex;
  align-items: center;
  gap: 10px;
}

.app-title {
  margin: 0;
  font-size: var(--text-xl);
  font-weight: 700;
}

.actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.icon {
  font-weight: 700;
}

.kbd-hint {
  margin-left: 8px;
  color: var(--color-muted);
}

@media (max-width: 640px) {
  .kbd-hint {
    display: none;
  }
}
</style>
