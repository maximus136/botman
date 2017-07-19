import React, { PropTypes } from 'react';
import {appStart, getUserData} from '../helpers/auth';
import Message from './Message.js';

const Chat = ({ allMessages }) => (
  <div className="md-grid">
    {allMessages.map((msg) => (
      <Message message={msg.message} direction={msg.direction}/>
    ))}
  </div>
);

Chat.propTypes = {
  allMessages: React.PropTypes.array
};

export default Chat;