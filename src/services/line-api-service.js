import config from '../config';
import TokenService from './token-service';

const LineApiService = {
  getLine() {
    return fetch(`${config.API_ENDPOINT}/line`, {
      method: 'GET',
      headers: {
        'authorization': `Bearer ${TokenService.getAuthToken()}`
      }
    })
      .then(res => 
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
      .catch(error => {
        console.error({error})
      })
  },
  addGuest(guestData) {
    return fetch(`${config.API_ENDPOINT}/line`, {
      method: 'POST',
      headers: {
        'authorization': `Bearer ${TokenService.getAuthToken()}`,
        'content-type': 'application/json'
      },
      body: JSON.stringify(guestData)
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
      .catch(error => {
        console.error({error})
      })
  },
  deleteGuest(guestId) {
    return fetch(`${config.API_ENDPOINT}/line/${guestId}`, {
      method: 'DELETE',
      headers: {
        'authorization': `Bearer ${TokenService.getAuthToken()}`,
        'content-type': 'application/json'
      }
    })
      .catch(error => {
        console.error({error})
      })
  },
  editGuest(editedFields, guestId) {
    return fetch(`${config.API_ENDPOINT}/line/${guestId}`, {
      method: 'PATCH',
      headers: {
        'authorization': `Bearer ${TokenService.getAuthToken()}`,
        'content-type': 'application/json'
      },
      body: JSON.stringify(editedFields)
    })
      .then(res => 
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
      .catch(error => {
        console.error({error})
      }) 
  }
}

export default LineApiService;