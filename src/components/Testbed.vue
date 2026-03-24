<template>
  <div class="row">
    <div class="col-sm-2">
      <div class="d-flex flex-column">
        <div v-for="p in items" :key="p.name">
          <PropertyServer :name="p.name" :property-name="p.name"
                :min="p.min" :max="p.max" :step="p.step" @property-change="onPropertyChange" />
        </div>
      </div>
    </div>
    <div class="col" style="background-color: aliceblue" >
        <slot />
    </div>
  </div>
</template>


<style>
.gauge {
  max-width: 100%;
  max-height: 100%;
}
</style>

<script setup>
import PropertyServer from './PropertyServer.vue'

const props = defineProps({
  items: {
    type: Object,
  },
});

function onPropertyChange( evt ) {
  const i = props.items.find( i => i.name == evt.name );
  if( i ) i.ref.value = evt.newValue;
}
</script>
