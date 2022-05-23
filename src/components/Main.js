import edit from '../images/profile/edit.svg';
import plus from '../images/profile/plus.svg';
import redaction from '../images/profile/redaction.svg';
import Card from './Card';
import api from '../utils/Api.js';
import React from 'react';

function Main(props) {
	const [userName, setUserName] = React.useState('');
	const [userDescription, setUserDescription] = React.useState('');
	const [userAvatar, setUserAvatar] = React.useState('');
	const [cards, setCards] = React.useState([]);

	React.useEffect(() => {
		api.getDataProfile()
			.then(data => {
				setUserName(data.name)
				setUserDescription(data.about)
				setUserAvatar(data.avatar)
			})
			.catch(err => {
				console.log(err)
			})
	}, [])

	React.useEffect(() => {
		api.getDataCards()
			.then(data => {
				setCards([...cards, ...data])
			})
			.catch(err => {
				console.log(err)
			})
	}, [])

	return (
		<main className="content">
			<section className="profile">
				<div className="profile__avatar" onClick={props.onEditAvatar}>
					<img src={userAvatar} alt='Аватар' className="profile__avatar-image" style={{ backgroundImage: `url(${userAvatar})` }} />
					<div className="profile__hover">
						<div className="profile__overlay"></div>
						<img src={redaction} alt="Редактировать"
							className="profile__redaction-icon" />
					</div>
				</div>
				<div className="profile__info">
					<h1 className="profile__name">{userName}</h1>
					<button className="profile__edit-button" onClick={props.onEditProfile}>
						<img src={edit} alt="Редактировать" className="profile__pen" />
					</button>
					<p className="profile__text">{userDescription}</p>
				</div>
				<button className="profile__add-button" onClick={props.onAddPlace}>
					<img src={plus} alt="Плюс" className="profile__plus" />
				</button>
			</section>
			<section className="elements">
				{cards.map((card) => (
					<Card card={card} onCardClick={props.onCardClick} key={card._id} />
				))}
			</section>
		</main>
	)
}

export default Main;