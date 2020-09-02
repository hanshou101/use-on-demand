import HelloWorldCp from "./HelloWorld.vue.js";

const cpName         = "HelloWorld";
HelloWorldCp.install = Vue => Vue.component(cpName, HelloWorldCp);

export {
  HelloWorldCp,
  cpName,
};
