import { FC, useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '../../../store/hooks'
import { Form, Input } from 'antd'
import { PageInfoType, resetPageInfoAction } from '../../../store/pageInfoReducer'

const { TextArea } = Input

const PageSetting: FC = () => {
  const [form] = Form.useForm()
  const dispatch = useAppDispatch()
  const pageInfo = useAppSelector(state => state.pageInfo) as PageInfoType
  useEffect(() => {
    form.setFieldsValue(pageInfo)
  }, [pageInfo, form])
  function handleValuesChange() {
    dispatch(resetPageInfoAction(form.getFieldsValue()))
  }
  return (
    <Form
      layout="vertical"
      initialValues={pageInfo}
      form={form}
      onValuesChange={handleValuesChange}
    >
      <Form.Item
        label="问卷标题"
        name={'title'}
        rules={[{ required: true, message: '请输入标题' }]}
      >
        <Input placeholder="请输入标题" />
      </Form.Item>
      <Form.Item label="问卷描述" name={'desc'}>
        <TextArea placeholder="请输入描述信息" />
      </Form.Item>
      <Form.Item label="css样式" name={'css'}>
        <TextArea placeholder="css代码" />
      </Form.Item>
      <Form.Item label="js代码" name={'js'}>
        <TextArea placeholder="js代码" />
      </Form.Item>
    </Form>
  )
}
export default PageSetting
