import React from 'react';
import { Link } from 'react-router-dom';
import ChatterBox from './chatterbox';

var socket = io('/room1');

class Chat extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      username: props.username,
      message: "",
      messages: [],
      clientNum: 0
    };
  }

  componentWillMount() {
    socket.on('new message', (msg) => {
      console.log("msg", msg);
      this.addNewMessage(msg.message);
    });
  }

  addNewMessage(msgObj) {
    let messages = this.state.messages;
    messages.push(msgObj);

    this.setState({
      message: "",
      messages: messages
    });
  }

  handleInput(e) {
    this.setState(
      {message: e.target.value}
    );
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.sendMessage();
    }
  }

  sendMessage() {
    let msgObj = {
      message: this.state.message,
      username: this.state.username
    };
    socket.emit('new message', msgObj);
    this.addNewMessage(msgObj);
  }



  render () {
    return(
      <div>
        <div className="chat-box">
          {this.state.messages.map((msg, idx) => (
            <ChatterBox
              key={idx}
              message={msg.message}
              username={msg.username}
            />
          ))}
        </div>
        <div className="chat-input">
          <input
            className="input-box"
            type="text"
            value={this.state.message}
            onKeyPress={this.handleKeyPress.bind(this)}
            onChange={this.handleInput.bind(this)} >
          </input>
          <button className="sendMsg" onClick={this.sendMessage.bind(this)}>
            Send
          </button>
        </div>
      </div>
    );
  }
}

export default Chat;
