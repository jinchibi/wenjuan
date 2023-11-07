import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counterReducer'
import userReducer, { UserState } from './userReducer'
import componentsReducer, { ComponentStateType } from './componentsReducer'

export type StateType = {
  user: UserState
  components: ComponentStateType
}

const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    components: componentsReducer,
  },
})
export default store
// 从store本身推断出`RootState`和`AppDispatch`类型
export type RootState = ReturnType<typeof store.getState>
// 推断出类型:
export type AppDispatch = typeof store.dispatch
