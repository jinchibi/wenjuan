import { FC, useState } from 'react'
import styles from './common.module.scss'
import QuestionCard from '../../components/QuestionCard'
import { data } from './listdata.js'
import { Typography } from 'antd'
import ListSearch from '../../components/ListSearch.js'

const { Title } = Typography

const List: FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [questionList, setQuestionList] = useState(data)
  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>我的问卷</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>
        {/* 问卷列表 */}
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
      <div className={styles.footer}>loadmore</div>
    </>
  )
}
export default List
