import axios from 'axios'

import { GET_ERRORS } from './types'

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