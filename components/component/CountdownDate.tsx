import React, { useState, useEffect, useCallback } from 'react';

const CountdownDate = ({ targetDate }: { targetDate: string }) => {
	const calculateTimeLeft = () => {
		const difference = +new Date(targetDate) - +new Date();
		let timeLeft = {};

		if (difference > 0) {
			timeLeft = {
				Tage: Math.floor(difference / (1000 * 60 * 60 * 24)),
				Stunden: Math.floor((difference / (1000 * 60 * 60)) % 24),
				Minuten: Math.floor((difference / 1000 / 60) % 60),
				Sekunden: Math.floor((difference / 1000) % 60),
			};
		}

		return timeLeft;
	};

	const [timeLeft, setTimeLeft] = useState({});

	useEffect(() => {
		const timer = setTimeout(() => {
			setTimeLeft(calculateTimeLeft());
		}, 1000);

		return () => clearTimeout(timer);
	});

	return (
		<div>
			{Object.keys(timeLeft).map((interval) => (
				<span key={interval}>
					{timeLeft[interval as keyof typeof timeLeft]} {interval}{' '}
				</span>
			))}
		</div>
	);
};

export default CountdownDate;
