import React, {useState, useContext} from 'react';
import WaitlineContext from '../../context/WaitlineContext';
import GuestCard from '../../components/GuestCard/GuestCard';
import BottomBar from '../../components/BottomBar/BottomBar';
import Container from '@material-ui/core/Container';



export default function LiveLineRoute(props) {
  const context = useContext(WaitlineContext)

  
  return (
    <Container component="main" maxWidth="xs">
      <GuestCard/>
      <BottomBar/>
    </Container>
  )
}