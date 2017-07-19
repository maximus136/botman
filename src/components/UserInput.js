import React, { Component, PropTypes } from 'react';
import { appStart, getUserData } from '../helpers/auth';
import MessageStore from 'altSrc/stores/Messages';
import MessageActions from 'altSrc/actions/Messages';
import classnames from 'classnames';

class UserInput extends Component {
  constructor(props) {
    super(props);
  }

  _onMessageSubmit = (e) => {
    let message;

    if (e.keyCode === 13 || e.which === 13) {
      e.preventDefault();
      message = e.target.innerText;
      MessageActions.messagePush({
        message,
        direction: 'out'
      });
    }
  }

  render() {
    return (
      <div className={classnames('md-grid', 'user-input')}>
        <div className="input-placeholder">
          Type a message
        </div>
        <div onKeyPress={this._onMessageSubmit} className="input" contentEditable="true" spellCheck='string' ref={div => {
          this.__input = div;
          return div;
        }}>
        </div>
      </div>
    );
  }
}

UserInput.propTypes = {
}

export default UserInput;