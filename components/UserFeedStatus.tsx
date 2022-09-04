import Icon from './Icon';

const UserFeedStatus = ({ isGone, isPrivate, isProtected, isRestricted, type }) => <>
  {isGone ? (
    <><Icon name="archive"/> Deleted</>
  ) : isPrivate ? (
    <><Icon name="lock"/> Private</>
  ) : isProtected ? (
    <><Icon name="users"/> Protected</>
  ) : (
    <><Icon name="globe"/> Public</>
  )}
  {isRestricted ? ' restricted' : false}
  {type === 'user' ? ' feed' : ' group'}
</>;

export default UserFeedStatus;
