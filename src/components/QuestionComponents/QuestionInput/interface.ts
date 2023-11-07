/**
 * @description QuestionInput 接口
 * @param { title: 标题, placeholder: 默认文字 }
 */
export type QuestionInputPropsType = {
  title?: string
  placeholder?: string
}

export const QuestionInputDefaultProps: QuestionInputPropsType = {
  title: '标题内容',
  placeholder: '请输入',
}
