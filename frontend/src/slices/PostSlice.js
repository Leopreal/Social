import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import PostService from "../services/PostService";

const initialState = {
  posts: [],
  post: {},
  error: false,
  sucess: false,
  loading: false,
  message: null,
};

// funcoes

// funcao publicar post
export const publishPost = createAsyncThunk(
  "post/publish",
  async (post, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    const data = await PostService.publishPost(post, token);

    // checando erros

    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
  }
);

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    resetMessage: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(publishPost.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(publishPost.fulfilled, (state, action) => {
        state.loading = false;
        state.sucess = true;
        state.error = null;
        state.post = action.payload;
        state.posts.unshift(state.post);
        state.message = "Post Publicado";
      })
      .addCase(publishPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.post = {};
      });
  },
});

export const { resetMessage } = postSlice.actions;
export default postSlice.reducer;
