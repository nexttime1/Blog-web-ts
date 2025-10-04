import { defineStore } from "pinia";
import { Message } from "@arco-design/web-vue";
import { logoutApi } from "@/api/user_api";
import { parseToken } from "@/utils/jwt";
import { userInfoApi } from "@/api/user_api";




export interface userStoreInfoType {
  user_name: string;
  nick_name: string;
  role: number;
  user_id: number;
  avatar: string;
  token: string;
  exp : number;
}

const userInfo: userStoreInfoType = {
  user_name: "",
  nick_name: "nexttime",
  role: 0,
  user_id: 0,
  avatar: "/image/girl.jpg",
  token: "",
  exp: 0,
};

const theme: boolean = true; // true light false dark
export const useStore = defineStore("counter", {
  // 状态部分，对应组合式中的ref
  state() {
    return {
      theme: theme,
      collapsed: false, // 菜单折叠状态
      userInfo: userInfo,
    };
  },

  // 方法部分，对应组合式中的函数
  actions: {
    setTheme(localTheme?: boolean): void {
      if (localTheme !== undefined) {
        this.theme = localTheme;
      } else {
        this.theme = !this.theme;
      }
      document.documentElement.style.colorScheme = this.themeString;
      document.body.setAttribute("arco-theme", this.themeString);
      localStorage.setItem("theme", JSON.stringify(this.themeString));
    },
    loadTheme(): void {
      const val = localStorage.getItem("theme");
      if (val == null) {
        return;
      }

      try {
        const themeString = JSON.parse(val);
        // 直接设置 theme 状态，而不是调用 setTheme
        this.theme = themeString === "light";

        // 应用主题样式
        document.documentElement.style.colorScheme = themeString;
        document.body.setAttribute("arco-theme", themeString);
      } catch (error) {
        console.error("Error loading theme:", error);
      }
    },

    setCollapsed(collapsed: boolean): void {
      this.collapsed = collapsed;
    },

    // 设置token
    async setToken(token: string) {
      this.userInfo.token = token;
      let info = parseToken(token);
      let res = await userInfoApi();
      let data = res.data;

      this.userInfo = {
        user_name: data.user_name,
        nick_name: data.nick_name,
        role: info.role,
        user_id: info.user_id,
        avatar: data.avatar,
        token: token,
        exp: info.exp,
      };

      Object.assign(this.userInfo, info);
      localStorage.setItem("userInfo", JSON.stringify(this.userInfo));
    },
    // 加载token
    loadToken() {
      let val = localStorage.getItem("userInfo");
      if (val === null) {
        return;
      }
      try {
        this.userInfo = JSON.parse(val);
      } catch (e) {
        this.clearUserInfo();
        return;
      }
      // 判断token是不是过期了
      let exp = Number(this.userInfo.exp) * 1000;
      let nowTime = new Date().getTime();
      if (exp - nowTime <= 0) {
        // 过期
        Message.warning("登录已过期");
        this.clearUserInfo();
        return;
      }
    },
    // 注销
    async logout() {
      await logoutApi();
      this.clearUserInfo();
    },
    // 清空用户信息
    clearUserInfo() {
      this.userInfo = userInfo;
      localStorage.removeItem("userInfo");
    },
  },
  // 计算属性部分，对应组合式中的computed
  getters: {
    themeString(): string {
      return this.theme ? "light" : "dark";
    },
    isLogin(): boolean {
      return this.userInfo.role !== 0;
    },
    isAdmin(): boolean {
      return this.userInfo.role === 1;
    },
    isTourist(): boolean {
      return this.userInfo.role === 3;
    }
    
  },
});
