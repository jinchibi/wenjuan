import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counterSlice'
import userReducer from './userSlice'

const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
  },
})
export default store
// 从store本身推断出`RootState`和`AppDispatch`类型
export type RootState = ReturnType<typeof store.getState>
// 推断出类型:
export type AppDispatch = typeof store.dispatch
