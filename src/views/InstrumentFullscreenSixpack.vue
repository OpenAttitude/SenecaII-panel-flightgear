<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

import type { InstrumentId } from '@/instrumentIds';
import { useFgSixpackPropertyBindings } from '@/composables/useFgSixpackPropertyBindings';
import {
  LazyASI as ASI,
  LazyVSI as VSI,
  LazyAI as AI,
  LazyAltimeter as Altimeter,
  LazyTC as TC,
  LazyHSI as HSI,
} from '@/instruments/asyncInstruments';
import OffSpinner from '@/components/OffSpinner.vue';
import { fgfsHostFromQuery } from '@/utils/fgfsFromRoute';

const props = defineProps<{
  instrumentId: InstrumentId;
  fgfs?: string;
  dpi?: string;
  gradient?: string;
}>();

const route = useRoute();
const panelQuery = computed(() => ({ ...route.query }));

const {
  flightGearPanelPropertiesStore,
  tcIndicatedTurnRate,
  tcIndicatedSlipSkid,
  vsiIndicatedSpeedFpm,
  hsiIndicatedHeadingDeg,
  hsiSelectedCourseDeg,
  hsiCdiDeflection,
  hsiGsDeflection,
  hsiNavFlagNorm,
  hsiHeadingFlagNorm,
  hsiSelectedHeadingDeg,
  hsiToFlagNorm,
  hsiFromFlagNorm,
  hsiHasGlideslope,
  hsiGsInRange,
  hsiNavDataValid,
  altIndicatedAltitudeFt,
  altSettingHpa,
  asiIndicatedSpeedKt,
  asiTasFaceRotationDeg,
  aiPitchDeg,
  aiRollDeg,
  aiGsLight,
  aiGearLight,
  aiFpLight1,
  aiFpLight2,
  aiOvrLight1,
  aiOvrLight2,
  aiOilLight,
  aiGyroLight1,
  aiGyroLight2,
  aiAltnLight,
} = useFgSixpackPropertyBindings({
  fgfs: () => fgfsHostFromQuery(route.query.fgfs) || (props.fgfs?.trim() ?? ''),
  dpi: () => props.dpi,
});

const showGradient = computed(() => props.gradient === 'true');
</script>

<template>
  <div class="instrument-fullscreen">
    <header class="instrument-fullscreen__toolbar">
      <RouterLink class="instrument-fullscreen__back" :to="{ name: 'panel', query: panelQuery }">← Panel</RouterLink>
    </header>
    <div class="instrument-fullscreen__stage">
      <ASI
        v-if="instrumentId === 'asi'"
        class="instrument-fullscreen__svg"
        :class="{ 'gradient-border': showGradient }"
        :indicated-speed-kt="asiIndicatedSpeedKt"
        :tas-face-rotation-deg="asiTasFaceRotationDeg"
      />
      <AI
        v-else-if="instrumentId === 'attitude'"
        class="instrument-fullscreen__svg"
        :class="{ 'gradient-border': showGradient }"
        :pitch-deg="aiPitchDeg"
        :roll-deg="aiRollDeg"
        :gs-light="aiGsLight"
        :gear-light="aiGearLight"
        :fp-light1="aiFpLight1"
        :fp-light2="aiFpLight2"
        :ovr-light1="aiOvrLight1"
        :ovr-light2="aiOvrLight2"
        :oil-light="aiOilLight"
        :gyro-light1="aiGyroLight1"
        :gyro-light2="aiGyroLight2"
        :altn-light="aiAltnLight"
      />
      <Altimeter
        v-else-if="instrumentId === 'altimeter'"
        class="instrument-fullscreen__svg"
        :class="{ 'gradient-border': showGradient }"
        :indicated-altitude-ft="altIndicatedAltitudeFt"
        :setting-hpa="altSettingHpa"
      />
      <TC
        v-else-if="instrumentId === 'turn-coordinator'"
        class="instrument-fullscreen__svg"
        :class="{ 'gradient-border': showGradient }"
        :indicated-turn-rate="tcIndicatedTurnRate"
        :indicated-slip-skid="tcIndicatedSlipSkid"
      />
      <HSI
        v-else-if="instrumentId === 'hsi'"
        class="instrument-fullscreen__svg"
        :class="{ 'gradient-border': showGradient }"
        :indicated-heading-deg="hsiIndicatedHeadingDeg"
        :selected-course-deg="hsiSelectedCourseDeg"
        :cdi-deflection="hsiCdiDeflection"
        :gs-deflection="hsiGsDeflection"
        :nav-flag-norm="hsiNavFlagNorm"
        :heading-flag-norm="hsiHeadingFlagNorm"
        :selected-heading-deg="hsiSelectedHeadingDeg"
        :to-flag-norm="hsiToFlagNorm"
        :from-flag-norm="hsiFromFlagNorm"
        :has-glideslope="hsiHasGlideslope"
        :gs-in-range="hsiGsInRange"
        :nav-data-valid="hsiNavDataValid"
      />
      <VSI
        v-else-if="instrumentId === 'vsi'"
        class="instrument-fullscreen__svg"
        :class="{ 'gradient-border': showGradient }"
        :vertical-speed-fpm="vsiIndicatedSpeedFpm"
      />
    </div>
    <OffSpinner :serviceable="flightGearPanelPropertiesStore.isConnected" />
  </div>
</template>

<style scoped>
.instrument-fullscreen {
  position: fixed;
  inset: 0;
  z-index: 1;
  display: flex;
  flex-direction: column;
  background: #000;
  color: var(--bs-light, #fff);
}

.instrument-fullscreen__toolbar {
  flex: 0 0 auto;
  padding: 0.35rem 0.75rem;
  border-bottom: 1px solid #333;
}

.instrument-fullscreen__back {
  color: var(--bs-info, #6ea8fe);
  text-decoration: none;
  font-size: 0.95rem;
}

.instrument-fullscreen__back:hover {
  text-decoration: underline;
}

.instrument-fullscreen__stage {
  flex: 1 1 auto;
  min-height: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  box-sizing: border-box;
}

:deep(.instrument-fullscreen__svg) {
  width: min(100vw - 1rem, 100vh - 3rem);
  height: min(100vw - 1rem, 100vh - 3rem);
  max-width: 100%;
  max-height: 100%;
  display: block;
}
</style>
