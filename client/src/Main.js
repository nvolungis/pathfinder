import React           from 'react';
import {Switch, Route} from 'react-router';
import Editor          from './Editor';
import Home            from './Home';

export default props => (
  <main>
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/editor' component={Editor} />
    </Switch>
  </main>
);
