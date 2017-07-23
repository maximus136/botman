import React, { PropTypes } from 'react';
import {appStart, getUserData} from 'helpers/auth';
import classnames from 'classnames';

const Message = ( props ) => {
  const { message, direction } = props;

  return (
    <div className={classnames('md-grid', `msg-${direction}`)}>
      <div className={classnames('msg-bubble', `msg-bubble-${direction}`)}>
        <span className="msg-text">
          {message}
        </span>
      </div>
    </div>
  );
}

Message.propTypes = {
  message: PropTypes.string,
  direction: PropTypes.oneOf(['in', 'out'])
}

export default Message;