import { createSlice } from '@reduxjs/toolkit'
/**
 * @type {}
 */
const initialState = {
    questionsList: [],
    chossenQuestion: {},
}
// all question state and the chossen question state
export const counterSlice = createSlice({
  name: 'questionsSlice',
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