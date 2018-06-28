import React from 'react';
import { Link } from 'react-router-dom';
import ChatterBox from './chatterbox';

var socket = io();

class Chat extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      username: props.username,
      message: "",
      messages: [],
      numUsers: 0,
      room: 1
    };
    if (this.state.username === "Agent") {
      this.state.room = props.room;
    }
  }

  componentWillMount() {
    socket.on('new message', (msg) => {
      this.addNewMessage(msg.message);
    });
    if (this.state.username !== "Agent") {
      socket.emit('add user', () => {});
    }

    socket.on('login', ( {numUsers} ) => {
      this.setState({numUsers: numUsers});
      if (this.state.numUsers === 2 && this.state.username !== "Agent") {
        this.setState( {room: 2} );
      } else if (this.state.numUsers > 2) {
        window.alert("No available agent");
      }
    });
  }

  componentDidMount () {
    window.addEventListener('beforeunload', () => {
      let msgObj = {
        message: "Customer has left the room :(",
        username: null,
        room: this.state.room
      };
      socket.emit('new message', msgObj);
    });
  }
  //
  // componentWillUnmount() {
  //   console.log("delete");
  //
  //   socket.emit('new message', msgObj);
  //   this.addNewMessage(msgObj);
  //   socket.emit('disconnect');
  // }

  addNewMessage(msgObj) {
    let messages = this.state.messages;
    if (msgObj.username === this.state.username
      || msgObj.room === this.state.room) {
      messages.push(msgObj);
    }

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
      username: this.state.username,
      room: this.state.room
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
