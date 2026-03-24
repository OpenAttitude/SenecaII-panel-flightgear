<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  val: {
    type: Number,
    default: 0,
  },
  min: {
    type: Number,
    default: 0,
  },
  max: {
    type: Number,
    default: 100,
  },
  step: {
    type: Number,
    default: 1,
  },
  propertyName: {
    type: String,
    default: "some-property",
  },
  name: {
    type: String,
    default: "some name",
  },
});

const emit = defineEmits(['property-change']);

const val = ref(props.min);
const min = ref(props.min);
const max = ref(props.max);
const step = ref(props.step);

watch(val, (n,o) => {
  const newValue = Number(n);
  const oldValue = Number(o);
  if( !(Number.isNaN(newValue) && Number.isNaN(oldValue)) )
    emit('property-change', { name: props.propertyName, newValue, oldValue } );
})

function guidGenerator() {
    var S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}

const randomId = guidGenerator();
const randomIdLink = `#${randomId}`

</script>

<template>
    <div class="input-group input-group-sm">
      <a class="input-group-text" data-bs-toggle="collapse" :data-bs-target="randomIdLink" aria-expanded="false" aria-controls="collapseExample">
        {{ name }}
      </a>
      <input type="text" class="form-control form-control-sm" v-model="val"/>
      <input type="range" class="form-range" :min="min" :max="max" :step="step" v-model="val"/>
    </div>

    <div class="collapse" :id="randomId">
      <label class="form-label" for="rangeMin1">Min</label>
      <input type="number" class="form-control form-control-sm" v-model="min"/>

      <label class="form-label" for="rangeMax1">Max</label>
      <input type="number" class="form-control form-control-sm" v-model="max"/>

      <label class="form-label" for="rangeStep1">Step</label>
      <input type="number" class="form-control form-control-sm" v-model="step"/>
    </div>
</template>
