<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';

import type { InstrumentId } from '@/instrumentIds';
import { useFgPanelPropertyBindings } from '@/composables/useFgPanelPropertyBindings';
import { GenericClock as Clock } from '@openattitude/steam-clock-generic';
import { AirspeedIndicator as ASI } from '@openattitude/steam-airspeedindicator-senecaii';
import { VerticalSpeedIndicator as VSI } from '@openattitude/steam-verticalspeedindicator-generic';
import { AttitudeIndicator as AI } from '@openattitude/steam-attitudegyro-senecaii';
import { Altimeter20kFt as Altimeter } from '@openattitude/steam-altimeter20kft-senecaii';
import { TurnCoordinator as TC } from '@openattitude/steam-turncoordinator-generic';
import { Ki525 as HSI } from '@openattitude/steam-ki525-generic';
import { EngineRpmGauge as RPM } from '@openattitude/steam-enginerpm-senecaii';
import { Ki227Adf as ADF } from '@openattitude/steam-ki227-senecaii';
import { Ki209 as KI209 } from '@openattitude/steam-ki209-generic';
import { DualFuelFlow as FF } from '@openattitude/steam-fuelflow-senecaii';
import { DualManifoldPressure as MP } from '@openattitude/steam-manifoldpressure-senecaii';
import { EgtIndicator as EGT } from '@openattitude/steam-egt-senecaii';
import { GyroPressureGauge as GyroPressure } from '@openattitude/steam-gyropressure-senecaii';
import { EngineInstruments } from '@openattitude/steam-engine-senecaii';
import { GenericGps as GPS } from '@openattitude/other-gps-generic';
import { FlapIndicator as Flap } from '@openattitude/steam-flapindicator-senecaii';
import OffSpinner from '@/components/OffSpinner.vue';

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
  fgfs: () => props.fgfs,
  dpi: () => props.dpi,
});
</script>

<template>
  <RouterLink class="ms-2" :to="{ name: 'testbeds' }">testbeds</RouterLink>

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
.instrument-openable {
  cursor: pointer;
}

.gps {
  margin-top: calc(var(--mydpi)*0.2px) !important;
  border: 1px solid red;
  width: var(--cutout_2inch);
  height: calc(var(--mydpi)*6.4px);
}

.row_0a {
  top: calc(var(--myspacing)*1 - var(--cutout_2inch) - var(--mydpi)*0.1px);
}

.row_0 {
  margin-top: calc(var(--mydpi)*0.1px);;
  top: 0;
}

.row_1 {
  margin-top: calc(var(--mydpi)*0.1px);;
  top: calc(var(--myspacing)*1);
}

.row_2 {
  top: calc(var(--myspacing)*2.35);
}

.row_2a {
  top: calc(var(--myspacing)*2.35 + var(--cutout_1inch) + var(--mydpi)*0.1px);
}

.col_0a {
  left: calc(var(--myspacing)*1 - var(--cutout_2inch) - var(--mydpi)*0.1px);
}

.col_0 {
  left: 0;
  margin-left: calc(var(--mydpi)*0.1px);;
}

.col_1 {
  left: calc(var(--myspacing)*1);
  margin-left: calc(var(--mydpi)*0.1px);;
}

.col_2 {
  left: calc(var(--myspacing)*2);
  margin-left: calc(var(--mydpi)*0.1px);;
}

.col_3 {
  left: calc(var(--myspacing)*3);
  margin-left: calc(var(--mydpi)*0.1px);;
}

.col_4 {
  left: calc(var(--myspacing)*4);
  margin-left: calc(var(--mydpi)*0.1px);;
}

.col_5 {
  left: calc(var(--myspacing)*5);
  margin-left: calc(var(--mydpi)*0.1px);;
}

.col_5a {
  left: calc(var(--myspacing)*5 + var(--cutout_1inch) + var(--mydpi)*0.1px);
  margin-left: calc(var(--mydpi)*0.1px);;
}

.eng_left {
  left: calc(var(--myspacing)*2.5 - var(--mydpi)*6.95px );
  top: calc(var(--myspacing)*2.05);
  max-height: calc(var(--mydpi)*1px);
  height: calc(var(--mydpi)*0.75px);
  width: calc(var(--mydpi)*6.45px);
}

.eng_right {
  left: calc(var(--myspacing)*2.5 + var(--mydpi)*0.5px );
  top: calc(var(--myspacing)*2.05);
  max-height: calc(var(--mydpi)*0.75px);
  height: calc(var(--mydpi)*0.75px);
  width: calc(var(--mydpi)*6.45px);
}

.inop {
  background-color: red;
}

.inop::after {
  content: 'INOP';
  height: 100%;
  display: flex;
  align-items: center;
  justify-content:center;
}

</style>
