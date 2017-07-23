import React, { Component, PropTypes } from 'react';
import { appStart, getUserData } from 'helpers/auth';
import MessageStore from 'altSrc/stores/Messages';
import MessageActions from 'altSrc/actions/Messages';
import connectToStores from 'alt-utils/lib/connectToStores';

import { postJSON, postToApi } from 'helpers/helper';
import classnames from 'classnames';

@connectToStores
class UserInput extends Component {
  constructor(props) {
    super(props);
  }

  static getPropsFromStores() {
    return MessageStore.getState();
  }

  static getStores() {
    return [MessageStore];
  }

  _onMessageSubmit = (e) => {
    const message = e.target.innerText;
    
    if (message && (e.keyCode === 13 || e.which === 13)) {
      e.preventDefault();
      MessageActions.messagePush({
        message,
        direction: 'out'
      });
      
      postToApi(message, this._pushApiMessage);
      e.target.innerText = '';      
    }
  }

  _pushApiMessage = (msg) => {
    const message = msg || 'Sorry, I did not understand that!'
    MessageActions.messagePush({
      message,
      direction: 'in'
    });
  }

  _saveChatHistory = () => {
    const { isArrayUpdated, allMessages } = this.props;

    if (isArrayUpdated) {
      return true;
    }

    const data = {
      allMessages,
      authId: getUserData('id')
    };
    postJSON('https://botman-be.herokuapp.com/save_chat', data, this._updateStore);
  }

  _updateStore = () => {
    MessageActions.historyUpdate();    
  }

  render() {
    return (
      <div className={classnames('md-grid', 'user-input')}>
        <div className="input-placeholder">
          Type a message
        </div>
        <div onKeyPress={this._onMessageSubmit} onBlur={this._saveChatHistory} className="input" contentEditable="true" spellCheck='string' ref={div => {
          this.__input = div;
          return div;
        }}>
        </div>
      </div>
    );
  }
}

UserInput.propTypes = {
  allMessages: React.PropTypes.array,
  isMsgUpdated: React.PropTypes.bool
};

export default UserInput;