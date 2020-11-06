import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Settings from './pages/Settings';
import Questions from './pages/Questions';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/settings" component={ Settings } />
        <Route path="/game" component={ Questions } />
        <Route exact path="/" component={ Login } />
      </Switch>
    );
  }
}

export default App;
