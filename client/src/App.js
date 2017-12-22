import React        from 'react';
import Header       from './Header';
import Editor       from './Editor';
import Main         from './Main';

const Footer = () => (<footer>footer</footer>);

class App extends React.Component {
  render() {
    return (
      <div className='App'>
        <Header />
        <Main />
        <Footer />
      </div>
    );
  }
}

export default App;
