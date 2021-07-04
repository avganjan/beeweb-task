import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit'

// that is the post's object pattern, that I leave here
const initialState = [
  // {
  //   id: '1',
  //   title: 'First Post!',
  //   content: 'Hello!',
  //   user: '0',
  //   date: sub(new Date(), { minutes: 10 }).toISOString(),
  //   reactions: {
  //     thumbsUp: 0,
  //     hooray: 0,
  //     heart: 0,
  //     rocket: 0,
  //     eyes: 0,
  //   },
  // },
]

export const getPostsOutOfDB = createAsyncThunk('posts/getPostsOutOfDB',
    async () => {

      // Some async action for storing data to DB
      try {
        const response = await fetch('/api/users/post/getting', {
          method: 'POST',
          body: JSON.stringify({status: 'Getting users posts!'}),
          headers: {'Content-Type': 'application/json' }
        }).then((resp)=> resp.json())
        console.log(response)
        // if properly stored to DB send to redux
        if (response) return response

      } catch (e) {
        alert('Something gone wrong!')
      }
    })

export const postAddedToDB = createAsyncThunk('posts/postAddedToDB',
    async ({title, content, userId}) => {
  // Store post as an object
  const obj = {
    id: nanoid(),
    date: new Date().toISOString(),
    title,
    content,
    user: userId,
    reactions: {
      thumbsUp: 0,
      hooray: 0,
      heart: 0,
      rocket: 0,
      eyes: 0,
    },
  }

  // Some async action for storing data to DB
      try {

        const response = await fetch('/api/users/post/added', {
          method: 'POST',
          body: JSON.stringify({obj}),
          headers: {'Content-Type': 'application/json' }
        }).then((resp)=> resp.json())
        console.log(response)
        // if properly stored to DB send to redux
        if (response.status) return obj

      } catch (e) {
        alert('Something gone wrong!')
      }
})

export const postUpdatedInDB = createAsyncThunk('posts/postUpdatedInDB',
    async ({id, title, content}) => {

      // Some async action for storing data to DB
      try {

        const response = await fetch('/api/users/post/updated', {
          method: 'PUT',
          body: JSON.stringify({id, title, content}),
          headers: {'Content-Type': 'application/json' }
        }).then((resp)=> resp.json())
        // console.log(response)
        // if properly stored to DB send to redux
        if (response.status) return {id, title, content}

      } catch (e) {
        alert('Something gone wrong!')
      }
    })

export const postDeleted = createAsyncThunk('posts/postDeleted',
    async (id) => {

      // Some async action for storing data to DB
      try {

        const response = await fetch('/api/users/post/delete', {
          method: 'DELETE',
          body: JSON.stringify({id}),
          headers: {'Content-Type': 'application/json' }
        }).then((resp)=> resp.json())
        console.log(response)
        // if properly stored to DB send to redux
        if (response.status) return {id}

      } catch (e) {
        alert('Something gone wrong!')
      }
    })

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action) {
        state.push(action.payload)
      },
      prepare(title, content, userId) {
        return {
          payload: {
            id: nanoid(),
            date: new Date().toISOString(),
            title,
            content,
            user: userId,
            reactions: {
              thumbsUp: 0,
              hooray: 0,
              heart: 0,
              rocket: 0,
              eyes: 0,
            },
          },
        }
      },
    },
    reactionAdded(state, action) {
      const { postId, reaction } = action.payload
      const existingPost = state.find((post) => post.id === postId)
      if (existingPost) {
        existingPost.reactions[reaction]++
      }
    },
    postUpdated(state, action) {
      const { id, title, content } = action.payload
      const existingPost = state.find((post) => post.id === id)
      if (existingPost) {
        existingPost.title = title
        existingPost.content = content
      }
    },
  },
  extraReducers: {
    [getPostsOutOfDB.fulfilled]: (state, action)=> {
      console.log('Posts received!')
      console.log(action)
      return action.payload
    },
    [postAddedToDB.fulfilled]: (state, action) => {
      // console.log(action)
      // return action.payload
      state.push(action.payload)
    },
    [postUpdatedInDB.fulfilled]: (state, action)=> {
      console.log(action)
      const { id, title, content } = action.payload
      const existingPost = state.find((post) => post.id === id)

      if (existingPost) {
        existingPost.title = title
        existingPost.content = content
      }
    },
    [postDeleted.fulfilled]: (state, action)=> {
      console.log(state)
      const { id } = action.payload
      console.log('Post deleted!')
      return state.filter((post) => post.id !== id)
    }
  }
})

export const { reactionAdded } = postsSlice.actions

export default postsSlice.reducer
