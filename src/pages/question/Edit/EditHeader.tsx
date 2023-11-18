import { FC, useState, ChangeEvent } from 'react'
import styles from './EditHeader.module.scss'
import { Button, Typography, Space, Input, message } from 'antd'
import { LeftOutlined, LoadingOutlined } from '@ant-design/icons'
import { useNavigate, useParams } from 'react-router-dom'
import EditToolBar from './EditToolBar'
import { EditOutlined } from '@ant-design/icons'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { changePageTitleAction } from '../../../store/pageInfoReducer'
import { useRequest, useKeyPress, useDebounceEffect } from 'ahooks'
import { updateQuestionService } from '../../../services/question'

const { Title } = Typography

// Title 显示和修改标题
const TitleElem: FC = () => {
  const { title } = useAppSelector(state => state.pageInfo)
  const [isInput, setIsInput] = useState(false)
  const dispatch = useAppDispatch()
  function handleValueChange(event: ChangeEvent<HTMLInputElement>) {
    const newTitle = event.target.value
    if (!newTitle) return
    dispatch(changePageTitleAction(newTitle))
  }
  if (isInput) {
    return (
      <Input
        value={title}
        onPressEnter={() => setIsInput(false)}
        onBlur={() => setIsInput(false)}
        onChange={handleValueChange}
      />
    )
  }
  return (
    <Space>
      <Title>{title}</Title>
      <Button type="text" icon={<EditOutlined />} onClick={() => setIsInput(true)} />
    </Space>
  )
}

// 保存按钮
const SaveButton: FC = () => {
  // 获取组件列表，页面信息，id
  const { id = '' } = useParams()
  const { componentList } = useAppSelector(state => state.components)
  const pageInfo = useAppSelector(state => state.pageInfo)
  const { run: save, loading } = useRequest(
    async () => {
      await updateQuestionService(id, { ...pageInfo, componentList })
    },
    {
      manual: true,
    }
  )
  // 设置快捷键ctrl.s
  useKeyPress('ctrl.s', (event: KeyboardEvent) => {
    event.preventDefault()
    if (!loading) save()
  })
  // 自动保存
  useDebounceEffect(
    () => {
      save()
    },
    [componentList, pageInfo],
    {
      wait: 1000,
    }
  )
  return (
    <Button
      type="text"
      onClick={save}
      disabled={loading}
      icon={loading ? <LoadingOutlined /> : null}
    >
      保存
    </Button>
  )
}

// 发布按钮
const PublishedButton: FC = () => {
  // 获取组件列表，页面信息，id
  const { id = '' } = useParams()
  const { componentList } = useAppSelector(state => state.components)
  const pageInfo = useAppSelector(state => state.pageInfo)
  const nav = useNavigate()
  const { run: pub, loading } = useRequest(
    async () => {
      await updateQuestionService(id, { ...pageInfo, componentList, isPublished: true })
    },
    {
      manual: true,
      onSuccess: () => {
        message.success('发布成功')
        nav('/question/stat/' + id)
      },
    }
  )
  return (
    <Button type="primary" onClick={pub} disabled={loading}>
      发布
    </Button>
  )
}

// 编辑器header
const EditHeader: FC = () => {
  const nav = useNavigate()
  return (
    <div className={styles['header-wrapper']}>
      <div className={styles.header}>
        <div className={styles.left}>
          <Space>
            <Button type="link" icon={<LeftOutlined />} onClick={() => nav(-1)}>
              返回
            </Button>
            <TitleElem />
          </Space>
        </div>
        <div className={styles.main}>
          <EditToolBar />
        </div>
        <div className={styles.right}>
          <Space>
            <SaveButton />
            <PublishedButton />
          </Space>
        </div>
      </div>
    </div>
  )
}
export default EditHeader
