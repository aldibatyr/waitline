import React, {useState, useContext} from 'react';
import clsx from 'clsx';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import WaitlineContext from '../../context/WaitlineContext';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { CssBaseline, Avatar, Typography, Grid, TextField, Button } from '@material-ui/core'
import LineApiService from '../../services/line-api-service';



const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  button: {
    margin: theme.spacing(3, 0, 2),
  }
}))


function AddGuestForm(props) {

  const classes = useStyles();
  const context = useContext(WaitlineContext);
  const [buttonText, setButtonText] = useState('Add')
  const [error, setError] = useState(null);
  const [guest_name, setGuestName] = useState('');
  const [phone_number, setPhoneNumber] = useState('');
  const [size, setSize] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    e.persist();
    let inputs = {user_id: context.user.id, guest_name, phone_number, size}
    LineApiService.addGuest(inputs)
      .then(res => {
        context.setGuests(res)
      })
      .then((res) => {
        props.history.push('/liveline')
      })
      .catch(res => {
        setError({error: res.error})
      })
  }


  function goBack() {
    return props.history.push('/liveline')
  }

  function changeButtonText() {
    return setButtonText('Done')
  }

  return (
    <React.Fragment>
      <CssBaseline/>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <PersonAddIcon/>
        </Avatar>
        <Typography component="h1" variant="h5">
          Add Guest
        </Typography>
        {error && <Typography component="span" variant="body2" color="error">{error}</Typography>}
        <form className={classes.form} onSubmit={(e) => handleSubmit(e)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              {console.log(error)}
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="gname"
                name="guestName"
                variant="outlined"
                fullWidth
                id="guestName"
                label="Guest Name"
                autoFocus
                value={guest_name}
                placeholder="John Wick"
                onChange={(e) => setGuestName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                id="phoneNumber"
                label="Phone Number"
                name="phoneNumber"
                autoComplete="phoneNumber"
                value={phone_number}
                placeholder="1234567890"
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                id="size"
                label="Number of People"
                name="size"
                autoComplete="size"

                placeholder= "E.g. 2"
                onChange={(e) => setSize(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={changeButtonText}
              >
                {buttonText}
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={goBack}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </React.Fragment>
  )
}

export default withRouter(AddGuestForm)