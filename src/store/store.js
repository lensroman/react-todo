import { configureStore } from '@reduxjs/toolkit'

import todoReducer from './taskSliceStore'

export default configureStore({
  reducer: {
    todos: todoReducer,
  }
})