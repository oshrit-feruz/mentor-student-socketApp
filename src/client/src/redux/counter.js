import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    questionsList: [],
    chossenQuestion: {},
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
   
    setQuestionsList: (state, action) => {
        state.questionsList = action.payload
      },
      setChossenQuestion: (state, action) => {
        state.chossenQuestion = action.payload
      },
  },
})

// Action creators are generated for each case reducer function
export const { setQuestionsList ,setChossenQuestion} = counterSlice.actions

export default counterSlice.reducer