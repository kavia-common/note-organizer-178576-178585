<template>
  <div class="sidebar-root">
    <SearchBar v-model="query" />
    <div class="hr" style="margin: 8px 0;"></div>
    <NotesList :filter="query" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SearchBar from './SearchBar.vue'
import NotesList from './NotesList.vue'

const query = ref('')
</script>

<style scoped>
.sidebar-root {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>
