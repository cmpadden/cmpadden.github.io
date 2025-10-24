declare module '#app' {
  interface NuxtApp {
    $p5: () => Promise<any>;
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $p5: () => Promise<any>;
  }
}

export {};
