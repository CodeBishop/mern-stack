import axios from 'axios'
import jwt_decode from 'jwt-decode'

import setAuthToken from '../utils/setAuthToken'
import { GET_ERRORS, SET_CURRENT_USER } from './types'

// Register User
export const registerUser = (userData, history) => dispatch => {
  axios
    // Attempt to register new user.
    .post('/api/users/register', userData)
    // If registration sucessful then redirect user to login page.
    .then(res => history.push('/login'))
    .catch(err => 
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}

// Login - Get User Token
export const loginUser = (userData) => dispatch => {
  axios
    .post('/api/users/login', userData)
    .then(res => {
      // Save to localStorage.
      const { token } = res.data
      // Set token to localStorage
      localStorage.setItem('jwtToken', token)
      // Set token to Auth header.
      setAuthToken(token)
      // Decode token to get user data.
      const decoded = jwt_decode(token)
      // Set current user.
      dispatch(setCurrentUser(decoded))
    })
    .catch(err => 
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
    }))
}

// Set logged in user.
export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  }
}

// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from localStorage
  localStorage.removeItem('jwtToken')
  // Remove auth header for future requests
  setAuthToken(false)
  // Set current user to {} (which will also set isAuthenticated to false)
  dispatch(setCurrentUser({}))
}