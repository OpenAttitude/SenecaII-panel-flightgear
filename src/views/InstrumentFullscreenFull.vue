<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

import type { InstrumentId } from '@/instrumentIds';
import { WIDE_INSTRUMENT_IDS } from '@/instrumentIds';
import { useFgPanelPropertyBindings } from '@/composables/useFgPanelPropertyBindings';
import {
  LazyClock as Clock,
  LazyASI as ASI,
  LazyVSI as VSI,
  LazyAI as AI,
  LazyAltimeter as Altimeter,
  LazyTC as TC,
  LazyHSI as HSI,
  LazyRPM as RPM,
  LazyADF as ADF,
  LazyKI209 as KI209,
  LazyFF as FF,
  LazyMP as MP,
  LazyEGT as EGT,
  LazyGyroPressure as GyroPressure,
  LazyEngineInstruments as EngineInstruments,
  LazyGPS as GPS,
  LazyFlap as Flap,
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
  clockUtcDaySeconds,
  adfIndicatedBearingDeg,
  adfCardHeadingDeg,
  tcIndicatedTurnRate,
  tcIndicatedSlipSkid,
  vsiIndicatedSpeedFpm,
  ki209SelectedObsDeg,
  ki209HeadingNeedleDeflectionNorm,
  ki209GsNeedleDeflectionNorm,
  ki209SignalQualityNorm,
  ki209ToFlagNorm,
  ki209FromFlagNorm,
  ki209HasGlideslope,
  ki209GsInRange,
  ki209NavDataValid,
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
  gpsLatitudeDeg,
  gpsLongitudeDeg,
  gpsHeadingDeg,
  gpsZoomLevel,
  asiIndicatedSpeedKt,
  asiTasFaceRotationDeg,
  flapPosNorm,
  elevatorTrimNorm,
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
  rpmEng1,
  rpmEng2,
  mpOsiLeft,
  mpOsiRight,
  gyroSuctionInHg,
  gyroVacuumInopLeft,
  gyroVacuumInopRight,
  ffFuelFlowGphLeft,
  ffFuelFlowGphRight,
  egtEng1DegF,
  egtEng2DegF,
  engLeftBusA,
  engLeftChtDegF,
  engLeftOilTempDegF,
  engLeftOilPressurePsi,
  engLeftFuelGalUs,
  engRightBusA,
  engRightChtDegF,
  engRightOilTempDegF,
  engRightOilPressurePsi,
  engRightFuelGalUs,
} = useFgPanelPropertyBindings({
  fgfs: () => fgfsHostFromQuery(route.query.fgfs) || (props.fgfs?.trim() ?? ''),
  dpi: () => props.dpi,
});

const showGradient = computed(() => props.gradient === 'true');
const isWide = computed(() => WIDE_INSTRUMENT_IDS.has(props.instrumentId));
</script>

<template>
  <div class="instrument-fullscreen">
    <header class="instrument-fullscreen__toolbar">
      <RouterLink class="instrument-fullscreen__back" :to="{ name: 'panel', query: panelQuery }">← Panel</RouterLink>
    </header>
    <div
      class="instrument-fullscreen__stage"
      :class="{ 'instrument-fullscreen__stage--wide': isWide }"
    >
      <Clock
        v-if="instrumentId === 'clock'"
        id="clock"
        class="instrument-fullscreen__svg"
        :class="{ 'gradient-border': showGradient }"
        :utc-day-seconds="clockUtcDaySeconds"
      />
      <ASI
        v-else-if="instrumentId === 'asi'"
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
      <GPS
        v-else-if="instrumentId === 'gps'"
        class="instrument-fullscreen__svg instrument-fullscreen__gps"
        :class="{ 'gradient-border': showGradient }"
        :latitude-deg="gpsLatitudeDeg"
        :longitude-deg="gpsLongitudeDeg"
        :heading-deg="gpsHeadingDeg"
        :zoom-level="gpsZoomLevel"
      />
      <ADF
        v-else-if="instrumentId === 'adf'"
        class="instrument-fullscreen__svg"
        :class="{ 'gradient-border': showGradient }"
        :indicated-bearing-deg="adfIndicatedBearingDeg"
        :card-heading-deg="adfCardHeadingDeg"
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
      <KI209
        v-else-if="instrumentId === 'ki209'"
        class="instrument-fullscreen__svg"
        :class="{ 'gradient-border': showGradient }"
        :selected-obs-deg="ki209SelectedObsDeg"
        :heading-needle-deflection-norm="ki209HeadingNeedleDeflectionNorm"
        :gs-needle-deflection-norm="ki209GsNeedleDeflectionNorm"
        :signal-quality-norm="ki209SignalQualityNorm"
        :to-flag-norm="ki209ToFlagNorm"
        :from-flag-norm="ki209FromFlagNorm"
        :has-glideslope="ki209HasGlideslope"
        :gs-in-range="ki209GsInRange"
        :nav-data-valid="ki209NavDataValid"
      />
      <RPM
        v-else-if="instrumentId === 'rpm-1'"
        class="instrument-fullscreen__svg"
        :class="{ 'gradient-border': showGradient }"
        :rpm="rpmEng1"
      />
      <RPM
        v-else-if="instrumentId === 'rpm-2'"
        class="instrument-fullscreen__svg"
        :class="{ 'gradient-border': showGradient }"
        :rpm="rpmEng2"
      />
      <MP
        v-else-if="instrumentId === 'manifold'"
        class="instrument-fullscreen__svg"
        :class="{ 'gradient-border': showGradient }"
        :mp-osi-left="mpOsiLeft"
        :mp-osi-right="mpOsiRight"
      />
      <FF
        v-else-if="instrumentId === 'fuel-flow'"
        class="instrument-fullscreen__svg"
        :class="{ 'gradient-border': showGradient }"
        :fuel-flow-gph-left="ffFuelFlowGphLeft"
        :fuel-flow-gph-right="ffFuelFlowGphRight"
      />
      <EGT
        v-else-if="instrumentId === 'egt-1'"
        class="instrument-fullscreen__svg"
        :class="{ 'gradient-border': showGradient }"
        :egt-deg-f="egtEng1DegF"
      />
      <EGT
        v-else-if="instrumentId === 'egt-2'"
        class="instrument-fullscreen__svg"
        :class="{ 'gradient-border': showGradient }"
        :egt-deg-f="egtEng2DegF"
      />
      <GyroPressure
        v-else-if="instrumentId === 'gyro-pressure'"
        class="instrument-fullscreen__svg"
        :class="{ 'gradient-border': showGradient }"
        :suction-in-hg="gyroSuctionInHg"
        :vacuum-inoperative-left="gyroVacuumInopLeft"
        :vacuum-inoperative-right="gyroVacuumInopRight"
      />
      <Flap
        v-else-if="instrumentId === 'flap'"
        class="instrument-fullscreen__svg"
        :class="{ 'gradient-border': showGradient }"
        :flaps-norm="flapPosNorm"
        :trim-norm="elevatorTrimNorm"
      />
      <EngineInstruments
        v-else-if="instrumentId === 'engine-left'"
        class="instrument-fullscreen__engine"
        style="box-sizing: content-box"
        :bus-current-a="engLeftBusA"
        :cht-deg-f="engLeftChtDegF"
        :oil-temp-deg-f="engLeftOilTempDegF"
        :oil-pressure-psi="engLeftOilPressurePsi"
        :fuel-level-gal-us="engLeftFuelGalUs"
      />
      <EngineInstruments
        v-else-if="instrumentId === 'engine-right'"
        class="instrument-fullscreen__engine"
        style="box-sizing: content-box"
        :bus-current-a="engRightBusA"
        :cht-deg-f="engRightChtDegF"
        :oil-temp-deg-f="engRightOilTempDegF"
        :oil-pressure-psi="engRightOilPressurePsi"
        :fuel-level-gal-us="engRightFuelGalUs"
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

.instrument-fullscreen__stage--wide {
  align-items: flex-start;
  overflow: auto;
}

:deep(.instrument-fullscreen__svg) {
  width: min(100vw - 1rem, 100vh - 3rem);
  height: min(100vw - 1rem, 100vh - 3rem);
  max-width: 100%;
  max-height: 100%;
  display: block;
}

:deep(.instrument-fullscreen__gps) {
  width: min(100vw - 1rem, 100vh - 3rem);
  height: min(100vw - 1rem, 100vh - 3rem);
  min-height: 12rem;
}

:deep(.instrument-fullscreen__engine) {
  width: auto;
  height: auto;
  max-width: calc(100vw - 2rem);
  max-height: calc(100vh - 4rem);
}
</style>
