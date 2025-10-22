<template>
  <div class="layout">
    <AppHeader />

    <div class="main">
      <aside class="sidebar surface">
        <NotesSidebar />
      </aside>

      <section class="content">
        <slot />
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * Default layout that renders a header and a responsive two-column workspace.
 * Sidebar hosts search + note list, content hosts editor/viewer routed pages.
 */
</script>

<style scoped>
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--color-bg);
  background-image: var(--gradient-hero);
}

.main {
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: 16px;
  padding: 16px;
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
}

.sidebar {
  height: calc(100vh - 96px);
  padding: 12px;
  position: sticky;
  top: 80px;
}

.content {
  min-height: calc(100vh - 96px);
}

@media (max-width: 960px) {
  .main {
    grid-template-columns: 1fr;
  }
  .sidebar {
    height: auto;
    position: static;
    order: 2;
  }
  .content {
    order: 1;
  }
}
</style>
