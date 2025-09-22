import {createRouter, createWebHistory} from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'web',
            component: () => import('../views/web/web.vue'),
            children: [  // 访问/时，先加载web.vue组件，然后在web.vue组件的<router-view>中加载index.vue组件
                {
                    path: "",
                    name: "index",
                    component: () => import('../views/web/index.vue'),
                }
            ]
        },
        {
            path: "/admin",
            name: "admin",
            component: () => import('../views/admin/index.vue'),
            children: [
                {
                    path: "",
                    name: "home",
                    component: () => import('../views/admin/home/index.vue'),
                },
                {
                    path: "user_center",
                    name: "user_center",
                    children: [
                        {
                            path: "user_info",
                            name: "user_info",
                            component: () => import('../views/admin/user_center/user_info.vue'),
                        }
                    ]
                },
                {
                    path: "article",
                    name: "article",
                    children: [
                        {
                            path: "article_list",
                            name: "article_list",
                            component: () => import('../views/admin/article/article_list.vue'),
                        }
                    ]
                },
                {
                    path: "users",
                    name: "users",
                    children: [
                        {
                            path: "user_list",
                            name: "user_list",
                            component: () => import('../views/admin/users/user_list.vue'),
                        }
                    ]
                },
                {
                    path: "chat_group",
                    name: "chat_group",
                    children: [
                        {
                            path: "chat_list",
                            name: "chat_list",
                            component: () => import('../views/admin/chat_group/chat_list.vue'),
                        }
                    ]
                },
                {
                    path: "system",
                    name: "system",
                    children: [
                        {
                            path: "menu_list",
                            name: "menu_list",
                            component: () => import('../views/admin/system/menu_list.vue'),
                        }
                    ]
                },
            ]
        }
    ]
})

export default router
