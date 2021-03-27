import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

import fetcher from '../utils/fetcher';

export const setStoreState = createAction('setStoreState');

export const loadWhoami = createAsyncThunk('loadWhoami', async ctx => {
  const data = await fetcher('https://freefeed.net/v2/users/whoami', {}, ctx);
  return { data };
});

export const loadHomePage = createAsyncThunk('loadHomePage', async ctx => {
  const data = await fetcher(`https://freefeed.net/v2/timelines/home?offset=0`, {}, ctx);
  return { data };
});

export const loadUserPage = createAsyncThunk('loadUserPage', async ctx => {
  const { user: username } = ctx.query;
  const data = await fetcher(`https://freefeed.net/v2/timelines/${username}?offset=0`, {}, ctx);
  return { username, data };
});

export const loadPostPage = createAsyncThunk('loadPostPage', async ctx => {
  const { post: postId, likes: maxLikes } = ctx.query;
  const data = await fetcher(`https://freefeed.net/v2/posts/${postId}?maxComments=all&maxLikes=${maxLikes}`, {}, ctx);
  return { postId, data };
});

export const loadMoreComments = createAsyncThunk('loadMoreComments', async postId => {
  const data = await fetcher(`https://freefeed.net/v2/posts/${postId}?maxComments=all`);
  return { postId, data };
});

export const loadMoreLikes = createAsyncThunk('loadMoreLikes', async postId => {
  const data = await fetcher(`https://freefeed.net/v2/posts/${postId}?maxLikes=all`);
  return { postId, data };
});

export const likeUnlikePost = createAsyncThunk('likeUnlikePost', async ([postId, verb]) => {
  await fetcher(`https://freefeed.net/v1/posts/${postId}/${verb}`, { method: 'POST' });
  return { postId, verb };
});
