import { FC, useEffect, useState } from 'react'
import { Typography } from 'antd'
import { useRequest } from 'ahooks'
import { useParams } from 'react-router-dom'
import { getComponentStatServer } from '../../../services/stat'
import { getComponentConfByType } from '../../../components/QuestionComponents'

const { Title } = Typography

type PropsType = {
  selectedComponentId: string
  selectedComponentType: string
}

const ChartStat: FC<PropsType> = (props: PropsType) => {
  const { selectedComponentId, selectedComponentType } = props
  const [stat, setStat] = useState([])
  const { id } = useParams()
  // 获取数据
  const { run } = useRequest(
    async (questionId, componentId) => await getComponentStatServer(questionId, componentId),
    {
      manual: true,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onSuccess(res: any) {
        setStat(res.stat)
        console.log(stat)
      },
    }
  )
  useEffect(() => {
    if (selectedComponentId) run(id, selectedComponentId)
  }, [id, run, selectedComponentId])
  // 生成图表
  function genStatElem() {
    if (!selectedComponentId) return <div>未选中组件</div>
    const { StatComponent } = getComponentConfByType(selectedComponentType) || {}
    if (!StatComponent) return <div>该组件无统计组件</div>
    return (
      <div>
        <StatComponent stat={stat} />
      </div>
    )
  }
  return (
    <div>
      <Title level={3}>图表统计</Title>
      {genStatElem()}
    </div>
  )
}
export default ChartStat
