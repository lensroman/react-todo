import { createSlice } from '@reduxjs/toolkit'

const todoSlice = createSlice({
  name: 'todo',
  initialState: {
    todos: [],
  },
  reducers: {
    addTodo(state, action) {
      if (action.payload.text.trim().length) {
        state.todos.push({
          id: new Date().toISOString(),
          text: action.payload.text,
          completed: false,
        })
      }
    },
    removeTodo(state, action) {
      state.todos = state.todos.filter(todo => todo.id !== action.payload.id)
    },
    toggleComplete(state, action) {
      state.todos.map(todo => {
        if (todo.id !== action.payload.id) return todo
        return todo.completed = !todo.completed
      })
    }
  },
})

export const { addTodo, removeTodo, toggleComplete } = todoSlice.actions

export default todoSlice.reducer