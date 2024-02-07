import { useState, useEffect } from 'react';
import { Requests } from '@/types/types';

export function usePersistedRequests(
	defaultRequests: Requests[],
): [Requests[], React.Dispatch<React.SetStateAction<Requests[]>>] {
	const [requests, setRequests] = useState<Requests[]>(defaultRequests);

	useEffect(() => {
		const initialRequests = localStorage.getItem('requests');
		if (initialRequests) setRequests(JSON.parse(initialRequests));
	}, []);

	useEffect(() => {
		if (requests.length > 0) {
			localStorage.setItem('requests', JSON.stringify(requests));
		}
	}, [requests]);

	return [requests, setRequests];
}
