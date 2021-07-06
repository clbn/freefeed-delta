import React from 'react';

import Icon from './icon';

const UserFeedStatus = (props) => <>
  {props.isGone ? (
    <><Icon name="archive"/> Deleted</>
  ) : props.isPrivate ? (
    <><Icon name="lock"/> Private</>
  ) : props.isProtected ? (
    <><Icon name="users"/> Protected</>
  ) : (
    <><Icon name="globe"/> Public</>
  )}
  {props.isRestricted ? ' restricted' : false}
  {props.type === 'user' ? ' feed' : ' group'}
</>;

export default UserFeedStatus;
