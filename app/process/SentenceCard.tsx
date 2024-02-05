import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip';
import React from 'react';

interface SentenceCardProps {
	sentence: string;
	label: string;
	score: number;
	index: number;
}

interface TooltipTriggerWithDefaultCursorProps {
	children: React.ReactNode;
	// Füge hier weitere Props hinzu, die du benötigst
}

const TooltipTriggerWithDefaultCursor: React.FC<
	TooltipTriggerWithDefaultCursorProps
> = ({ children, ...props }) => (
	<TooltipTrigger className="tooltip-trigger" {...props}>
		{children}
	</TooltipTrigger>
);

const SentenceCard: React.FC<SentenceCardProps> = ({
	sentence,
	label,
	score,
	index,
}) => {
	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTriggerWithDefaultCursor>
					<div className="lg:w-[800px]">
						<div
							className={`${
								label === 'bullish'
									? 'bg-green-400'
									: label === 'bearish'
										? 'bg-red-400'
										: 'bg-gray-400'
							} rounded-md p-2 font-medium shadow-sm`}
						>
							{sentence}
						</div>
					</div>
				</TooltipTriggerWithDefaultCursor>
				<TooltipContent>
					{index}: {label} {score.toFixed(3)}
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};

export default SentenceCard;
