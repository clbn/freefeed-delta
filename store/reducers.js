import { createReducer } from '@reduxjs/toolkit';

import * as actions from './actions';
import {
  formatAttachments, formatComments,
  formatPost, formatPosts, formatUser, formatUsers
} from '../utils/data-formatters';

export const rootReducer = createReducer({}, {

  [actions.setStoreState]: (state, { payload }) => {
    return payload; // Immer let us do it this way (while `state = payload` won't work)
  },

  [actions.loadHomePage]: (state, { payload: { data } }) => {
    state.attachments = formatAttachments(data.attachments);
    state.comments = formatComments(data.comments);
    state.posts = formatPosts(data.posts);
    state.users = formatUsers(data.users);
  },

  [actions.loadUserPage]: (state, { payload: { username, data } }) => {
    state.attachments = formatAttachments(data.attachments);
    state.comments = formatComments(data.comments);
    state.posts = formatPosts(data.posts);

    // Format all users in short form, except the one displayed
    const users = formatUsers(data.users);
    const displayedUser = data.users.find(u => u.username === username);
    users[displayedUser.id] = formatUser(displayedUser, true);
    state.users = users;
  },

  [actions.loadPostPage]: (state, { payload: { postId, data } }) => {
    state.attachments = formatAttachments(data.attachments);
    state.comments = formatComments(data.comments);
    state.posts = { [postId]: formatPost(data.posts) };
    state.users = formatUsers(data.users);
  },

});
