import { FC } from 'react'
// import { useParams } from 'react-router-dom'
import styles from './index.module.scss'
import EditCanvas from './EditCanvas'
import useLoadQuestionData from '../../../hooks/useLoadQuestionData'
import { useAppDispatch } from '../../../store/hooks'
import { changeSelectedIdAction } from '../../../store/componentsReducer'
import LeftPanel from './LeftPanel'

const Edit: FC = () => {
  const { loading } = useLoadQuestionData()
  const dispatch = useAppDispatch()
  function clearSelectedId() {
    dispatch(changeSelectedIdAction(''))
  }
  return (
    <div className={styles.container}>
      <div className={styles.header} style={{ backgroundColor: '#fff', height: '40px' }}>
        Header
      </div>
      <div className={styles['content-wrapper']}>
        <div className={styles.content} onClick={clearSelectedId}>
          <div className={styles.left}>
            <LeftPanel />
          </div>
          <div className={styles.main}>
            <div className={styles['canvas-wrapper']}>
              <EditCanvas loading={loading} />
            </div>
          </div>
          <div className={styles.right}>right</div>
        </div>
      </div>
    </div>
  )
}
export default Edit
