<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import {IconSun, IconMoon} from "@arco-design/web-vue/es/icon";
import {useStore} from "@/stores/counter";

const store = useStore()
store.loadTheme()
store.loadToken()
</script>

<template>


  <RouterView />
</template>

<style scoped>
</style>
