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
      important: [],
      clientName: null
    };
  }

  componentWillMount() {
    super.componentWillMount();
  }

  componentDidMount() {
    super.componentDidMount();

    window.addEventListener('mouseup', () => {
      let blurbs = this.state.important;
      if (window.getSelection) {
        let selection = window.getSelection();
        let selectionText = selection.toString();
        let id = parseInt(selection.focusNode.parentNode.parentNode.id);
        if (selectionText !== "" && this.state.room === id
          && !blurbs.includes(selectionText)) {
          blurbs.push(selectionText);
          this.setState({ important: blurbs });
        }
      }
    });

    socket.on('user joined', (info) => {
      if (info.room === this.state.room) {
        window.alert(`${info.username} has joined Room ${info.room}`);
        this.startTimer();
        this.setState({ clientName: info.username });
      }
    });

    socket.on('user left', (info) => {
      if (info.room === this.state.room) {
        this.setState({ blinkStatus: "off" });
      }
    });
  }

  deleteBlurb(e) {
    let blurbs = this.state.important;
    let index = blurbs.indexOf(e.target.innerHTML);
    blurbs.splice(index, 1);
    this.setState({ important: blurbs });
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
            <text
              className="blurb"
              key={idx}
              onClick={this.deleteBlurb.bind(this)}
            >
              {blurb}
            </text>
          ))}
        </div>
        <div className="chat-box">
          <div className="chat-title">
            {this.state.clientName}
          </div>
          <div className="message">
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
      </div>
    );
  }


}

export default AgentChat;
