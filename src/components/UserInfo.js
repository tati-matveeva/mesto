export default class UserInfo{
  constructor(info){
    this._profileName = document.querySelector(info.profileNameSelector);
    this._profileJob = document.querySelector(info.profileJobSelector);
    this._profileAvatar = document.querySelector(info.profileAvatarSelector)
  }

  getUserInfo(){
    return{username: this._profileName.textContent, occupation: this._profileJob.textContent}
  }

  setUserInfo({ username, occupation, avatar }) {
    this._profileName.textContent = username
    this._profileJob.textContent = occupation
    this._profileAvatar.src = avatar
  }
  
  setId(id){
    this._id = id
  }
  
  getId(){
    return this._id
  }
}