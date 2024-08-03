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
export interface ContentState {
  userList: UserItem[];
  menuIndex: number;
}

// Initial state
const initialState: ContentState = {
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
      state.userList = state.userList.map((user) =>
        user.id === id ? { ...user, ...updatedValues } : user
      );
    },
    setMenuIndex: (state, action: PayloadAction<{ index: number }>) => {
      state.menuIndex = action.payload.index;
    },
    deleteItem: (state, action: PayloadAction<{ id: string }>) => {
      state.userList = state.userList.filter(
        (user) => user.id !== action.payload.id
      );
    },
    addItem: (
      state,
      action: PayloadAction<UserItem> // Expect a complete UserItem with an id
    ) => {
      const newItem = action.payload;
      state.userList.unshift(newItem);
    },
  },
});

// Export action creators
export const { editUsers, setList, setMenuIndex, deleteItem, addItem } =
  contentSlice.actions;

// Export reducer
export default contentSlice.reducer;
