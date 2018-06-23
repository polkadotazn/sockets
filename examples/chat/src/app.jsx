import React from 'react';
import Chat from './chat';
// import ReactDOM from 'react-dom';

class App extends React.Component {
  render() {
    return (
      <div>
        <Chat/>
      </div>
    );
  }
}

export default App;

// document.addEventListener('DOMContentLoaded', () => {
//   ReactDOM.render(<root />, document.getElementsById('main'));
// });
