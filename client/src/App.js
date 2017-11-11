import React  from 'react';
import Editor from './Editor';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Editor width={700} height={700} />
      </div>
    );
  }
}

export default App;
