import { ChangeEvent, FC, useEffect, useState } from 'react'
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom'
import { Input } from 'antd'
import { LIST_SEARCH_PARAM_KEY } from '../constant'

const { Search } = Input

const ListSearch: FC = () => {
  const [value, setValue] = useState('')
  // 获取路由参数
  const nav = useNavigate()
  const { pathname } = useLocation()
  const [searchParams] = useSearchParams()

  // 刷新时输入仍然保留在页面内
  useEffect(() => {
    const curVal = searchParams.get(LIST_SEARCH_PARAM_KEY) || ''
    setValue(curVal)
  }, [searchParams])

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value)
  }
  function handleSearch(value: string) {
    nav({
      pathname,
      search: `${LIST_SEARCH_PARAM_KEY}=${value}`,
    })
  }
  return (
    <>
      <Search
        placeholder="请输入关键字"
        allowClear
        value={value}
        style={{ width: '260px' }}
        onSearch={handleSearch}
        onChange={handleChange}
      />
    </>
  )
}
export default ListSearch
