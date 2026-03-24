<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { TESTBED_ENTRIES_SORTED } from '@/testbedManifest';

const route = useRoute();

/**
 * Base URL for testbed dev servers (same host as this app, or override via env).
 * Example: `VITE_TESTBED_ORIGIN=http://192.168.1.10` in `.env.local`
 */
const testbedBase = computed(() => {
  const fromEnv = import.meta.env.VITE_TESTBED_ORIGIN as string | undefined;
  if (fromEnv?.trim()) {
    return fromEnv.replace(/\/$/, '');
  }
  if (typeof window !== 'undefined') {
    return `${window.location.protocol}//${window.location.hostname}`;
  }
  return 'http://127.0.0.1';
});

function testbedUrl(port: number): string {
  return `${testbedBase.value}:${port}/`;
}

const showHostHint = import.meta.env.VITE_TESTBED_ORIGIN == null || String(import.meta.env.VITE_TESTBED_ORIGIN).trim() === '';
</script>

<template>
  <div class="container py-4 testbed-hub text-body">
    <nav class="mb-3">
      <RouterLink :to="{ name: 'panel', query: { ...route.query } }">Panel</RouterLink>
      ·
      <RouterLink :to="{ name: 'settings', query: { ...route.query } }">Settings</RouterLink>
      ·
      <span class="text-secondary">Testbeds</span>
      ·
      <RouterLink :to="{ name: 'test', query: { ...route.query } }">In-app routes</RouterLink>
    </nav>

    <h1 class="h3 mb-2">Instrument testbeds</h1>
    <p class="text-secondary small mb-4">
      Each row opens the package Vite testbed for that instrument (separate dev server). Run it from the
      <strong>library/</strong> instruments monorepo root, e.g.
      <code class="user-select-all">npm run dev:testbed --workspace=@openattitude/steam-airspeedindicator-senecaii</code>
      (see that tree’s <code>package.json</code> workspaces).
    </p>
    <p v-if="showHostHint" class="small text-secondary mb-3">
      Links use this host ({{ testbedBase }}) plus each testbed port. Override with
      <code>VITE_TESTBED_ORIGIN</code> if needed.
    </p>

    <div class="table-responsive">
      <table class="table table-sm table-striped table-hover align-middle">
        <thead>
          <tr>
            <th scope="col">Instrument</th>
            <th scope="col">Port</th>
            <th scope="col">Workspace</th>
            <th scope="col">Open</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in TESTBED_ENTRIES_SORTED" :key="row.port">
            <td>{{ row.title }}</td>
            <td><code>{{ row.port }}</code></td>
            <td class="small text-secondary text-break">{{ row.packageName }}</td>
            <td>
              <a class="btn btn-sm btn-outline-primary" :href="testbedUrl(row.port)" target="_blank" rel="noopener">
                Testbed
              </a>
              <code class="ms-2 small user-select-all d-none d-xl-inline">npm run dev:testbed --workspace={{ row.packageName }}</code>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.testbed-hub :where(code) {
  font-size: 0.85em;
}
</style>
