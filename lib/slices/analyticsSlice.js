import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { analyticsData } from '../staticData'

export const fetchAnalytics = createAsyncThunk(
  'analytics/fetchAnalytics',
  async ({ startDate, endDate, region }) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500))
    let filteredData = { ...analyticsData }
    if (region && region !== 'All') {
      filteredData.usersByRegion = analyticsData.usersByRegion.filter(item => item.region === region)
    }
    return filteredData
  }
)

const analyticsSlice = createSlice({
  name: 'analytics',
  initialState: {
    data: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnalytics.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchAnalytics.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.data = action.payload
      })
      .addCase(fetchAnalytics.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export default analyticsSlice.reducer

