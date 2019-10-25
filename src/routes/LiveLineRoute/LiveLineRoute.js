import React, {useContext, useMemo} from 'react';
import WaitlineContext from '../../context/WaitlineContext';
import GuestCard from '../../components/GuestCard/GuestCard';
import BottomBar from '../../components/BottomBar/BottomBar';
import Container from '@material-ui/core/Container';
import LineApiService from '../../services/line-api-service';
import { makeStyles} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  line: {
    height: '100%',
    marginTop: 100,
    marginBottom: 100
  },
  message: {
    height: '100',
    width: '100',
    background: 'black'
  }

}))


export default function LiveLineRoute(props) {
  const classes = useStyles();
  const {guests, setGuests} = useContext(WaitlineContext);

  useMemo(() => {
    LineApiService.getLine()
      .then((res) => {
        setGuests(res)
      })
  }, []);

  const renderLine = () => {
    console.log(guests)
    let line = Array.from(guests)
    line = line.sort(function(a,b) {return a.id - b.id}).map((guest) => (
        <GuestCard {...props} key={guest.id} size={guest.size} id={guest.id} name={guest.guest_name} number={guest.phone_number} calledOn={guest.calledOn} />
      ))
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