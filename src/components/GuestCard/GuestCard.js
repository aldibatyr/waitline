import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import { CardHeader, IconButton, Typography, CardContent } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';


const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 345,
  }
}))
export default function GuestCard() {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardHeader
        action={
          <IconButton>
            <MoreVertIcon/>
          </IconButton>
        }
        title="Name of customer"
      />
      <CardContent>
        <Typography component="p">
          Timer:
        </Typography>
      </CardContent>
    </Card>
  )
}