import React from 'react';
import Chat from './chat';
import ChatterBox from './chatterbox';

class AgentChat extends Chat {
  constructor(props) {
    super(props);
    this.state = {
      username: props.username,
      message: "",
      messages: [],
      numUsers: 0,
      room: props.room,
      blinkStatus: "off"
    };
  }

  componentWillMount() {
    super.componentWillMount();
    this.startTimer();
  }

  blinky() {
    this.setState({
      blinkStatus: "on"
    });
  }

  stopBlinky() {
    this.setState({
      blinkStatus: "off"
    });
  }

  startTimer() {
    window.setTimeout(() => {
      this.blinky();
    }, 15000);
  }

  render() {
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
            onChange={this.handleInput.bind(this)}
            id={this.state.blinkStatus}
            onFocus={this.stopBlinky.bind(this)}
            onBlur={this.startTimer.bind(this)}
          >
          </input>
          <button className="sendMsg" onClick={this.sendMessage.bind(this)}>
            Send
          </button>
        </div>
      </div>
    );
  }


}

export default AgentChat;
