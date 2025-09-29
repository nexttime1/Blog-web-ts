<template>
  <div class="gvb_login">
    <div class="gvb_login_mask">
           <gvb_login_form></gvb_login_form>
  </div>
    </div>
</template>
<script setup lang="ts">
import gvb_login_form from "@/components/common/gvb_login_form.vue";
import "@/assets/font.css"

</script>
<style lang="scss">
.gvb_login {
  background: url(/image/bg.png) 50%/cover no-repeat;
  width: 100%;
  height: 100vh;

  .gvb_login_mask {
    position: absolute;
    right: 0;
    width: 400px;
    height: 100%;
    background-color: var(--login_bg);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 40px;

  }
}

</style>