import React from 'react';
import Chat from './chat';
import ChatterBox from './chatterbox';

var socket = io();

class AgentChat extends Chat {
  constructor(props) {
    super(props);
    this.state = {
      username: props.username,
      message: "",
      messages: [],
      numUsers: 0,
      room: props.room,
      blinkStatus: "off",
      important: []
    };
  }

  componentWillMount() {
    super.componentWillMount();
  }

  componentDidMount() {
    super.componentDidMount();

    window.addEventListener('mouseup', () => {
      var selection;
      if (window.getSelection) {
        selection = window.getSelection();
        console.log("id", selection.focusNode.parentNode.id);
        if (selection !== "") {
          this.state.important.push(selection.toString());
        }
      }
    });
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
    console.log(this.state.important);
    return(
      <div>
        <div className="important-blurbs">
          {this.state.important.map((blurb, idx) => (
            <li>{blurb}</li>
          ))}
        </div>
        <div className="chat-box">
          {this.state.messages.map((msg, idx) => (
            <ChatterBox
              key={idx}
              message={msg.message}
              username={msg.username}
              room={this.state.room}
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
          <button className="send-msg" onClick={this.sendMessage.bind(this)}>
            Send
          </button>
        </div>
      </div>
    );
  }


}

export default AgentChat;
