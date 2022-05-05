import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchTodos = createAsyncThunk(
  'todos/fetchTodos',
  async function(_, {rejectWithValue}) {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')
      if (!response.ok) {
        throw new Error('Server Error!')
      }
      return response.json()
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const deleteTodo = createAsyncThunk(
  'todos/deleteTodo',
  async function(id, {rejectWithValue, dispatch}) {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        method: 'DELETE'
      })
      if (!response.ok) {
        throw new Error('Can\'t delete task. Server Error!')
      }
      dispatch(removeTodo({id}))
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const toggleStatus = createAsyncThunk(
  'todos/toggleStatus',
  async function(id, {rejectWithValue, dispatch, getState}) {
    const todo = getState().todos.todos.find(todo => todo.id === id)
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          completed: !todo.completed,
        }),
      })

      if (!response.ok) {
        throw new Error('Can\'t toggle status. Server Error!')
      }

      dispatch(toggleComplete({id}))
    } catch (error) {
      rejectWithValue(error.message)
    }
  }
)

export const addNewTodo = createAsyncThunk(
  'todos/addNewTodo',
  async function(text, {rejectWithValue, dispatch})  {
    try {
      const todo = {
        title: text,
        userId: 1,
        completed: false,
      }
      const response = await fetch('https://jsonplaceholder.typicode.com/todos/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(todo),
      })

      if (!response.ok) {
        throw new Error('Can\'t add task. Server Error!')
      }

      const data = await response.json()

      dispatch(addTodo({data}))
    } catch (error) {
      rejectWithValue(error.message)
    }
  }
)

const setError = (state, action) => {
  state.status = 'rejected'
  state.error = action.payload
}

const taskSliceStore = createSlice({
  name: 'todo',
  initialState: {
    todos: [],
    status: null,
    error: null,
  },
  reducers: {
    addTodo(state, action) {
      state.todos.push(action.payload.data)
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
  extraReducers: {
    [fetchTodos.pending]: (state) => {
      state.status = 'loading'
      state.error = null
    },
    [fetchTodos.fulfilled]: (state,action) => {
      state.status = 'resolved'
      state.todos = action.payload
    },
    [fetchTodos.rejected]: setError,
    [deleteTodo.rejected]: setError,
    [toggleStatus.rejected]: setError,
  }
})

const { addTodo, removeTodo, toggleComplete } = taskSliceStore.actions

export default taskSliceStore.reducer