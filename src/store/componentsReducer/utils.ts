import { ComponentInfoType, ComponentStateType } from './index'

/**
 * @description 获取下一个selectedId
 * @param fe_id 当前的id
 * @param componentList 组件列表
 */
export function getNextSelectedId(fe_id: string, componentList: ComponentInfoType[]) {
  const length = componentList.length
  let newSelectedId = ''
  const index = componentList.filter(c => !c.isHidden).findIndex(c => c.fe_id === fe_id)
  if (index === -1) return ''
  else {
    if (length <= 1) return ''
    // 组件多于两个
    else {
      // 最后一个
      if (index + 1 === length) {
        newSelectedId = componentList[index - 1].fe_id
      } else {
        newSelectedId = componentList[index + 1].fe_id
      }
    }
  }
  return newSelectedId
}

export function insertNewComponent(state: ComponentStateType, newComponent: ComponentInfoType) {
  const { selectedId, componentList } = state
  const newComponentList = [...componentList]
  // 获取当前选中的元素index
  const index = componentList.findIndex(c => c.fe_id === selectedId)
  // 未选中任何组件，插入到最后
  if (index < 0) {
    newComponentList.push(newComponent)
  } else {
    // 插入到选中元素后面
    newComponentList.splice(index + 1, 0, newComponent)
  }
  // 设置添加后的新组件为选中状态
  state.selectedId = newComponent.fe_id
  state.componentList = newComponentList
}
