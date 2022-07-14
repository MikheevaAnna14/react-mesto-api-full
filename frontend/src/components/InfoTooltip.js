import React from "react";
import IconClose from '../images/Close_Icon.svg';
import IconOk from '../images/IconOk.svg';
import IconNo from '../images/IconNo.svg';

function InfoTooltip(props) {
  const isOpen = props.isOpen ? "popup_opened" : "";
  return (
    <div className={`popup ${isOpen}`} id="popup-infotooltip">
        <div className="popup__overlay"></div>
          <div className="popup__container popup__container_type_infotooltip">
            <button type="button" id="infotooltip-closebutton"  className="popup__close" onClick={props.onClose}>
              <img src={IconClose} className="popup__close-icon" alt="иконка крестик" />
            </button>
            <div className="popup__container-info">
              <img src={ props.isRegister ? IconOk : IconNo } className="popup__container-image" 
                alt="иконка информационного попапа" />
              <p className="popup__container-heading popup__container-heading_type_infotooltip">
                { props.isRegister ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}</p> 
            </div>
          </div>     
        </div>
  )
}

export default InfoTooltip;