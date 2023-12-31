export type OptionType = {
  value: string
  text: string
}

export type QuestionRadioPropsType = {
  title?: string
  isVertical?: boolean
  options?: OptionType[]
  // 当前选中的value
  value?: string
  onChange?: (newProps: QuestionRadioPropsType) => void
  disabled?: boolean
}

export const QuestionRadioDefaultProps: QuestionRadioPropsType = {
  title: '单选标题',
  isVertical: false,
  options: [
    { value: 'item1', text: '选项一' },
    { value: 'item2', text: '选项二' },
    { value: 'item3', text: '选项三' },
  ],
  value: 'item1',
}

// 统计图表的类型
export type QuestionRadioStatPropsType = {
  stat: Array<{ name: string; count: number }>
}
