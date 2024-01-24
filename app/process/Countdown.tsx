'use client';
import React, { useState, useEffect } from 'react';

interface CountdownProps {
	targetNumber: number;
}

const Countdown: React.FC<CountdownProps> = ({ targetNumber }) => {
	const [remainingNumber, setRemainingNumber] = useState<number>(targetNumber);

	useEffect(() => {
		const interval = setInterval(() => {
			setRemainingNumber((prevNumber) => {
				if (prevNumber > 0) {
					return prevNumber - 1;
				} else {
					clearInterval(interval);
					window.location.reload();
					return prevNumber;
				}
			});
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	}, []);

	return <>{remainingNumber}</>;
};

export default Countdown;
