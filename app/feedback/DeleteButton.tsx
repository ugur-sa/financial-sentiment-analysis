'use client';
import React from 'react';
import { IoTrashOutline } from 'react-icons/io5';
import { deleteFeedback } from '../actions/actions';
import { useRouter } from 'next/navigation';

type DeleteButtonProps = {
	id: string;
};

const DeleteButton: React.FC<DeleteButtonProps> = ({ id }) => {
	const router = useRouter();

	const handleClick = async () => {
		await deleteFeedback(id);
		router.refresh();
	};

	return (
		<button onClick={handleClick}>
			<IoTrashOutline />
		</button>
	);
};

export default DeleteButton;
