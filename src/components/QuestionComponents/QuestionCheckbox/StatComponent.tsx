import { FC } from 'react'
import { QuestionCheckboxStatPropsType } from './interface'

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
const StatComponent: FC<QuestionCheckboxStatPropsType> = ({ stat }) => {
  return (
    <div style={{ width: '400px', height: '450px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart width={150} height={40} data={stat}>
          <Bar dataKey="count" fill="#8884d8" />
          <XAxis />
          <YAxis />
          <Tooltip />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
export default StatComponent
