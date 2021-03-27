<template>
  <v-fab v-if="compFlag">BackTop</v-fab>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import VFab from '../../../src/components/button/fab.vue'

const isDev = import.meta.env.DEV
const compFlag = ref(isDev)

onMounted(() => !isDev && (compFlag.value = true))
</script>
