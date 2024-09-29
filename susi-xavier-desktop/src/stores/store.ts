import { configureStore } from "@reduxjs/toolkit";
import avatarReducer from "./AvatarSlice";

export const store = configureStore({
  reducer: {
    avatar: avatarReducer,
  },
})