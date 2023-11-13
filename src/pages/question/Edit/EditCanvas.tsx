import { FC, MouseEvent } from 'react'
import styles from './EditCanvas.module.scss'
import { Spin } from 'antd'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { getComponentConfByType } from '../../../components/QuestionComponents'
import { ComponentInfoType, changeSelectedIdAction } from '../../../store/componentsReducer'
import classNames from 'classnames'
import useBindCanvasKeyPress from '../../../hooks/useBindCanvasKeyPress'

type PropsType = {
  loading: boolean
}

// 获取到每个组件
function getComponent(component: ComponentInfoType) {
  // 得到每个组件的配置，根据type去找组件，并且把props添加上
  const { type, props } = component
  const componentConf = getComponentConfByType(type)
  if (componentConf == null) return null
  const { Component } = componentConf
  return <Component {...props} />
}

const EditCanvas: FC<PropsType> = ({ loading }) => {
  useBindCanvasKeyPress()
  // 获取每个组件中信息
  const { componentList, selectedId } = useAppSelector(state => state.components)
  const dispatch = useAppDispatch()
  function handleClick(event: MouseEvent, id: string) {
    event.stopPropagation()
    dispatch(changeSelectedIdAction(id))
  }
  if (loading) {
    return (
      <div style={{ textAlign: 'center' }}>
        <Spin />
      </div>
    )
  }
  return (
    <div className={styles.canvas}>
      {/* 不得不说，这封装的有点帅 */}
      {componentList
        .filter(c => !c.isHidden)
        .map(c => {
          const { fe_id, isLocked } = c
          // 拼接class name
          const wrapperDefaultClassName = styles['component-wrapper']
          const selectedClassName = styles.selected
          const lockedClassName = styles.locked
          const wrapperClassName = classNames({
            [wrapperDefaultClassName]: true,
            [selectedClassName]: fe_id === selectedId,
            [lockedClassName]: isLocked,
          })
          return (
            <div key={fe_id} className={wrapperClassName} onClick={e => handleClick(e, fe_id)}>
              <div className={styles.component}>{getComponent(c)}</div>
            </div>
          )
        })}
    </div>
  )
}
export default EditCanvas
