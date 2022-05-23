import deleteUrn from '../images/elements/delete.svg';

function Card(props) {
	function handleClick() {
		props.onCardClick({ link: props.card.link, name: props.card.name });
	}

	return (
		<article className="elements__element element">
			<div className="element__container-image">
				<div className="element__delete">
					<img src={deleteUrn} alt="Урна" />
				</div>
				<img src={props.card.link} alt={props.card.name} className="element__image" style={{ backgroundImage: `url(${props.card.link})` }} onClick={handleClick} />
			</div>
			<div className="element__content">
				<h2 className="element__title">{props.card.name}</h2>
				<div className="element__like-info">
					<button className="element__like element__like_disabled"></button>
					<div className="element__quanity-like">{props.card.likes.length}</div>
				</div>
			</div>
		</article>
	)
}

export default Card;