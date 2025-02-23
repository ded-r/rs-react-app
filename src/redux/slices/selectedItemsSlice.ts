import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SelectedItem {
  name: string;
  url: string;
}

interface SelectedItemsState {
  items: SelectedItem[];
}

const initialState: SelectedItemsState = {
  items: [],
};

const selectedItemsSlice = createSlice({
  name: 'selectedItems',
  initialState,
  reducers: {
    toggleItemSelection: (state, action: PayloadAction<SelectedItem>) => {
      const index = state.items.findIndex(
        (item) =>
          item.name === action.payload.name && item.url === action.payload.url
      );
      if (index > -1) {
        state.items.splice(index, 1);
      } else {
        state.items.push(action.payload);
      }
    },
    clearSelections: (state) => {
      state.items = [];
    },
  },
});

export const { toggleItemSelection, clearSelections } =
  selectedItemsSlice.actions;
export default selectedItemsSlice.reducer;
