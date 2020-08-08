import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Home from './pages/Home';
import Login from './sessions/Login';
import Logout from './sessions/Logout';

import Register from './users/Register';
import Deals from './deals/Index';
import NewDeal from './deals/New';
import EditDeal from './deals/Edit';

function Routes ({user, setUser}) {
  return (
    <Switch>
      <Route exact path="/" component={Home}/>
      <Route exact path="/register" render={
        renderProps => <Register
          {...renderProps}
          setUser={setUser}
        />
      }/>
      <Route exact path="/login" render={
        renderProps => <Login
          {...renderProps}
          setUser={setUser}
        />
      }/>
      <Route exact path="/logout" render={
        renderProps => <Logout
          {...renderProps}
          setUser={setUser}
        />
      }/>
      <Route exact path="/deals" render={
        renderProps => <Deals
          {...renderProps}
          user={user}
        />
      }/>
       <Route exact path="/deals/new" render={
        props => user ? (
          <NewDeal {...props} />
        ) : (
          <Redirect to="/"/>
        )
      }/>
      <Route exact path="/deals/edit" render={
        props => user ? (
          <EditDeal {...props} />
        ) : (
          <Redirect to="/"/>
        )
      }/>
    </Switch>
  );
}
export default Routes;