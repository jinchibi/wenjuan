import { FC, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useRequest } from 'ahooks'
import { useAppSelector } from '../../../store/hooks'
import { getQuestionStatListServer } from '../../../services/stat'
import { Spin, Typography, Table, Pagination } from 'antd'

type PropsType = {
  selectedComponentId: string
  setSelectedComponentId: (id: string) => void
  setSelectedComponentType: (type: string) => void
}

const { Title } = Typography

const PageStat: FC<PropsType> = (props: PropsType) => {
  const { selectedComponentId, setSelectedComponentId, setSelectedComponentType } = props
  const { componentList } = useAppSelector(state => state.components)
  const { id = '' } = useParams()
  const [total, setTotal] = useState(0)
  const [list, setList] = useState([])
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  // 获取统计数据
  const { loading } = useRequest(
    async () => {
      const res = await getQuestionStatListServer(id, { page, pageSize })
      return res
    },
    {
      refreshDeps: [id, page, pageSize],
      onSuccess(res) {
        const { total, list = [] } = res
        setTotal(total)
        setList(list)
      },
    }
  )
  // 点击联动左边
  function handleClick(curId: string, type: string) {
    setSelectedComponentId(curId)
    setSelectedComponentType(type)
  }
  const columns = componentList.map(c => {
    const { fe_id, title, props = {}, type } = c
    return {
      title: (
        <div style={{ cursor: 'pointer' }} key={fe_id} onClick={() => handleClick(fe_id, type)}>
          <span style={{ color: fe_id === selectedComponentId ? '#1890ff' : 'inherit' }}>
            {props.title || title}
          </span>
        </div>
      ),
      dataIndex: fe_id,
    }
  })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dataSource = list.map((l: any) => ({ ...l, key: l._id }))
  const TableElem = (
    <>
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        style={{ fontSize: '12px' }}
      />
      <Pagination
        total={total}
        pageSize={pageSize}
        current={page}
        onChange={page => setPage(page)}
        onShowSizeChange={(page, pageSize) => {
          setPage(page)
          setPageSize(pageSize)
        }}
        style={{ textAlign: 'center' }}
      />
    </>
  )
  return (
    <div>
      <Title level={3}>答卷数量: {!loading && total}</Title>
      {loading && (
        <div style={{ textAlign: 'center' }}>
          <Spin />
        </div>
      )}
      {!loading && TableElem}
    </div>
  )
}
export default PageStat
