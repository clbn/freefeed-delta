import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

import fetcher from '../utils/fetcher';

export const setStoreState = createAction('setStoreState');
export const loadHomePage = createAction('loadHomePage');
export const loadUserPage = createAction('loadUserPage');
export const loadPostPage = createAction('loadPostPage');

export const loadMoreComments = createAsyncThunk('loadMoreComments', async postId => {
  const data = await fetcher(`https://freefeed.net/v2/posts/${postId}?maxComments=all`);
  return { postId, data };
});

export const loadMoreLikes = createAsyncThunk('loadMoreLikes', async postId => {
  const data = await fetcher(`https://freefeed.net/v2/posts/${postId}?maxLikes=all`);
  return { postId, data };
});
