import React, { useState, useEffect } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
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
import * as auth from "../utils/auth";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
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
    if (isLoggedIn) {
      api.getInitialCards()
      .then((res) => {
        setCards(res);
      })
      .catch(err => console.log("Ошибка:", err));
    }
  }, [])

  useEffect(() => {
    let jwt = localStorage.getItem('token');
    if(jwt) {
    auth.getUserInfo(jwt)
      .then(({data}) => {
        setIsLoggedIn(true);
        setUserEmail(data.email)
        history.push('/')
      })
      .catch(err => console.log("Ошибка:", err));
    }
  }, [history])

  useEffect(() => {
    let jwt = localStorage.getItem('token');
    if (jwt) {
      api.getProfile()
      .then((res) => {
        setCurrentUser(res)
      })
      .catch(err => console.log("Ошибка:", err));
    }
  }, [])

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
    console.log('handleUpdateUser1', name, about);
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
        console.log('res', res);
        console.log('res.avatar', res.avatar);
        setCurrentUser(res)
        closeAllPopups()
      })
      .catch(err => console.log("Не удалось изменить аватар:", err));
  }

  function handleAddPlaceSubmit({ name, link }) {
    console.log('name link', name, link);
    const jwt = localStorage.getItem('token');
    console.log('jwt token', jwt);
    api.addCard(name, link)
      .then((res) => {
        console.log('res', res);
        setCards([res, ...cards]); 
        closeAllPopups()
      })
      .catch(err => console.log("Не удалось добавить карточку:", err))
  }

  function handleRegisterSubmit(email, password) {
    auth.registration(email, password)
      .then((res) => {
        console.log('handleRegisterSubmit', res);
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
          localStorage.setItem('token', res.token);
          setUserEmail(email);
          setIsLoggedIn(true);
          history.push('/');
        }
      })
      .catch(err => {
        console.log("Ошибка авторизации:", err );
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

  function closeAllPopups () {
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsInfoTooltip(false);
    setSelectedCard({})
  }

  function onSignOut() {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
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
              handleCardDelete={handleCardDelete}
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
          <AddPlacePopup isOpen= {isAddPlacePopupOpen} onClose= {closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
          <PopupWithForm
            name="delete"
            title="Вы уверены?"
            button="Да"
          >
          </PopupWithForm>
          <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose= {closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
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