import { FC, useState } from 'react'
import { Spin, Result, Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useTitle } from 'ahooks'
import useLoadQuestionData from '../../../hooks/useLoadQuestionData'
import { useAppSelector } from '../../../store/hooks'
import styles from './index.module.scss'
import StatHeader from './StatHeader'
import PageStat from './PageStat'
import ComponentList from './ComponentList'
import ChartStat from './ChartStat'

const Stat: FC = () => {
  const { loading } = useLoadQuestionData()
  const { title, isPublished } = useAppSelector(state => state.pageInfo)
  const nav = useNavigate()
  // 状态提升
  const [selectedComponentId, setSelectedComponentId] = useState('')
  const [selectedComponentType, setSelectedComponentType] = useState('')

  // 修改标题
  useTitle(`问卷统计-${title}`)
  // loading状态
  const loadingElem = (
    <div style={{ textAlign: 'center' }}>
      <Spin />
    </div>
  )

  const genContentElem = () => {
    // 防止特殊情况，有人直接点了一个没有发布的页面
    if (typeof isPublished === 'boolean' && !isPublished) {
      return (
        <Result
          style={{ flex: 1 }}
          title="访问错误"
          status={'warning'}
          subTitle={'您访问的页面不存在'}
          extra={
            <Button type="primary" onClick={() => nav(-1)}>
              返回上一页
            </Button>
          }
        ></Result>
      )
    }
    return (
      <>
        <div className={styles.left}>
          <ComponentList
            selectedComponentId={selectedComponentId}
            setSelectedComponentId={setSelectedComponentId}
            setSelectedComponentType={setSelectedComponentType}
          />
        </div>
        <div className={styles.main}>
          <PageStat
            selectedComponentId={selectedComponentId}
            setSelectedComponentId={setSelectedComponentId}
            setSelectedComponentType={setSelectedComponentType}
          />
        </div>
        <div className={styles.right}>
          <ChartStat
            selectedComponentId={selectedComponentId}
            selectedComponentType={selectedComponentType}
          />
        </div>
      </>
    )
  }

  return (
    <div className={styles.container}>
      <StatHeader />
      <div className={styles['content-wrapper']}>
        {loading && loadingElem}
        <div className={styles.content}>{!loading && genContentElem()}</div>
      </div>
    </div>
  )
}
export default Stat
