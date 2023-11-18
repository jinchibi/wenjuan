import { FC } from 'react'
import { Space, Tooltip, Button } from 'antd'
import {
  DeleteOutlined,
  EyeInvisibleOutlined,
  LockOutlined,
  CopyOutlined,
  BlockOutlined,
  UpOutlined,
  DownOutlined,
} from '@ant-design/icons'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import {
  deleteSelectedComponentAction,
  changeComponentHiddenAction,
  toggleComponentLockedAction,
  copiedComponentAction,
  pasteComponentAction,
  moveComponentAction,
} from '../../../store/componentsReducer'

const EditToolBar: FC = () => {
  const dispatch = useAppDispatch()
  const { selectedId, copiedComponent, componentList } = useAppSelector(state => state.components)
  const { isLocked } =
    useAppSelector(state => state.components.componentList.find(c => c.fe_id === selectedId)) || {}
  const selectedIndex = componentList.findIndex(c => c.fe_id === selectedId)
  // 删除选中组件
  function deleteHandler() {
    dispatch(deleteSelectedComponentAction())
  }
  // 隐藏/显示选中组件
  function hiddenHandler() {
    dispatch(changeComponentHiddenAction({ fe_id: selectedId, isHidden: true }))
  }
  // 锁定/解锁组件
  function lockHandler() {
    dispatch(toggleComponentLockedAction({ fe_id: selectedId }))
  }
  // 复制
  function copiedHandler() {
    dispatch(copiedComponentAction())
  }
  // 粘贴
  function pasteHandler() {
    dispatch(pasteComponentAction())
  }
  // 上移
  function upHandler() {
    dispatch(moveComponentAction({ oldIndex: selectedIndex, newIndex: selectedIndex - 1 }))
  }
  // 下移
  function downHandler() {
    dispatch(moveComponentAction({ oldIndex: selectedIndex, newIndex: selectedIndex + 1 }))
  }
  return (
    <>
      <Space>
        <Tooltip title="删除">
          <Button shape="circle" icon={<DeleteOutlined />} onClick={deleteHandler}></Button>
        </Tooltip>
        <Tooltip title="隐藏">
          <Button shape="circle" icon={<EyeInvisibleOutlined />} onClick={hiddenHandler}></Button>
        </Tooltip>
        <Tooltip title="锁定">
          <Button
            shape="circle"
            type={isLocked ? 'primary' : 'default'}
            icon={<LockOutlined />}
            onClick={lockHandler}
          ></Button>
        </Tooltip>
        <Tooltip title="复制">
          <Button shape="circle" icon={<CopyOutlined />} onClick={copiedHandler}></Button>
        </Tooltip>
        <Tooltip title="粘贴">
          <Button
            shape="circle"
            icon={<BlockOutlined />}
            onClick={pasteHandler}
            disabled={copiedComponent == null}
          ></Button>
        </Tooltip>
        <Tooltip title="上移">
          <Button
            shape="circle"
            icon={<UpOutlined />}
            onClick={upHandler}
            disabled={selectedIndex === 0}
          />
        </Tooltip>
        <Tooltip title="下移">
          <Button
            shape="circle"
            icon={<DownOutlined />}
            onClick={downHandler}
            disabled={selectedIndex === componentList.length - 1}
          />
        </Tooltip>
      </Space>
    </>
  )
}
export default EditToolBar
