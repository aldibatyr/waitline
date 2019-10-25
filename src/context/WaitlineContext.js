import React, { Component } from 'react';
import AuthApiService from '../services/auth-api-service';
import TokenService from '../services/token-service';
import IdleService from '../services/idle-service';

const WaitlineContext = React.createContext({
  user: {},
  error: null,
  guests: [],
  setError: () => {},
  setUser: () => {},
  processLogin: () => {},
  processLogout: () => {},
  setGuests: () => {},
  deleteGuest: () => {},
  updateGuest: () => {},
})

export default WaitlineContext


export class WaitlineProvider extends Component {
  constructor(props) {
    super(props)
    const state = {
      user: {}, 
      error: null,
      guests: [],
      setError: this.setError,
      clearError: this.clearError,
      setUser: this.setUser,
      processLogin: this.processLogin,
      processLogout: this.processLogout,
      setGuests: this.setGuests,
      deleteGuest: this.deleteGuest,
      updateGuest: this.updateGuest,
    }

    const jwtPayload = TokenService.parseAuthToken()

    if (jwtPayload)
      state.user = {
        id: jwtPayload.user_id,
        first_name: jwtPayload.first_name,
        username: jwtPayload.sub
      }

    this.state = state
    IdleService.setIdleCallback(this.logoutBecauseIdle)
  }

  componentDidMount() {
    if (TokenService.hasAuthToken()) {
      IdleService.registerIdleTimerResets()
      TokenService.queueCallbackBeforeExpiry(() => {
        this.fetchRefreshToken()
      })
    }
  }

  componentWillUnmount() {
    IdleService.unRegisterIdleResets()
    TokenService.clearCallbackBeforeExpiry()
  }

  setError = error => {
    console.error(error)
    this.setState({error})
  }

  clearError = () => {
    this.setState({error: null})
  }

  setUser = user => {
    this.setState({user})
  }

  setGuests = guests => {
    this.setState({guests})
  }

  deleteGuest = guestId => {
    this.setState({
      guests: this.state.guests.filter(guest => guest.id !== guestId)
    })
  }

  updateGuest = (updatedGuest) => {
    console.log('from context console')
    this.setState({
      guests: this.state.guests.map(
        guest => (guest.id !== updatedGuest.id) ? guest : updatedGuest)
    })
  }

  

  processLogin = authToken => {
    TokenService.saveAuthToken(authToken)
    const jwtPayload = TokenService.parseAuthToken()
    this.setUser({
      id: jwtPayload.user_id,
      first_name: jwtPayload.first_name,
      username: jwtPayload.sub,
    })
    IdleService.registerIdleTimerResets()
    TokenService.queueCallbackBeforeExpiry(() => {
      this.fetchRefreshToken()
    })
  }

  processLogout = () => {
    TokenService.clearAuthToken()
    TokenService.clearCallbackBeforeExpiry()
    IdleService.unRegisterIdleResets()
    this.setUser({})
  }

  logoutBecauseIdle = () => {
    TokenService.clearAuthToken()
    TokenService.clearCallbackBeforeExpiry()
    IdleService.unRegisterIdleResets()
    this.setUser({idle: true})
  }

  fetchRefreshToken = () => {
    AuthApiService.refreshToken()
      .then(res => {
        TokenService.saveAuthToken(res.authToken)
        TokenService.queueCallbackBeforeExpiry(() => {
          this.fetchRefreshToken()
        })
      })
      .catch(err => {
        this.setError(err)
      })
  }

    render() {
      return (
        <WaitlineContext.Provider value={this.state}>
          {this.props.children}
        </WaitlineContext.Provider>
      )
    }
}