import VideoJSCp from "./VideoJS.vue";

const cpName      = "VideoJS";
VideoJSCp.install = Vue => Vue.component(cpName, VideoJSCp);

export {
  VideoJSCp,
  cpName
};