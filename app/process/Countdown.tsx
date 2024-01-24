'use client';
import React, { useState, useEffect } from 'react';

interface CountdownProps {
	targetNumber: number;
}

const Countdown: React.FC<CountdownProps> = ({ targetNumber }) => {
	const [remainingNumber, setRemainingNumber] = useState<number>(targetNumber);

	if (remainingNumber === 0) {
		window.location.reload();
	}

	useEffect(() => {
		const interval = setInterval(() => {
			if (remainingNumber > 0) {
				setRemainingNumber((prevNumber) => prevNumber - 1);
			}
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	}, []);

	return <>{remainingNumber}</>;
};

export default Countdown;
