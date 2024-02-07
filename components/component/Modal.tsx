import React from 'react';

interface ModalProps {
	isOpen: boolean;
	children?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, children }) => {
	return (
		<>
			{isOpen && (
				<div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gray-900 bg-opacity-50">
					{children}
					{/* <button className="close-button" onClick={handleClose}>
						Close
					</button> */}
				</div>
			)}
		</>
	);
};

export default Modal;
