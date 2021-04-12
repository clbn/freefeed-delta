import { createReducer } from '@reduxjs/toolkit';

import * as actions from './actions';
import { formatComment, formatPost, formatUser } from '../utils/data-formatters';

export const rootReducer = createReducer({}, {

  [actions.setStoreState]: (state, { payload }) => {
    return payload; // Immer let us do it this way (while `state = payload` won't work)
  },

  [actions.loadHomePage.fulfilled]: (state, { payload: data }) => {
    state.me = data.me;
    state.attachments = data.attachments;
    state.comments = data.comments;
    state.feeds = data.feeds;
    state.posts = data.posts;
    state.users = data.users;
  },

  [actions.loadHomePage.rejected]: (state, { payload: data }) => {
    console.log('loadHomePage/rejected', data);
  },

  [actions.loadUserPage.fulfilled]: (state, { payload: data }) => {
    state.me = data.me;
    state.attachments = data.attachments;
    state.comments = data.comments;
    state.feeds = data.feeds;
    state.posts = data.posts;
    state.users = data.users;
  },

  [actions.loadUserPage.rejected]: (state, { payload: data }) => {
    console.log('loadUserPage/rejected', data);
  },

  [actions.loadPostPage.fulfilled]: (state, { payload: data }) => {
    state.me = data.me;
    state.attachments = data.attachments;
    state.comments = data.comments;
    state.feeds = data.feeds;
    state.posts = data.posts;
    state.users = data.users;
  },

  [actions.loadPostPage.rejected]: (state, { meta: { arg: ctx }, payload: data }) => {
    const { post: postId } = ctx.query;
    state.posts = { [postId]: { errorMessage: data.err } };
    console.log('loadPostPage/rejected', data);
  },

  [actions.loadMoreComments.pending]: (state, { meta: { arg: postId } }) => {
    state.posts[postId].isLoadingMoreComments = true;
  },

  [actions.loadMoreComments.fulfilled]: (state, { meta: { arg: postId }, payload: data }) => {
    state.posts[postId].isLoadingMoreComments = false;

    const { commentIds, omittedComments } = formatPost(data.posts);
    state.posts[postId].commentIds = commentIds;
    state.posts[postId].omittedComments = omittedComments;

    data.comments.forEach(c => {
      state.comments[c.id] = state.comments[c.id] ?? formatComment(c)
    });

    data.users.forEach(c => {
      state.users[c.id] = state.users[c.id] ?? formatUser(c)
    });
  },

  [actions.loadMoreComments.rejected]: (state, { meta: { arg: postId }, payload: data }) => {
    state.posts[postId].isLoadingMoreComments = false;
    console.log('loadMoreComments/rejected', data);
  },

  [actions.loadMoreLikes.pending]: (state, { meta: { arg: postId } }) => {
    state.posts[postId].isLoadingMoreLikes = true;
  },

  [actions.loadMoreLikes.fulfilled]: (state, { meta: { arg: postId }, payload: data }) => {
    state.posts[postId].isLoadingMoreLikes = false;

    const { likerIds, omittedLikes } = formatPost(data.posts);
    state.posts[postId].likerIds = likerIds;
    state.posts[postId].omittedLikes = omittedLikes;

    data.users.forEach(c => {
      state.users[c.id] = state.users[c.id] ?? formatUser(c)
    });
  },

  [actions.loadMoreLikes.rejected]: (state, { meta: { arg: postId }, payload: data }) => {
    state.posts[postId].isLoadingMoreLikes = false;
    console.log('loadMoreLikes/rejected', data);
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
