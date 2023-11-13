import { FC } from 'react'
import { componentConfGroup, ComponentConfType } from '../../../components/QuestionComponents'
import { Typography } from 'antd'
import styles from './ComponentLib.module.scss'
import { useAppDispatch } from '../../../store/hooks'
import { nanoid } from 'nanoid'
import { addComponentAction } from '../../../store/componentsReducer'

const { Title } = Typography

function genComponent(c: ComponentConfType) {
  const { title, type, Component, defaultProps } = c
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const dispatch = useAppDispatch()
  function handleClick() {
    dispatch(
      addComponentAction({
        fe_id: nanoid(),
        title,
        type,
        props: defaultProps,
      })
    )
  }
  return (
    <div
      className={styles.wrapper}
      onClick={handleClick}
      key={type}
      style={{ backgroundColor: '#F7F7F7' }}
    >
      <div className={styles.component}>
        <Component />
      </div>
    </div>
  )
}

const Lib: FC = () => {
  return (
    <>
      {componentConfGroup.map((group, index) => {
        return (
          <div key={group.groupName}>
            <Title level={3} style={{ fontSize: '16px', marginTop: index > 0 ? '20px' : '0' }}>
              {group.groupName}
            </Title>
            <div>{group.components.map(c => genComponent(c))}</div>
          </div>
        )
      })}
    </>
  )
}
export default Lib
