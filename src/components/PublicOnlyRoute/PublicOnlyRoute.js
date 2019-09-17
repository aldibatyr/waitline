import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import WaitlineContext from '../../context/WaitlineContext';

export default function PublicOnlyRoute({ component, ...props }) {
  const Component = component
  return (
    <Route
      {...props}
      render={componentProps => (
        <WaitlineContext.Consumer>
          {waitlineContext =>
            !!waitlineContext.user.id
            ? <Redirect to={'/'} />
            : <Component {...componentProps} />
          }
        </WaitlineContext.Consumer>
      )}
    />
  )
}