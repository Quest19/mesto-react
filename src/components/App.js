import React from "react";
import '../App.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from "./ImagePopup";

function App() {

  //Переменные состояния
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(false);
  const [isDeleteCardPopupOpen, setDeleteCardPopupOpen] = React.useState(false);


  //Открытие попапа профиля
  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  //Открытие попапа для добавления карт
  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  //Открытие попапа для редактирования аватара профиля
  function handleEditAvatarClick() {
   setEditAvatarPopupOpen(true);
  }

  //Открытие попапа для удаления карты
  function handleDeleteCardClick() {
    setDeleteCardPopupOpen(true)
  }

  //Попап для изображения
  function handleCardClick(card) {
    setSelectedCard(card)
  }

  //Закрытие всех попапов
  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setDeleteCardPopupOpen(false);
    setSelectedCard(false);
  }

  return (
    <div className="page">
      <Header />
      <Main 
      onEditProfile={handleEditProfileClick} 
      onAddPlace={handleAddPlaceClick}
      onEditAvatar={handleEditAvatarClick}
      onCardClick={handleCardClick}
      onDeleteCard={handleDeleteCardClick}
      />
      <Footer />
      <PopupWithForm name="profile" title="Редактировать профиль" text="Сохранить" isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}>
        <input id="input-name" className="popup__input popup__input_value_name" type="text" placeholder="Ваше Имя" name="name" minLength="2" maxLength="40" required />
        <span id="input-name-error" className="popup__input-error"></span>
        <input id="input-info" className="popup__input popup__input_value_info" type="text" placeholder="Ваша деятельность" name="about" minLength="2" maxLength="200" required />
        <span id="input-info-error" className="popup__input-error"></span>
      </PopupWithForm>
      <PopupWithForm name="add-card" title="Новое место" text="Создать" isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}>
        <input id="input-label" type="text" className="popup__input popup__input_value_label" placeholder="Название" name="name" minLength="2" maxLength="30" required />
        <span id="input-label-error" className="popup__input-error"></span>
        <input id="input-link" type="url" className="popup__input popup__input_value_link" placeholder="Ссылка на картинку" name="link" required />
        <span id="input-link-error" className="popup__input-error"></span>
      </PopupWithForm>
      <PopupWithForm name="add-avatar" title="Обновить аватар" text="Сохранить" isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}>
        <input id="input-avatar" type="url" className="popup__input popup__input_value_avatar" placeholder="Ссылка на картинку" name="avatar" required />
        <span id="input-avatar-error" className="popup__input-error"></span>
      </PopupWithForm>
      <PopupWithForm name="delete-card" title="Вы уверены?" text="Да" isOpen={isDeleteCardPopupOpen} onClose={closeAllPopups}></PopupWithForm>
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
  </div>
  );
}

export default App;
