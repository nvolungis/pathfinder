import React           from 'react';
import Header          from './Header';
import Main            from './Main';

const Footer = () => (<footer className='Footer'>footer</footer>);

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
