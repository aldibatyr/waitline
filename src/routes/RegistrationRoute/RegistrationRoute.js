import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import {Link} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import AuthApiService from '../../services/auth-api-service';
import { Box, FormHelperText } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
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
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp(props) {
  

  const classes = useStyles();

  const [first_name, setFirst] = useState(null)
  const [firstNameError, setFirstNameError] = useState(false)
  const [last_name, setLast] = useState(null)
  const [lastNameError, setLastNameError] = useState(false)
  const [email, setEmail] = useState(null)
  const [emailError, setEmailError] = useState(false)
  const [username, setUsername] = useState(null)
  const [usernameError, setUsernameError] = useState(false)
  const [password, setPassword] = useState(null)
  const [passwordError, setPasswordError] = useState(false)
  // const [repeatPassword, setRepeatPassword] = useState(null)
  // const [repeatPasswordError, setRepeatPasswordError] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault();
    let inputs = {first_name, last_name, email, username, password}
    AuthApiService.postUser(inputs)
      .then(() => {
        props.history.push('/login')
      })
      .catch(res => {
        setError(res.error)
      })
  }

  const validateFirstName = (e) => {
    if (e.target.value.length < 2) {
      setFirstNameError('First Name must be at least 2 characters')
    } else {
      setFirst(e.target.value)
      setFirstNameError(false)
    }
  }

  const validateLastName = (e) => {
    if (e.target.value.length < 2) {
      setLastNameError('Last Name must be at least 2 characters')
    } else {
      setLast(e.target.value)
      setLastNameError(false)
    }
  } 

  const validateEmail = (e) => {
    if (e.target.value.length>4 && e.target.value.includes('@') && e.target.value.includes('.')) {
      setEmail(e.target.value)
      setEmailError(false)
    } else {
      setEmailError('Not a valid Email')
    }
  }

  const validateUsername = (e) => {
    if (e.target.value.length<2) {
      setUsernameError('username must be at least 2 characters')
    } else {
      setUsername(e.target.value)
      setUsernameError(e.target.value)
      setUsernameError(false)
    }
  }

  const validatePassword = (e) => {
    const REGEX_UPPER_LOWER_NUMBER_SPECIAL = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&])[\S]+/;
    if(e.target.value.length < 8) {
      setPasswordError('Password must be longer than 8 characters');
    }
    if(e.target.value.length > 72) {
      setPasswordError('Password must be less than 72 characters');
    }
    if(e.target.value.startsWith(' ') || e.target.value.endsWith(' ')){
      setPasswordError('Password must not start or end with empty spaces');
    }
    if(!REGEX_UPPER_LOWER_NUMBER_SPECIAL.test(password)){
      setPasswordError('Password must contain one upper case, lower case, number and special character');
    }
    setPassword(e.target.value)
    setPasswordError(false)
  }

  // const validatePasswordMatch = () => {
  //   if (password !== repeatPassword) {
  //     setRepeatPasswordError('Passwords do not match')
  //   }
  // }

  const renderFirstNameNotValid = () => {
    if (firstNameError) {
      return (
        <FormHelperText><Typography variant="caption" color="error">{firstNameError}</Typography></FormHelperText>
      )
    }
    return <></>
  }

  const renderLastNameNotValid = () => {
    if (lastNameError) {
      return (
        <FormHelperText><Typography variant="caption" color="error">{lastNameError}</Typography></FormHelperText>
      )
    }
    return <></>
  }

  const renderEmailNotValid = () => {
    if (emailError) {
      return (
        <FormHelperText><Typography variant="caption" color="error">{emailError}</Typography></FormHelperText>
      )
    }
    return <></>
  }

  const renderUsernameNotValid = () => {
    if (usernameError) {
      return (
        <FormHelperText><Typography variant="caption" color="error">{usernameError}</Typography></FormHelperText>
      )
    }
    return <></>
  }

  const renderPasswordNotValid = () => {
    if (passwordError) {
      return (
        <FormHelperText><Typography variant="caption" color="error">{passwordError}</Typography></FormHelperText>
      )
    }
    return <></>
  }

  // const renderPasswordMatchNotValid = () => {
  //   return ((repeatPasswordError) ? <FormHelperText><Typography variant="caption" color="error">{repeatPasswordError}</Typography></FormHelperText> : <></>)
  // }

  const renderError = () => {
    if (error) {
      return (
        <Box>
          <p>{error.message}</p>
        </Box>
      )
    }
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        {renderError()}
        <form className={classes.form} onSubmit={(e) => handleSubmit(e)} validate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                onChange={(e) => validateFirstName(e)}
                autoFocus
              />
              {renderFirstNameNotValid()}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                onChange={(e) => validateLastName(e)}
              />
              {renderLastNameNotValid()}
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={(e) => validateEmail(e)}
              />
              {renderEmailNotValid()}
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                onChange={(e) => validateUsername(e)}
              />
              {renderUsernameNotValid()}
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => validatePassword(e)}
              />
              {renderPasswordNotValid()}
            </Grid>
            {/* <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="repeat_password"
                label="Repeat Password"
                type="password"
                id="repeat_password"
                onChange={(e) => setRepeatPassword(e.target.value).then(validatePasswordMatch())}
              />
              {renderPasswordMatchNotValid()}
            </Grid> */}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}