import React from 'react';

const socket = io();

class Modal extends React.Component {
  constructor() {
    super();
    this.state = {
      user: "Agent",
      username: "",
      modalStatus: "open"
    };
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.signIn();
    }
  }

  handleInput(e) {
    this.setState(
      {username: e.target.value}
    );
  }

  signIn() {
    var username = "Anonymous";
    if (this.state.username !== "") {
       username = this.state.username;
    }

    this.props.updateUsername(username);

    this.setState({
      modalStatus: "hidden",
      user: "client"
    });
  }

  agentSignIn() {
    setTimeout(
      function() {
       this.props.agentLogIn();
     }.bind(this),
      250
    );
  }

  render() {
    console.log(this.state);
    return (
      <div className={this.state.modalStatus}>
        <div className="modal-box">
          <div className="greeting">Hi! Please type in your name:</div>
          <div>
            <input
              type="text"
              className="nameBox"
              value={this.state.username}
              onChange={this.handleInput.bind(this)}
              onKeyPress={this.handleKeyPress.bind(this)}
              placeholder="Your name here"
            />
            <input
              type="image"
              className="sendIcon"
              src="https://image.flaticon.com/icons/png/512/60/60525.png"
              onClick={this.signIn.bind(this)}
            />
          </div>
          <label className="switch">
            <div className="agentSignIn">Or,
              <button onClick={this.agentSignIn.bind(this)}>
                I am an agent.
              </button>
            </div>
          </label>
        </div>
      </div>
    );
  }
}

export default Modal;


// <input
// type="checkbox"
// onClick={this.agentSignIn.bind(this)}
// />
// <span className="slider round"></span>
