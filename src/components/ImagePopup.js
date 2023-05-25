function ImagePopup(props) {
  return (
    <div className={`popup popup_type_open-img ${props.card ? "popup_opened" : ""}`}>
    <div className="popup__container popup__container_type_open-img">
      <button className="popup__btn-close" type="button" onClick={props.onClose}></button>
      <img src={props.card.link} alt={props.card.name} className="popup__image" />
      <p className="popup__img-title">{props.card.name}</p>
    </div>
  </div>
  )
}

export default ImagePopup;