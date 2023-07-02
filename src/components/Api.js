export default class Api {
  constructor(options){
    this._url = options.baseUrl;
    this._headers = options.headers;
    this._authorization = options.headers.authorization;
  }

  _checkReply(res) {return res.ok ? res.json() : Promise.reject}

  getInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: {
        authorization: this._authorization
      }
    })
    .then(this._checkReply)
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, { 
      headers: {
        authorization: this._authorization
      }
    })
    .then(this._checkReply)
  }

  setUserInfo(data){
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.username,
        about: data.occupation,
      })
    })
    .then(this._checkReply)
  }

  setAvatar(data){
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      })
    })
    .then(this._checkReply)
  }
    
  addCard({title, link}){
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: title,
        link: link,
      })
    })
    .then(this._checkReply)
  }

  addLike(cardId){
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        authorization: this._authorization
      }
    })
    .then(this._checkReply)
  }

  deleteLike(cardId){
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: this._authorization
      }
    })
    .then(this._checkReply)
  }

  deleteCard(cardId){
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._authorization
      }
    })
    .then(this._checkReply)
  }
}