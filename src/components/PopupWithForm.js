function PopupWithForm(props) {
  return (
    <div className={`popup popup_type_${props.name} ${props.isOpen && `popup_opened`}`}>
      <div className="popup__container">
        <button className="popup__btn-close" type="button" onClick={props.onClose}></button>
        <h2 className="popup__title">{props.title}</h2>
        <form action="#" className="popup__form popup__form_type_profile" name="popup__form" noValidate>
          {props.children}
          <button className="popup__btn-save" type="submit">{props.text}</button>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm;