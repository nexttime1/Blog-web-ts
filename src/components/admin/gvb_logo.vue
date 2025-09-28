<template>
<div class="gvb_logo">
<img src="/image/logo.jpg" alt="">
<div class="logo_head">
<div>下次一定.</div>
<div>nexttime</div>
</div>
</div>
</template>

<script setup lang="ts">

</script>

<style lang="scss">
    .gvb_logo {
        height: 90px;
        display: flex;
        padding: 20px;
        align-items: center;
        transition: all .3s;    
    img {
        width: 60px;
        height: 60px;   
        transition: all .3s;      
    }
    .logo_head {
        margin-left: 20px;
        transform: scale(1);
        transform-origin: left center; /* 更精确的原点 */
        opacity: 1;
        width: auto; /* 自动计算宽度 */
        min-width: 120px; /* 设定最小宽度避免抖动 */
        transition: transform 0.3s ease, opacity 0.3s ease, width 0.3s ease;
        white-space: nowrap; /* 防止文字换行 */


        > div:nth-child(1) {
            font-size: 22px;

        }
        > div:nth-child(2) {
            font-size: 12px;
            margin-left: 17px;
        }
    }
}
.collapsed {
    .gvb_logo {
        padding: 2px;
        img {
            width: 43px;
            height: 43px;   
        }
        .logo_head{
        transform: scale(0);
        opacity: 0; 
        width: 0;
        overflow: hidden; 
        }


}
}
</style>