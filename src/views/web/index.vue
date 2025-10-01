<template>
  <div>
    首页
    <gvb_login v-model:visible="visible"></gvb_login>
    <a-button @click="visible = true">登录</a-button>
    <gvb_theme></gvb_theme>
    <router-link to="/login"></router-link>
  </div>
</template>
<script setup lang="ts">
import {ref} from "vue";

const visible = ref(false)
import Gvb_login from "@/components/common/gvb_login.vue";
import Gvb_theme from "@/components/common/gvb_theme.vue";
</script>
<style lang="scss">


</style>

I
