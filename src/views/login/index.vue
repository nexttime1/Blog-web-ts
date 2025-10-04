<template>
  <div class="gvb_login">
    <div class="gvb_login_mask">
           <gvb_login_form @ok="ok" :qq-redirect-path="back"></gvb_login_form>
  </div>
    </div>
</template>
<script setup lang="ts">
import gvb_login_form from "@/components/common/gvb_login_form.vue";
import "@/assets/font.css"
import router from "@/router"; 

interface routerQuery {
  code?: string,
  flag?: string
}
interface historyState {
  back: string 
}


const back = (window.history.state as historyState).back
function ok() {
  let back = window.history.state.back

  //拿不到之前的路径，就跳转到首页
  if (back ===  null) {
    router.push({path: "admin"})
  }
  else {
    router.push(back)
    console.log("走了这个   back")
}

}

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