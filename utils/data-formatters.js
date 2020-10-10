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
    'attachmentIds': post.attachments,
    'commentIds': post.comments,
    'omittedComments': +post.omittedComments
  };
};

export const formatAttachment = attachment => {
  if (!attachment) return null;
  if (attachment.mediaType !== 'image') return null;

  const { fileName, fileSize, imageSizes, thumbnailUrl, url } = attachment;

  const formattedFileSize = fileSize; // TODO: numeral(fileSize).format('0.[0] b');
  const formattedImageSize = (imageSizes.o ? `, ${imageSizes.o.w}×${imageSizes.o.h}px` : '');
  const nameAndSize = fileName + ' (' + formattedFileSize + formattedImageSize + ')';

  let srcSet;
  if (imageSizes.t2?.url) {
    srcSet = imageSizes.t2.url + ' 2x';
  } else if (+imageSizes.o?.w <= +imageSizes.t?.w * 2) {
    srcSet = (imageSizes.o?.url || url) + ' 2x';
  }

  return {
    url: imageSizes.o?.url || url,
    nameAndSize,
    src: imageSizes.t?.url || thumbnailUrl,
    srcSet,
    width: imageSizes.t?.w || imageSizes.o?.w || undefined,
    height: imageSizes.t?.h || imageSizes.o?.h || undefined,
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

export const formatAttachments = attachments => keyByIdAndMap(attachments, formatAttachment);

export const formatComments = comments => keyByIdAndMap(comments, formatComment);

export const formatUsers = users => keyByIdAndMap(users, formatUser);
