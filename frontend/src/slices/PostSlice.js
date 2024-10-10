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

// pegar post do user
export const getUserPosts = createAsyncThunk(
  "posts/userpost",
  async (id, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    const data = await PostService.getUserPost(id, token);

    return data;
  }
);

// deletar post

export const deletePost = createAsyncThunk(
  "post/delete",
  async (id, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    const data = await PostService.deletePost(id, token);

    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
  }
);

// atualizar post

export const updatePost = createAsyncThunk(
  "post/update",
  async (postData, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    const data = await PostService.updatePost(
      { title: postData.title, post: postData.post },
      postData.id,
      token
    );

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
      })
      .addCase(getUserPosts.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getUserPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.sucess = true;
        state.error = null;
        state.posts = action.payload;
      })
      .addCase(deletePost.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.loading = false;
        state.sucess = true;
        state.error = null;
        state.posts = state.posts.filter((post) => {
          return post._id !== action.payload.id;
        });

        state.message = action.payload.message;
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.post = {};
      })
      .addCase(updatePost.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.loading = false;
        state.sucess = true;
        state.error = null;
        // ---------------------------ARRUMAR-----------------------------
        // state.posts.map((post) => {
        //   if (post._id === action.payload.post._id) {
        //     return (post.title = action.payload.post.title);
        //   }
        //   if (post._id === action.payload.post._id) {
        //     return (post.post = action.payload.post.post);
        //   }

        //   return post;
        // });

        // state.message = action.payload.message;

        // const updatedPosts = state.posts.map((post) => {
        //   if (post._id === action.payload.post._id) {
        //     return {
        //       ...post,
        //       title: action.payload.post.title,
        //       post: action.payload.post.post,
        //     };
        //   }
        //   return post;
        // });

        // state.posts = updatedPosts;
        // state.message = action.payload.message;
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.post = {};
      });
  },
});

export const { resetMessage } = postSlice.actions;
export default postSlice.reducer;
