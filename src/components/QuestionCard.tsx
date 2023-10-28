import { FC } from 'react'
import styles from './QuestionCard.module.scss'
import { useNavigate, Link } from 'react-router-dom'
import { Button, Divider, Space, Tag, Popconfirm, Modal, message } from 'antd'
import {
  EditOutlined,
  LineChartOutlined,
  StarOutlined,
  CopyOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons'

type PropsType = {
  _id: string
  title: string
  isStar: boolean
  isPublished: boolean
  answerCount: number
  createAt: string
}

const { confirm } = Modal

const QuestionCard: FC<PropsType> = (props: PropsType) => {
  const { _id, title, createAt, answerCount, isPublished, isStar } = props
  const nav = useNavigate()
  function duplicate() {
    message.success('确定')
  }
  function del() {
    confirm({
      title: '是否删除该问卷?',
      icon: <ExclamationCircleOutlined />,
      onOk: () => {
        message.success('success')
      },
    })
  }
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div className={styles.left}>
          <Link to={isPublished ? `/question/stat/${_id}` : `/question/edit/${_id}`}>
            <Space>
              {isStar && <StarOutlined style={{ color: 'orange' }} />}
              {title}
            </Space>
          </Link>
        </div>
        <div className={styles.right}>
          <Space>
            {isPublished ? <Tag color="processing">已发布</Tag> : <Tag>未发布</Tag>}
            <span>答卷:{answerCount}</span>
            <span>{createAt}</span>
          </Space>
        </div>
      </div>
      <Divider />
      <div className={styles['button-container']}>
        <div className={styles.left}>
          <Space>
            <Button
              type="text"
              icon={<EditOutlined />}
              size="small"
              onClick={() => nav(`/question/edit/${_id}`)}
            >
              编辑问卷
            </Button>
            <Button
              type="text"
              size="small"
              icon={<LineChartOutlined />}
              onClick={() => nav(`/question/stat/${_id}`)}
              disabled={!isPublished}
            >
              数据统计
            </Button>
          </Space>
        </div>
        <div className={styles.right}>
          <Button type="text" size="small" icon={<StarOutlined />}>
            {isStar ? '取消星标' : '标星'}
          </Button>
          <Popconfirm title="确定复制该问卷" okText="确定" cancelText="取消" onConfirm={duplicate}>
            <Button type="text" size="small" icon={<CopyOutlined />}>
              复制
            </Button>
          </Popconfirm>
          <Button type="text" size="small" icon={<DeleteOutlined />} onClick={del}>
            删除
          </Button>
        </div>
      </div>
    </div>
  )
}
export default QuestionCard
