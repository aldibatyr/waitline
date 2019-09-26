import React, {useState, useContext, useEffect} from 'react';
import EmptyMessage from '../../components/EmptyMessage/EmptyMessage';
import WaitlineContext from '../../context/WaitlineContext';
import GuestCard from '../../components/GuestCard/GuestCard';
import BottomBar from '../../components/BottomBar/BottomBar';
import Container from '@material-ui/core/Container';
import LineApiService from '../../services/line-api-service';
import { makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  line: {
    height: '100%',
    marginBottom: 100
  }
}))


export default function LiveLineRoute(props) {
  const classes = useStyles();
  const context = useContext(WaitlineContext);

  useEffect(() => {
    LineApiService.getLine()
      .then(res => {
        context.setGuests(res)
      })
  }, []);

  const renderLine = () => {
    let line = Array.from(context.guests)
    line = line.map((guest) => <GuestCard key={guest.id} size={guest.size} id={guest.id} name={guest.guest_name} number={guest.phone_number}/>)
    return (
        <Container className={classes.line} component="section">
          {line}
        </Container>
      )

  }
 
  return (
    <Container component="main" maxWidth="xs">
      {renderLine()}
      <BottomBar/>
    </Container>
  )
}