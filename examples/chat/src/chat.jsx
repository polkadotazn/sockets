import React from 'react';

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
    this.state.messages.push(data);
    let messages = this.state.messages;
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
      this.addNewMessage(this.state.message);
    }
  }

  sendMessage() {

    socket.emit('new message', this.state.message);
  }

  render () {
    return(
      <div>
        {this.state.messages.map(msg => (
          msg
        ))}
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
