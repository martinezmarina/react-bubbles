import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const initialFormValues = {
  username: "",
  password: "",
}

const Login = () => {
  const [formValues, setFormValues] = useState(initialFormValues)
  const { push } = useHistory();

  const handleChanges = e => {
    setFormValues({
      ...formValues, 
      [e.target.name]: e.target.value      
    });
  };

  const onSubmit = e => {
    e.preventDefault();
    axiosWithAuth()
      .post('http://localhost:5000/api/login', formValues)
      .then(res => {
        localStorage.setItem('token', res.data.payload)
        push("/bubble-page")
      })
      .catch(err => {
        console.log(err);
      })
  }
  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <form onSubmit={onSubmit}>
        <input 
          type='text'
          name='username'
          placeholder='Username'
          value={formValues.username}
          onChange={handleChanges}
        />
        <input 
          type='password'
          name='password'
          placeholder='Password'
          value={formValues.password}
          onChange={handleChanges}
        />
        <button>Log in</button>
      </form>
    </>
  );
};

export default Login;
