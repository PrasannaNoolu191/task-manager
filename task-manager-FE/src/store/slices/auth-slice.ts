import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  id: string | null;
  username: string | null;
  email: string | null;
  //   token: string | null;
  avatar?: string;
}

const initialState: UserState = {
  id: null,
  username: null,
  email: null,
  //   token: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserState>) {
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.avatar = action.payload.avatar;
      //   state.token = action.payload.token;
    },
    clearUser(state) {
      state.id = null;
      state.username = null;
      state.email = null;
      state.avatar = "";
      //   state.token = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
