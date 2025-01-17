import Axios from "axios";
import Cookie from 'js-cookie';
import {
  USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS,
  USER_SIGNIN_FAIL, USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS, USER_REGISTER_FAIL, USER_LOGOUT, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL} from "../constants/usercons";

const update = ({ userId, name, email, password }) => async (dispatch, getState) => {
  const { userSignin: { userInfo } } = getState();
  dispatch({ type: USER_UPDATE_REQUEST, payload: { userId, name, email, password } });
  try {
    const { data } = await Axios.put("/api/users/" + userId,
      { name, email, password }, {
      headers: {
        Authorization: 'Bearer ' + userInfo.token
      }
    });
    dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
    Cookie.set('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({ type: USER_UPDATE_FAIL, payload: error.message });
  }
}

var firebase = require("firebase");
var provider = new firebase.auth.GoogleAuthProvider();


const signin = (email, password) => async (dispatch) => {
  dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });
  try {
    const { data } = await Axios.post("/api/users/signin", { email, password });
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
    Cookie.set('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({ type: USER_SIGNIN_FAIL, payload: error.response.data.msg });
  }
}

const register = (name, email, password) => async (dispatch) => {
  dispatch({ type: USER_REGISTER_REQUEST, payload: { name, email, password } });
  try {
    const { data } = await Axios.post("/api/users/register", { name, email, password });
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password }});
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
    Cookie.set('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({ type: USER_REGISTER_FAIL, payload: error.response.data.msg });
  }
}

const googleAuth = () => async (dispatch) => {
  // Sending credentitials to google auth
  firebase.auth().signInWithPopup(provider).then(function(result) {
    // After response from google auth
    var name = result.user.displayName.split(" ")[0];
    var email = result.user.email;
    var password = 'google';

    // Check if email already registered
    Axios.get(`/api/users/check-by-email?email=${email}`)
    .then(() => {
      // If email registered, sign in
      dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });

      Axios.post("/api/users/signin-google-user", { email, password })
      .then(res =>{
        var data = res.data;
        dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
        Cookie.set('userInfo', JSON.stringify(data));
      })
      .catch(error => {
        console.log(error);
        dispatch({ type: USER_SIGNIN_FAIL, payload: error.message });
      })
    })
    .catch(error => {
      // If email not registered, register
      if(error.response.status === 404) {
        dispatch({ type: USER_REGISTER_REQUEST, payload: { name, email, password }});
        
        Axios.post("/api/users/register-google-user", { name, email, password })
        .then(res => {
          var data = res.data;
          dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
          dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password }});
          dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
          Cookie.set('userInfo', JSON.stringify(data));
        })
        .catch(error => console.log(error))

      } else {
        console.log(error)
      }
    }) 
  }).catch(function(error) {
    console.log(error)
  });
}

const googleSignOut = () => {
  firebase.auth().signOut().then(function() {
    console.log('Sign-out successful')
  }).catch(function(error) {
    console.log('An error happened')
  });
  
}

const deleteGoogleuser = () => {
  var user = firebase.auth().currentUser;
  user.delete().then(function() {
    // User deleted.
  }).catch(function(error) {
    // An error happened.
  });
}

const logout = () => (dispatch) => {
  Cookie.remove("userInfo");
  dispatch({ type: USER_LOGOUT })
}

export {signin,register, googleAuth, logout ,update,deleteGoogleuser,googleSignOut};