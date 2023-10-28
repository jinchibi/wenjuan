import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'
import styles from './ManageLayout.module.scss'

const QuestionLayout: FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.left}>Manage Left</div>
      <div className={styles.right}>
        <Outlet />
      </div>
    </div>
  )
}

export default QuestionLayout
