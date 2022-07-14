import React, { useState } from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";

function EditProfilePopup (props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = useState('Имя');
  const [description, setDescription] = useState('Занятие');

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]); 

  function handleNameChange(event) {
    setName(event.target.value);
  }

  function handleDescriptionChange(event) {
    setDescription(event.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name,
      about: description,
    });
  } 

  return(
    <PopupWithForm 
      name= "profile"
      title= "Редактировать профиль"
      button= "Сохранить"
      isOpen= {props.isOpen}
      onClose= {props.onClose}
      onSubmit= {handleSubmit}
    >
      <input 
        value={name} 
        onChange={handleNameChange}
        id="popup-name" 
        type="text" 
        name="name" 
        className="popup__container-input popup__container-input_type_name" 
        placeholder="Имя"
        />
      <span className="popup__container-input-error popup-name-error"></span>
      <input 
        value={description} 
        onChange={handleDescriptionChange}
        id="popup-occupation" 
        type="text" 
        name="occupation" 
        className="popup__container-input popup__container-input_type_occupation" 
        placeholder="Занятие" 
      />
      <span className="popup__container-input-error popup-occupation-error"></span>
    </PopupWithForm>
  )
}

export default EditProfilePopup;