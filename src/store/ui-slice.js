import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  showPopup: false,
  selectedAlbum: null,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState: initialState,
  reducer: {
    selectedAlbum(state, action) {
      state.selectedAlbum = action.payload;
    },
    showPopup(state) {
      state.showPopup = true;
    },
    hidePopup(state) {
      state.showPopup = false;
    },
  },
});

export const uiAction = uiSlice.action;
export default uiSlice.reducer;
