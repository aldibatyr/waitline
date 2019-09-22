import React, {useState, useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import WaitlineContext from '../../context/WaitlineContext';
import TokenService from '../../services/token-service';
import Typography from '@material-ui/core/Typography'
import {Link} from 'react-router-dom';
import './Header.css'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  appbar: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar(props) {
  const classes = useStyles();

  const context = useContext(WaitlineContext);

  const handleLogOutClick = () => {
    context.processLogout()
  }


  function renderLoginLink() {
    return (
      <Toolbar>
        <Button color="inherit"><Link className='link' to ='/login'>LOGIN</Link></Button>
      </Toolbar>
    )
  }

  function renderLogoutLink() {
    return (
      <Toolbar>
        <Button onClick={handleLogOutClick} color="inherit"><Link className='link' to ='/'>LOGOUT</Link></Button>
      </Toolbar>
    )
  }

  function renderUsername() {
    if (context.user.username) {
      return (
        <Toolbar>
          Signed in as {context.user.username.toUpperCase()}
        </Toolbar>
      )
    } else {
      return (
        <></>
      )
    }
  }
  return (
    <div className={classes.root}>
      <AppBar className={classes.appbar} position="static">
        <Box className={classes.box}>
          {renderUsername()}
        </Box>
        <Box className={classes.box}>
          {TokenService.hasAuthToken()
            ? renderLogoutLink()
            : renderLoginLink()
          }
        </Box>
        
      </AppBar>
    </div>
  );
}