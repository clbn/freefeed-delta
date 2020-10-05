const keyByIdAndMap = (items, cb) => {
  if (!items) return null;

  const result = {};

  items.forEach(i => {
    result[i.id] = cb(i);
  });

  return result;
};

export const formatPost = post => {
  if (!post) return null;

  return {
    'body': post.body,
    'authorId': post.createdBy,
    'createdAt': +post.createdAt,
    'commentIds': post.comments,
    'omittedComments': +post.omittedComments
  };
};

export const formatComment = comment => {
  if (!comment) return null;

  return {
    'body': comment.body,
    'authorId': comment.createdBy,
    'createdAt': +comment.createdAt,
  };
};

export const formatUser = (user, full) => {
  if (!user) return null;

  if (full) {
    return {
      ...user,
      'displayName': user.screenName
    };
  }

  return {
    'username': user.username,
    'displayName': user.screenName
  };
};

export const formatPosts = posts => keyByIdAndMap(posts, formatPost);

export const formatComments = comments => keyByIdAndMap(comments, formatComment);

export const formatUsers = users => keyByIdAndMap(users, formatUser);
