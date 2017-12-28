import React     from 'react';
import Header    from './Header';
import Main      from './Main';
import {user}    from './store/entities';
import store     from './store';

const Footer = () => (<footer className='Footer'>footer</footer>);

class App extends React.Component {
  constructor() {
    super();

    if(localStorage.getItem('user')) {
      store.dispatch(user.actions.setUser({
        email: localStorage.getItem('user')
      }));
    }
  }

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
