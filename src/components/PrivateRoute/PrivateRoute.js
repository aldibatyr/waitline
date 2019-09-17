import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import WaitlineContext from '../../context/WaitlineContext';

export default function PrivateRoute({component, ...props}) {
  const Component = component;
  return (
    <Route
      {...props}
      render={componentProps => (
        <WaitlineContext.Consumer>
          {waitlineContext =>
            !!waitlineContext.user.id
            ? <Component {...componentProps} />
            : (
              <Redirect
                to={{
                  pathname: waitlineContext.user.idle ? '/login' : '/register',
                  state: {from: componentProps.location},
                }}
              />
            )
          }
        </WaitlineContext.Consumer>
      )}
    />
  )
}