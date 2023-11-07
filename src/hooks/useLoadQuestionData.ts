import { useParams } from 'react-router-dom'
import { useRequest } from 'ahooks'
import { getQuestionService } from '../services/question'
import { useEffect } from 'react'
import { useAppDispatch } from '../store/hooks'
import { resetComponentAction } from '../store/componentsReducer'

function useLoadQuestionData() {
  const { id = '' } = useParams()
  // ajax加载
  const { loading, data, error, run } = useRequest(
    async (id: string) => {
      if (!id) throw new Error('没有ID')
      const data = await getQuestionService(id)
      return data
    },
    {
      manual: true,
    }
  )
  // 根据获取的data存到redux store
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (!data) return
    const { componentList = [] } = data
    // 默认选中第一个组件
    let selectedId = ''
    if (componentList.length > 0) {
      selectedId = componentList[0].fe_id
    }
    dispatch(
      resetComponentAction({
        componentList,
        selectedId,
      })
    )
  }, [data, dispatch])
  // 根据id变化来加载数据
  useEffect(() => {
    run(id)
  }, [id, run])
  return {
    loading,
    error,
  }
}

export default useLoadQuestionData
