import { hookstate, useHookstate } from "@hookstate/core";

export interface IRadio {
  id: string;
  name: string;
  stream: string;
}

export interface IRadioState {
  radio: IRadio;
  playing: boolean;
  muted: boolean;
}

const initialState = hookstate({
  radio: {
    id: "",
    name: "",
    stream: "",
  },
  playing: false,
  muted: false,
});

export const useGlobalState = () => {
  const state = useHookstate<IRadioState>(initialState);

  return {
    getRadio: () => state.radio.value,
    getPlaying: () => state.playing.value,
    getMuted: () => state.muted.value,
    setRadio: (radio: IRadio) => {
      state.radio.set({
        id: radio.id,
        name: radio.name,
        stream: radio.stream,
      });
    },
    setPlaying: (flag: boolean) => {
      state.playing.set(flag);
    },
    setMuted: (flag: boolean) => {
      state.muted.set(flag);
    },
  };
};
