export const visibilityLevels = {
  DIRECT: 3, // Direct message: recipient is a user (not a group), but not the same user as the author
  PRIVATE: 2, // Private post: recipient is a private user or group
  PROTECTED: 1, // Protected post: recipient is a protected user or group
  PUBLIC: 0, // Public post
};

export function getPostVisibilityLevel(recipients, authorId) {
  // Calculate individual levels for recipients
  const recipientLevels = recipients.map(recipient => {
    if (recipient.type === 'user' && recipient.id !== authorId) {
      return visibilityLevels.DIRECT;
    }
    if (recipient.isPrivate) {
      return visibilityLevels.PRIVATE;
    }
    if (recipient.isProtected) {
      return visibilityLevels.PROTECTED;
    }
    return visibilityLevels.PUBLIC;
  });

  // Calculate combined level for post
  return Math.min(...recipientLevels);
}
