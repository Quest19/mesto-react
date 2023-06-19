import React, { useEffect } from "react";
import "../App.css";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import EditProfilePopup from "./EditProfilePopup";
import EditeAvatarPopup from "./EditeAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";
import api from "../utils/Api";
import { CurrentUserContext } from "../context/CurrentUserContext";

function App() {
    //Переменные состояния
    const [isEditProfilePopupOpen, setEditProfilePopupOpen] =
        React.useState(false);
    const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] =
        React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState(null);
    const [isDeleteCardPopupOpen, setDeleteCardPopupOpen] =
        React.useState(false);
    const [currentUser, setCurrentUser] = React.useState({});
    const [cards, setCards] = React.useState([]);

    React.useEffect(() => {
        api.getUserInfo()
            .then((data) => {
                setCurrentUser(data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    React.useEffect(() => {
        api.getInitialCards()
            .then((cards) => {
                setCards(cards);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

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
    // function handleDeleteCardClick() {
    //   setDeleteCardPopupOpen(true)
    // }

    //Попап для изображения
    function handleCardClick(card) {
        setSelectedCard(card);
    }

    //Закрытие всех попапов
    function closeAllPopups() {
        setEditProfilePopupOpen(false);
        setAddPlacePopupOpen(false);
        setEditAvatarPopupOpen(false);
        setDeleteCardPopupOpen(false);
        setSelectedCard(null);
    }

    //Зкарытие на клавишу Esc
    const isOpen =
        isEditAvatarPopupOpen ||
        isEditProfilePopupOpen ||
        isAddPlacePopupOpen ||
        selectedCard;

    useEffect(() => {
        function closeByEsc(evt) {
            if (evt.key === "Escape") {
                closeAllPopups();
            }
        }
        if (isOpen) {
            document.addEventListener("keydown", closeByEsc);
            return () => {
                document.removeEventListener("keydown", closeByEsc);
            };
        }
    }, [isOpen]);

    //Лайк карточки
    function handleCardLike(card) {
        //Проверка на лайк
        const isLiked = card.likes.some((i) => i._id === currentUser._id);

        if (!isLiked) {
            api.putLikeCard(card._id)
                .then((newCard) => {
                    setCards((state) =>
                        state.map((c) => (c._id === card._id ? newCard : c))
                    );
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            api.deleteLikeCard(card._id)
                .then((newCard) => {
                    setCards((state) =>
                        state.map((c) => (c._id === card._id ? newCard : c))
                    );
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }

    //Удаление карты
    function handleCardDelete(card) {
        api.deleteCard(card._id)
            .then((newCard) => {
                const newCards = cards.filter((c) =>
                    c._id === card._id ? "" : newCard
                );
                setCards(newCards);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function handleUpdateUser(data) {
        api.patchUserInfo(data)
            .then((user) => {
                setCurrentUser(user);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function handleUpdateAvatar(data) {
        api.patchProfileAvatar(data)
            .then((avatar) => {
                setCurrentUser(avatar);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function handleAddPlaceSubmit(data) {
        api.postNewCard(data)
            .then((newCard) => {
                setCards([newCard, ...cards]);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <Header />
                <Main
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onEditAvatar={handleEditAvatarClick}
                    onCardClick={handleCardClick}
                    // onDeleteCard={handleDeleteCardClick}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                    cards={cards}
                />
                <Footer />
                <EditProfilePopup
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                    onUpdateUser={handleUpdateUser}
                />
                <EditeAvatarPopup
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}
                    onUpdateAvatar={handleUpdateAvatar}
                />
                <AddPlacePopup
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
                    onSubmit={handleAddPlaceSubmit}
                />
                {/* <PopupWithForm
                    name="delete-card"
                    title="Вы уверены?"
                    text="Да"
                    isOpen={isDeleteCardPopupOpen}
                    onClose={closeAllPopups}
                ></PopupWithForm> */}
                <ImagePopup card={selectedCard} onClose={closeAllPopups} />
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
