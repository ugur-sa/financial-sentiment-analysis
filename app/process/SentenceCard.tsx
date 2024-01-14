import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import React from 'react';

interface SentenceCardProps {
    sentence: string;
    label: string;
    score: number;
    index: number;
}

const SentenceCard: React.FC<SentenceCardProps> = ({ sentence, label, score, index }) => {
    return (
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger>
                    <div className='w-[600px]'>
                        <div className={
                        `${label === 'bullish' 
                        ? 
                        'bg-green-400' 
                        : 
                        (label === 'bearish' ? 'bg-red-400' : 'bg-gray-400')} rounded-md shadow-sm p-2 font-medium`}>{sentence}
                        </div>
                    </div>
                    </TooltipTrigger>
                    <TooltipContent>
                        <div className=''>{index}: {label}-{score.toFixed(3)}</div>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
    );
};

export default SentenceCard;
