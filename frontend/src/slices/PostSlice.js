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

    if (!postData.id) {
      return thunkAPI.rejectWithValue("ID do post é indefinido.");
    }

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

// pegando post pelo id
export const getPost = createAsyncThunk(
  "post/getpost",
  async (id, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    const data = await PostService.getPost(id, token);

    return data;
  }
);

// like
export const like = createAsyncThunk("post/like", async (id, thunkAPI) => {
  const token = thunkAPI.getState().auth.user.token;
  const data = await PostService.like(id, token);

  if (data.errors) {
    return thunkAPI.rejectWithValue(data.errors[0]);
  }

  return data;
});

// comentarios

export const comment = createAsyncThunk(
  "post/comment",
  async (commentData, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    const data = await PostService.comment(
      { comment: commentData.comment },
      commentData.id,
      token
    );

    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
  }
);

// pegando todos os posts
export const getPosts = createAsyncThunk(
  "posts/getall",
  async (_, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    const data = await PostService.getPosts(token);

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
        const updatedPost = state.posts.find(
          (post) => post._id === action.payload._id
        );
        if (updatedPost) {
          updatedPost.title = action.payload.title;
          updatedPost.post = action.payload.post;
        }

        state.message = "Post atualizado com sucesso!";
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.post = {};
      })
      .addCase(getPost.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getPost.fulfilled, (state, action) => {
        state.loading = false;
        state.sucess = true;
        state.error = null;
        state.post = action.payload;
      })
      .addCase(like.fulfilled, (state, action) => {
        state.loading = false;
        state.sucess = true;
        state.error = null;
        const { postId, userId } = action.payload;

        if (state.post._id === postId) {
          if (!state.post.likes.includes(userId)) {
            state.post.likes.push(userId);
          } else {
            state.post.likes = state.post.likes.filter((id) => id !== userId);
          }
        }
        const postIndex = state.posts.findIndex((post) => post._id === postId);

        if (postIndex !== -1) {
          if (!state.posts[postIndex].likes.includes(userId)) {
            state.posts[postIndex].likes.push(userId);
          } else {
            state.posts[postIndex].likes = state.posts[postIndex].likes.filter(
              (id) => id !== userId
            );
          }
        }
        state.message = action.payload.message;
      })
      .addCase(like.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(comment.fulfilled, (state, action) => {
        state.loading = false;
        state.sucess = true;
        state.error = null;

        state.post.comments.push(action.payload.comment);

        state.message = action.payload.message;
      })
      .addCase(comment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getPosts.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.sucess = true;
        state.error = null;
        state.posts = action.payload;
      });
  },
});

export const { resetMessage } = postSlice.actions;
export default postSlice.reducer;
