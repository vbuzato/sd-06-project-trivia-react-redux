import React from 'react';
import Login from './Pages/Login';
import { Route, Switch } from 'react-router-dom';


class App extends React.Component {
  render(){
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={ Login } />
        </Switch>
      </div>
    );
  }
}

export default App;
