import { FC } from 'react'
import { Typography } from 'antd'
import { QuestionTitlePropsType, QuestionTitleDefaultProps } from './interface'

const { Title } = Typography

const QuestionTitle: FC<QuestionTitlePropsType> = props => {
  const { text, isCenter, level = 1 } = { ...QuestionTitleDefaultProps, ...props }
  const getFontSize = (level: number) => {
    if (level === 1) return '24px'
    if (level === 2) return '20px'
    if (level === 3) return '16px'
    return '16px'
  }
  return (
    <Title
      level={level}
      style={{
        textAlign: isCenter ? 'center' : 'start',
        marginBottom: 0,
        marginTop: 0,
        fontSize: getFontSize(level),
      }}
    >
      {text}
    </Title>
  )
}
export default QuestionTitle
