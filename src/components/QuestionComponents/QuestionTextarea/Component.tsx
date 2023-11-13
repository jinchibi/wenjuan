import { FC } from 'react'
import { QuestionTextareaDefaultProps, QuestionTextareaPropsType } from './interface'
import { Typography, Input } from 'antd'

const { Paragraph } = Typography
const { TextArea } = Input

const QuestionTextarea: FC<QuestionTextareaPropsType> = (props: QuestionTextareaPropsType) => {
  const { title, placeholder } = { ...QuestionTextareaDefaultProps, ...props }
  return (
    <div>
      <Paragraph style={{ margin: 0 }} strong>
        {title}
      </Paragraph>
      <div>
        <TextArea placeholder={placeholder} />
      </div>
    </div>
  )
}
export default QuestionTextarea
