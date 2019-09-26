import React, {useState, useContext} from 'react';
import WaitlineContext from '../../context/WaitlineContext';
import Timer from '../../components/Timer/Timer';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import { CardHeader, IconButton, Typography, CardContent, CardActions, Collapse, Avatar } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { red } from '@material-ui/core/colors';
import LineApiService from '../../services/line-api-service';


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
export default function GuestCard(props) {
  const classes = useStyles();
  const context = useContext(WaitlineContext);
  const [expanded, setExpanded] = useState(false);
  const [timer, setTimer] = useState()
  const [error, setError] = useState(null);
  const [id] = useState(props.id)

  function formatPhoneNumber(phoneNumberString) {
    var cleaned = ('' + phoneNumberString).replace(/\D/g, '')
    var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
    if (match) {
      return '(' + match[1] + ') ' + match[2] + '-' + match[3]
    }
    return phoneNumberString;
  }

  function handleExpandClick() {
    setExpanded(!expanded);
  }
  function handleDeleteClick() {
    console.log(id)
    LineApiService.deleteGuest(id)
      .then(() => {
        context.deleteGuest(id)
      })
  }

  function renderTimer() {

  }
  return (
    <Card className={classes.card}>
      <CardHeader
        className={classes.header}
        avatar={
          <Avatar className={classes.avatar}>
            {props.size}
          </Avatar>
        }
        title={
          <Typography variant="h6" component="p">
            {props.name}
          </Typography>

        }
      />
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
            Phone Number: {formatPhoneNumber(props.number)}
          </Typography>
        </CardContent>
        <CardActions className={classes.actions} disableSpacing>
          <IconButton className={classes.actionButton} aria-label="confirm">
            <CheckIcon/>
          </IconButton>
          <IconButton onClick={handleDeleteClick} className={classes.actionButton} aria-label="cancel">
            <CloseIcon/>
          </IconButton>
          <IconButton>
            <MoreVertIcon/>
          </IconButton>
        </CardActions>
      </Collapse>
    </Card>
  )
}