import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";

function Register(props) {
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
    <form className="login" name="register" onSubmit={handleSubmit}>
      <p className="login__title">Регистрация</p>
      <input 
        value={email}
        className="login__input"
        type="email"
        placeholder="Email"
        name="email"
        onChange={handleEmailChange}
      />
      <input 
        value={password}
        className="login__input"
        type="password"
        placeholder="Пароль"
        name="password"
        onChange={handlePasswordChange}
      />
      <button type="submit" className="login__button">Зарегистрироваться</button>
      <Link to="/sign-in" className="login__link">Уже зарегистрированы? Войти</Link>
    </form>
  )
}

export default withRouter(Register); 
