declare module '*.vue' {
  /**
   * WARN 这样写，是错误的：
   *        import Vue from 'types/vue';
   */
  import Vue from 'vue';
  // noinspection JSDuplicatedDeclaration
  export default Vue;
}
