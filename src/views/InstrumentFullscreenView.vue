<script setup lang="ts">
import { computed, defineAsyncComponent } from 'vue';

import type { InstrumentId } from '@/instrumentIds';
import type { PanelLayout } from '@/utils/panelLayout';

const props = defineProps<{
  instrumentId: InstrumentId;
  fgfs?: string;
  dpi?: string;
  gradient?: string;
  layout?: string;
}>();

const resolvedLayout = computed<PanelLayout>(() => (props.layout === 'sixpack' ? 'sixpack' : 'full'));

const InstrumentFullscreenFull = defineAsyncComponent(() => import('./InstrumentFullscreenFull.vue'));
const InstrumentFullscreenSixpack = defineAsyncComponent(() => import('./InstrumentFullscreenSixpack.vue'));
</script>

<template>
  <InstrumentFullscreenSixpack
    v-if="resolvedLayout === 'sixpack'"
    :instrument-id="instrumentId"
    :fgfs="fgfs"
    :dpi="dpi"
    :gradient="gradient"
  />
  <InstrumentFullscreenFull
    v-else
    :instrument-id="instrumentId"
    :fgfs="fgfs"
    :dpi="dpi"
    :gradient="gradient"
  />
</template>
