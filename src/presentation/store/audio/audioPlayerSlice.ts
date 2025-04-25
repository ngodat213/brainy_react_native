import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AudioState {
  currentPlayingId: string | null;
}

const initialState: AudioState = {
  currentPlayingId: null,
};

const audioPlayerSlice = createSlice({
  name: 'audioPlayer',
  initialState,
  reducers: {
    playAudio: (state, action: PayloadAction<string>) => {
      state.currentPlayingId = action.payload;
    },
    stopAudio: (state) => {
      state.currentPlayingId = null;
    },
  },
});

export const { playAudio, stopAudio } = audioPlayerSlice.actions;

export default audioPlayerSlice.reducer;