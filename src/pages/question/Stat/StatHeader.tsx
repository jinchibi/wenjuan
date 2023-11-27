import { FC, useRef, useMemo } from 'react'
import styles from './StatHeader.module.scss'
import { Space, Button, Typography, Input, Tooltip, InputRef, message, Popover } from 'antd'
import { LeftOutlined, CopyOutlined, QrcodeOutlined } from '@ant-design/icons'
import { useAppSelector } from '../../../store/hooks'
import { useNavigate, useParams } from 'react-router-dom'
import { QRCodeSVG } from 'qrcode.react'

const { Title } = Typography

const StatHeader: FC = () => {
  const nav = useNavigate()
  const { id } = useParams()
  const { title, isPublished } = useAppSelector(state => state.pageInfo)
  const urlInputRef = useRef<InputRef>(null)
  // 拷贝
  function copy() {
    const elem = urlInputRef.current
    if (elem == null) return
    elem.select() // 选中内容
    // 复制
    document.execCommand('copy')
    message.success('复制成功')
  }
  // 生成链接和二维码 useMemo来缓存
  const linkAndQrCodeElem = useMemo(() => {
    if (!isPublished) return null
    // 拼接url
    const url = `http://127.0.0.1:5173/question/stat/${id}`
    // 二维码组件
    const QRCodeElem = (
      <div>
        <QRCodeSVG value={url} size={140} />
      </div>
    )
    return (
      <div className={styles.main}>
        <Space>
          <Input value={url} style={{ width: '400px' }} ref={urlInputRef} />
          <Tooltip title={'拷贝页面'}>
            <Button icon={<CopyOutlined />} onClick={copy} />
          </Tooltip>

          <Popover placement="bottom" content={QRCodeElem}>
            <Button icon={<QrcodeOutlined />} />
          </Popover>
        </Space>
      </div>
    )
  }, [isPublished, id])
  return (
    <div className={styles['header-wrapper']}>
      <div className={styles.header}>
        <div className={styles.left}>
          <Space>
            <Button type="link" icon={<LeftOutlined />} onClick={() => nav(-1)}>
              返回
            </Button>
            <Title style={{ fontSize: '18px', margin: 0 }}>{title}</Title>
          </Space>
        </div>
        <div className={styles.main}>{linkAndQrCodeElem}</div>
        <div className={styles.right}>
          <Button type="primary" onClick={() => nav(`/question/edit/${id}`)}>
            编辑问卷
          </Button>
        </div>
      </div>
    </div>
  )
}
export default StatHeader
