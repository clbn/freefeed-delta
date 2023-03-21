import { createReducer } from '@reduxjs/toolkit';

import * as actions from './actions';
import { formatPost, formatComment } from '../utils/data-formatters';
import { initialState } from './state';

export const rootReducer = createReducer(initialState, {

  [actions.setStoreState.type]: (state, { payload }) => {
    return payload; // Immer let us do it this way (while `state = payload` won't work)
  },

  [actions.loadHomePage.pending.type]: (state) => {
    state.isLoadingPage = true;
  },

  [actions.loadHomePage.fulfilled.type]: (state, { payload }) => {
    return {
      ...state, isLoadingPage: false,
      ...payload, postIds: Object.keys(payload.posts)
    };
  },

  [actions.loadHomePage.rejected.type]: (state, { meta: { aborted }, error, payload }) => {
    if (!aborted) {
      state.isLoadingPage = false;
    }
    console.log('loadHomePage/rejected', aborted ? error : payload);
  },

  [actions.loadDiscussionsPage.pending.type]: (state) => {
    state.isLoadingPage = true;
  },

  [actions.loadDiscussionsPage.fulfilled.type]: (state, { payload }) => {
    return {
      ...state, isLoadingPage: false,
      ...payload, postIds: Object.keys(payload.posts)
    };
  },

  [actions.loadDiscussionsPage.rejected.type]: (state, { meta: { aborted }, error, payload }) => {
    if (!aborted) {
      state.isLoadingPage = false;
    }
    console.log('loadDiscussionsPage/rejected', aborted ? error : payload);
  },

  [actions.loadDirectsPage.pending.type]: (state) => {
    state.isLoadingPage = true;
  },

  [actions.loadDirectsPage.fulfilled.type]: (state, { payload }) => {
    return {
      ...state, isLoadingPage: false,
      ...payload, postIds: Object.keys(payload.posts)
    };
  },

  [actions.loadDirectsPage.rejected.type]: (state, { meta: { aborted }, error, payload }) => {
    if (!aborted) {
      state.isLoadingPage = false;
    }
    console.log('loadDirectsPage/rejected', aborted ? error : payload);
  },

  [actions.loadUserPage.pending.type]: (state) => {
    state.isLoadingPage = true;
  },

  [actions.loadUserPage.fulfilled.type]: (state, { payload }) => {
    return {
      ...state, isLoadingPage: false,
      ...payload, postIds: Object.keys(payload.posts)
    };
  },

  [actions.loadUserPage.rejected.type]: (state, { meta: { aborted }, error, payload }) => {
    if (!aborted) {
      state.isLoadingPage = false;
    }
    console.log('loadUserPage/rejected', aborted ? error : payload);
  },

  [actions.loadUserCommentsPage.pending.type]: (state) => {
    state.isLoadingPage = true;
  },

  [actions.loadUserCommentsPage.fulfilled.type]: (state, { payload }) => {
    return {
      ...state, isLoadingPage: false,
      ...payload, postIds: Object.keys(payload.posts)
    };
  },

  [actions.loadUserCommentsPage.rejected.type]: (state, { meta: { aborted }, error, payload }) => {
    if (!aborted) {
      state.isLoadingPage = false;
    }
    console.log('loadUserCommentsPage/rejected', aborted ? error : payload);
  },

  [actions.loadUserLikesPage.pending.type]: (state) => {
    state.isLoadingPage = true;
  },

  [actions.loadUserLikesPage.fulfilled.type]: (state, { payload }) => {
    return {
      ...state, isLoadingPage: false,
      ...payload, postIds: Object.keys(payload.posts)
    };
  },

  [actions.loadUserLikesPage.rejected.type]: (state, { meta: { aborted }, error, payload }) => {
    if (!aborted) {
      state.isLoadingPage = false;
    }
    console.log('loadUserLikesPage/rejected', aborted ? error : payload);
  },

  [actions.loadPostPage.pending.type]: (state) => {
    state.isLoadingPage = true;
  },

  [actions.loadPostPage.fulfilled.type]: (state, { payload }) => {
    return {
      ...state, isLoadingPage: false,
      ...payload, postIds: Object.keys(payload.posts)
    };
  },

  [actions.loadPostPage.rejected.type]: (state, { meta: { aborted, arg: ctx }, error, payload }) => {
    if (!aborted) {
      const { post: postId } = ctx.query;
      state.postIds = [ postId ];
      state.posts = { [postId]: { errorMessage: payload.err ?? 'Unknown error' } };
      state.isLoadingPage = false;
    }
    console.log('loadPostPage/rejected', aborted ? error : payload);
  },

  [actions.loadMoreComments.pending.type]: (state, { meta: { arg: postId } }) => {
    state.posts[postId].isLoadingMoreComments = true;
  },

  [actions.loadMoreComments.fulfilled.type]: (state, { meta: { arg: postId }, payload: data }) => {
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

  [actions.loadMoreComments.rejected.type]: (state, { meta: { arg: postId }, payload: data }) => {
    state.posts[postId].isLoadingMoreComments = false;
    console.log('loadMoreComments/rejected', data);
  },

  [actions.loadMoreLikes.pending.type]: (state, { meta: { arg: postId } }) => {
    state.posts[postId].isLoadingMoreLikes = true;
  },

  [actions.loadMoreLikes.fulfilled.type]: (state, { meta: { arg: postId }, payload: data }) => {
    state.posts[postId].isLoadingMoreLikes = false;

    const { likerIds, omittedLikes } = data.posts[postId];
    state.posts[postId].likerIds = likerIds;
    state.posts[postId].omittedLikes = omittedLikes;

    Object.entries(data.users).forEach(([id, user]) => {
      state.users[id] = state.users[id] ?? user
    });
  },

  [actions.loadMoreLikes.rejected.type]: (state, { meta: { arg: postId }, payload: data }) => {
    state.posts[postId].isLoadingMoreLikes = false;
    console.log('loadMoreLikes/rejected', data);
  },

  [actions.likeUnlikePost.pending.type]: (state, { meta: { arg: { postId } } }) => {
    state.posts[postId].isSendingLike = true;
  },

  [actions.likeUnlikePost.fulfilled.type]: (state, { meta: { arg: { postId } }, payload: verb }) => {
    state.posts[postId].isSendingLike = false;
    if (verb === 'like') {
      state.posts[postId].likerIds.unshift(state.me.id);
    } else {
      state.posts[postId].likerIds = state.posts[postId].likerIds.filter(id => id !== state.me.id);
    }
  },

  [actions.likeUnlikePost.rejected.type]: (state, { meta: { arg: { postId } }, payload: data }) => {
    state.posts[postId].isSendingLike = false;
    console.log('likeUnlikePost/rejected', data);
  },

  [actions.loadCommentLikes.pending.type]: (state, { meta: { arg: commentId } }) => {
    state.comments[commentId].isLoadingLikes = true;
  },

  [actions.loadCommentLikes.fulfilled.type]: (state, { meta: { arg: commentId }, payload: data }) => {
    state.comments[commentId].isLoadingLikes = false;

    state.comments[commentId].likes = data.likes.length;
    state.comments[commentId].likerIds = data.likes.map(l => l.userId);
    data.users.forEach(user => {
      state.users[user.id] = state.users[user.id] ?? user
    });
  },

  [actions.loadCommentLikes.rejected.type]: (state, { meta: { arg: commentId }, payload: data }) => {
    state.comments[commentId].isLoadingLikes = false;
    console.log('loadCommentLikes/rejected', data);
  },

  [actions.likeUnlikeComment.pending.type]: (state, { meta: { arg: { commentId } } }) => {
    state.comments[commentId].isSendingLike = true;
  },

  [actions.likeUnlikeComment.fulfilled.type]: (state, { meta: { arg: { commentId, verb } }, payload: data }) => {
    state.comments[commentId].isSendingLike = false;
    state.comments[commentId].haveILiked = (verb === 'like');

    state.comments[commentId].likes = data.likes.length;
    state.comments[commentId].likerIds = data.likes.map(l => l.userId);
    data.users.forEach(user => {
      state.users[user.id] = state.users[user.id] ?? user
    });
  },

  [actions.likeUnlikeComment.rejected.type]: (state, { meta: { arg: { commentId } }, payload: data }) => {
    state.comments[commentId].isSendingLike = false;
    console.log('likeUnlikeComment/rejected', data);
  },

  [actions.toggleWritingComment.type]: (state, { payload: postId }) => {
    state.posts[postId].isWritingComment = !state.posts[postId].isWritingComment;
    state.posts[postId].commentErrorMessage = null;
  },

  [actions.addComment.pending.type]: (state, { meta: { arg: { postId } } }) => {
    state.posts[postId].isSendingComment = true;
    state.posts[postId].commentErrorMessage = null;
  },

  [actions.addComment.fulfilled.type]: (state, { meta: { arg: { postId } }, payload: data }) => {
    state.comments[data.comments.id] = formatComment(data.comments);
    state.posts[postId].commentIds.push(data.comments.id);
    state.posts[postId].isSendingComment = false;
    state.posts[postId].isWritingComment = false;
  },

  [actions.addComment.rejected.type]: (state, { meta: { arg: { postId } }, payload: data }) => {
    state.posts[postId].isSendingComment = false;
    state.posts[postId].commentErrorMessage = data.err;
  },

  [actions.toggleWritingPost.type]: (state) => {
    state.isWritingPost = !state.isWritingPost;
    // state.postErrorMessage = null;
  },

  [actions.addPost.pending.type]: (state) => {
    state.isSendingPost = true;
    // state.postErrorMessage = null;
  },

  [actions.addPost.fulfilled.type]: (state, { payload: data }) => {
    state.postIds.unshift(data.posts.id);
    state.posts[data.posts.id] = formatPost(data.posts);
    state.isSendingPost = false;
    state.isWritingPost = false;
  },

  [actions.addPost.rejected.type]: (state, { payload: data }) => {
    state.isSendingPost = false;
    // state.postErrorMessage = data.err;
  },

});
