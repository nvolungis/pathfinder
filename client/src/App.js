import React     from 'react';
import {connect} from 'react-redux';
import Header    from './Header';
import Main      from './Main';
import {user}    from './store';

const Footer = () => (<footer className='Footer'>footer</footer>);

class App extends React.Component {
  constructor(props) {
    super(props);

    if (localStorage.getItem('user')) {
      props.setUser({
        email: localStorage.getItem('user')
      });
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

const AppContainer = connect(
  state => ({}),
  dispatch => ({
    setUser: data => dispatch(user.actions.setUser(data)),
  }),
)(App);

export default AppContainer;
