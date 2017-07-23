import alt from 'altSrc';
import MessageActions from 'altSrc/actions/Messages';
import { postJSON } from 'helpers/helper';
import { getUserData } from 'helpers/auth';


class MessageStore {
	constructor() {
		this.bindActions(MessageActions);
		const authId = getUserData('id');
		const data = {
			authId
		};
	
		postJSON('https://botman-be.herokuapp.com/get_chat', data, this._setData);
	}

	onMessagePush(obj) {
		const { allMessages } = this.state

		allMessages.push(obj);

		this.setState({
			allMessages
		});
	}

	_setData = (res) => {
		const resData = (res && res.chatHistory) ? res.chatHistory[0] : [];

		this.state = {
			allMessages: resData,
			isArrayUpdated: false
		};
	}
	
	onHistoryUpdate() {
		this.setState({
			isArrayUpdated: true
		});
	}
}

export default alt.createStore(MessageStore, 'MessageStore');
