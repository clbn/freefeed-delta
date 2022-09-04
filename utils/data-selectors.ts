import { RootState } from '../store/state';

export const selectPostRecipients = (postId: string) => (state: RootState) => {
  const post = state.posts[postId];

  return post.recipientFeedIds
    .map(feedId => {
      const userId = (state.feeds[feedId] || {}).user;
      const feedType = (state.feeds[feedId] || {}).name;
      const isDirectToSelf = (userId === post.authorId && feedType === 'Directs');
      return isDirectToSelf ? false : state.users[userId];
    })
    .filter(user => user);
};

export const selectCanIModeratePost = (postId: string) => (state: RootState) => {
  const post = state.posts[postId];
  const myId = state.me.id;

  const canIEdit = (post.authorId === myId);

  const recipients = selectPostRecipients(postId)(state);

  const managedGroupIds = Object.entries(state.users)
    .filter(([id, u]) => (u.type === 'group' && u.administrators.includes(myId)))
    .map(([id, u]) => id);

  const doIAdminSomeRecipients = !!recipients.find(r => managedGroupIds.includes(r.id));

  return canIEdit || doIAdminSomeRecipients;
};
