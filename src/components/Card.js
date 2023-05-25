function Card(props) {

  function handleClick() {
    props.onCardClick(props.card);
  }  

  function openDeleteCardPopup() {
    props.onDeleteCard();
  }

  return (
    <div className="card">
    <button className="card__delete-btn" type="button" onClick={openDeleteCardPopup}></button>
    <button className="card__image-btn" type="button" onClick={handleClick}>
      <img src={props.card.link} alt={props.card.name} className="card__image" />
    </button>
    <div className="card__group">
      <h2 className="card__title">{props.card.name}</h2>
      <div className="card__like-container">
        <button className="card__like-icon" type="button"></button>
        <h3 className="card__like-counter">{props.card.likes.length}</h3>
      </div>
    </div>
    </div>
  )
}

export default Card;