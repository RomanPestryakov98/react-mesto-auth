import React, { useState, useEffect } from 'react';
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
	const [currentUser, setCurrentUser] = useState({});
	const [cards, setCards] = useState([]);
	const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
	const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
	const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
	const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState(false);
	const [selectedCard, setSelectedCard] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [card, setCard] = useState({});

	useEffect(() => {
		api.getDataCards()
			.then(data => {
				setCards([...cards, ...data])
			})
			.catch(err => {
				console.log(err)
			})
	}, [])

	useEffect(() => {
		api.getDataProfile()
			.then(data => {
				setCurrentUser(data)
			})
			.catch(err => {
				console.log(err)
			})
	}, [])

	function handleCardLike(card) {
		const isLiked = card.likes.some(i => i._id === currentUser._id);
		api.toggleLike(card._id, isLiked).then((newCard) => {
			setCards((cards) => cards.map((c) => c._id === card._id ? newCard : c));
		})
			.catch(err => {
				console.log(err)
			})
	}

	function handleCardDelete(card) {
		api.deleteCard(card._id)
			.then(() => {
				const newCards = cards.filter(function (item) {
					return item._id !== card._id;
				})
				setCards(newCards);
				closeAllPopups();
			})
			.catch(err => {
				console.log(err)
			})
	}

	function handleEditAvatarClick() {
		setIsEditAvatarPopupOpen(true);
	}

	function handleEditProfileClick() {
		setIsEditProfilePopupOpen(true);
	}

	function handleAddPlaceClick() {
		setIsAddPlacePopupOpen(true);
	}
	function handleDeleteCardClick(card) {
		setCard(card);
		setIsDeleteCardPopupOpen(true);
	}

	function handleUpdateUser(data) {
		setIsLoading(true);
		api.updateDataProfile(data)
			.then(data => {
				setCurrentUser(data);
				closeAllPopups();
			})
			.catch(err => {
				console.log(err)
			})
			.finally(() => {
				setIsLoading(false);
			})
	}

	function handleUpdateAvatar(data) {
		setIsLoading(true);
		api.updateAvatar(data)
			.then(data => {
				setCurrentUser(data);
				closeAllPopups();
			})
			.catch(err => {
				console.log(err)
			})
			.finally(() => {
				setIsLoading(false);
			})
	}

	function handleAddCard(data) {
		setIsLoading(true);
		api.addNewCard(data)
			.then(data => {
				setCards([data, ...cards]);
				closeAllPopups();
			})
			.catch(err => {
				console.log(err)
			})
			.finally(() => {
				setIsLoading(false);
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
				/>
				<EditAvatarPopup
					isOpen={isEditAvatarPopupOpen}
					onClose={closeAllPopups}
					onUpdateAvatar={handleUpdateAvatar}
					isLoading={isLoading}
				/>
				<AddPlacePopup
					isOpen={isAddPlacePopupOpen}
					onClose={closeAllPopups}
					onAddCard={handleAddCard}
					isLoading={isLoading}
				/>
				<DeleteCardPopup
					isOpen={isDeleteCardPopupOpen}
					onClose={closeAllPopups}
					onDeleteCard={handleCardDelete}
					card={card}
					isLoading={isLoading}
				/>
				<ImagePopup card={selectedCard} onClose={closeAllPopups} />
			</div>
		</CurrentUserContext.Provider>
	);
}

export default App;
