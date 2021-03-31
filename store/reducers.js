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

  [actions.loadWhoami.fulfilled]: (state, { payload: data }) => {
    state.me = formatUser(data.users, true);

    // Add some users from "subscribers" (that's actually your subscriPTIONs, both people and groups)
    data.subscribers.forEach(u => {
      state.users[u.id] = state.users[u.id] || formatUser(u); // TODO: deep-merge instead
    });

    // Add some users from "users.subscribers" (that's real subscribers, people only)
    data.users.subscribers.forEach(u => {
      state.users[u.id] = state.users[u.id] || formatUser(u);
    });

    // Add some users from "requests" (outcoming subscription requests)
    data.requests.forEach(u => {
      state.users[u.id] = state.users[u.id] || formatUser(u);
    });

    // Add some users from "managedGroups[].requests" (incoming group requests, waiting for your approval)
    data.managedGroups.forEach(g => {
      g.requests.forEach(u => {
        state.users[u.id] = state.users[u.id] || formatUser(u);
      });
    });

    // Add me
    state.users[data.users.id] = state.users[data.users.id] || formatUser(data.users);
  },

  [actions.loadWhoami.rejected]: (state, { payload: data }) => {
    console.log('loadWhoami/rejected', data);
  },

  [actions.loadHomePage.fulfilled]: (state, { payload: data }) => {
    state.attachments = formatAttachments(data.attachments);
    state.comments = formatComments(data.comments);
    data.subscriptions.forEach(f => { state.feeds[f.id] = f; });
    state.posts = formatPosts(data.posts);
    state.users = formatUsers(data.users);
  },

  [actions.loadHomePage.rejected]: (state, { payload: data }) => {
    console.log('loadHomePage/rejected', data);
  },

  [actions.loadUserPage.fulfilled]: (state, { meta: { arg: ctx }, payload: data }) => {
    const { user: username } = ctx.query;
    state.attachments = formatAttachments(data.attachments);
    state.comments = formatComments(data.comments);
    data.subscriptions.forEach(f => { state.feeds[f.id] = f; });
    state.posts = formatPosts(data.posts);
    data.users.forEach(u => {
      // Format all users in short form, except the one displayed
      state.users[u.id] = formatUser(u, u.username === username);
    });
  },

  [actions.loadUserPage.rejected]: (state, { payload: data }) => {
    console.log('loadUserPage/rejected', data);
  },

  [actions.loadPostPage.fulfilled]: (state, { meta: { arg: ctx }, payload: data }) => {
    const { post: postId } = ctx.query;
    state.attachments = formatAttachments(data.attachments);
    state.comments = formatComments(data.comments);
    data.subscriptions.forEach(f => { state.feeds[f.id] = f; });
    state.posts = { [postId]: formatPost(data.posts) };
    state.users = formatUsers(data.users);
  },

  [actions.loadPostPage.rejected]: (state, { meta: { arg: ctx }, payload: data }) => {
    const { post: postId } = ctx.query;
    state.posts = { [postId]: { errorMessage: data.err } };
    console.log('loadPostPage/rejected', data);
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

  [actions.likeUnlikePost.pending]: (state, { meta: { arg: { postId } } }) => {
    state.posts[postId].isSendingLike = true;
  },

  [actions.likeUnlikePost.fulfilled]: (state, { meta: { arg: { postId } }, payload: verb }) => {
    state.posts[postId].isSendingLike = false;
    if (verb === 'like') {
      state.posts[postId].likerIds.unshift(state.me.id);
    } else {
      state.posts[postId].likerIds = state.posts[postId].likerIds.filter(id => id !== state.me.id);
    }
  },

  [actions.likeUnlikePost.rejected]: (state, { meta: { arg: { postId } }, payload: data }) => {
    state.posts[postId].isSendingLike = false;
    console.log('likeUnlikePost/rejected', data);
  },

  [actions.toggleCommentingPost]: (state, { payload: postId }) => {
    state.posts[postId].isWritingComment = !state.posts[postId].isWritingComment;
    state.posts[postId].commentErrorMessage = null;
  },

  [actions.addComment.pending]: (state, { meta: { arg: { postId } } }) => {
    state.posts[postId].isSendingComment = true;
    state.posts[postId].commentErrorMessage = null;
  },

  [actions.addComment.fulfilled]: (state, { meta: { arg: { postId } }, payload: data }) => {
    state.comments[data.comments.id] = formatComment(data.comments);
    state.posts[postId].commentIds.push(data.comments.id);
    state.posts[postId].isSendingComment = false;
    state.posts[postId].isWritingComment = false;
  },

  [actions.addComment.rejected]: (state, { meta: { arg: { postId } }, payload: data }) => {
    state.posts[postId].isSendingComment = false;
    state.posts[postId].commentErrorMessage = data.err;
  },

});
