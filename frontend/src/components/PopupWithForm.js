import React from 'react';
import IconClose from '../images/Close_Icon.svg';

function PopupWithForm (props) {
  const isOpen = props.isOpen ? "popup_opened" : "";

  const closeByEsc = (event) => {
    if(event.key === 'Escape') {
      console.log(props)
      console.log("-----------------------------------------------------------")
      props.onClose();
    }
  }

  React.useEffect(() => {   
    document.addEventListener('keydown', closeByEsc);
    return () => {
      document.removeEventListener('keydown', closeByEsc);
    }
  }, [props.isOpen]);
    
  return(
    <div className={`popup ${isOpen}`} id={`popup-${props.name}`}>
      <div className="popup__overlay" onClick={props.onClose}></div>     
      <div className={`popup__container popup__container-${props.name}`}>
        <button type="button" className="popup__close" onClick={props.onClose}>
          <img src={IconClose} className="popup__close-icon" alt="иконка крестик" />
        </button>
        {/* <form className="popup__container-info" id="popupProfileForm" name="regform" onSubmit={props.onSubmit}> */}
        <form className="popup__container-info" name="regform" onSubmit={props.onSubmit}>
          <h2 className="popup__container-heading">{props.title}</h2>
          {props.children}
          <button type="submit" className="popup__container-info-button">{props.button}</button>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm;

// setEventListeners() {
//   this._popup.addEventListener('click', (event) => {
//     if (event.target.classList.contains('popup__overlay') || event.target.classList.contains('popup__close-icon')) {
//       this.close();
//     }
//   });
// }