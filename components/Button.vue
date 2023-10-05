<template>
    <div class="btn">
        <button type="button" class="font-semibold" :class="{'!bg-[#00DC82]': framework.selected}" @click="framework.selected = !framework.selected" v-for="framework in data" :key="framework.text">{{ framework.text }}</button>
    </div>
</template>

<script setup>
const { data } = defineProps(['data']);
</script>