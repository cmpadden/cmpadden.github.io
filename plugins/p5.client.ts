let p5Promise: Promise<any> | null = null;

export default defineNuxtPlugin(() => {
  const loadP5 = async () => {
    if (!p5Promise) {
      p5Promise = import("p5").then((mod) => mod.default ?? mod);
    }
    return p5Promise;
  };

  return {
    provide: {
      p5: loadP5,
    },
  };
});
