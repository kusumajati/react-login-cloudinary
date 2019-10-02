import React from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import Login from './User/Login.js'
import SignUp from './User/SignUp.js'
import UserShow from './User/UserShow.js'
import UserAll from './User/UserAll.js'
import Header from './Header.js'

function App() {
  return (
    <div >
      <Router>
        <Header></Header>
        <Route exact path='/'>Landing Page</Route>
        <Route exact path='/login' component={Login}></Route>
        <Route exact path='/signup' component={SignUp}></Route>
        <Route exact path='/user/:id' component={UserShow}></Route>
        <Route exact path='/user' component={UserAll}></Route>

      </Router>
    </div>
  );
}

export default App;
