import React from 'react';

import IconButtonProfileInfo from '../images/Vector.svg';
import IconButtonAddCard from '../images/Vector2.svg';
import Card from './Card';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick, cards, handleCardLike, handleCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);
  return(
    <div className="content">
      <section className="profile">
        <button className="profile__avatar-edit" onClick={onEditAvatar}>  
          <img src={currentUser.avatar} className="profile__avatar" alt="аватар" />  
        </button>
        <div className="profile__info">
          <div className="profile__info-edit">
            <h1 className="profile__info-name">{currentUser.name}</h1>
            <button type="button" className="profile__info-edit-button" onClick={onEditProfile}>
              <img src={IconButtonProfileInfo} className="profile__info-edit-button-vector" alt="иконка кнопки" />   
            </button>
          </div>
          <p className="profile__info-occupation">{currentUser.about}</p>
        </div>
        <button type="button" id="button-addcard" className="profile__add-button" onClick={onAddPlace}>
          <img src={IconButtonAddCard} className="profile__add-button-vector" alt="кнопка" />
        </button>
      </section>

      <div className="elements">
        {cards.map((card) => (
          <Card
            card={card}
            key={card._id}
            onCardClick={onCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />
        ))}
      </div>
    </div>
  )
}

export default Main;