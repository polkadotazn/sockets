import React from 'react';
import Modal from './sign_in_modal';
import Chat from './chat';
import AgentView from './agent_view';
import UserView from './user_view';
// import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      agent: false
    };
    this.updateUser = this.updateUser.bind(this);
    this.agentLogIn = this.agentLogIn.bind(this);
  }

  updateUser(username) {
    this.setState({
      username: username
    });
  }

  agentLogIn() {
    this.setState({
      agent: true
    });
  }

  render() {
    let show = (
      <
        Modal
        updateUsername={this.updateUser}
        agentLogIn={this.agentLogIn}
      />
    );

    if (this.state.username) {
      show = <UserView username={this.state.username} />;
    } else if (this.state.agent) {
      show = <AgentView username={"Agent"} />;
    }

    return (
      <div>
        {show}
      </div>
    );
  }
}

export default App;

// document.addEventListener('DOMContentLoaded', () => {
//   ReactDOM.render(<root />, document.getElementsById('main'));
// });
