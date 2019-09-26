import React from 'react';
import { Container } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';


const EmptyMessage = () => {
  return (
    <Container component="section">
      <Typography variant="body2" component="p">
        Your line will render here, try to add some people!
      </Typography>
    </Container>
  )
}

export default EmptyMessage;