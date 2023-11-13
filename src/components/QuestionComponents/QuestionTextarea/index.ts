/**
 * @description 问卷textarea
 */

import Component from './Component'
import { QuestionTextareaDefaultProps } from './interface'
import PropComponent from './PropComponent'

export * from './interface'

export default {
  title: '多行输入',
  type: 'questionTextarea',
  Component,
  PropComponent,
  defaultProps: QuestionTextareaDefaultProps,
}
