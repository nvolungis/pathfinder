import React           from 'react';
import {LinkWidget}    from './Auth';
import {Switch, Route} from 'react-router';
import {Link}          from 'react-router-dom';
import {connect}       from 'react-redux';
import {user}          from './store/entities';
import './header.css';

export const Header = ({
  email,
}) => (
  <Switch>
    <Route exact path='/editor' children={props => null} />

    <Route path='/' children={props => (
      <header className='Header'>
        <div key='left' className='header__left'>
          <Link to="/editor">Editor</Link>
        </div>

        <div key='center' className='header__center'>
          crosstree
        </div>

        <div key='right' className='header__right'>
          <LinkWidget email={email} />
        </div>
      </header>
    )} />
  </Switch>
);

const HeaderContainer = connect(
  state => ({
    email: user.selectors.getUser(state).email,
  }),
  dispatch => ({}),
)(Header);

export default HeaderContainer;
