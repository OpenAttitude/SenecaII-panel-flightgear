<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import type { InstrumentId } from '@/instrumentIds';
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
import GitHubForkRibbon from '@/components/GitHubForkRibbon.vue';
import { fgfsHostFromQuery } from '@/utils/fgfsFromRoute';

const props = defineProps({
  fgfs: String,
  dpi: String,
  gradient: String,
});

const route = useRoute();
const router = useRouter();

function openInstrument(instrumentId: InstrumentId) {
  router.push({
    name: 'instrument',
    params: { instrumentId },
    query: { ...route.query },
  });
}

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

const showForkRibbon = computed(
  () => !fgfsHostFromQuery(route.query.fgfs) && !flightGearPanelPropertiesStore.host.trim(),
);
</script>

<template>
  <GitHubForkRibbon v-if="showForkRibbon" />
  <RouterLink
    class="panel-settings-link ms-2"
    :to="{ name: 'settings', query: { ...route.query } }"
    aria-label="Panel settings"
    title="Panel settings"
  >
    <i class="bi bi-gear-fill" aria-hidden="true"></i>
  </RouterLink>

  <Clock
    id="clock"
    class="cutout gauge gauge2 row_0a col_0a instrument-openable"
    :class="{ 'gradient-border': gradient === 'true' }"
    :utc-day-seconds="clockUtcDaySeconds"
    @click="openInstrument('clock')"
  />

  <ASI
    class="cutout gauge gauge3 row_0 col_1 instrument-openable"
    :class="{ 'gradient-border': gradient === 'true' }"
    :indicated-speed-kt="asiIndicatedSpeedKt"
    :tas-face-rotation-deg="asiTasFaceRotationDeg"
    @click="openInstrument('asi')"
  />

  <AI
    class="cutout gauge gauge3 row_0 col_2 instrument-openable"
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
    class="cutout gauge gauge3 row_0 col_3 instrument-openable"
    :class="{ 'gradient-border': gradient === 'true' }"
    :indicated-altitude-ft="altIndicatedAltitudeFt"
    :setting-hpa="altSettingHpa"
    @click="openInstrument('altimeter')"
  />

  <GPS
    class="cutout gauge gauge3 row_0 col_4 instrument-openable"
    :class="{ 'gradient-border': gradient === 'true' }"
    :latitude-deg="gpsLatitudeDeg"
    :longitude-deg="gpsLongitudeDeg"
    :heading-deg="gpsHeadingDeg"
    :zoom-level="gpsZoomLevel"
    @click="openInstrument('gps')"
  />

  <ADF
    class="cutout gauge gauge3 row_1 col_0 instrument-openable"
    :class="{ 'gradient-border': gradient === 'true' }"
    :indicated-bearing-deg="adfIndicatedBearingDeg"
    :card-heading-deg="adfCardHeadingDeg"
    @click="openInstrument('adf')"
  />

  <TC
    class="cutout gauge gauge3 row_1 col_1 instrument-openable"
    :class="{ 'gradient-border': gradient === 'true' }"
    :indicated-turn-rate="tcIndicatedTurnRate"
    :indicated-slip-skid="tcIndicatedSlipSkid"
    @click="openInstrument('turn-coordinator')"
  />

  <HSI
    class="cutout gauge gauge3 row_1 col_2 instrument-openable"
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
    class="cutout gauge gauge3 row_1 col_3 instrument-openable"
    :class="{ 'gradient-border': gradient === 'true' }"
    :vertical-speed-fpm="vsiIndicatedSpeedFpm"
    @click="openInstrument('vsi')"
  />

  <KI209
    class="cutout gauge gauge3 row_1 col_4 instrument-openable"
    :class="{ 'gradient-border': gradient === 'true' }"
    :selected-obs-deg="ki209SelectedObsDeg"
    :heading-needle-deflection-norm="ki209HeadingNeedleDeflectionNorm"
    :gs-needle-deflection-norm="ki209GsNeedleDeflectionNorm"
    :signal-quality-norm="ki209SignalQualityNorm"
    :to-flag-norm="ki209ToFlagNorm"
    :from-flag-norm="ki209FromFlagNorm"
    :has-glideslope="ki209HasGlideslope"
    :gs-in-range="ki209GsInRange"
    :nav-data-valid="ki209NavDataValid"
    @click="openInstrument('ki209')"
  />

  <RPM
    class="cutout gauge gauge3 row_2 col_1 instrument-openable"
    :class="{ 'gradient-border': gradient === 'true' }"
    :rpm="rpmEng1"
    @click="openInstrument('rpm-1')"
  />

  <MP
    class="cutout gauge gauge3 row_2 col_2 instrument-openable"
    :class="{ 'gradient-border': gradient === 'true' }"
    :mp-osi-left="mpOsiLeft"
    :mp-osi-right="mpOsiRight"
    @click="openInstrument('manifold')"
  />

  <RPM
    class="cutout gauge gauge3 row_2 col_3 instrument-openable"
    :class="{ 'gradient-border': gradient === 'true' }"
    :rpm="rpmEng2"
    @click="openInstrument('rpm-2')"
  />

  <FF
    class="cutout gauge gauge3 row_2 col_4 instrument-openable"
    :class="{ 'gradient-border': gradient === 'true' }"
    :fuel-flow-gph-left="ffFuelFlowGphLeft"
    :fuel-flow-gph-right="ffFuelFlowGphRight"
    @click="openInstrument('fuel-flow')"
  />

  <EGT
    class="cutout gauge gauge1 row_2 col_5 instrument-openable"
    :class="{ 'gradient-border': gradient === 'true' }"
    :egt-deg-f="egtEng1DegF"
    @click="openInstrument('egt-1')"
  />

  <EGT
    class="cutout gauge gauge1 row_2 col_5a instrument-openable"
    :class="{ 'gradient-border': gradient === 'true' }"
    :egt-deg-f="egtEng2DegF"
    @click="openInstrument('egt-2')"
  />

  <GyroPressure
    class="cutout gauge gauge1 row_2a col_5 instrument-openable"
    :class="{ 'gradient-border': gradient === 'true' }"
    :suction-in-hg="gyroSuctionInHg"
    :vacuum-inoperative-left="gyroVacuumInopLeft"
    :vacuum-inoperative-right="gyroVacuumInopRight"
    @click="openInstrument('gyro-pressure')"
  />

  <Flap
    class="cutout gauge gauge1 row_2a col_5a instrument-openable"
    :class="{ 'gradient-border': gradient === 'true' }"
    :flaps-norm="flapPosNorm"
    :trim-norm="elevatorTrimNorm"
    @click="openInstrument('flap')"
  />

  <EngineInstruments
    class="cutout eng_left instrument-openable"
    style="box-sizing: content-box"
    :bus-current-a="engLeftBusA"
    :cht-deg-f="engLeftChtDegF"
    :oil-temp-deg-f="engLeftOilTempDegF"
    :oil-pressure-psi="engLeftOilPressurePsi"
    :fuel-level-gal-us="engLeftFuelGalUs"
    @click="openInstrument('engine-left')"
  />

  <EngineInstruments
    class="cutout eng_right instrument-openable"
    style="box-sizing: content-box"
    :bus-current-a="engRightBusA"
    :cht-deg-f="engRightChtDegF"
    :oil-temp-deg-f="engRightOilTempDegF"
    :oil-pressure-psi="engRightOilPressurePsi"
    :fuel-level-gal-us="engRightFuelGalUs"
    @click="openInstrument('engine-right')"
  />

  <OffSpinner :serviceable="flightGearPanelPropertiesStore.isConnected" />
</template>

<style>
.panel-settings-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.2rem;
  color: var(--bs-light);
  font-size: 1.35rem;
  line-height: 1;
  text-decoration: none;
  opacity: 0.82;
  vertical-align: middle;
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

.gps {
  margin-top: calc(var(--mydpi) * 0.2px) !important;
  border: 1px solid red;
  width: var(--cutout_2inch);
  height: calc(var(--mydpi) * 6.4px);
}

.row_0a {
  top: calc(var(--myspacing) * 1 - var(--cutout_2inch) - var(--mydpi) * 0.1px);
}

.row_0 {
  margin-top: calc(var(--mydpi) * 0.1px);
  top: 0;
}

.row_1 {
  margin-top: calc(var(--mydpi) * 0.1px);
  top: calc(var(--myspacing) * 1);
}

.row_2 {
  top: calc(var(--myspacing) * 2.35);
}

.row_2a {
  top: calc(var(--myspacing) * 2.35 + var(--cutout_1inch) + var(--mydpi) * 0.1px);
}

.col_0a {
  left: calc(var(--myspacing) * 1 - var(--cutout_2inch) - var(--mydpi) * 0.1px);
}

.col_0 {
  left: 0;
  margin-left: calc(var(--mydpi) * 0.1px);
}

.col_1 {
  left: calc(var(--myspacing) * 1);
  margin-left: calc(var(--mydpi) * 0.1px);
}

.col_2 {
  left: calc(var(--myspacing) * 2);
  margin-left: calc(var(--mydpi) * 0.1px);
}

.col_3 {
  left: calc(var(--myspacing) * 3);
  margin-left: calc(var(--mydpi) * 0.1px);
}

.col_4 {
  left: calc(var(--myspacing) * 4);
  margin-left: calc(var(--mydpi) * 0.1px);
}

.col_5 {
  left: calc(var(--myspacing) * 5);
  margin-left: calc(var(--mydpi) * 0.1px);
}

.col_5a {
  left: calc(var(--myspacing) * 5 + var(--cutout_1inch) + var(--mydpi) * 0.1px);
  margin-left: calc(var(--mydpi) * 0.1px);
}

.eng_left {
  left: calc(var(--myspacing) * 2.5 - var(--mydpi) * 6.95px);
  top: calc(var(--myspacing) * 2.05);
  max-height: calc(var(--mydpi) * 1px);
  height: calc(var(--mydpi) * 0.75px);
  width: calc(var(--mydpi) * 6.45px);
}

.eng_right {
  left: calc(var(--myspacing) * 2.5 + var(--mydpi) * 0.5px);
  top: calc(var(--myspacing) * 2.05);
  max-height: calc(var(--mydpi) * 0.75px);
  height: calc(var(--mydpi) * 0.75px);
  width: calc(var(--mydpi) * 6.45px);
}

.inop {
  background-color: red;
}

.inop::after {
  content: 'INOP';
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
