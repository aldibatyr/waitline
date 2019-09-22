import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import { CardHeader, IconButton, Typography, CardContent, CardActions, Collapse, Avatar } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { red } from '@material-ui/core/colors';


const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 345,
    marginTop: theme.spacing(4),
  },
  header: {
    position: 'relative',
  },
  content: {
    width: '90%',
    margin: '0 auto',
  },
  avatar: {
    position: 'absolute',
    right: -5,
    top: -5,
    zIndex: 1,
    backgroundColor: red[500]
  },
  actions: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  }
}))
export default function GuestCard() {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  function handleExpandClick() {
    setExpanded(!expanded);
  }

  return (
    <Card className={classes.card}>
      <CardHeader
        className={classes.header}
        avatar={
          <Avatar className={classes.avatar}>
            6
          </Avatar>
        }
        title={
          <Typography variant="h6" component="p">
            Name
          </Typography>

        }
      />
      <CardContent className={classes.content}>
        <Typography variant="inherit" component="p">
          Timer:
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen] : expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent className={classes.content}>
          <Typography variant="inherit">
            Phone Number: 
          </Typography>
        </CardContent>
        <CardActions className={classes.actions} disableSpacing>
          <IconButton className={classes.actionButton} aria-label="confirm">
            <CheckIcon/>
          </IconButton>
          <IconButton className={classes.actionButton} aria-label="cancel">
            <CloseIcon/>
          </IconButton>
        </CardActions>
      </Collapse>
    </Card>
  )
}