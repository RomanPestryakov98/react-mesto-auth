import React from 'react';
import PopupWithForm from './PopupWithForm';

function DeleteCardPopup(props) {
	function handleSubmit() {
		props.onDeleteCard(props.card);
	}
	return (
		<PopupWithForm name='delete-card' title='Вы уверены?' isValid={[true]} buttonText='Да' isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} />
	)
}

export default DeleteCardPopup;