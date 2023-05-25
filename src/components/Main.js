import React from "react";
import api from "../utils/Api";
import Card from "./Card";

function Main(props) {
  const [userName, setUserName] = React.useState('');
  const [userDescription, setUserDescription] = React.useState('');
  const [userAvatar, setUserAvatar] = React.useState('');
  const [cards, setCards] = React.useState([]);
  
  
  //запрос к данным о пользователе
  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([userData, cards]) => {
      setUserName(userData.name);
      setUserDescription(userData.about);
      setUserAvatar(userData.avatar);
      setCards(cards);
    })
    .catch((err) => {
      console.log(err);
    })
    }, [])

  return (
    <main className="content">
      <section className="profile">
        <button className="profile__avatar-btn" type="button" onClick={props.onEditAvatar} >
          <img src={userAvatar} alt="Изображение профиля" className="profile__avatar" />
        </button>
        <div className="profile__info">
          <div className="profile__group">
            <h1 className="profile__title">{userName}</h1>
            <button className="profile__edit-btn" type="button" onClick={props.onEditProfile}></button>
          </div>
          <p className="profile__subtitle">{userDescription}</p>
        </div>
        <button className="profile__add-btn" type="button" onClick={props.onAddPlace}></button>
      </section>
      <section className="cards">
        {cards.map((card) => (
          <Card key={card._id} onCardClick={props.onCardClick} onDeleteCard={props.onDeleteCard} card={card}></Card>
        ))}
      </section>
    </main> 
  )
}

export default Main;