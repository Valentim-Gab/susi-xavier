import { createSlice } from '@reduxjs/toolkit'

const avatarSlice = createSlice({
  name: 'avatar',
  initialState: null,
  reducers: {
    setAvatar: (_state, action) => action.payload,
    clearAvatar: () => null,
  },
})

export const { setAvatar, clearAvatar } = avatarSlice.actions

export default avatarSlice.reducer
