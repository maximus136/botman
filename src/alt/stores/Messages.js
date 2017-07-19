import alt from 'altSrc';
import MessageActions from 'altSrc/actions/Messages';

class MessageStore {
	constructor() {
		this.bindActions(MessageActions);

		this.state = {
			allMessages: [{
				message: 'hello',
				direction: 'in'
			}]
		};
	}

	onMessagePush(obj) {
		const { allMessages } = this.state;
		console.log(obj);
		allMessages.push(obj);
		this.setState({ allMessages });
  }
}

export default alt.createStore(MessageStore, 'MessageStore');
