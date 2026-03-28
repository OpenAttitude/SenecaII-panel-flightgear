<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import type { SixpackInstrumentId } from '@/instrumentIds';
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
import GitHubForkRibbon from '@/components/GitHubForkRibbon.vue';
import { fgfsHostFromQuery } from '@/utils/fgfsFromRoute';

const props = defineProps({
  fgfs: String,
  dpi: String,
  gradient: String,
});

const route = useRoute();
const router = useRouter();

function openInstrument(instrumentId: SixpackInstrumentId) {
  router.push({
    name: 'instrument',
    params: { instrumentId },
    query: { ...route.query },
  });
}

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

const showForkRibbon = computed(
  () => !fgfsHostFromQuery(route.query.fgfs) && !flightGearPanelPropertiesStore.host.trim(),
);
</script>

<template>
  <GitHubForkRibbon v-if="showForkRibbon" />
  <RouterLink
    class="panel-settings-link"
    :to="{ name: 'settings', query: { ...route.query } }"
    aria-label="Panel settings"
    title="Panel settings"
  >
    <i class="bi bi-gear-fill" aria-hidden="true"></i>
  </RouterLink>

  <div class="sixpack">
    <div class="sixpack__row">
      <ASI
        class="gauge gauge3 instrument-openable"
        :class="{ 'gradient-border': gradient === 'true' }"
        :indicated-speed-kt="asiIndicatedSpeedKt"
        :tas-face-rotation-deg="asiTasFaceRotationDeg"
        @click="openInstrument('asi')"
      />
      <AI
        class="gauge gauge3 instrument-openable"
        :class="{ 'gradient-border': gradient === 'true' }"
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
        @click="openInstrument('attitude')"
      />
      <Altimeter
        class="gauge gauge3 instrument-openable"
        :class="{ 'gradient-border': gradient === 'true' }"
        :indicated-altitude-ft="altIndicatedAltitudeFt"
        :setting-hpa="altSettingHpa"
        @click="openInstrument('altimeter')"
      />
    </div>
    <div class="sixpack__row">
      <TC
        class="gauge gauge3 instrument-openable"
        :class="{ 'gradient-border': gradient === 'true' }"
        :indicated-turn-rate="tcIndicatedTurnRate"
        :indicated-slip-skid="tcIndicatedSlipSkid"
        @click="openInstrument('turn-coordinator')"
      />
      <HSI
        class="gauge gauge3 instrument-openable"
        :class="{ 'gradient-border': gradient === 'true' }"
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
        @click="openInstrument('hsi')"
      />
      <VSI
        class="gauge gauge3 instrument-openable"
        :class="{ 'gradient-border': gradient === 'true' }"
        :vertical-speed-fpm="vsiIndicatedSpeedFpm"
        @click="openInstrument('vsi')"
      />
    </div>
  </div>

  <OffSpinner :serviceable="flightGearPanelPropertiesStore.isConnected" />
</template>

<style scoped>
.panel-settings-link {
  position: fixed;
  top: 0.5rem;
  left: 0.5rem;
  z-index: 10040;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.25rem 0.35rem;
  color: var(--bs-light);
  font-size: 1.35rem;
  line-height: 1;
  text-decoration: none;
  opacity: 0.88;
  border-radius: 0.35rem;
  transition:
    color 0.15s ease,
    opacity 0.15s ease,
    background-color 0.15s ease;
}

.panel-settings-link:hover {
  color: #fff;
  opacity: 1;
  background-color: rgba(255, 255, 255, 0.08);
}

.instrument-openable {
  cursor: pointer;
}

.sixpack {
  position: fixed;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: calc(var(--mydpi) * 0.22px);
  padding: 2.5rem 0.5rem 0.5rem;
  box-sizing: border-box;
}

.sixpack__row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: calc(var(--mydpi) * 0.22px);
}
</style>
