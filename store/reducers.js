import { createReducer } from '@reduxjs/toolkit';

import * as actions from './actions';
import { formatComment } from '../utils/data-formatters';

export const rootReducer = createReducer({}, {

  [actions.setStoreState]: (state, { payload }) => {
    return payload; // Immer let us do it this way (while `state = payload` won't work)
  },

  [actions.loadHomePage.pending]: (state) => {
    state.isLoadingPage = true;
  },

  [actions.loadHomePage.fulfilled]: (state, { payload }) => {
    return payload;
  },

  [actions.loadHomePage.rejected]: (state, { meta: { aborted }, error, payload }) => {
    if (!aborted) {
      state.isLoadingPage = false;
    }
    console.log('loadHomePage/rejected', aborted ? error : payload);
  },

  [actions.loadUserPage.pending]: (state) => {
    state.isLoadingPage = true;
  },

  [actions.loadUserPage.fulfilled]: (state, { payload }) => {
    return payload;
  },

  [actions.loadUserPage.rejected]: (state, { meta: { aborted }, error, payload }) => {
    if (!aborted) {
      state.isLoadingPage = false;
    }
    console.log('loadUserPage/rejected', aborted ? error : payload);
  },

  [actions.loadPostPage.pending]: (state) => {
    state.isLoadingPage = true;
  },

  [actions.loadPostPage.fulfilled]: (state, { payload }) => {
    return payload;
  },

  [actions.loadPostPage.rejected]: (state, { meta: { aborted, arg: ctx }, error, payload }) => {
    if (!aborted) {
      const { post: postId } = ctx.query;
      state.posts = { [postId]: { errorMessage: payload.err ?? 'Unknown error' } };
      state.isLoadingPage = false;
    }
    console.log('loadPostPage/rejected', aborted ? error : payload);
  },

  [actions.loadMoreComments.pending]: (state, { meta: { arg: postId } }) => {
    state.posts[postId].isLoadingMoreComments = true;
  },

  [actions.loadMoreComments.fulfilled]: (state, { meta: { arg: postId }, payload: data }) => {
    state.posts[postId].isLoadingMoreComments = false;

    const { commentIds, omittedComments } = data.posts[postId];
    state.posts[postId].commentIds = commentIds;
    state.posts[postId].omittedComments = omittedComments;

    Object.entries(data.comments).forEach(([id, comment]) => {
      state.comments[id] = state.comments[id] ?? comment
    });

    Object.entries(data.users).forEach(([id, user]) => {
      state.users[id] = state.users[id] ?? user
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

    const { likerIds, omittedLikes } = data.posts[postId];
    state.posts[postId].likerIds = likerIds;
    state.posts[postId].omittedLikes = omittedLikes;

    Object.entries(data.users).forEach(([id, user]) => {
      state.users[id] = state.users[id] ?? user
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

  [actions.likeUnlikeComment.pending]: (state, { meta: { arg: { commentId } } }) => {
    state.comments[commentId].isSendingLike = true;
  },

  [actions.likeUnlikeComment.fulfilled]: (state, { meta: { arg: { commentId, verb } }, payload: data }) => {
    state.comments[commentId].isSendingLike = false;
    state.comments[commentId].haveILiked = (verb === 'like');
    state.comments[commentId].likes = data.likes.length;
  },

  [actions.likeUnlikeComment.rejected]: (state, { meta: { arg: { commentId } }, payload: data }) => {
    state.comments[commentId].isSendingLike = false;
    console.log('likeUnlikeComment/rejected', data);
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
