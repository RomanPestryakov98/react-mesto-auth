import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {
	const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
	const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
	const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
	const [selectedCard, setSelectedCard] = React.useState(null);

	function handleEditAvatarClick() {
		setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen)
	}

	function handleEditProfileClick() {
		setIsEditProfilePopupOpen(!isEditProfilePopupOpen)
	}

	function handleAddPlaceClick() {
		setIsAddPlacePopupOpen(!isAddPlacePopupOpen)
	}

	function closeAllPopups() {
		isEditProfilePopupOpen && setIsEditProfilePopupOpen(!isEditProfilePopupOpen)
		isAddPlacePopupOpen && setIsAddPlacePopupOpen(!isAddPlacePopupOpen)
		isEditAvatarPopupOpen && setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen)
		selectedCard && setSelectedCard(null)
	}

	function handleCardClick(obj) {
		setSelectedCard(obj);
	}

	return (
		<div className="page">
			<Header />

			<Main
				onEditProfile={handleEditProfileClick}
				onAddPlace={handleAddPlaceClick}
				onEditAvatar={handleEditAvatarClick}
				onCardClick={handleCardClick}
			/>

			<Footer />

			<PopupWithForm name='profile' title='Редактировать профиль' isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} buttonText='Сохранить'>
				<label className="popup__label">
					<input type="text" placeholder="Имя" className="popup__input popup__input_type_name" id="input-name" required
						minLength="2" maxLength="40" name="name" />
					<span className="popup__error input-name-error"></span>
				</label>
				<label className="popup__label">
					<input type="text" placeholder="О себе" className="popup__input popup__input_type_about" id="input-about" required
						minLength="2" maxLength="200" name="info" />
					<span className="popup__error input-about-error"></span>
				</label>
			</PopupWithForm>

			<PopupWithForm name='add-card' title='Новое место' isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} buttonText='Создать'>
				<label className="popup__label">
					<input type="text" placeholder="Название" className="popup__input popup__input_type_title" id="input-title"
						required minLength="2" maxLength="30" name="name" />
					<span className="popup__error input-title-error"></span>
				</label>
				<label className="popup__label">
					<input type="url" placeholder="Ссылка на картинку" className="popup__input popup__input_type_link" id="input-url"
						required name="link" />
					<span className="popup__error input-url-error"></span>
				</label>
			</PopupWithForm>

			<PopupWithForm name='delete-card' title='Вы уверены?' buttonText='Да' />

			<PopupWithForm name='avatar' title='Обновить аватар' isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} buttonText='Сохранить'>
				<label className="popup__label">
					<input type="url" placeholder="Ссылка на картинку" className="popup__input popup__input_type_link"
						id="input-url-avatar" required name="link" />
					<span className="popup__error input-url-avatar-error"></span>
				</label>
			</PopupWithForm>

			<ImagePopup card={selectedCard} onClose={closeAllPopups} />
		</div>
	);
}

export default App;
