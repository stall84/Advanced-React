import React, { useState, useEffect, useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const emailReducer = function (state, action) {
    if (action.type === 'USER_INPUT') {
      return {
        value: action.payload,
        isValid: action.payload.includes('@')
      }
    }
    if (action.type === 'INPUT_BLUR') {
      return {
        value: state.value,
        isValid: state.value.includes('@')
      }
    }
    return {
      value: '',
      isValid: false
    }
  };

  const passwordReducer = function (state, action) {

    if (action.type === 'PASS_INPUT') {
      return {
        value: action.payload,
        isValid: action.payload.trim().length > 6
      }
    }
    if (action.type === 'PASS_BLUR') {
      return {
        value: state.value,
        isValid: state.value.trim().length > 6
      }
    }

    return {
      value: '',
      isValid: false
    }
  }

  const [emailState, dispatchEmail] = useReducer(emailReducer, { value: '', isValid: null });

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, { value: '', isValid: null });

// useEffect(() => {
  
//   const identifier = setTimeout(() => {
//     console.log('Changing Text');
//     setFormIsValid(
//       enteredEmail.includes('@') && enteredPassword.trim().length > 6
//     );
//   }, 500)

//   return () => {
//     console.log('Cleanup');
//     clearTimeout(identifier);
//   };

// }, [enteredEmail, enteredPassword]);

// There might be situations where the below setup of multiple handlers and specifically in email and password changeHandlers where React's state queuing runs the validity function when either
// of the two state slices it depends on hasn't updated yet. In this scenario, useReducer might be the better option to 'combine' different but app-functionally similar states

  const emailChangeHandler = (event) => {
    dispatchEmail({
      type: 'USER_INPUT',
      payload: event.target.value
    });

    setFormIsValid(
      event.target.value.includes('@') && passwordState.isValid
    );
  };
  
  const validateEmailHandler = () => {
    dispatchEmail({
      type: 'INPUT_BLUR'
    })
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({
      type: 'PASS_INPUT',
      payload: event.target.value
    })

    setFormIsValid(
      event.target.value.trim().length > 6 && emailState.isValid
    );
  };

  const validatePasswordHandler = () => {
    dispatchPassword({
      type: 'PASS_BLUR'
    })
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
