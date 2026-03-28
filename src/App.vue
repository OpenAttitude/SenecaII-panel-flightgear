<template>
  <router-view></router-view>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300&display=swap');

:root {
  --mydpi: 96;
  --myspacing: calc(var(--mydpi) * 3.4px);
  --cutout_3inch: calc(var(--mydpi) * 3.16px);
  --cutout_2inch: calc(var(--mydpi) * 2.3125px);
  --cutout_1inch: calc(var(--mydpi) * 1.25px);
}

html,
body,
#app {
  width: 100%;
  height: 100%;
  padding: 0;
  border: 0;
  margin: 0;
  /* background-color: var(--bs-gray-dark); */
  background-color: black;
  color: var(--bs-light);
}

.gauge3 {
  width: var(--cutout_3inch);
  height: var(--cutout_3inch);
}
.gauge2 {
  width: var(--cutout_2inch);
  height: var(--cutout_2inch);
}
.gauge1 {
  width: var(--cutout_1inch);
  height: var(--cutout_1inch);
}

.cutout {
  position: absolute;
}

.gauge {
  border-radius: 50%;
  flex-shrink: 0;
}

.gradient-border {
  background-image: linear-gradient(135deg, rgba(20, 20, 20, 1) 0%, rgba(99, 99, 99, 1) 78%);
  background-origin: border-box;
  box-shadow: inset 0 100vw black;
  border: 10px solid transparent;
}
</style>
