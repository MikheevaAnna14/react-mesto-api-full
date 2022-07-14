import React from 'react';
import HeaderLogo from '../images/logo.svg';
import { Link, Route } from "react-router-dom";

function Header({ isLoggedIn, userEmail, onClick }) {

  function handleClick() {
    onClick()
  }
  return (
    <div className="header">
      <img src={HeaderLogo} alt="логотип mesto" className="header__logo" />
      {
        (<>
          <Route path="/">
          <p className="header__link header__link_type_email">{userEmail}</p>
          <Link to="/sign-in" className="header__link header__link_type_exit" onClick={handleClick}>Выйти</Link>
          </Route>
          <Route path="/sign-in">
            <Link to="/sign-up" className="header__link">Регистрация</Link>
          </Route>
          <Route path="/sign-up">
            <Link to="/sign-in" className="header__link">Войти</Link>
          </Route>
        </>)
      }
    </div>
  )
}

export default Header;