import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the type for a user item
interface UserItem {
  id: string;
  username: string;
  name: string;
  email: string;
  role: string;
  phone?: string;
  city?: string;
}

// Define the type for your state
export interface CounterState {
  userList: UserItem[];
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
    setList: (state, action: PayloadAction<UserItem[]>) => {
      state.userList = action.payload;
    },
    editUserName: (
      state,
      action: PayloadAction<{ index: number; username: string }>
    ) => {
      const { index, username } = action.payload;
      if (state.userList[index]) {
        state.userList[index].username = username;
      }
    },
    setMenuIndex: (state, action: PayloadAction<{ index: number }>) => {
      state.menuIndex = action.payload.index;
    },
  },
});

// Export action creators
export const { editUserName, setList, setMenuIndex } = contentSlice.actions;

// Export reducer
export default contentSlice.reducer;
