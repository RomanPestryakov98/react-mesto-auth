import React, { useState, useEffect, useRef } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
	const [avatar, setAvatar] = useState('');
	const spanRef = useRef();
	const [isValidLink, setIsValidLink] = useState(false);

	useEffect(() => {
		setIsValidLink(false);
	}, [props.isOpen]);

	function handleSubmit(e) {
		e.preventDefault();
		props.onUpdateAvatar({ avatar: avatar })
		setAvatar('');
	}

	function handleValidation(e) {
		setAvatar(e.target.value)
		if (!e.target.validity.valid) {
			setIsValidLink(false)
			spanRef.current.textContent = e.target.validationMessage;
		}
		else {
			setIsValidLink(true)
			spanRef.current.textContent = '';
		}
	}

	return (
		<PopupWithForm name='avatar' title='Обновить аватар' isOpen={props.isOpen} onClose={props.onClose} isValid={[isValidLink]} buttonText='Сохранить' isLoading={props.isLoading} renderLoadingText='Сохранение...' onSubmit={handleSubmit} >
			<label className="popup__label">
				<input type="url" placeholder="Ссылка на картинку" className="popup__input popup__input_type_link"
					id="input-url-avatar" required name="link" onChange={handleValidation} value={avatar} />
				<span className={`popup__error input-url-avatar-error ${!isValidLink && 'popup__error_visible'}`} ref={spanRef}></span>
			</label>
		</PopupWithForm>
	)
}

export default EditAvatarPopup;