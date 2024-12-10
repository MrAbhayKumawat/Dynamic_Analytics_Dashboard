import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { users } from '../staticData'

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async () => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500))
    return users
  }
)

const userSlice = createSlice({
  name: 'users',
  initialState: {
    list: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    deleteUser: (state, action) => {
      state.list = state.list.filter(user => user.id !== action.payload)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.list = action.payload
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export const { deleteUser } = userSlice.actions

export default userSlice.reducer

