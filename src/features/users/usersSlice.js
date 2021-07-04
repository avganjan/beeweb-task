import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
const initialState = []

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const response = await fetch('/api/users/names', {
        method: 'POST',
        body: JSON.stringify({status: 'Fetch users names!'}),
        headers: {'Content-Type': 'application/json' }
    }).then((resp)=> resp.json())
    // console.log(response)
    return response
})

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
    extraReducers: {
      [fetchUsers.fulfilled]: (state, action) => {
          // console.log(action)
          return action.payload
        },
      },
})

export default usersSlice.reducer
