import { NextPageContext } from 'next';
import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

import fetcher from '../utils/fetcher';
import { RootState } from './state';

export const setStoreState = createAction<RootState>('setStoreState');
export const toggleCommentingPost = createAction<string>('toggleCommentingPost');

export const loadHomePage = createAsyncThunk('loadHomePage', async (ctx: NextPageContext, { rejectWithValue }) => {
  const { offset } = ctx.query;
  const response = await fetcher(`https://freefeed-api-proxy.applied.creagenics.com/homepage?offset=${offset || 0}`, {}, ctx);
  const data = await response.json();
  if (!response.ok) return rejectWithValue(data);
  return data;
});

export const loadDiscussionsPage = createAsyncThunk('loadDiscussionsPage', async (ctx: NextPageContext, { rejectWithValue }) => {
  const { offset } = ctx.query;
  const response = await fetcher(`https://freefeed-api-proxy.applied.creagenics.com/discussionspage?offset=${offset || 0}`, {}, ctx);
  const data = await response.json();
  if (!response.ok) return rejectWithValue(data);
  return data;
});

export const loadDirectsPage = createAsyncThunk('loadDirectsPage', async (ctx: NextPageContext, { rejectWithValue }) => {
  const { offset } = ctx.query;
  const response = await fetcher(`https://freefeed-api-proxy.applied.creagenics.com/directspage?offset=${offset || 0}`, {}, ctx);
  const data = await response.json();
  if (!response.ok) return rejectWithValue(data);
  return data;
});

export const loadUserPage = createAsyncThunk('loadUserPage', async (ctx: NextPageContext, { rejectWithValue }) => {
  const { user: username, offset } = ctx.query;
  const response = await fetcher(`https://freefeed-api-proxy.applied.creagenics.com/userpage/${username}?offset=${offset || 0}`, {}, ctx);
  const data = await response.json();
  if (!response.ok) return rejectWithValue(data);
  return data;
});

export const loadUserCommentsPage = createAsyncThunk('loadUserCommentsPage', async (ctx: NextPageContext, { rejectWithValue }) => {
  const { user: username, offset } = ctx.query;
  const response = await fetcher(`https://freefeed-api-proxy.applied.creagenics.com/usercommentspage/${username}?offset=${offset || 0}`, {}, ctx);
  const data = await response.json();
  if (!response.ok) return rejectWithValue(data);
  return data;
});

export const loadUserLikesPage = createAsyncThunk('loadUserLikesPage', async (ctx: NextPageContext, { rejectWithValue }) => {
  const { user: username, offset } = ctx.query;
  const response = await fetcher(`https://freefeed-api-proxy.applied.creagenics.com/userlikespage/${username}?offset=${offset || 0}`, {}, ctx);
  const data = await response.json();
  if (!response.ok) return rejectWithValue(data);
  return data;
});

export const loadPostPage = createAsyncThunk('loadPostPage', async (ctx: NextPageContext, { rejectWithValue }) => {
  const { post: postId, likes: maxLikes } = ctx.query;
  const response = await fetcher(`https://freefeed-api-proxy.applied.creagenics.com/postpage/${postId}?maxLikes=${maxLikes}`, {}, ctx);
  const data = await response.json();
  if (!response.ok) return rejectWithValue(data);
  return data;
});

export const loadMoreComments = createAsyncThunk('loadMoreComments', async (postId: string, { rejectWithValue }) => {
  const response = await fetcher(`https://freefeed-api-proxy.applied.creagenics.com/postpage/${postId}?maxComments=all`);
  const data = await response.json();
  if (!response.ok) return rejectWithValue(data);
  return data;
});

export const loadMoreLikes = createAsyncThunk('loadMoreLikes', async (postId: string, { rejectWithValue }) => {
  const response = await fetcher(`https://freefeed-api-proxy.applied.creagenics.com/postpage/${postId}?maxLikes=all`);
  const data = await response.json();
  if (!response.ok) return rejectWithValue(data);
  return data;
});

export const likeUnlikePost = createAsyncThunk('likeUnlikePost', async ({ postId, verb }: { postId: string; verb: 'unlike' | 'like' }, { rejectWithValue }) => {
  const response = await fetcher(`https://freefeed.net/v1/posts/${postId}/${verb}`, { method: 'POST' });
  const data = await response.json();
  if (!response.ok) return rejectWithValue(data);
  return verb;
});

export const loadCommentLikes = createAsyncThunk('loadCommentLikes', async (commentId: string, { rejectWithValue }) => {
  const response = await fetcher(`https://freefeed.net/v2/comments/${commentId}/likes`);
  const data = await response.json();
  if (!response.ok) return rejectWithValue(data);
  return data;
});

export const likeUnlikeComment = createAsyncThunk('likeUnlikeComment', async ({ commentId, verb }: { commentId: string; verb: 'unlike' | 'like' }, { rejectWithValue }) => {
  const response = await fetcher(`https://freefeed.net/v2/comments/${commentId}/${verb}`, { method: 'POST' });
  const data = await response.json();
  if (!response.ok) return rejectWithValue(data);
  return data;
});

export const addComment = createAsyncThunk('addComment', async ({ postId, body }: { postId: string; body: string }, { rejectWithValue }) => {
  const response = await fetcher(`https://freefeed.net/v1/comments`, {
    method: 'POST',
    body: JSON.stringify({ comment: { postId, body } })
  });
  const data = await response.json();
  if (!response.ok) return rejectWithValue(data);
  return data;
});

export const addPost = createAsyncThunk('addPost', async ({ body, feeds }: { body: string; feeds: string[] }, { rejectWithValue }) => {
  const response = await fetcher(`https://freefeed.net/v1/posts`, {
    method: 'POST',
    body: JSON.stringify({ post: { body }, meta: { feeds } })
  });
  const data = await response.json();
  if (!response.ok) return rejectWithValue(data);
  return data;
});
