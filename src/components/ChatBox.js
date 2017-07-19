import React, { Component, PropTypes } from 'react';
import Chat from './Chat.js';
import UserInput from './UserInput.js';
import connectToStores from 'alt-utils/lib/connectToStores';

import MessageStore from 'altSrc/stores/Messages';
import MessageActions from 'altSrc/actions/Messages';

@connectToStores
class ChatBox extends Component {
  constructor(props) {
    super(props);
  }

  static getPropsFromStores() {
    return MessageStore.getState();
  }

  static getStores() {
    return [MessageStore];
  }

  render() {
    const { allMessages } = this.props;
    console.log(allMessages);

    return (
      <div className="md-grid chat-box-container">
        <div className="chat-wrapper">
          <Chat allMessages={allMessages}/>
        </div>
        <div className="input-wrapper">
          <UserInput></UserInput>
        </div>
      </div>
    );
  }
}

Chat.propTypes = {
  allMessages: React.PropTypes.array
};

export default ChatBox;