import { defineStore } from "pinia";

export interface userInfoType {
  nick_name: string;
  role: number;
  user_id: number;
  avatar: string;
  token: string;
}

const userInfo: userInfoType = {
  nick_name: "nexttime",
  role: 0,
  user_id: 0,
  avatar: "/image/girl.jpg",
  token: "",
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
  },
  // 计算属性部分，对应组合式中的computed
  getters: {
    themeString(): string {
      return this.theme ? "light" : "dark";
    },
  },
});
