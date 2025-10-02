<template>
<div>
    <gvb_table :url="userListApi" :columns="columns"></gvb_table>
</div>


</template>
<script setup lang="ts">
import gvb_table from '@/components/admin/gvb_table.vue';
import { userListApi } from '@/api/user_api';
import type { filterOptionType } from '@/components/admin/gvb_table.vue';
import { ref } from 'vue';
import {roleIdListApi} from "@/api/role_api";
const columns = [
  {title: '昵称', dataIndex: 'nick_name'},
  {title: '头像', slotName: 'avatar'},
  {title: '邮箱', dataIndex: 'email'},
  {title: '角色', dataIndex: 'role'},
  {title: 'ip/地址', slotName: 'ip'},
  {title: '注册时间', slotName: 'created_at'},
  {title: '操作', slotName: 'action'},
]
const filterGroup: filterOptionType[] = [
  {
    label: "角色过滤",
    column: "role",
    source: roleIdListApi
  }
]


const visible = ref(false)
const gvbTable = ref()

function createOk() {
  gvbTable.value.getList()
}

</script>

<style scoped>
</style>