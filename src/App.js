import React from 'react';
import {Route, Switch} from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import PublicOnlyRoute from './components/PublicOnlyRoute/PublicOnlyRoute';
import './App.css';
import RegistrationRoute from './routes/RegistrationRoute/RegistrationRoute';
import NotFoundRoute from './routes/NotFoundRoute/NotFoundRoute';
import LoginRoute from './routes/LoginRoute/LoginRoute';
import LiveLineRoute from './routes/LiveLineRoute/LiveLineRoute';
import AddGuestRoute from './routes/AddGuestRoute/AddGuestRoute';
import Header from './components/Header/Header';

export default class App extends React.Component {
  state = {hasError: false}

  static getDerivedStateFromError(error) {
    console.error(error)
    return {hasError: true}
  }

  render() {
    const {hasError} = this.state
    return(
      <div className='App'>
        <Header/>
        <main role='main'>
          {hasError && (
            <p>There was an Error! Oh no!</p>
          )}
          <Switch>
            {/* <Route
              component={NotFoundRoute}
            /> */}
            <PublicOnlyRoute
              exact path={['/', '/register']}
              component={RegistrationRoute}
            />
            {<PublicOnlyRoute
              path={'/login'}
              component={LoginRoute}
            />
            /*
            <PrivateRoute
              path={'/liveline'}
              component={LiveLineRoute}
            />
            <PrivateRoute
              path={'/addguest'}
              component={AddGuestRoute}
            /> */}
          </Switch>
        </main>
      </div>
    )
  }
}