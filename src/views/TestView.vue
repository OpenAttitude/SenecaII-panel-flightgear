<template>
  <div class="container py-3">
    <h1 class="h4 mb-3">Routes</h1>
    <ul class="list-group mb-4">
      <li class="list-group-item">
        <RouterLink :to="{ name: 'panel' }">Panel (home)</RouterLink>
      </li>
      <li class="list-group-item">
        <RouterLink :to="{ name: 'settings', query: { ...route.query } }">Panel settings</RouterLink>
      </li>
      <li class="list-group-item">
        <RouterLink :to="{ name: 'testbeds', query: { ...route.query } }">Package testbeds (Vite)</RouterLink>
      </li>
    </ul>
    <h2 class="h5 mb-2">Instruments (fullscreen)</h2>
    <ul class="list-group">
      <li v-for="id in INSTRUMENT_IDS" :key="id" class="list-group-item">
        <RouterLink
          :to="{
            name: 'instrument',
            params: { instrumentId: id },
            query: { ...route.query },
          }"
        >
          {{ id }}
        </RouterLink>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { INSTRUMENT_IDS } from '@/instrumentIds';

const route = useRoute();
</script>
