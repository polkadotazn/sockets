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
      room: 1,
      important: [],
    };
    if (this.state.username === "Agent") {
      this.state.room = props.room;
    }
    this.addUser = this.addUser.bind(this);
  }

  componentWillMount() {
    socket.on('new message', (msg) => {
      this.addNewMessage(msg.message);
    });

    socket.on('login', ( {numUsers} ) => {
      this.setState({numUsers: numUsers});
      if (this.state.numUsers === 2 && this.state.username !== "Agent") {
        this.setState( {room: 2} );
      } else if (this.state.numUsers > 2) {
        window.alert("No available agent");
        this.setState( {room: 3} );
      }
    });
  }

  alertAgent() {
    socket.on('user joined', (info) => {
      if (info.room === this.state.room) {
        window.alert(`${info.username} has joined Room ${info.room}`);
        this.startTimer();
      }
    });
  }

  componentDidMount () {

    window.addEventListener('beforeunload', () => {
      if (this.state.username !== "Agent") {
        let msgObj = {
          message: `${this.state.username} has left the room!`,
          username: null,
          room: this.state.room
        };
        socket.emit('new message', msgObj);
      }
    });
  }
  //
  // componentDidUpdate() {
  //   this.addUser();
  // }

  addUser() {
    if (this.state.username !== "Agent") {
      socket.emit('add user', this.state.username, this.state.room);
    }
    console.log("yikes", this.state.room);
  }

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
    this.addUser();
    return(
      <div>
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
