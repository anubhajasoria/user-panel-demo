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
    editUsers: (
      state,
      action: PayloadAction<{ id: string; updatedValues: Partial<UserItem> }>
    ) => {
      const { id, updatedValues } = action.payload;
      state.userList = state.userList.map((obj) =>
        obj.id === id ? { ...obj, ...updatedValues } : obj
      );
    },
    setMenuIndex: (state, action: PayloadAction<{ index: number }>) => {
      state.menuIndex = action.payload.index;
    },
    deleteItem: (state, action: PayloadAction<{ id: string }>) => {
      state.userList = state.userList.filter((e) => e.id !== action.payload.id);
    },
  },
});

// Export action creators
export const { editUsers, setList, setMenuIndex, deleteItem } =
  contentSlice.actions;

// Export reducer
export default contentSlice.reducer;
