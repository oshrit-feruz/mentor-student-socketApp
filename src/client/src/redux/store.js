import { configureStore } from '@reduxjs/toolkit'
import questionsReducer from './counter'

export const store = configureStore({
  reducer: {
    questions: questionsReducer
  },
})