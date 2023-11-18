import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type PageInfoType = {
  title: string
  desc?: string
  js?: string
  css?: string
}

const initialState: PageInfoType = {
  title: '',
  desc: '',
  js: '',
  css: '',
}

const pageInfoSlice = createSlice({
  name: 'pageInfo',
  initialState,
  reducers: {
    resetPageInfoAction: (_state: PageInfoType, action: PayloadAction<PageInfoType>) => {
      return action.payload
    },
    changePageTitleAction: (state: PageInfoType, action: PayloadAction<string>) => {
      state.title = action.payload
    },
  },
})

export const { resetPageInfoAction, changePageTitleAction } = pageInfoSlice.actions
export default pageInfoSlice.reducer
