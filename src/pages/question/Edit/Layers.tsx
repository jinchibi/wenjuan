import { FC, useState, ChangeEvent } from 'react'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import {
  changeComponentHiddenAction,
  changeComponentTitleAction,
  changeSelectedIdAction,
  moveComponentAction,
  toggleComponentLockedAction,
} from '../../../store/componentsReducer'
import styles from './Layers.module.scss'
import { message, Input, Button, Space } from 'antd'
import classNames from 'classnames'
import { EyeInvisibleOutlined, BlockOutlined } from '@ant-design/icons'
import SortableContainer from '../../../components/DragSortable/SortableContainer'
import SortableItem from '../../../components/DragSortable/SortableItem'

const Layers: FC = () => {
  const { componentList, selectedId } = useAppSelector(state => state.components)
  const dispatch = useAppDispatch()
  const [changingTitleId, setChangingTitleId] = useState('')

  // 点击选中组件
  function handleTitleClick(fe_id: string) {
    const curComp = componentList.find(c => c.fe_id === fe_id)
    if (curComp && curComp.isHidden) {
      message.info('不能选中隐藏的组件')
      return
    }
    if (fe_id !== selectedId) {
      // 未被选中 ,执行选中
      dispatch(changeSelectedIdAction(fe_id))
      setChangingTitleId('')
      return
    }
    setChangingTitleId(fe_id)
  }

  // 当同步Input修改
  function changeTitle(event: ChangeEvent<HTMLInputElement>) {
    const newTitle = event.target.value.trim()
    if (!newTitle) return
    if (!selectedId) return
    dispatch(changeComponentTitleAction({ fe_id: selectedId, title: newTitle }))
  }
  // 隐藏
  function changeHidden(fe_id: string, isHidden: boolean) {
    dispatch(changeComponentHiddenAction({ fe_id, isHidden }))
  }
  // 锁定
  function changeLocked(fe_id: string) {
    dispatch(toggleComponentLockedAction({ fe_id }))
  }
  // 每个SortableContainer组件都需要有个id属性
  const componentListWithId = componentList.map(c => ({ ...c, id: c.fe_id }))
  // 拖拽排序结束触发
  function handleDragEnd(oldIndex: number, newIndex: number) {
    // console.log(oldIndex, newIndex)
    dispatch(moveComponentAction({ oldIndex, newIndex }))
  }
  return (
    <SortableContainer items={componentListWithId} onDragEnd={handleDragEnd}>
      {componentList.map(c => {
        const { fe_id, title, isHidden, isLocked } = c
        // 拼接 title className
        const titleDefaultClassName = styles.title
        const selectedClassName = styles.selected
        const titleClassName = classNames({
          [titleDefaultClassName]: true,
          [selectedClassName]: fe_id === selectedId,
        })
        return (
          <SortableItem key={fe_id} id={fe_id}>
            <div className={styles.wrapper}>
              <div className={titleClassName} onClick={() => handleTitleClick(fe_id)}>
                {changingTitleId === fe_id && (
                  <Input
                    value={title}
                    onChange={changeTitle}
                    onBlur={() => setChangingTitleId('')}
                    onPressEnter={() => setChangingTitleId('')}
                  />
                )}
                {changingTitleId !== fe_id && title}
              </div>
              <div className={styles.handler}>
                <Space>
                  <Button
                    shape="circle"
                    className={!isHidden ? styles.btn : ''}
                    icon={<EyeInvisibleOutlined />}
                    type={isHidden ? 'primary' : 'text'}
                    onClick={() => changeHidden(fe_id, !isHidden)}
                  />
                  <Button
                    shape="circle"
                    className={!isLocked ? styles.btn : ''}
                    icon={<BlockOutlined />}
                    type={isLocked ? 'primary' : 'text'}
                    onClick={() => changeLocked(fe_id)}
                  />
                </Space>
              </div>
            </div>
          </SortableItem>
        )
      })}
    </SortableContainer>
  )
}

export default Layers
