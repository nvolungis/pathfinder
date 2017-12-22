import React           from 'react';
import {Switch, Route} from 'react-router';
import {LinkWidget}    from './Auth';

export default () => (
  <header className='Header'>
    <Switch>
      <Route path='/' children={props => ([
        <div key='left' className='header__left'>
        </div>,

        <div key='center' className='header__center'>

        </div>,

        <div key='right' className='header__right'>
          <LinkWidget />
        </div>
      ])} />
    </Switch>
  </header>
);
