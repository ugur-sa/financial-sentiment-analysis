import React from 'react';

interface Props {
	title: string;
	value: string | number;
}

const Card: React.FC<Props> = (props) => {
	const textColor = () => {
		if (typeof props.value === 'string') {
			if (props.value === 'Bullish') {
				return 'text-green-500';
			} else if (props.value === 'Slightly Bullish') {
				return 'text-green-300';
			} else if (props.value === 'Neutral') {
				return 'text-gray-500';
			} else if (props.value === 'Slightly Bearish') {
				return 'text-red-300';
			}
			return 'text-red-500';
		}
	};

	return (
		<div className="w-30 flex h-20 flex-col rounded-md border border-gray-300 p-2 shadow-md lg:h-40 lg:w-60">
			<p className="text-md text-center font-semibold lg:text-xl">
				{props.title}
			</p>
			<div className="flex h-full w-full items-center justify-center">
				<p
					className={`text-center ${textColor()} ${typeof props.value === 'string' ? 'text-xl font-bold lg:text-4xl' : 'text-lg font-medium lg:text-3xl'}`}
				>
					{typeof props.value === 'number' && props.value % 1 != 0
						? props.value.toFixed(3)
						: props.value}
				</p>
			</div>
		</div>
	);
};

export default Card;
