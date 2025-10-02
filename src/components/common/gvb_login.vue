<template>
  <div>
    <a-modal
      width="400px"
      modal-class="gvb_login_modal"
      :visible="props.visible"
      title="用户登录"
      :footer="false"
      @cancel="close"
    >
      <gvb_login_form ref="gvbLoginForm" @ok="close"></gvb_login_form>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import Gvb_login_form from "@/components/common/gvb_login_form.vue";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "@/stores/counter";
import { Message } from "@arco-design/web-vue";
import { qqLoginApi } from "@/api/user_api";



const store = useStore();
const route = useRoute();
const router = useRouter();

interface routerQuery {
  code?: string,
  flag?: string
}


const props = defineProps({
  visible: {
    type: Boolean,
  },
});
const emits = defineEmits(["update:visible"]);
const gvbLoginForm = ref()

function close() {
  emits("update:visible", false);
  gvbLoginForm.value.formReset()
}


async function init(query: routerQuery) {
  if (!query.code || !query.flag) {
    return
  }
  let res = await qqLoginApi(query.code)
  if (res.code) {
    Message.error(res.msg)
    return
  }
  Message.success(res.msg)
  store.setToken(res.data)

  // 重定向到点击登录的页面
  let path = localStorage.getItem("redirectPath")
  if (path === null) {
    path = "/"
  }
  router.push(path)
}

init(route.query)

</script>

<style lang="scss">
.gvb_login_modal {
  .arco-modal-header {
    display: none;
  }
}
</style>
