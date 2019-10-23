import React, {useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import WaitlineContext from '../../context/WaitlineContext';
import TokenService from '../../services/token-service';
import {Link} from 'react-router-dom';
import './Header.css'
import { Avatar } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  appbar: {
    top: 0,
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
          <Avatar>
            {context.user.username.charAt(0).toUpperCase()}
          </Avatar>
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
      <AppBar className={classes.appbar} position="fixed">
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