const keyByIdAndMap = (items, cb) => {
  const result = {};
  items.forEach(i => {
    result[i.id] = cb(i);
  });
  return result;
};

export const formatPost = post => ({
  'body': post.body,
  'authorId': post.createdBy,
  'createdAt': post.createdAt,
  'commentIds': post.comments
});

export const formatUser = user => ({
  'username': user.username,
  'displayName': user.screenName
});

export const formatPosts = posts => keyByIdAndMap(posts, formatPost);

export const formatUsers = users => keyByIdAndMap(users, formatUser);
