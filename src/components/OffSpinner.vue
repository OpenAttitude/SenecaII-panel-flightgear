<script setup lang="ts">

const props = defineProps({
    serviceable: Boolean,
});

</script>

<template>
    <div v-if="false == props.serviceable"
        style="position:absolute;left:0;right:0;top:0;bottom:0;background:#808080;opacity:0.7;z-index:2000">
        <div class="spinner-border text-danger off-flag" role="status"
            style="--bs-spinner-width:8rem;--bs-spinner-height:8rem;margin-left:50%;margin-top:20%;">
            <span class="visually-hidden">Off...</span>
        </div>
    </div>
</template>

<style>
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
