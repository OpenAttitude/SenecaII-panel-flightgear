<script setup lang="ts">
import { computed, defineAsyncComponent } from 'vue';

import type { PanelLayout } from '@/utils/panelLayout';

const props = defineProps<{
  fgfs?: string;
  dpi?: string;
  gradient?: string;
  /** From URL query `layout` — `sixpack` shows PFD sixpack only. */
  layout?: string;
}>();

const resolvedLayout = computed<PanelLayout>(() => (props.layout === 'sixpack' ? 'sixpack' : 'full'));

const PanelFull = defineAsyncComponent(() => import('./PanelFull.vue'));
const PanelSixpack = defineAsyncComponent(() => import('./PanelSixpack.vue'));
</script>

<template>
  <PanelSixpack
    v-if="resolvedLayout === 'sixpack'"
    :fgfs="fgfs"
    :dpi="dpi"
    :gradient="gradient"
  />
  <PanelFull v-else :fgfs="fgfs" :dpi="dpi" :gradient="gradient" />
</template>
