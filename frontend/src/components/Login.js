import React, { useState } from "react";


function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    props.onSubmit(email, password)
  }
  return (
    <form className="login" name="login" onSubmit={handleSubmit}>
      <p className="login__title">Вход</p>
      <input 
        value={email}
        onChange={handleEmailChange}
        className="login__input"
        type="email"
        placeholder="Email"
        name="email"
      />
      <input 
        value={password}
        onChange={handlePasswordChange}
        className="login__input"
        type="password"
        placeholder="Пароль"
        name="password"
      />
      <button type="submit" className="login__button">Войти</button>
    </form>
  )
}

export default Login;