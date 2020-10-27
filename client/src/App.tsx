import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import './App.css';
import Menubar from './components/Menu';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <Router>
      <Container>
        <Menubar />
        <Switch>
          <Route path='/' component={Home} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/register' component={Register} />
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
