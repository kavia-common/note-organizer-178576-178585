<template>
  <div class="empty surface">
    <div class="icon">{{ icon }}</div>
    <h3>{{ title }}</h3>
    <p class="text-muted">{{ description }}</p>
    <button v-if="cta" class="btn btn-primary" @click="cta.action">{{ cta.label }}</button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  description: string
  icon?: string
  cta?: { label: string; action: () => void }
}>()
</script>

<style scoped>
.empty {
  padding: 32px;
  display: grid;
  place-items: center;
  text-align: center;
  gap: 8px;
  min-height: 40vh;
}

.icon { font-size: 36px; }
h3 { margin: 0; font-size: var(--text-2xl); }
p { margin: 0; }
</style>
