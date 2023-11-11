/**
 * @description 问卷 Title
 */

import Component from './Component'
import { QuestionTitleDefaultProps } from './interface'
import PropComponent from './PropComponent'

export * from './interface'
export default {
  title: '标题',
  type: 'questionTitle',
  Component, // 画布显示
  PropComponent, // 修改属性
  defaultProps: QuestionTitleDefaultProps,
}
