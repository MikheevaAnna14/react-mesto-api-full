import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const avatarRef = React.useRef('');

  React.useEffect(() => {
    avatarRef.current.value = ''
  }, [props.isOpen]);

  function handleSubmit(event) {
    event.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  } 

  return(
    <PopupWithForm
      name="avatar-edit"
      title="Обновить аватар"
      button="Сохранить"
      isOpen={props.isOpen}
      onClose= {props.onClose}
      onSubmit= {handleSubmit}
    >
    <input 
      ref={avatarRef}
      src="../images/avatar.jpg"
      id="popup-avatar" 
      type="url" 
      name="avatar" 
      placeholder="Ссылка на аватар"
      className="popup__container-input popup__container-input_type_link" 
    />
    <span className="popup__container-input-error popup-avatar-error"></span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;