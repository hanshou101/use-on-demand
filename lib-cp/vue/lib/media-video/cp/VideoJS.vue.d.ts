import { VideoJsPlayer } from 'video.js';
import Vue from 'vue';
declare type VideoBean = {
    src: string;
    type?: 'video/mp4' | string;
    poster: string;
    title: string;
};
declare const _default: import("vue/types/vue").ExtendedVue<Vue, {
    id: string;
    player: VideoJsPlayer;
    playerInited: boolean;
    currentVideo: any;
}, {
    initPlayer(): void;
    switchVideo(video: VideoBean, autoPlay: boolean): void;
    play(): void;
    pause(): void;
    isEmptyObject(obj: {}): boolean;
}, unknown, {
    video: any;
    autoInit: boolean;
    autoPlay: boolean;
    language: string;
}>;
export default _default;
//# sourceMappingURL=VideoJS.vue.d.ts.map