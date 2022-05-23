import close from '../images/popup/close.svg';

function ImagesPopup(props) {
	return (
		<div className={props.card ? `popup popup_type_image popup_opened` : `popup popup_type_image`}>
			<div className="popup__overlay popup__overlay_type_image"></div>
			<div className="popup__content">
				<button className="popup__close popup__close_type_open" onClick={props.onClose}>
					<img src={close} alt="Закрыть" className="popup__close-cross" />
				</button>
				<div className="popup__container-image">
					<img src={props.card} alt="Картинка" className="popup__image" />
				</div>
				<p className="popup__label-text"></p>
			</div>
		</div>
	)
}

export default ImagesPopup;