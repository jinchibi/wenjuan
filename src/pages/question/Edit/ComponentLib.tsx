import { FC } from 'react'
import { componentConfGroup } from '../../../components/QuestionComponents'
import { Typography } from 'antd'

const { Title } = Typography

const Lib: FC = () => {
  return (
    <>
      {componentConfGroup.map((group, index) => {
        return (
          <div key={group.groupName}>
            <Title level={3} style={{ fontSize: '16px', marginTop: index > 0 ? '20px' : '0' }}>
              {group.groupName}
            </Title>
          </div>
        )
      })}
    </>
  )
}
export default Lib
