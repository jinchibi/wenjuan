import { FC, useEffect } from 'react'
import { QuestionRadioPropsType, OptionType } from './interface'
import { Form, Input, Checkbox, Select, Button, Space } from 'antd'
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons'
import { nanoid } from 'nanoid'

const PropComponent: FC<QuestionRadioPropsType> = (props: QuestionRadioPropsType) => {
  const [form] = Form.useForm()
  const { title, value, isVertical, options = [], onChange, disabled } = props
  useEffect(() => {
    form.setFieldsValue({ title, value, options, isVertical })
  }, [title, value, options, isVertical, form])
  function handleValuesChange() {
    if (onChange == null) return
    const newValues = form.getFieldsValue() as QuestionRadioPropsType
    const { options = [] } = newValues
    options.forEach(opt => {
      if (opt.value) return
      opt.value = nanoid(5)
    })
    onChange(newValues)
  }
  return (
    <Form
      layout="vertical"
      initialValues={{ title, value, options, isVertical }}
      onChange={handleValuesChange}
      disabled={disabled}
      form={form}
    >
      <Form.Item label="标题" name={'title'} rules={[{ required: true, message: '请输入标题' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="选项">
        <Form.List name={'options'}>
          {(fields, { add, remove }) => (
            <>
              {/* 遍历所有的选项 */}
              {fields.map(({ key, name }, index) => {
                return (
                  <Space key={key} align="baseline">
                    <Form.Item
                      name={[name, 'text']}
                      rules={[
                        { required: true, message: '请输入选项文字' },
                        // 校验：不能和其他选项重复
                        {
                          validator: (_, text) => {
                            const { options = [] } = form.getFieldsValue()
                            let num = 0
                            options.forEach((opt: OptionType) => {
                              if (opt.text === text) num++
                            })
                            if (num === 1) return Promise.resolve()
                            else return Promise.reject(new Error('和其他选项重复了'))
                          },
                        },
                      ]}
                    >
                      <Input placeholder="请输入选项文字" />
                    </Form.Item>
                    {/* 删除按钮 */}
                    {index > 1 && <MinusCircleOutlined onClick={() => remove(name)} />}
                  </Space>
                )
              })}
              {/* 添加按钮 */}
              <Form.Item>
                <Button
                  type="link"
                  icon={<PlusOutlined />}
                  block
                  onClick={() => add({ text: '', value: '' })}
                >
                  添加选项
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form.Item>
      <Form.Item label="默认选中" name="value">
        <Select
          value={value}
          options={options.map(({ text, value }) => ({ value, label: text || '' }))}
        ></Select>
      </Form.Item>
      <Form.Item name="isVertical" valuePropName="checked">
        <Checkbox>竖向排列</Checkbox>
      </Form.Item>
    </Form>
  )
}
export default PropComponent
