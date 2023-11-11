import { FC } from 'react'
import QuestionInputConf, { QuestionInputPropsType } from './QuestionInput'
import QuestionTitleConf, { QuestionTitlePropsType } from './QuestionTitle'

// 统一 各个组件的prop type
export type ComponentPropsType = QuestionInputPropsType & QuestionTitlePropsType

// 统一 组件的配置type
export type ComponentConfType = {
  title: string
  type: string
  Component: FC<ComponentPropsType>
  PropComponent: FC<ComponentPropsType>
  defaultProps: ComponentPropsType
}

// 全部组件配置的列表
const componentConfList: ComponentConfType[] = [QuestionInputConf, QuestionTitleConf]

// 组件分组，在左侧的时候用
export const componentConfGroup = [
  {
    groupName: '文本显示',
    components: [QuestionTitleConf],
  },
  {
    groupName: '用户输入',
    components: [QuestionInputConf],
  },
]

// 获取配置
export function getComponentConfByType(type: string) {
  // 根据type来查找组件
  return componentConfList.find(c => c.type === type)
}
