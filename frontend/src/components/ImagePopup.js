import IconClose from '../images/Close_Icon.svg';

function ImagePopup({ card, onClose }) {
  return (
    <div className={`popup ${card.link ? "popup_opened" : ""}`} id="popup-photo">
        <div className="popup__overlay popup__overlay_type_dark"></div>
        <figure className="popup__figure" id="popap-photocontainer">
          <button type="button" id="photopopup-closebutton"  className="popup__close" onClick={onClose}>
            <img src={IconClose} className="popup__close-icon" alt="иконка крестик" />
          </button>
          <img src={card.link} 
          className="popup__picture" alt={card.name} />
          <figcaption className="popup__figcaption">{card.name}</figcaption>
        </figure>
      </div>
  )
}

export default ImagePopup;