declare module "vue-typed-js" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{
    strings: string[];
    typeSpeed?: number;
    backSpeed?: number;
    loop?: boolean;
  }>;
  export default component;
}

