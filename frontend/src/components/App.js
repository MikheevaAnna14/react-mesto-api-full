import React, { useState, useEffect } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import { api } from '../utils/api.js';
import CurrentUserContext from '../contexts/CurrentUserContext';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import DeleteCardPopup from './DeleteCardPopup';
import * as auth from "../utils/auth";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState(false);
  const [isInfoTooltip, setIsInfoTooltip] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({
    avatar: '',
    name: 'Имя',
    about: 'Занятие'
  });

  const [cards, setCards] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const history = useHistory();

  useEffect(() => {
    // let jwt = localStorage.getItem('token');
    // if(jwt) {
    if(isLoggedIn) {
      // setIsLoggedIn(true);
      // auth.getUserInfo(jwt)
      auth.getUserInfo()
        .then((res) => {
          setCurrentUser(res)
          history.push('/')
        })
        .catch(err => console.log("Ошибка:", err));
      api.getInitialCards()
        .then((res) => {
          setCards(res);
        })
        .catch(err => console.log("Ошибка:", err));
    }
  // }, [history])
}, [isLoggedIn, history])

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(err => console.log("Ошибка:", err))
  } 

  function handleCardDelete(card) {
    api.deleteCard(card._id)
    .then(() => {
      setCards(
      cards.filter ((c) => {
        return c._id !== card._id;
      })
      )
    })
    .catch(err => console.log("Не удалось удалить карточку:", err))
  }

  function handleUpdateUser({ name, about }) {
    api.redactProfile(name, about)
      .then((res) => {
        console.log('handleUpdateUser2 res', res);
        setCurrentUser(res)
        closeAllPopups()
      })
      .catch(err => console.log("Не удалось изменить данные профиля:", err));
  }

  function handleUpdateAvatar(avatar) {
    api.editAvatar(avatar)
      .then((res) => {
        setCurrentUser(res)
        closeAllPopups()
      })
      .catch(err => console.log("Не удалось изменить аватар:", err));
  }

  function handleAddPlaceSubmit({ name, link }) {
    // const jwt = localStorage.getItem('token');
    api.addCard(name, link)
      .then((res) => {
        setCards([res, ...cards]); 
        closeAllPopups()
      })
      .catch(err => console.log("Не удалось добавить карточку:", err))
  }

  function handleRegisterSubmit(email, password) {
    auth.registration(email, password)
      .then((res) => {
        if(res) {
          setIsInfoTooltip(true);
          setIsRegister(true);
          setCurrentUser(res);
          setUserEmail(email);
          history.push('/sign-in');
        }
      })
      .catch(err => {
        console.log("Ошибка регистрации:", err );
        setIsInfoTooltip(true);
      })
  }

  function handleLoginSubmit(email, password) {
    auth.autorization(email, password)
      .then((res) => {
        if(res) {
          // localStorage.setItem('token', res.token);
          setUserEmail(email);
          setIsLoggedIn(true);   
          history.push('/');
        }
      })
      .catch(err => {
        console.log("Ошибка авторизации:", err );
        setIsRegister(false);
        setIsInfoTooltip(true);
      })
  }

  function handleEditAvatarClick () {
    setIsEditAvatarPopupOpen(true)
  }
  
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }
  
  function handleAddPlaceClick () {
    setIsAddPlacePopupOpen(true)
  }

  function handleCardClick (card) {
    setSelectedCard(card)
  }

  function handleCardDeleteClick () {
    setIsDeleteCardPopupOpen(true)
  }

  function closeAllPopups () {
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsDeleteCardPopupOpen(false);
    setIsInfoTooltip(false);
    setSelectedCard({})
  }

  function onSignOut() {
    // localStorage.removeItem('token');
    auth.signout()
      .then(res => console.log(res.send))
      .catch(err => {
        console.log("Ошибка регистрации:", err );
      });
    setIsLoggedIn(false);
    setIsRegister(false);
    setCurrentUser({});
    history.push('/sign-in');
  }

  return (
    <div className="body">
      <div className="page">
        <CurrentUserContext.Provider value={currentUser}>
          <Header 
            userEmail={userEmail}
            onClick={onSignOut}
            isLoggedIn={isLoggedIn}
          />
          <Switch>
            <ProtectedRoute
              exact path="/"
              component={Main}
              isLoggedIn={isLoggedIn}
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={handleCardClick}
              cards={cards}
              handleCardLike={handleCardLike}
              handleCardDelete={handleCardDeleteClick}
            />
            <Route exact path="/sign-up">
              <Register 
                onSubmit={handleRegisterSubmit}
              /> 
            </Route>
            <Route exact path="/sign-in">
              <Login
                onSubmit={handleLoginSubmit}
              />  
            </Route>
            <Route>
              {!isLoggedIn ? <Redirect to="/sign-in" /> : <Redirect to="/" />}
            </Route>
          </Switch>
          <Footer />
          <InfoTooltip
            isOpen= {isInfoTooltip}
            onClose= {closeAllPopups}
            isRegister={isRegister}
          />

          <EditProfilePopup 
            isOpen= {isEditProfilePopupOpen} 
            onClose= {closeAllPopups}
            onUpdateUser ={handleUpdateUser}
          />
          <AddPlacePopup 
            isOpen= {isAddPlacePopupOpen}
            onClose= {closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />
          <DeleteCardPopup
            isOpen= {isDeleteCardPopupOpen}
            onClose= {closeAllPopups}
            onDeleteCard = {handleCardDelete}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose= {closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <ImagePopup 
            card={selectedCard}
            onClose= {closeAllPopups}
          />
        </CurrentUserContext.Provider>
      </div>
    </div>
  );
}

export default App;