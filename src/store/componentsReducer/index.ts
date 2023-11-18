import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ComponentPropsType } from '../../components/QuestionComponents'
import { getNextSelectedId, insertNewComponent } from './utils'
import cloneDeep from 'lodash.clonedeep'
import { nanoid } from 'nanoid'
import { arrayMove } from '@dnd-kit/sortable'

// import { produce } from 'immer'

export type ComponentInfoType = {
  fe_id: string
  type: string
  title: string
  props: ComponentPropsType
  isHidden?: boolean
  isLocked?: boolean
}

export type ComponentStateType = {
  // 选中组件的id
  selectedId: string
  // 组件列表
  componentList: Array<ComponentInfoType>
  // 复制后的组件(用于复制按钮)
  copiedComponent: ComponentInfoType | null
}

const initialState: ComponentStateType = {
  selectedId: '',
  componentList: [],
  copiedComponent: null,
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
    // 添加新组件
    addComponentAction: (state: ComponentStateType, action: PayloadAction<ComponentInfoType>) => {
      const newComponent = action.payload
      insertNewComponent(state, newComponent)
    },
    // 修改组件属性
    changeComponentProps: (
      state: ComponentStateType,
      action: PayloadAction<{ fe_id: string; newProps: ComponentPropsType }>
    ) => {
      const { fe_id, newProps } = action.payload
      const newComponentList = state.componentList
      const curComponent = newComponentList.find(c => c.fe_id === fe_id)
      if (curComponent) {
        curComponent.props = {
          ...curComponent.props,
          ...newProps,
        }
      }
      state.componentList = newComponentList
    },
    // 删除选中的组件
    deleteSelectedComponentAction: (state: ComponentStateType) => {
      const { componentList, selectedId: removeId } = state
      const newComponentList = [...componentList]
      const index = newComponentList.findIndex(c => c.fe_id === removeId)
      state.selectedId = getNextSelectedId(removeId, newComponentList)
      newComponentList.splice(index, 1)
      state.componentList = newComponentList
    },
    // 隐藏/显示选中组件
    changeComponentHiddenAction: (
      state: ComponentStateType,
      action: PayloadAction<{ fe_id: string; isHidden: boolean }>
    ) => {
      const { componentList } = state
      const { fe_id, isHidden } = action.payload
      const newComponentList = [...componentList]
      // 重新计算selectedId
      let newSelectedId = ''
      if (isHidden) {
        newSelectedId = getNextSelectedId(fe_id, newComponentList)
      } else {
        newSelectedId = fe_id
      }
      state.selectedId = newSelectedId
      const curComponent = newComponentList.find(c => c.fe_id === fe_id)
      if (curComponent) {
        curComponent.isHidden = isHidden
      }
      state.componentList = newComponentList
    },
    // 锁定/解锁组件
    toggleComponentLockedAction: (
      state: ComponentStateType,
      action: PayloadAction<{ fe_id: string }>
    ) => {
      const { fe_id } = action.payload
      const curComponent = state.componentList.find(c => c.fe_id === fe_id)
      if (curComponent) {
        curComponent.isLocked = !curComponent.isLocked
      }
    },
    // 复制组件
    copiedComponentAction: (
      state: ComponentStateType
      // action: PayloadAction<{ fe_id: string }>
    ) => {
      const { componentList, selectedId } = state
      // const { fe_id } = action.payload
      const curComponent = componentList.find(c => c.fe_id === selectedId)
      if (curComponent) {
        state.copiedComponent = cloneDeep(curComponent)
      }
    },
    // 粘贴
    pasteComponentAction: (state: ComponentStateType) => {
      const { copiedComponent } = state
      const newCopiedComp = { ...copiedComponent } as ComponentInfoType
      // fe_id不能相同
      newCopiedComp.fe_id = nanoid()
      state.copiedComponent = newCopiedComp
      if (state.copiedComponent) {
        insertNewComponent(state, state.copiedComponent)
      }
    },
    // 向上移
    uparrowSelectedAction: (state: ComponentStateType) => {
      const { componentList, selectedId } = state
      const index = componentList.findIndex(c => c.fe_id === selectedId)
      const length = componentList.length
      if (index < 0) return
      state.selectedId = componentList[(index - 1 + length) % length].fe_id
    },
    // 向下移
    downarrowSelectedAction: (state: ComponentStateType) => {
      const { componentList, selectedId } = state
      const index = componentList.findIndex(c => c.fe_id === selectedId)
      if (index < 0) return
      state.selectedId = componentList[(index + 1) % componentList.length].fe_id
    },
    // 改变标题
    changeComponentTitleAction: (
      state: ComponentStateType,
      actions: PayloadAction<{ fe_id: string; title: string }>
    ) => {
      const { fe_id, title } = actions.payload
      const newComponent = [...state.componentList]
      const curComp = newComponent.find(c => c.fe_id === fe_id)
      // console.log(title)
      curComp!.title = title
      state.componentList = newComponent
    },
    // 移动组件
    moveComponentAction: (
      state: ComponentStateType,
      actions: PayloadAction<{ oldIndex: number; newIndex: number }>
    ) => {
      const { oldIndex, newIndex } = actions.payload
      const { componentList } = state
      const newComponentList = [...componentList]
      state.componentList = arrayMove(newComponentList, oldIndex, newIndex)
    },
  },
})

export const {
  resetComponentAction,
  changeSelectedIdAction,
  addComponentAction,
  changeComponentProps,
  deleteSelectedComponentAction,
  changeComponentHiddenAction,
  toggleComponentLockedAction,
  copiedComponentAction,
  pasteComponentAction,
  downarrowSelectedAction,
  uparrowSelectedAction,
  changeComponentTitleAction,
  moveComponentAction,
} = componentSlice.actions
export default componentSlice.reducer
