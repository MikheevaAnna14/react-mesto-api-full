import React from "react";

import IconCardDelete from '../images/Urna.png';
import IconButtonLike from '../images/Button_like.svg';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {

  const currentUser = React.useContext(CurrentUserContext);

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner === currentUser._id;

  const cardDeleteButtonClassName = (
    `element__button-delete ${!isOwn && 'element__button-delete_hidden'}`
  );

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some((like) => like === currentUser._id);

  // Создаём переменную для кнопки лайка
  const cardLikeButtonClassName = (
    `element__like ${isLiked && 'element__like_active'}`
  ); 

  function handleLikeClick() {
    onCardLike(card)
  }

  function handleClick() {
    onCardClick(card)
  }

  function handleDeleteClick() {
    onCardDelete(card)
  }

  return (
    <div className="element">
      <button type="button" className={cardDeleteButtonClassName} onClick={handleDeleteClick}> 
        <img src={IconCardDelete} alt="кнопка удаления карточки" />
      </button>
      <img src={card.link} className="element__mask" alt={card.name} onClick={handleClick}/>
      <div className="element__name">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__likes">
          <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}>
            <img src={IconButtonLike} alt="кнопка лайк" />
          </button>
          <span className="element__like-counter">{card.likes.length}</span>
        </div>
      </div>
    </div>
  )
}

export default Card;