import React from 'react';
import AddGuestForm from '../../components/AddGuestForm/AddGuestForm';
import Container from '@material-ui/core/Container'


export default function AddGuest() {
  return (
    <Container component="main" maxWidth="xs">
      <AddGuestForm/>
    </Container>
  )
}