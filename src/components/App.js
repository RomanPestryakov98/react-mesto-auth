import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import ImagePopup from './ImagePopup';
import api from '../utils/Api.js';
import CurrentUserContext from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeleteCardPopup from './DeleteCardPopup';

function App() {
	const [currentUser, setCurrentUser] = React.useState({});
	const [cards, setCards] = React.useState([]);
	const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
	const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
	const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
	const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = React.useState(false);
	const [selectedCard, setSelectedCard] = React.useState(null);
	const [isLoading, setIsLoading] = React.useState(false);
	const [card, setCard] = React.useState({});
	React.useEffect(() => {
		api.getDataCards()
			.then(data => {
				setCards([...cards, ...data])
			})
			.catch(err => {
				console.log(err)
			})
	}, [])

	React.useEffect(() => {
		api.getDataProfile()
			.then(data => {
				setCurrentUser(data)
			})
			.catch(err => {
				console.log(err)
			})
	}, [])

	function renderLoading() {
		setIsLoading(true)
	}

	function handleCardLike(card) {
		const isLiked = card.likes.some(i => i._id === currentUser._id);
		if (isLiked) {
			api.deleteLike(card._id).then((newCard) => {
				setCards((cards) => cards.map((c) => c._id === card._id ? newCard : c));
			})
		} else {
			api.addLike(card._id).then((newCard) => {
				setCards((cards) => cards.map((c) => c._id === card._id ? newCard : c));
			});
		}
	}

	function handleCardDelete(card) {
		api.deleteCard(card._id);
		const newCards = cards.filter(function (item) {
			return item._id !== card._id;
		})
		setCards(newCards);
		closeAllPopups();
	}

	function handleEditAvatarClick() {
		setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
	}

	function handleEditProfileClick() {
		setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
	}

	function handleAddPlaceClick() {
		setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
	}
	function handleDeleteCardClick(card) {
		setCard(card);
		setIsDeleteCardPopupOpen(!isDeleteCardPopupOpen);
	}

	function handleUpdateUser(data) {
		api.updateDataProfile(data)
			.then(data => {
				setCurrentUser(data);
				setIsLoading(false);
				closeAllPopups();
			})
	}

	function handleUpdateAvatar(data) {
		api.updateAvatar(data)
			.then(data => {
				setCurrentUser(data);
				setIsLoading(false);
				closeAllPopups();
			})
	}

	function handleAddCard(data) {
		api.addNewCard(data)
			.then(data => {
				setCards([data, ...cards]);
				setIsLoading(false);
				closeAllPopups();
			})
	}

	function closeAllPopups() {
		isEditProfilePopupOpen && setIsEditProfilePopupOpen(!isEditProfilePopupOpen)
		isAddPlacePopupOpen && setIsAddPlacePopupOpen(!isAddPlacePopupOpen)
		isEditAvatarPopupOpen && setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen)
		isDeleteCardPopupOpen && setIsDeleteCardPopupOpen(!isDeleteCardPopupOpen)
		selectedCard && setSelectedCard(null)
	}

	function handleCardClick(obj) {
		setSelectedCard(obj);
	}

	return (
		<CurrentUserContext.Provider value={currentUser}>
			<div className="page">
				<Header />
				<Main
					onEditProfile={handleEditProfileClick}
					onAddPlace={handleAddPlaceClick}
					onEditAvatar={handleEditAvatarClick}
					onEditDeleteCard={handleDeleteCardClick}
					onCardClick={handleCardClick}
					cards={cards}
					onCardLike={handleCardLike}
				/>
				<Footer />
				<EditProfilePopup
					isOpen={isEditProfilePopupOpen}
					onClose={closeAllPopups}
					onUpdateUser={handleUpdateUser}
					isLoading={isLoading}
					renderLoading={renderLoading}
				/>
				<EditAvatarPopup
					isOpen={isEditAvatarPopupOpen}
					onClose={closeAllPopups}
					onUpdateAvatar={handleUpdateAvatar}
					isLoading={isLoading}
					renderLoading={renderLoading}
				/>
				<AddPlacePopup
					isOpen={isAddPlacePopupOpen}
					onClose={closeAllPopups}
					onAddCard={handleAddCard}
					isLoading={isLoading}
					renderLoading={renderLoading}
				/>
				<DeleteCardPopup
					isOpen={isDeleteCardPopupOpen}
					onClose={closeAllPopups}
					onDeleteCard={handleCardDelete}
					card={card}
				/>
				<ImagePopup card={selectedCard} onClose={closeAllPopups} />
			</div>
		</CurrentUserContext.Provider>
	);
}

export default App;
