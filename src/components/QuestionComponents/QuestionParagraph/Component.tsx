import { FC } from 'react'
import { QuestionParagraphPropsType, QuestionParagraphDefaultProps } from './interface'
import { Typography } from 'antd'

const { Paragraph } = Typography

const QuestionParagraph: FC<QuestionParagraphPropsType> = (props: QuestionParagraphPropsType) => {
  const { text, isCenter } = { ...QuestionParagraphDefaultProps, ...props }
  // 实现换行
  const textList = text?.split('\n')
  return (
    <Paragraph style={{ textAlign: isCenter ? 'center' : 'start', marginBottom: 0 }}>
      {textList?.map((t, index) => {
        return (
          <span key={index}>
            {/* 第一行换行 */}
            {index > 0 && <br />}
            {t}
          </span>
        )
      })}
    </Paragraph>
  )
}
export default QuestionParagraph
