// const baseURL = 'https://auth.nomoreparties.co';
const baseURL = 'http://localhost:3030';

const checkResponse = (res) => {
  if (res.ok) {
    return res.json()
  } else {
    return Promise.reject(`Ошибка ${res.status}`)
  }
};

export const registration = (email, password) => {
   return fetch(`${baseURL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ password, email })
  })
  .then((res) => checkResponse(res))
}; 

export const autorization = (email, password) => {
  return fetch(`${baseURL}/signin`, {
   method: 'POST',
   credentials: 'include',  // теперь куки посылаются вместе с запросом
   headers: {
     'Content-Type': 'application/json'
   },
   body: JSON.stringify({ password, email })
  })
  .then((res) => checkResponse(res)) 
}; 

export const getUserInfo = (jwt) => {
  return fetch(`${baseURL}/users/me`, {
   method: 'GET',
   credentials: 'include',  // теперь куки посылаются вместе с запросом
   headers: {
    'Content-Type': 'application/json',
    authorization: `Bearer ${jwt}`
   },
  })
  .then((res) => checkResponse(res)) 
};