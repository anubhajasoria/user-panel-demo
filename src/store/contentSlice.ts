import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the type for your state
export interface CounterState {
  userList: any[];
  menuIndex: number;
}

// Initial state
const initialState: CounterState = {
  userList: [],
  menuIndex: 0,
};

// Create the slice
const contentSlice = createSlice({
  name: "content",
  initialState,
  reducers: {
    setList: (state, action: PayloadAction<any>) => {
      state.userList = action.payload;
      // flag to check if user is in search  mode or not
    },
    editUserName: (state, action) => {
      state.userList[action.payload.index].username = action.payload.username;
      // state.searchList
      // to clear search results
    },
    setMenuIndex: (state, action) => {
      state.menuIndex = action.payload.index;
    },
  },
});

// Export action creators
export const { editUserName, setList, setMenuIndex } = contentSlice.actions;

// Export reducer
export default contentSlice.reducer;
