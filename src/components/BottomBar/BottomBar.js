import React from 'react';
import {Link} from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import { makeStyles, Toolbar, Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';


const useStyles = makeStyles(theme => ({
  appBar: {
    top: 'auto',
    bottom: 0,
    borderRadius: '10 10 0 0'
  },
  fabButton: {
    position: 'absolute',
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: '0 auto',
  }
}))


export default function BottomBar(props) {
  const classes = useStyles();

  return (
    <AppBar position="fixed" color="primary" className={classes.appBar}>
      <Toolbar>
        <Link to='/addguest'>
          <Fab color="secondary" aria-label="add" className={classes.fabButton}>
            <AddIcon/>
          </Fab>
        </Link>
      </Toolbar>
    </AppBar>
  )
}