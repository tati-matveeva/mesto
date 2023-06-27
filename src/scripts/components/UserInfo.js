export default class UserInfo{
  constructor(info){
    this._profileName = document.querySelector(info.profileNameSelector);
    this._profileJob = document.querySelector(info.profileJobSelector);
  }

  getUserInfo(){
    return{username: this._profileName.textContent, occupation: this._profileJob.textContent}
  }

  setUserInfo(userData){
    this._profileName.textContent = userData.username;
    this._profileJob.textContent = userData.occupation;
  }

}