import React, {useState, useContext} from 'react';
import moment from 'moment';
import WaitlineContext from '../../context/WaitlineContext';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import Zoom from '@material-ui/core/Zoom';
import { CardHeader, IconButton, Typography, CardContent, CardActions, Collapse, Avatar, Grid, TextField, Button } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { red, green } from '@material-ui/core/colors';
import LineApiService from '../../services/line-api-service';


const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 345,
    marginTop: theme.spacing(4),
  },
  cardChecked: {
    backgroundColor: green[500]
  },
  header: {
    position: 'relative',
  },
  content: {
    width: '90%',
    margin: '0 auto',
    display: 'grid'
  },
  contentTextBlock: {
    marginBottom: '5%'
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
  },
  edit: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  editOpen: {
    transform: 'rotate(90deg)',
  },
  form: {
    width: '90%',
    margin: 'auto',
    marginBottom: '5%'
  }
}))
export default function GuestCard(props) {
  const classes = useStyles();
  const context = useContext(WaitlineContext);
  const [guest_name, setGuestName] = useState(props.name);
  const [phone_number, setPhoneNumber] = useState(props.number);
  const [size, setSize] = useState(props.size);
  const [expanded, setExpanded] = useState(false);
  const [editing, setEdits] = useState(false);
  const [loaded, setLoaded] = useState(true);
  const [checked, setChecked] = useState(props.calledOn);
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
    setLoaded(prev => !prev);
    LineApiService.deleteGuest(id)
      .then(() => {
        context.deleteGuest(id)
      })
  }

  function handleEditClick() {
    setEdits(!editing);
  }

  const handleEditSubmit = (e) => {
    e.preventDefault();
    let inputs = {guest_name, phone_number, size}
    LineApiService.editGuest(inputs, id)
      .then(() => {
        context.updateGuest(inputs);
      })
  }

  const switchToChecked = () => {
    if (props.calledOn) {
      return setChecked(true)
    }

  }
  const addTime = () => {
    let calledOn = moment().format();
    let inputWithTime = {calledOn};
    LineApiService.assignTime(inputWithTime, id)
      .then((res) => {
        console.log('context update ran')
        context.updateGuest(inputWithTime);
      })
    return switchToChecked();
  }

  const renderTime = () => {
    if (props.calledOn) {
      return (
        <span className={classes.importantInfo}>{moment(props.calledOn).fromNow()}</span>
      )
    }
    return (
      <span className={classes.importantInfo}>Not Yet</span>
    )
  }
  return (
    <Zoom in={loaded}>
    <Card className={clsx(classes.card, {
      [classes.cardChecked] : checked,
    })}>
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
      <CardContent className={classes.content}>
        <Typography variant="inherit" className={classes.contentTextBlock}>
          Phone Number: <span className={classes.importantInfo}>{formatPhoneNumber(props.number)}</span>
        </Typography>

        <Typography variant="inherit" className={classes.contentTextBlock}>
          Called On: {renderTime()}
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
        <CardActions className={classes.actions} disableSpacing>
          <IconButton onClick={addTime} className={classes.actionButton} aria-label="confirm">
            <CheckIcon/>
          </IconButton>
          <IconButton onClick={handleDeleteClick} className={classes.actionButton} aria-label="cancel">
            <CloseIcon/>
          </IconButton>
          <IconButton onClick={handleEditClick} className={clsx(classes.edit, {
            [classes.editOpen] : editing,
          })} aria-label="edit">
            <MoreVertIcon/>
          </IconButton>
        </CardActions>
        <Collapse in={editing} timeout="auto" unmountOnExit>
        <form className={classes.form} onSubmit={e=>handleEditSubmit(e)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="gname"
                name="guestName"
                variant="standard"
                fullWidth
                id="guestName"
                label="Guest Name"
                autoFocus
                placeholder="John Wick"
                value={guest_name}
                onChange={(e) => setGuestName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="standard"
                fullWidth
                id="phoneNumber"
                label="Phone Number"
                name="phoneNumber"
                autoComplete="phoneNumber"
                placeholder="1234567890"
                value={phone_number}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="standard"
                fullWidth
                id="size"
                label="Number of People"
                name="size"
                autoComplete="size"
                placeholder= "E.g. 2"
                value={size}
                onChange={(e) => setSize(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.button}
              >
                ADD
              </Button>
            </Grid>
          </Grid>
        </form>
        </Collapse>
      </Collapse>
    </Card>
    </Zoom>
  )
}