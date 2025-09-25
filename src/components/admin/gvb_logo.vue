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

<style scoped>
    .gvb_logo {
        height: 90px;
        display: flex;
        padding: 20px;
        align-items: center;
    img {
        width: 60px;
        height: 60px;   
    }
    .logo_head {
        margin-left: 20px;
        > div:nth-child(1) {
            font-size: 22px;

        }
        > div:nth-child(2) {
            font-size: 12px;
            margin-left: 17px;
        }
    }
}
</style>