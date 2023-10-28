import { FC, useState } from 'react'
import { data } from './listdata.js'
import QuestionCard from '../../components/QuestionCard'
import styles from './common.module.scss'
import { Typography, Empty } from 'antd'
import ListSearch from '../../components/ListSearch.js'

const { Title } = Typography

const Star: FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [questionList, setQuestionList] = useState(data)
  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>星标问卷</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>
        {/* 问卷列表 */}
        {questionList.length === 0 && <Empty />}
        {questionList.length > 0 &&
          questionList.map(
            (q: {
              _id: string
              title: string
              isStar: boolean
              isPublished: boolean
              answerCount: number
              createAt: string
            }) => {
              const { _id } = q
              return <QuestionCard key={_id} {...q} />
            }
          )}
      </div>
      <div className={styles.footer}>分页</div>
    </>
  )
}
export default Star
