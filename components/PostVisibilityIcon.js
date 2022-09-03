import { shallowEqual } from 'react-redux';

import { useSelector } from '../store';
import { selectPostRecipients } from '../utils/data-selectors';
import { visibilityLevels, getPostVisibilityLevel } from '../utils/visibility';
import Icon from './Icon';

const PostVisibilityIcon = ({ postId }) => {
  const recipients = useSelector(selectPostRecipients(postId), shallowEqual);
  const authorId = useSelector(state => state.posts[postId].authorId);

  const postLevel = getPostVisibilityLevel(recipients, authorId);

  switch (postLevel) {
    case visibilityLevels.DIRECT: {
      return <Icon name="envelope" title="This is direct message"/>;
    }
    case visibilityLevels.PRIVATE: {
      return <Icon name="lock" title="This entry is private"/>;
    }
    case visibilityLevels.PROTECTED: {
      return <Icon name="users" title="This entry is only visible to FreeFeed users"/>;
    }
  }
  return <Icon name="globe" title="This entry is public"/>;
};

export default PostVisibilityIcon;
