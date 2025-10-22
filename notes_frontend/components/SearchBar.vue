<template>
  <div class="search">
    <label class="sr-only" for="search">Search notes</label>
    <div class="field">
      <span class="prefix">🔎</span>
      <input
        id="search"
        class="input"
        type="text"
        :value="modelValue"
        placeholder="Search notes..."
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      />
      <button v-if="modelValue" class="clear" @click="$emit('update:modelValue', '')" aria-label="Clear search">✕</button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: string
}>()

defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()
</script>

<style scoped>
.search .field {
  position: relative;
  display: flex;
  align-items: center;
}

.prefix {
  position: absolute;
  left: 10px;
  color: var(--color-muted);
  font-size: 14px;
  z-index: 1;
}

.input {
  padding-left: 32px;
}

.clear {
  position: absolute;
  right: 8px;
  border: none;
  background: transparent;
  cursor: pointer;
  color: var(--color-muted);
  border-radius: 8px;
  padding: 4px 6px;
}

.clear:hover {
  color: var(--color-text);
  background: rgba(0,0,0,0.04);
}

/* Accessibility helper */
.sr-only {
  position: absolute;
  width: 1px; height: 1px;
  padding: 0; margin: -1px; overflow: hidden;
  clip: rect(0,0,0,0); white-space: nowrap; border: 0;
}
</style>
