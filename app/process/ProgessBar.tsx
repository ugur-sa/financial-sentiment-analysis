import React from 'react';

// Hilfsfunktion zur Bestimmung der Farbe basierend auf dem Wert
const getColorForSentiment = (value: number) => {
	if (value <= -0.6) return 'bg-red-600';
	if (value <= -0.2) return 'bg-red-300';
	if (value < 0.2) return 'bg-gray-400';
	if (value < 0.6) return 'bg-green-300';
	return 'bg-green-600';
};

const ProgressBar = ({ value }: { value: number }) => {
	const percentage = ((value + 1) / 2) * 100;
	const colorClass = getColorForSentiment(value);

	return (
		<div className="relative h-2.5 w-full rounded-full bg-gray-200">
			<div
				className={`h-2.5 rounded-full ${colorClass} flex items-center justify-end`}
				style={{ width: `${percentage}%` }}
			>
				<div
					className={`h-4 w-4 rounded-full ${colorClass} border-2 border-gray-200`}
				></div>
			</div>
		</div>
	);
};

export default ProgressBar;
