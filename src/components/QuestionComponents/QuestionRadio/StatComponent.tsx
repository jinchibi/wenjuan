import { FC, useMemo } from 'react'
import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { QuestionRadioStatPropsType } from './interface'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28']

const StatComponent: FC<QuestionRadioStatPropsType> = ({ stat }) => {
  const sum = useMemo(() => {
    let s = 0
    stat.forEach(st => (s += st.count))
    return s
  }, [stat])
  return (
    <div
      style={{
        width: '400px',
        height: '200px',
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            dataKey="count"
            data={stat}
            cx="50%"
            cy="50%"
            outerRadius={80}
            label={i => `${i.name}:${((i.count / sum) * 100).toFixed(2)}%`}
          >
            {stat?.map((_, index) => {
              return <Cell key={index} fill={COLORS[index]} />
            })}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
export default StatComponent
