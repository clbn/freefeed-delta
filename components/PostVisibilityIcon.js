import { useSelector } from 'react-redux';

import { selectPostRecipients } from '../utils/data-selectors';
import { visibilityLevels, getPostVisibilityLevel } from '../utils/visibility';

const PostVisibilityIcon = ({ postId }) => {
  const recipients = useSelector(selectPostRecipients(postId));
  const authorId = useSelector(state => state.posts[postId].authorId);

  const postLevel = getPostVisibilityLevel(recipients, authorId);

  switch (postLevel) {
    case visibilityLevels.DIRECT: {
      return <span title="This is direct message">✉️</span>;
    }
    case visibilityLevels.PRIVATE: {
      return <span title="This entry is private">🔒</span>;
    }
    case visibilityLevels.PROTECTED: {
      return <span title="This entry is only visible to FreeFeed users">👥</span>;
    }
  }
  return <span title="This entry is public">🌎</span>;
};

export default PostVisibilityIcon;
