class Api {
  constructor({ baseUrl, headers }) {
    this._headers = headers;
    this._baseUrl = baseUrl;
  }

  _checkResponse(res) {
    if(res.ok) {
      return res.json()
    } else {
      return Promise.reject(res.status)
    }
  }

  getProfile() {
    return fetch(`${this._baseUrl}/users/me`, {
      credentials: 'include',  // теперь куки посылаются вместе с запросом
      headers: {
        // 'authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    })
    .then(this._checkResponse)
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      credentials: 'include',   // теперь куки посылаются вместе с запросом
      headers: {
        // 'authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    })
    .then(this._checkResponse)
  }

  redactProfile(name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      credentials: 'include',   // теперь куки посылаются вместе с запросом
      headers: {
        // 'authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        about
      })
    })
    .then(this._checkResponse)
  }

  addCard(name, link) {
    console.log('api name link', name, link);
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      credentials: 'include',   // теперь куки посылаются вместе с запросом
      headers: {
        // 'authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        link
      })
    })
    .then(this._checkResponse)
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      credentials: 'include',   // теперь куки посылаются вместе с запросом
      headers: {
        // 'authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
      })
    .then(this._checkResponse)
  }

  changeLikeCardStatus(cardId, Liked){
    if (Liked) {
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: 'PUT',
        credentials: 'include',   // теперь куки посылаются вместе с запросом
        headers: {
          // 'authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
        })
      .then(this._checkResponse)
    } else {
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: 'DELETE',
        credentials: 'include',   // теперь куки посылаются вместе с запросом
        headers: {
          // 'authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
        })
      .then(this._checkResponse)
    }
  }

  editAvatar({ avatar }) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      credentials: 'include',   // теперь куки посылаются вместе с запросом
      headers: {
        // 'authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar
      })
      })
    .then(this._checkResponse)
  }
};

export const api = new Api({
  // baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-39',
  // baseUrl: 'http://localhost:3000',
  baseUrl: 'http://api.mesto.annam.nomoredom.nomoredomains.xyz',
  headers: {
    // authorization: 'f7742f99-02b0-478a-9515-03ad0f37b4e8',
    // 'authorization': `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json'
  }
}); 