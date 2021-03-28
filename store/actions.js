import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

import fetcher from '../utils/fetcher';

export const setStoreState = createAction('setStoreState');
export const toggleCommentingPost = createAction('toggleCommentingPost');

export const loadWhoami = createAsyncThunk('loadWhoami', async (ctx, { rejectWithValue }) => {
  const response = await fetcher(`https://freefeed.net/v2/users/whoami`, {}, ctx);
  const data = await response.json();
  if (!response.ok) return rejectWithValue(data);
  return data;
});

export const loadHomePage = createAsyncThunk('loadHomePage', async (ctx, { rejectWithValue }) => {
  const response = await fetcher(`https://freefeed.net/v2/timelines/home?offset=0`, {}, ctx);
  const data = await response.json();
  if (!response.ok) return rejectWithValue(data);
  return data;
});

export const loadUserPage = createAsyncThunk('loadUserPage', async (ctx, { rejectWithValue }) => {
  const { user: username } = ctx.query;
  const response = await fetcher(`https://freefeed.net/v2/timelines/${username}?offset=0`, {}, ctx);
  const data = await response.json();
  if (!response.ok) return rejectWithValue(data);
  return data;
});

export const loadPostPage = createAsyncThunk('loadPostPage', async (ctx, { rejectWithValue }) => {
  const { post: postId, likes: maxLikes } = ctx.query;
  const response = await fetcher(`https://freefeed.net/v2/posts/${postId}?maxComments=all&maxLikes=${maxLikes}`, {}, ctx);
  const data = await response.json();
  if (!response.ok) return rejectWithValue(data);
  return data;
});

export const loadMoreComments = createAsyncThunk('loadMoreComments', async postId => {
  const data = await fetcher(`https://freefeed.net/v2/posts/${postId}?maxComments=all`).then(r => r.json());
  return { postId, data };
});

export const loadMoreLikes = createAsyncThunk('loadMoreLikes', async postId => {
  const data = await fetcher(`https://freefeed.net/v2/posts/${postId}?maxLikes=all`).then(r => r.json());
  return { postId, data };
});

export const likeUnlikePost = createAsyncThunk('likeUnlikePost', async ([postId, verb]) => {
  await fetcher(`https://freefeed.net/v1/posts/${postId}/${verb}`, { method: 'POST' }).then(r => r.json());
  return { postId, verb };
});

export const addComment = createAsyncThunk('addComment', async ({ postId, body }, { rejectWithValue }) => {
  const response = await fetcher(`https://freefeed.net/v1/comments`, {
    method: 'POST',
    body: JSON.stringify({ comment: { postId, body } })
  });
  const data = await response.json();
  if (!response.ok) return rejectWithValue(data);
  return data;
});
