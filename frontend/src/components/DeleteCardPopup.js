import React from "react";
import PopupWithForm from "./PopupWithForm";

function DeleteCardPopup(props) {

  function handleSubmit(event, card) {
    event.preventDefault();
    props.onDeleteCard(card);
  } 

  return(
    <PopupWithForm
      name="delete"
      title="Вы уверены?"
      button="Да"
      isOpen={props.isOpen}
      onClose= {props.onClose}
      onSubmit= {handleSubmit}
    >
    </PopupWithForm>
  )
}

export default DeleteCardPopup;