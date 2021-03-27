export const selectCanIModeratePost = postId => state => {
  const post = state.posts[postId];
  const myId = state.me.id;

  const canIEdit = (post.authorId === myId);

  const recipientIds = post.recipientFeedIds
    .map(feedId => {
      const userId = (state.feeds[feedId] || {}).user;
      const feedType = (state.feeds[feedId] || {}).name;
      const isDirectToSelf = (userId === post.authorId && feedType === 'Directs');
      return isDirectToSelf ? false : userId;
    })
    .filter(user => user);

  const managedGroupIds = Object.entries(state.users)
    .filter(([id, u]) => (u.type === 'group' && u.administrators.includes(myId)))
    .map(([id, u]) => id);

  const doIAdminSomeRecipients = !!recipientIds.find(r => managedGroupIds.includes(r));

  return canIEdit || doIAdminSomeRecipients;
};
