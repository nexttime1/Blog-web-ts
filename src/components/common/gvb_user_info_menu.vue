<template>
  <div class="gvb_user_info_menu">
    <a-dropdown @select="select" class="gvb_dropdown">
      <div class="gvb_user_info_menu_down">
        <img :src="store.userInfo.avatar" alt="" />
        <span class="gvb_user_info_menu_down_span">{{
          store.userInfo.nick_name
        }}</span>
        <IconDown></IconDown>
      </div>
      <template #content>
        <template v-for="(item, index) in DropList" :key="index">
          <a-dgroup v-if="item.type === 'line'"></a-dgroup>
          <a-doption v-else :value="item.name">{{ item.title }}</a-doption>
        </template>
      </template>
    </a-dropdown>
  </div>
</template>

<script setup lang="ts">
import { useStore } from "@/stores/counter";
import type { tabType } from "@/types";
import { useRoute, useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

interface dropTabType extends tabType {
  type?: string;
}

const DropList: dropTabType[] = [
  {
    name: "user_info",
    title: "个人信息",
  },
  {
    name: "",
    title: "",
    type: "line",
  },
  {
    name: "article_list",
    title: "文章列表",
  },
  {
    name: "user_list",
    title: "用户列表",
  },
  {
    name: "log_list",
    title: "系统日志",
  },
  {
    name: "",
    title: "",
    type: "line",
  },

  {
    name: "logout",
    title: "用户注销",
  },
];

function select(value: string) {
  if (value === "logout") {
    store.logout();
    router.push({ path: "index" });
    return;
  }
  router.push({ name: value });
}
</script>

<style lang="scss">
.gvb_dropdown {
  .arco-dropdown-group-title {
    margin-top: 0;

    &::after {
      content: "";
      display: block;
      width: 100%;
      height: 1px;
      background-color: var(--bg);
      position: absolute;
      left: 0;
    }
  }
}
</style>
