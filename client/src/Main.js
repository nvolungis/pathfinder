import React           from 'react';
import {Switch, Route} from 'react-router';
import Editor          from './Editor';
import Home            from './Home';

import {
  AuthScreenContainer,
  LogIn,
} from './Auth';

export default props => (
  <main className='Main'>
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/editor' component={Editor} />
      <Route path='/auth' component={AuthScreenContainer} />
    </Switch>
  </main>
);
