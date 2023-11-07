import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ComponentPropsType } from '../../components/QuestionComponents'
// import { produce } from 'immer'

export type ComponentInfoType = {
  fe_id: string
  type: string
  title: string
  props: ComponentPropsType
}

export type ComponentStateType = {
  // 选中组件的id
  selectedId: string
  // 组件列表
  componentList: Array<ComponentInfoType>
}

const initialState: ComponentStateType = {
  selectedId: '',
  componentList: [],
  // 其他扩展
}

export const componentSlice = createSlice({
  name: 'components',
  initialState,
  reducers: {
    // 重置所有组件
    resetComponentAction: (
      _state: ComponentStateType,
      action: PayloadAction<ComponentStateType>
    ) => {
      return action.payload
    },
    // 修改id 不知道为什么用immer会报错
    // changeSelectedIdAction: produce((draft, action: PayloadAction<string>) => {
    //     draft.selectedId = action.payload
    //     console.log(draft.selectedId)
    //     console.log(action.payload)
    //     return draft
    // }),
    changeSelectedIdAction: (state: ComponentStateType, action: PayloadAction<string>) => {
      state.selectedId = action.payload
    },
  },
})

export const { resetComponentAction, changeSelectedIdAction } = componentSlice.actions
export default componentSlice.reducer
