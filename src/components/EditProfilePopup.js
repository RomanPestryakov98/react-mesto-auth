import React from 'react';
import PopupWithForm from './PopupWithForm';
import CurrentUserContext from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {
	const currentUser = React.useContext(CurrentUserContext);
	const [name, setName] = React.useState('');
	const [description, setDescription] = React.useState('');
	const [isValidName, setIsValidName] = React.useState(true);
	const [isValidDescription, setIsValidDescription] = React.useState(true);
	const inputNameRef = React.useRef();
	const inputDescriptionRef = React.useRef();

	React.useEffect(() => {
		setName(currentUser.name);
		setDescription(currentUser.about);
	}, [currentUser]);


	function handleNameChange(e) {
		setName(e.target.value)
		if (!e.target.validity.valid) {
			setIsValidName(false)
		}
		else {
			setIsValidName(true)
		}
	}

	function handleDescriptionChange(e) {
		setDescription(e.target.value)
		if (!e.target.validity.valid) {
			setIsValidDescription(false)
		}
		else {
			setIsValidDescription(true)
		}
	}

	function handleSubmit(e) {
		props.renderLoading();
		e.preventDefault();
		props.onUpdateUser({
			name,
			about: description,
		});
	}


	return (
		<PopupWithForm name='profile' title='Редактировать профиль' isOpen={props.isOpen} onClose={props.onClose} isValid={[isValidName, isValidDescription]} buttonText='Сохранить' onSubmit={handleSubmit} isLoading={props.isLoading} renderLoadingText='Сохранение...'>
			<label className="popup__label">
				<input type="text" placeholder="Имя" className="popup__input popup__input_type_name" id="input-name" required
					minLength="2" maxLength="40" name="name" onChange={handleNameChange} value={name} ref={inputNameRef} />
				<span className={`popup__error input-name-error ${!isValidName && 'popup__error_visible'}`}>{!isValidName && inputNameRef.current.validationMessage}</span>
			</label>
			<label className="popup__label">
				<input type="text" placeholder="О себе" className="popup__input popup__input_type_about" id="input-about" required
					minLength="2" maxLength="200" name="info" onChange={handleDescriptionChange} value={description} ref={inputDescriptionRef} />
				<span className={`popup__error input-about-error ${!isValidDescription && 'popup__error_visible'}`}>{!isValidDescription && inputDescriptionRef.current.validationMessage}</span>
			</label>
		</PopupWithForm>
	)
}

export default EditProfilePopup;