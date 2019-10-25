import config from '../config';
import TokenService from './token-service';

const LineApiService = {
  async getLine() {
    try {
      const res = await fetch(`${config.API_ENDPOINT}/line`, {
        method: 'GET',
        headers: {
          'authorization': `Bearer ${TokenService.getAuthToken()}`
        }
      });
      return await ((!res.ok)
        ? res.json().then(e => Promise.reject(e))
        : res.json());
    }
    catch (error) {
      console.error({ error });
    }
  },
  async addGuest(guestData) {
    try {
      const res = await fetch(`${config.API_ENDPOINT}/line`, {
        method: 'POST',
        headers: {
          'authorization': `Bearer ${TokenService.getAuthToken()}`,
          'content-type': 'application/json'
        },
        body: JSON.stringify(guestData)
      });
      return await ((!res.ok)
        ? res.json().then(e => Promise.reject(e))
        : res.json());
    }
    catch (error) {
      console.error({ error });
    }
  },
  async deleteGuest(guestId) {
    try {
      return fetch(`${config.API_ENDPOINT}/line/${guestId}`, {
        method: 'DELETE',
        headers: {
          'authorization': `Bearer ${TokenService.getAuthToken()}`,
          'content-type': 'application/json'
        }
      });
    }
    catch (error) {
      console.error({ error });
    }
  },
  async editGuest(editedFields, guestId) {
    console.log('edit guest ran')
    try {
      const res = await fetch(`${config.API_ENDPOINT}/line/${guestId}`, {
        method: 'PATCH',
        headers: {
          'authorization': `Bearer ${TokenService.getAuthToken()}`,
          'content-type': 'application/json'
        },
        body: JSON.stringify(editedFields)
      });
      if (!res.ok) {
        return res.json().then(e => Promise.reject(e));
      }
      else {
        return res;
      }
    }
    catch (error) {
      console.error({ error });
    } 
  },
  async assignTime(time, guestId) {
    try {
      const res = await fetch(`${config.API_ENDPOINT}/line/${guestId}`, {
        method: 'PATCH',
        headers: {
          'authorization': `Bearer ${TokenService.getAuthToken()}`,
          'content-type': 'application/json'
        },
        body: JSON.stringify(time)
      });
      if (!res.ok) {
        return res.json().then(e => Promise.reject(e));
      }
      else {
        return res;
      }
    }
    catch (error) {
      console.error({ error });
    }
  }
}

export default LineApiService;