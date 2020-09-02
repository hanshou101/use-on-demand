declare module 'nuxt' {
  const Nuxt: {
    new(config: {}): any
  };

  const Builder: {
    new(nuxt: typeof Nuxt): any
  };

}
