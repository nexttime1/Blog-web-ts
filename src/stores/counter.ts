import { defineStore } from 'pinia'


const theme : boolean = true // true light false dark
export const useStore = defineStore('counter', {
  // 状态部分，对应组合式中的ref
  state()  {
  return {
  theme: theme,
  }
  },

  // 方法部分，对应组合式中的函数
  actions: {
    setTheme (localTheme?:boolean) : void {
      if (localTheme != undefined){
        this.theme = localTheme
    
      }else{
        this.theme = !this.theme
      }  
      document.documentElement.style.colorScheme = this.themeString
      document.body. setAttribute( 'arco-theme', this.themeString)
      localStorage.setItem('theme', JSON.stringify(this.themeString))
    
    },
    loadTheme(): void{



      const val = localStorage.getItem('theme')
      if(val == null){
        return
      }

      try {
        this.theme = JSON.parse(val)
        this.setTheme(this.theme)
      }catch (error) {
        
      }


    }
      
  },
  // 计算属性部分，对应组合式中的computed
  getters: {
  themeString(): string{
  return this. theme ? "light" : "dark"

  }
  }
  })
