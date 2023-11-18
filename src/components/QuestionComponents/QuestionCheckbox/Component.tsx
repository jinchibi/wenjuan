import { FC } from 'react'
import { QuestionCheckboxDefaultProps, QuestionCheckboxPropsType } from './interface'
import { Space, Typography, Checkbox } from 'antd'

const Component: FC<QuestionCheckboxPropsType> = (props: QuestionCheckboxPropsType) => {
  const { title, isVertical, list = [] } = { ...QuestionCheckboxDefaultProps, ...props }
  return (
    <div>
      <Typography>{title}</Typography>
      <Space direction={isVertical ? 'vertical' : 'horizontal'}>
        {list.map((opt, index) => {
          const { text, value, checked } = opt
          return (
            <Checkbox key={index} value={value} checked={checked}>
              {text}
            </Checkbox>
          )
        })}
      </Space>
    </div>
  )
}
export default Component
