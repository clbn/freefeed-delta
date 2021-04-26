export const formatComment = comment => {
  if (!comment) return null;

  return {
    body: comment.body,
    authorId: comment.createdBy,
    createdAt: +comment.createdAt,
  };
};

export const formatUser = (user, full) => {
  if (!user) return null;

  const formattedUser = {
    id: user.id,
    username: user.username,
    type: user.type, // 'user' or 'group'
    displayName: user.screenName,
    userpicUrl: user.profilePictureLargeUrl,
    isGone: !!user.isGone,
    isPrivate: user.isPrivate === '1',
    isProtected: user.isProtected === '1',
    administrators: user.administrators || [],
  };

  if (full) {
    formattedUser.description = user.description;
  }

  return formattedUser;
};
