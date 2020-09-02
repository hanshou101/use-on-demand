declare module 'soundjs' {
  // interface CreateJS {
  const Sound: SoundClass;                  //
  // }

  interface SoundClass {
    on(eventName: string, cb: (event: any) => void): void;              //
    alternateExtensions: Array<string>;                                 //
    registerSound(option: {                                             //
      src: string,
      id: string,
    }): void;                                                           //
    play(soundName: string): void;                                      //
  }
}
