import { createReducer } from '@reduxjs/toolkit';

import * as actions from './actions';
import {
  formatAttachments, formatComment, formatComments,
  formatPost, formatPosts, formatUser, formatUsers
} from '../utils/data-formatters';

export const rootReducer = createReducer({}, {

  [actions.setStoreState]: (state, { payload }) => {
    return payload; // Immer let us do it this way (while `state = payload` won't work)
  },

  [actions.loadWhoami.fulfilled]: (state, { payload: { data } }) => {
    state.me = formatUser(data.users, true);
  },

  [actions.loadHomePage.fulfilled]: (state, { payload: { data } }) => {
    state.attachments = formatAttachments(data.attachments);
    state.comments = formatComments(data.comments);
    state.posts = formatPosts(data.posts);
    state.users = formatUsers(data.users);
  },

  [actions.loadUserPage.fulfilled]: (state, { payload: { username, data } }) => {
    state.attachments = formatAttachments(data.attachments);
    state.comments = formatComments(data.comments);
    state.posts = formatPosts(data.posts);

    // Format all users in short form, except the one displayed
    const users = formatUsers(data.users);
    const displayedUser = data.users.find(u => u.username === username);
    users[displayedUser.id] = formatUser(displayedUser, true);
    state.users = users;
  },

  [actions.loadPostPage.fulfilled]: (state, { payload: { postId, data } }) => {
    state.attachments = formatAttachments(data.attachments);
    state.comments = formatComments(data.comments);
    state.posts = { [postId]: formatPost(data.posts) };
    state.users = formatUsers(data.users);
  },

  [actions.loadMoreComments.fulfilled]: (state, { payload: { postId, data } }) => {
    const { commentIds, omittedComments} = formatPost(data.posts);
    state.posts[postId].commentIds = commentIds;
    state.posts[postId].omittedComments = omittedComments;

    data.comments.forEach(c => {
      state.comments[c.id] = state.comments[c.id] ?? formatComment(c)
    });

    data.users.forEach(c => {
      state.users[c.id] = state.users[c.id] ?? formatUser(c)
    });
  },

  [actions.loadMoreLikes.fulfilled]: (state, { payload: { postId, data } }) => {
    const { likerIds, omittedLikes } = formatPost(data.posts);
    state.posts[postId].likerIds = likerIds;
    state.posts[postId].omittedLikes = omittedLikes;

    data.users.forEach(c => {
      state.users[c.id] = state.users[c.id] ?? formatUser(c)
    });
  },

  [actions.likeUnlikePost.fulfilled]: (state, { payload: { postId, verb } }) => {
    if (verb === 'like') {
      state.posts[postId].likerIds.unshift(state.me.id);
    } else {
      state.posts[postId].likerIds = state.posts[postId].likerIds.filter(id => id !== state.me.id);
    }
  },

});
