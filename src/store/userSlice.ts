import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '.'

export interface UserState {
  username: string
  nickname: string
}

const initialState: UserState = {
  username: '',
  nickname: '',
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginAction: (_: unknown, action: PayloadAction<UserState>) => {
      // 设置username和nickname
      return action.payload
    },
    logoutAction: () => initialState,
  },
})

export const { loginAction, logoutAction } = userSlice.actions
export const selectUsername = (state: RootState) => state.user.username
export const selectNickname = (state: RootState) => state.user.nickname
export default userSlice.reducer
