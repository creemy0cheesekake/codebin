import "../styles/Modal.sass";

const Modal = ({ header, content, footer, showModal }: any) => {
	return (
		<div className="modal-background">
			<div className="modal-container">
				<div className="row x">
					<button onClick={() => showModal(false)}>X</button>
				</div>
				<div className="row header">
					<h1 className="modal-header">{header}</h1>
				</div>
				<div className="row content">{content}</div>
				<div className="row footer">{footer}</div>
			</div>
		</div>
	);
};

export default Modal;
