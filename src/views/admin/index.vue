<template>
  <div class="gvb_admin">
    <aside :class="{ collapsed: store.collapsed }">
      <Gvb_logo></Gvb_logo>
      <Gvb_menu></Gvb_menu>
    </aside>
    <main>
      <div class="gvb_head">
        <Gvb_bread_crumb></Gvb_bread_crumb>
        <div class="gvb_function_area">
          <IconHome @click="goHome()" class="action_icon"></IconHome>
          <Gvb_theme></Gvb_theme>
          <Gvb_user_info_menu></Gvb_user_info_menu>
        </div>
      </div>

      <Gvb_tabs></Gvb_tabs>
      <div class="gvb_container">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component"></component>
          </transition>
        </router-view>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import {
  IconHome,
  IconSun,
  IconApps,
  IconBug,
  IconBulb,
  IconDown,
  IconUser,
} from "@arco-design/web-vue/es/icon";
import { ref, watch } from "vue";
import Gvb_menu from "@/components/admin/gvb_menu.vue";
import Gvb_bread_crumb from "@/components/admin/gvb_bread_crumb.vue";
import Gvb_logo from "@/components/admin/gvb_logo.vue";
import Gvb_tabs from "@/components/admin/gvb_tabs.vue";
import { useRoute, useRouter, type RouteMeta } from "vue-router";
import Gvb_theme from "@/components/common/gvb_theme.vue";
import { useStore } from "@/stores/counter";
import Gvb_user_info_menu from "@/components/common/gvb_user_info_menu.vue";

const route = useRoute();
const router = useRouter();
const store = useStore();

function goHome() {
  router.push({ name: "index" });
}

const selectedKeys = ref([route.name]);
const openKeys = ref([route.matched[1].name]);

// console.log(route.matched)

watch(
  () => route.name,
  () => {
    selectedKeys.value = [route.name];
    openKeys.value = [route.matched[1].name];
  }
);
</script>

<style lang="scss">
.gvb_admin {
  display: flex;

  aside {
    width: 240px;
    height: 100vh;
    border-right: 1px solid var(--bg);
    background-color: var(--color-bg-1);
    transition: all 0.3s;
    position: relative;
  }

  aside.collapsed {
    width: 64px;

    & ~ main {
      width: calc(100% - 64px);
    }
  }
}

main {
  width: calc(100% - 240px);
  .gvb_head {
    width: 100%;
    height: 60px;
    border-bottom: 1px solid var(--bg);
    display: flex;
    justify-content: space-between;
    padding: 0 20px;
    align-items: center;
    overflow-x: hidden;
    overflow-y: auto;
    background-color: var(--color-bg-1);
    transition: all 0.3s;
  }
  .gvb_function_area {
    display: flex;
    .action_icon {
      margin-right: 10px;
      margin-top: 5px;
      font-size: 16px;
      align-items: center;
      transition: color 0.3s;

      &:hover {
        color: var(--active);
        cursor: pointer;
      }
    }
    .gvb_user_info_menu {
      img {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        align-items: center;
      }
      .gvb_user_info_menu_down {
        //文字 nexttime
        display: flex;
        align-items: center;
        cursor: pointer;
      }
      .gvb_user_info_menu_down_span {
        margin: 0 5px;
      }
    }
  }
  .gvb_container {
    padding: 20px;
    background-color: var(--bg);
    min-height: calc(100vh - 90px);

    .fade-leave-to {
      opacity: 0;
      transform: translateX(30px);
    }
    .fade-enter-active {
      transform: translateX(-30px);
      opacity: 0;
    }
    .fade-enter-to {
      transform: translateX(0px);
      opacity: 1;
    }
    .fade-leave-active,
    .fade-enter-active {
      transition: all 0.3s ease-out;
    }
  }
}
</style>
