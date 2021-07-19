import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

import fetcher from '../utils/fetcher';

export const setStoreState = createAction('setStoreState');
export const toggleCommentingPost = createAction('toggleCommentingPost');

export const loadHomePage = createAsyncThunk('loadHomePage', async (ctx, { rejectWithValue }) => {
  const { offset } = ctx.query;
  const response = await fetcher(`https://freefeed-api-proxy.applied.creagenics.com/homepage?offset=${offset || 0}`, {}, ctx);
  const data = await response.json();
  if (!response.ok) return rejectWithValue(data);
  return data;
});

export const loadUserPage = createAsyncThunk('loadUserPage', async (ctx, { rejectWithValue }) => {
  const { user: username, offset } = ctx.query;
  const response = await fetcher(`https://freefeed-api-proxy.applied.creagenics.com/userpage/${username}?offset=${offset || 0}`, {}, ctx);
  const data = await response.json();
  if (!response.ok) return rejectWithValue(data);
  return data;
});

export const loadPostPage = createAsyncThunk('loadPostPage', async (ctx, { rejectWithValue }) => {
  const { post: postId, likes: maxLikes } = ctx.query;
  const response = await fetcher(`https://freefeed-api-proxy.applied.creagenics.com/postpage/${postId}?maxLikes=${maxLikes}`, {}, ctx);
  const data = await response.json();
  if (!response.ok) return rejectWithValue(data);
  return data;
});

export const loadMoreComments = createAsyncThunk('loadMoreComments', async (postId, { rejectWithValue }) => {
  const response = await fetcher(`https://freefeed-api-proxy.applied.creagenics.com/postpage/${postId}?maxComments=all`);
  const data = await response.json();
  if (!response.ok) return rejectWithValue(data);
  return data;
});

export const loadMoreLikes = createAsyncThunk('loadMoreLikes', async (postId, { rejectWithValue }) => {
  const response = await fetcher(`https://freefeed-api-proxy.applied.creagenics.com/postpage/${postId}?maxLikes=all`);
  const data = await response.json();
  if (!response.ok) return rejectWithValue(data);
  return data;
});

export const likeUnlikePost = createAsyncThunk('likeUnlikePost', async ({ postId, verb }, { rejectWithValue }) => {
  const response = await fetcher(`https://freefeed.net/v1/posts/${postId}/${verb}`, { method: 'POST' });
  const data = await response.json();
  if (!response.ok) return rejectWithValue(data);
  return verb;
});

export const likeUnlikeComment = createAsyncThunk('likeUnlikeComment', async ({ commentId, verb }, { rejectWithValue }) => {
  const response = await fetcher(`https://freefeed.net/v2/comments/${commentId}/${verb}`, { method: 'POST' });
  const data = await response.json();
  if (!response.ok) return rejectWithValue(data);
  return data;
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
