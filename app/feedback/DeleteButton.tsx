'use client';
import React from 'react';
import { IoTrashOutline } from 'react-icons/io5';
import { deleteFeedback } from '../actions/actions';

type DeleteButtonProps = {
	id: string;
};

const DeleteButton: React.FC<DeleteButtonProps> = ({ id }) => {
	const handleClick = async () => {
		await deleteFeedback(id);
	};

	return (
		<button onClick={handleClick}>
			<IoTrashOutline />
		</button>
	);
};

export default DeleteButton;
