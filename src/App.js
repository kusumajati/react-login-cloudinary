import React from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import Login from './User/Login.js'
import SignUp from './User/SignUp.js'
import UserShow from './User/UserShow.js'
import UserAll from './User/UserAll.js'
import Header from './Header.js'
import ProductForm from './Product/ProductForm.js';
import ProductForm2 from './Product/ProductForm2.js';

function App() {
  return (
    <div >
      <Router>
        <Header />
        <Route exact path='/'>Landing Page</Route>
        <Route exact path='/login' component={Login}></Route>
        <Route exact path='/signup' component={SignUp}></Route>
        <Route exact path='/user/:id' component={UserShow}></Route>
        <Route exact path='/user' component={UserAll}></Route>
        <Route exact path='/product/form' component={ProductForm}></Route>
        <Route exact path='/product/form2' component={ProductForm2}></Route>

      </Router>
    </div>
  );
}

export default App;
