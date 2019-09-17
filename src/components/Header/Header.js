import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Box from '@material-ui/core/Box'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  appbar: {
    display: "inline-block",
  },
  box: {
    width: '50%',
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  function renderLoginLink() {
    return (
      <Toolbar>
        <Button color="inherit">Login</Button>
      </Toolbar>
    )
  }

  function renderLogoutLink() {
    return (
      <Toolbar>
        <Button color="inherit">Logout</Button>
      </Toolbar>
    )
  }
  return (
    <div className={classes.root}>
      <AppBar className={classes.appbar} position="static">
        <Box className={classes.box}>
          {renderLoginLink()}
        </Box>
        <Box className={classes.box}>
          {renderLogoutLink()}
        </Box>
        
      </AppBar>
    </div>
  );
}