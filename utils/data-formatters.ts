type Comment = {
  body: string;
  authorId: string;
  createdAt: number;
  seqNumber: number;
  hideType?: number;
  likes?: number;
  haveILiked?: boolean;
};

type Post = {
  body: string;
  authorId: string;
  createdAt: number;
  recipientFeedIds: string[];
  attachmentIds: string[];
  likerIds: string[];
  omittedLikes: number;
  commentIds: string[];
  omittedComments: number;
  omittedCommentLikes: number;
  areCommentsDisabled: boolean;
};

type User = {
  id: string;
  username: string;
  type: 'user' | 'group';
  displayName: string;
  userpicUrl: string;
  isGone: boolean;
  isPrivate: boolean;
  isProtected: boolean;
  administrators: string[];
  description?: string;
};

export const formatComment = (comment): Comment => {
  if (!comment) return null;

  const formattedComment: Comment = {
    body: comment.body,
    authorId: comment.createdBy,
    createdAt: +comment.createdAt,
    seqNumber: comment.seqNumber,
  };

  if (comment.hideType) formattedComment.hideType = comment.hideType;
  if (comment.likes) formattedComment.likes = comment.likes;
  if (comment.hasOwnLike) formattedComment.haveILiked = comment.hasOwnLike;

  return formattedComment;
};

export const formatPost = (post): Post => {
  if (!post) return null;

  return {
    body: post.body,
    authorId: post.createdBy,
    createdAt: +post.createdAt,
    recipientFeedIds: post.postedTo,
    attachmentIds: post.attachments,
    likerIds: post.likes,
    omittedLikes: +post.omittedLikes,
    commentIds: post.comments,
    omittedComments: +post.omittedComments,
    omittedCommentLikes: +post.omittedCommentLikes,
    areCommentsDisabled: post.commentsDisabled === '1',
  };
};

export const formatUser = (user, full = false): User => {
  if (!user) return null;

  const formattedUser: User = {
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
