import React, { useState } from 'react';

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	children?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
	const handleClose = () => {
		onClose();
	};

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
