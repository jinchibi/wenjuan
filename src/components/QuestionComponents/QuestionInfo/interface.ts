/**
 * @description QuestionInfo 接口
 * @param { title: 标题, desc: 描述文字 }
 */

export type QuestionInfoPropsType = {
  title?: string
  desc?: string
  onChange?: (newProps: QuestionInfoPropsType) => void
  disabled?: boolean
}

export const QuestionInfoDefaultProps: QuestionInfoPropsType = {
  title: '标题内容',
  desc: '输入内容',
}
