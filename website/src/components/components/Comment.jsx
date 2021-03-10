import React from 'react';
import PropTypes from 'prop-types';
import { cleanProps, generateClass } from '../../utils';
import { Avatar } from './Avatar';
import { FluentIcon } from './FluentIcon';

const COLOR = {
  PRIMARY: 'primary',
  SUCCESS: 'success',
  DANGER: 'danger',
  WARNING: 'warning',
  INFO: 'info',
  DARK: 'dark',
  LIGHT: 'light',
};

const RADIUS = {
  NONE: 'none',
  SMALL: 'small',
  NORMAL: 'normal',
  CURVE: 'curve',
};

const SHADOW = {
  NONE: 'none',
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large',
};

const CommentComponent = (props) => {
  const parentProps = { ...props };
  cleanProps(parentProps);

  return (
    <div className="nirvana-comment-container">
      {props.items.map((item) => (
        <div
          key={item.id}
          {...parentProps}
          className={
            generateClass(props, 'comment') +
            (item.isReplayed ? ' nirvana-ml-1' : '')
          }
        >
          {item.isReplayed && (
            <FluentIcon icon="ReturnKey" className="comment-replayed" />
          )}
          <div className="comment-avatar">
            <Avatar
              username={item.username}
              letterCount={2}
              color={props.color}
              src={item.avatar}
            />
          </div>
          <div className="comment-body">
            <div className="comment-header">
              <div className="comment-username">{item.username}</div>
              {props.like && (
                <div className="comment-actions">
                  <span>{item.likeCount || 0}</span>
                  <FluentIcon
                    icon={item.liked ? 'LikeSolid' : 'Like'}
                    color="var(--nirvana-success)"
                    onClick={() => props.like(item, 'like')}
                  />
                  <span>{item.dislikeCount || 0}</span>
                  <FluentIcon
                    icon={item.disliked ? 'DislikeSolid' : 'Dislike'}
                    color="var(--nirvana-danger)"
                    onClick={() => props.like(item, 'dislike')}
                  />
                </div>
              )}
            </div>
            <div className="comment-text">{item.comment}</div>
            <div className="comment-footer">
              <div className="comment-date">{item.date}</div>
              {props.replay && !item.replayLock && (
                <div className="comment-replay">
                  <FluentIcon icon="Reply" onClick={() => props.replay(item)} />
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const Comment = React.forwardRef((props) => <CommentComponent {...props} />);

Comment.propTypes = {
  id: PropTypes.string,
  color: PropTypes.oneOf(Object.values(COLOR)),
  radius: PropTypes.oneOf(Object.values(RADIUS)),
  shadow: PropTypes.oneOf(Object.values(SHADOW)),
  items: PropTypes.array.isRequired,
  like: PropTypes.func,
  replay: PropTypes.func,
  className: PropTypes.string,
};

Comment.defaultProps = {
  color: COLOR.LIGHT,
  radius: RADIUS.NORMAL,
  shadow: SHADOW.SMALL,
  className: '',
};

export { Comment };