import { useState, useEffect } from 'react';

export function useModalStatus(
	defaultIsOpen: boolean,
): [boolean, React.Dispatch<React.SetStateAction<boolean>>] {
	const [isOpen, setIsOpen] = useState<boolean>(defaultIsOpen);

	useEffect(() => {
		const hasUserSeenModal = localStorage.getItem('hasUserSeenModal');
		if (!hasUserSeenModal) {
			setIsOpen(true);
		}
	}, []);

	return [isOpen, setIsOpen];
}
