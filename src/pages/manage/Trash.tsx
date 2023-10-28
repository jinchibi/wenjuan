import React, { FC, useState } from 'react'
import styles from './common.module.scss'
import { data } from './listdata.js'
import { Typography, Empty, Table, Tag, Space, Button, Modal } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import ListSearch from '../../components/ListSearch.js'

const { Title } = Typography
const { confirm } = Modal

const tableColumns = [
  {
    title: '标题',
    dataIndex: 'title',
  },
  {
    title: '是否发布',
    dataIndex: 'isPublished',
    render: (isPublished: boolean) => {
      return isPublished ? <Tag color="processing">已发布</Tag> : <Tag>未发布</Tag>
    },
  },
  {
    title: '问卷数量',
    dataIndex: 'answerCount',
  },
  {
    title: '发布时间',
    dataIndex: 'createAt',
  },
]

const Trash: FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [questionList, setQuestionList] = useState(data)
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  function del() {
    confirm({
      title: '确定是否删除该问卷吗?',
      content: '删除后不可恢复',
      icon: <ExclamationCircleOutlined />,
      onOk: () => {
        alert('success')
      },
    })
  }
  const tableElem = (
    <>
      <div style={{ marginBottom: '15px' }}>
        <Space>
          <Button type="primary" disabled={selectedIds.length === 0}>
            恢复
          </Button>
          <Button danger disabled={selectedIds.length === 0} onClick={del}>
            彻底删除
          </Button>
        </Space>
      </div>
      <Table
        dataSource={questionList}
        columns={tableColumns}
        rowKey={q => q._id}
        rowSelection={{
          type: 'checkbox',
          onChange: selectedRowKeys => {
            // console.log(selectedRowKeys)
            setSelectedIds(selectedRowKeys as string[])
          },
        }}
      />
    </>
  )
  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>回收站</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>
        {/* 问卷列表 */}
        {questionList.length === 0 && <Empty />}
        {questionList.length > 0 && tableElem}
      </div>
    </>
  )
}
export default Trash
