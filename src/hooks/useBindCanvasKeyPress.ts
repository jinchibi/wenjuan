import { useKeyPress } from 'ahooks'
import { useAppDispatch } from '../store/hooks'
import {
  deleteSelectedComponentAction,
  copiedComponentAction,
  pasteComponentAction,
  downarrowSelectedAction,
  uparrowSelectedAction,
} from '../store/componentsReducer'

// 判断是否合法
function isActiveElemValid() {
  const activeElem = document.activeElement
  // 没有focus到input上
  if (activeElem === document.body) return true
  // 适配dnd kit
  if (activeElem?.matches('div[role="button"]')) return true
  // console.log(activeElem)
  return false
}

function useBindCanvasKeyPress() {
  const dispatch = useAppDispatch()
  // 删除组件
  useKeyPress(['backspace', 'delete'], () => {
    // 防止input也删除
    if (!isActiveElemValid()) return
    dispatch(deleteSelectedComponentAction())
  })
  // 复制组件
  useKeyPress(['ctrl.c', 'meta.c'], () => {
    dispatch(copiedComponentAction())
  })
  // 粘贴组件
  useKeyPress(['ctrl.v', 'meta.v'], () => {
    dispatch(pasteComponentAction())
  })
  // 向上
  useKeyPress(['uparrow'], () => {
    dispatch(uparrowSelectedAction())
  })
  // 向下
  useKeyPress(['downarrow'], () => {
    dispatch(downarrowSelectedAction())
  })
}

export default useBindCanvasKeyPress
