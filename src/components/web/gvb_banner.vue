<template>
  <div class="gvb_banner">
    <div class="head">
      <div class="slogan">{{ data.slogan }}</div>
<div class="abstract">
  <div class="typed-wrapper">
    <h2 ref="typedEl" class="typing"></h2>
  </div>
  <template v-if=" !Array.isArray(data.abstract) || !data.abstract.length">
    <div class="fallback">{{ data.abstract }}</div>
  </template>
</div>
    </div>

    <a-carousel
      :auto-play="true"
      :auto-play-interval="data.banner_time as number * 1000"
      indicator-type="dot"
      show-arrow="hover"
    >
      <a-carousel-item v-for="item in (data.banners as bannerType[])" :key="(item as any).id">
        <img class="banner_image" alt="" :src="(item as any).path"/>
      </a-carousel-item>
    </a-carousel>
  </div>
</template>

<script setup lang="ts">
import { reactive, watch, ref, onMounted, onBeforeUnmount } from "vue";
import Typed from "typed.js";
import type { bannerType } from "@/api/menu_api";
import { menuDetailApi } from "@/api/menu_api";

interface BannerType {
  abstract: string | string[]
  banner_time?: number
  banners: string | bannerType[]
  slogan: string
}

interface Props {
  data?: BannerType
}

const props = defineProps<Props>()

const data = reactive<BannerType>({
  abstract: [],
  banner_time: 7,
  banners: [{ id: 1, path: "/image/default_banner.png" }],
  slogan: "",
})

const typedEl = ref<HTMLElement | null>(null)
let typedInstance: Typed | null = null

async function getData() {
  if (props.data) {
    if (typeof props.data.banners === 'string') {
      data.banners = [{id:1, path: props.data.banners} as any]
    } else {
      data.banners = props.data.banners as any
    }
    data.abstract = props.data.abstract
    data.banner_time = props.data.banner_time ?? 7
    data.slogan = props.data.slogan
    return
  }

  const key = `menus__${location.pathname}`
  const val = sessionStorage.getItem(key)
  if (val !== null) {
    try {
      const jsonData = JSON.parse(val) as BannerType
      data.banners = jsonData.banners as any
      data.abstract = jsonData.abstract
      data.banner_time = jsonData.banner_time
      data.slogan = jsonData.slogan
      return
    } catch (e) { /* ignore */ }
  }

  const res = await menuDetailApi(location.pathname)
  data.banners = res.data.Banners
  data.abstract = res.data.abstract
  data.banner_time = res.data.banner_time
  data.slogan = res.data.slogan
  sessionStorage.setItem(key, JSON.stringify(res.data))
}

watch(() => props.data, () => { getData() }, { immediate: true })

onMounted(() => {
  // 给 typed.js 一点时间，等 getData 设置 data.abstract
  const strings = Array.isArray(data.abstract) && data.abstract.length
    ? (data.abstract as string[])
    : ["欢迎访问本站", "Enjoy the blog!"]

  // 创建 typed 实例
  typedInstance = new Typed(typedEl.value as Element, {
    strings,
    typeSpeed: 70,
    backSpeed: 40,
    backDelay: 1500,
    startDelay: 300,
    loop: true,
    showCursor: true,
    cursorChar: "|"
  })
})

onBeforeUnmount(() => {
  if (typedInstance) {
    typedInstance.destroy()
    typedInstance = null
  }
})
</script>

<style lang="scss">
.gvb_banner {
  width: 100%;
  height: 700px;
  position: relative;
  background-color: var(--color-fill-4);

  .head {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
    color: white;
    text-align: center;

    .slogan {
      font-size: 30px;
      font-weight: 400;
      margin-bottom: 10px;
    }

    .abstract {
      margin-top: 25px;
      font-size: 18px;
      line-height: 1.5rem;
    }

    .typing {
      display: inline-block;
      font-size: 22px;
      font-weight: 600;
      color: #fff;
      border-right: 2px solid #fff;
      padding-right: 6px;
      margin: 0 auto;
      animation: blink 0.7s infinite;
      min-height: 1.4em;
    }
    .typed-wrapper {
  display: inline-block;
  min-height: 2.5em; /* 固定高度，防止内容变动时跳动 */
  overflow: hidden;  /* 防止光标拉伸容器 */
  vertical-align: middle;
}

    .fallback { color: #fff; font-size: 18px; }
  }

  .arco-carousel { height: 100%; }

  .banner_image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

@keyframes blink {
  50% { border-color: transparent; }
}
</style>
