import React, { useState } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  function handleNameChange(event) {
    setName(event.target.value);
  }

  function handleLinkChange(event) {
    setLink(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    props.onAddPlace({ name, link })
    setName('');
    setLink('');
  }
  
  return(
    <PopupWithForm
      name="addcard"
      title="Новое место"
      button="Создать"
      isOpen= {props.isOpen}
      onClose= {props.onClose}
      onSubmit= {handleSubmit}
    >
      <input 
        value={name}
        onChange={handleNameChange}
        id="popup-title" 
        className="popup__container-input popup__container-input_type_title"
        type="text" 
        name="title" 
        placeholder="Название" 
      />
      <span className="popup__container-input-error popup-title-error"></span> 
      <input 
        value={link}
        onChange={handleLinkChange}
        id="popup-link" 
        type="url" 
        name="link" 
        placeholder="Ссылка на картинку" 
        className="popup__container-input popup__container-input_type_link" 
      />
      <span className="popup__container-input-error popup-link-error"></span>
    </PopupWithForm>
  )
}

export default AddPlacePopup;
