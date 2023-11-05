import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '.'

// 为slice state定义一个类型
interface CounterState {
  num: number
}

// 使用该类型定义初始state
const initialState: CounterState = {
  num: 100,
}

export const counterSlice = createSlice({
  name: 'counter',
  // createSlice 将从initialState参数推断state类型
  initialState,
  reducers: {
    increment: state => {
      state.num += 1
    },
    decrement: (state, action: PayloadAction<number>) => {
      state.num -= action.payload
    },
  },
})

export const { increment, decrement } = counterSlice.actions
export const selectCount = (state: RootState) => state.counter.num
export default counterSlice.reducer
