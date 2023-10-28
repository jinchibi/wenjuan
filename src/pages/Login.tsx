import { FC, useEffect } from 'react'
import { Space, Typography, Form, Button, Input, Checkbox } from 'antd'
import { Link } from 'react-router-dom'
import { UserAddOutlined } from '@ant-design/icons'
import styles from './Login.module.scss'
import { REGISTER_PATHNAME } from '../router'

const { Title } = Typography

const USERNAME_KEY = 'username'
const PASSWORD_KEY = 'password'

// 记忆化存储的一系列方法
function rememberUser(username: string, password: string) {
  localStorage.setItem(USERNAME_KEY, username)
  localStorage.setItem(PASSWORD_KEY, password)
}

function deleteUserInfoFromStorage() {
  localStorage.removeItem(USERNAME_KEY)
  localStorage.removeItem(PASSWORD_KEY)
}

function getUserInfoFromStorage() {
  return {
    username: localStorage.getItem(USERNAME_KEY),
    password: localStorage.getItem(PASSWORD_KEY),
  }
}

interface IForm {
  username: string
  password: string
  remember: boolean
}

const Login: FC = () => {
  const [form] = Form.useForm()
  // 设置值到form组件中
  useEffect(() => {
    const { username, password } = getUserInfoFromStorage()
    form.setFieldsValue({ username, password })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  // 提交注册时触发的回调
  function onFinish(value: IForm) {
    console.log(value)
    const { username, password, remember } = value
    if (remember) {
      rememberUser(username, password)
    } else {
      deleteUserInfoFromStorage()
    }
  }
  return (
    <div className={styles.container}>
      <div>
        <Space>
          <Title>
            <UserAddOutlined />
          </Title>
          <Title>登录</Title>
        </Space>
      </div>
      <div>
        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinish}
          initialValues={{ remember: true }}
          form={form}
        >
          <Form.Item
            label="用户名"
            name={'username'}
            rules={[
              { required: true, message: '请输入密码' },
              { type: 'string', min: 5, max: 20, message: '字符长度在5-20之间' },
              { pattern: /^\w+$/, message: '只能是字母数字下划线' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="密码"
            name={'password'}
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 6, span: 16 }} name={'remember'} valuePropName="checked">
            <Checkbox>记住我</Checkbox>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
            <Space>
              <Button type="primary" htmlType="submit">
                注册
              </Button>
              <Link to={REGISTER_PATHNAME}>注册新用户</Link>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
export default Login
