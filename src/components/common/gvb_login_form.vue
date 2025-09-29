<template>
  <a-form class="gvb_login_form" ref="formRef" :model="form" :label-col-props="{span: 0}"
          :wrapper-col-props="{span: 24}">
    <div class="title">用户登录</div>
    <a-form-item field="user_name" label="用户名"
                 :rules="[{required:true,message:'请输入用户名'}]"
                 :validate-trigger="['blur']"
    >
      <a-input v-model="form.user_name" placeholder="用户名">
        <template #prefix>
          <icon-user/>
        </template>
      </a-input>
    </a-form-item>
    <a-form-item field="password" label="密码"
                 :rules="[{required:true,message:'请输入密码'}]"
                 :validate-trigger="['blur']"
    >
      <a-input type="password" v-model="form.password" placeholder="密码">
        <template #prefix>
          <icon-lock/>
        </template>
      </a-input>
    </a-form-item>
    <a-button type="primary">登录</a-button>
    <div class="other-login">
      <div class="label">第三方登录</div>
      <div class="icons">
        <a href="">
          <img src="/image/icon/qq.png" alt="">
        </a>
      </div>
    </div>
  </a-form>
</template>

<script setup lang="ts">
import "@/assets/font.css"
import {IconLock, IconUser} from "@arco-design/web-vue/es/icon";
import {reactive} from "vue";

const form = reactive({
  user_name: "",
  password: "",
})

</script>


<style lang="scss" >

.gvb_login_form {
.title {
      font-size: 24px;
      font-weight: 700;
      text-align: center;
      margin-bottom: 15px;
      color: var(--active);
      font-family: kuaikan;
    }

    .other-login {

      margin-top: 20px;

      .label {
        display: flex;
        align-items: center;
        color: var(--color-text-2);
        justify-content: space-between;

        &::before {
          display: inline-flex;
          width: 35%;
          height: 1px;
          content: "";
          background-color: var(--color-text-4);
        }

        &::after {
          display: inline-flex;
          width: 35%;
          height: 1px;
          content: "";
          background-color: var(--color-text-4);
        }
      }

      .icons {
        display: flex;
        justify-content: center;
        margin-top: 10px;

        > a {
          margin-right: 20px;

          &:last-child {
            margin-right: 0;
          }
        }

        img {
          width: 40px;
          height: 40px;
        }
      }

    }
  }

</style>
