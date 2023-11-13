import { FC } from 'react'
import { QuestionInfoPropsType, QuestionInfoDefaultProps } from './interface'
import { Typography } from 'antd'

const { Title, Paragraph } = Typography

const QuestionInfo: FC<QuestionInfoPropsType> = (props: QuestionInfoPropsType) => {
  const { title, desc = '' } = { ...QuestionInfoDefaultProps, ...props }
  const descList = desc.split('\n')
  return (
    <div style={{ textAlign: 'center' }}>
      <Title style={{ fontSize: '22px' }}>{title}</Title>
      <Paragraph>
        {descList.map((d, index) => {
          return (
            <span>
              {index > 0 && <br />}
              {d}
            </span>
          )
        })}
      </Paragraph>
    </div>
  )
}
export default QuestionInfo
