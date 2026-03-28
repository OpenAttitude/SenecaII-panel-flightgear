<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { fgfsHostFromQuery } from '@/utils/fgfsFromRoute';
import { panelLayoutFromQuery, type PanelLayout } from '@/utils/panelLayout';
import { version as panelVersion } from '../../package.json';

const props = defineProps<{
  fgfs?: string;
  dpi?: string;
  gradient?: string;
  layout?: string;
}>();

const route = useRoute();
const router = useRouter();

const fgfsInput = ref('');
const dpiInput = ref('');
const gradientEnabled = ref(false);
const layoutChoice = ref<PanelLayout>('full');

watch(
  () => [props.fgfs, props.dpi, props.gradient, props.layout, route.query.fgfs, route.query.layout] as const,
  () => {
    fgfsInput.value = fgfsHostFromQuery(route.query.fgfs) || props.fgfs?.trim() || '';
    dpiInput.value = props.dpi?.trim() ?? '';
    gradientEnabled.value = props.gradient === 'true';
    layoutChoice.value = panelLayoutFromQuery(route.query);
  },
  { immediate: true },
);

/** Query object matching what the panel route expects (omit empty keys). */
const pendingQuery = computed(() => {
  const q: Record<string, string> = {};
  if (fgfsInput.value.trim()) q.fgfs = fgfsInput.value.trim();
  if (dpiInput.value.trim()) q.dpi = dpiInput.value.trim();
  if (gradientEnabled.value) q.gradient = 'true';
  if (layoutChoice.value === 'sixpack') q.layout = 'sixpack';
  return q;
});

function applyAndReturnToPanel() {
  router.push({ name: 'panel', query: pendingQuery.value });
}

function clearOptions() {
  fgfsInput.value = '';
  dpiInput.value = '';
  gradientEnabled.value = false;
  layoutChoice.value = 'full';
}
</script>

<template>
  <div class="container py-4 panel-settings text-body">
    <nav class="mb-4">
      <RouterLink :to="{ name: 'panel', query: { ...route.query } }">Panel</RouterLink>
      ·
      <span class="text-secondary">Settings</span>
      ·
      <RouterLink :to="{ name: 'testbeds', query: { ...route.query } }">Testbeds</RouterLink>
      ·
      <RouterLink :to="{ name: 'test', query: { ...route.query } }">In-app routes</RouterLink>
    </nav>

    <h1 class="h3 mb-2">
      <i class="bi bi-gear-fill me-2" aria-hidden="true"></i>
      Panel settings
    </h1>
    <p class="text-secondary small mb-2">
      These options are stored in the URL query string so you can bookmark or share a configured panel. FlightGear
      must expose the generic PropertyListener WebSocket on the host you set.
    </p>
    <p class="text-secondary small mb-4">
      <span class="text-muted">Version</span>
      <code class="text-info ms-1">{{ panelVersion }}</code>
    </p>

    <form class="card bg-dark border-secondary mb-4" @submit.prevent="applyAndReturnToPanel">
      <div class="card-body">
        <div class="mb-3">
          <label for="settings-fgfs" class="form-label">FlightGear PropertyListener host</label>
          <input
            id="settings-fgfs"
            v-model="fgfsInput"
            type="text"
            class="form-control bg-black text-light border-secondary"
            placeholder="127.0.0.1:8080"
            autocomplete="off"
          />
          <div class="form-text text-secondary">
            Hostname or <code class="text-info">host:port</code> — no <code class="text-info">ws://</code> prefix.
            Leave empty to run without a sim connection.
          </div>
        </div>

        <div class="mb-3">
          <label for="settings-dpi" class="form-label">Display DPI (CSS)</label>
          <input
            id="settings-dpi"
            v-model="dpiInput"
            type="text"
            inputmode="numeric"
            class="form-control bg-black text-light border-secondary"
            placeholder="96"
            autocomplete="off"
          />
          <div class="form-text text-secondary">
            Sets <code class="text-info">--mydpi</code> for gauge cutout sizing when the value is a number
            <strong>&gt; 10</strong> (baseline in the app is 96).
          </div>
        </div>

        <div class="mb-3">
          <label for="settings-layout" class="form-label">Panel layout</label>
          <select
            id="settings-layout"
            v-model="layoutChoice"
            class="form-select bg-black text-light border-secondary"
          >
            <option value="full">Full Seneca II panel</option>
            <option value="sixpack">Primary flight sixpack only</option>
          </select>
          <div class="form-text text-secondary">
            Sixpack uses <code class="text-info">layout=sixpack</code> and subscribes only to those six instruments’
            FlightGear properties.
          </div>
        </div>

        <div class="form-check form-switch mb-4">
          <input
            id="settings-gradient"
            v-model="gradientEnabled"
            class="form-check-input"
            type="checkbox"
            role="switch"
          />
          <label class="form-check-label" for="settings-gradient">Metallic gradient bezels</label>
          <div class="form-text text-secondary">Maps to <code class="text-info">gradient=true</code> on the panel.</div>
        </div>

        <div class="d-flex flex-wrap gap-2">
          <button type="submit" class="btn btn-primary">
            <i class="bi bi-check2-circle me-1" aria-hidden="true"></i>
            Save &amp; open panel
          </button>
          <RouterLink class="btn btn-outline-secondary" :to="{ name: 'panel', query: { ...route.query } }">
            Cancel
          </RouterLink>
          <button type="button" class="btn btn-outline-warning" @click="clearOptions">Clear fields</button>
        </div>
      </div>
    </form>

    <div class="card bg-dark border-secondary">
      <div class="card-body">
        <h2 class="h5 card-title">Instrument testbeds</h2>
        <p class="card-text text-secondary small">
          Open the hub that lists each <code class="text-info">@openattitude/*</code> Vite dev server (ports and
          <code class="text-info">npm run dev:testbed</code> commands). Your settings above are kept in the URL when
          you navigate.
        </p>
        <RouterLink
          class="btn btn-outline-info"
          :to="{ name: 'testbeds', query: pendingQuery }"
        >
          <i class="bi bi-window-stack me-1" aria-hidden="true"></i>
          Open instrument testbed hub
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.panel-settings :where(.form-control:focus) {
  border-color: var(--bs-info);
  box-shadow: 0 0 0 0.2rem rgba(13, 202, 240, 0.15);
}
</style>
