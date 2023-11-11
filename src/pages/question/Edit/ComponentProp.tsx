import { FC } from 'react'
import { getComponentConfByType, ComponentPropsType } from '../../../components/QuestionComponents'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { changeComponentProps } from '../../../store/componentsReducer'

const NoProp: FC = () => {
  return <div style={{ textAlign: 'center' }}>未选中组件</div>
}

/**
 * @description 右侧面板属性组件,根据selectedId来显示组件
 */
const ComponentProp: FC = () => {
  const dispatch = useAppDispatch()
  // 获取当前选中的组件
  const { componentList, selectedId } = useAppSelector(state => state.components)
  const selectedComponent = componentList.find(c => c.fe_id === selectedId)
  if (selectedComponent == null) return <NoProp />
  // 获取选中组件的Prop配置
  const { type, props, isLocked, isHidden } = selectedComponent
  const componentConf = getComponentConfByType(type)
  if (componentConf == null) return <NoProp />
  const { PropComponent } = componentConf
  // 通过onChange获取组件更改后的值
  function propsChange(newProps: ComponentPropsType) {
    if (selectedComponent == null) return
    const { fe_id } = selectedComponent
    dispatch(changeComponentProps({ fe_id, newProps }))
    // console.log(newProps, 'newProps')
  }
  return <PropComponent onChange={propsChange} {...props} disabled={isLocked || isHidden} />
}
export default ComponentProp
