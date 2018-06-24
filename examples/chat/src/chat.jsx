import React from 'react';
import { Link } from 'react-router-dom';
import ChatterBox from './chatterbox';

var socket = io();

class Chat extends React.Component {
  constructor () {
    super();
    this.state = {
      message: "",
      messages: []
    };
  }

  componentWillMount() {
    socket.on('new message', (data) => {
      this.addNewMessage(data);
    });
  }

  addNewMessage(data) {
    let messages = this.state.messages;
    messages.push(data);

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
    socket.emit('new message', this.state.message);
    this.addNewMessage(this.state.message);
  }


  render () {
    return(
      <div>
        <div>
          {this.state.messages.map((msg, idx) => (
            <ChatterBox
              key={idx}
              message={msg}
            />
          ))}
        </div>
        <input type="text"
          onKeyPress={this.handleKeyPress.bind(this)}
          value={this.state.message}
          onChange={this.handleInput.bind(this)} >
        </input>
        <button onClick={this.sendMessage.bind(this)}>Send</button>
      </div>
    );
  }
}

export default Chat;
