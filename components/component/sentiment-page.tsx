import { ClassifiedText } from '@/types/types';
import SentenceCard from '@/app/process/SentenceCard';
import Card from './Card';
import Link from 'next/link';
interface SentimentPageProps {
	classifiedText: ClassifiedText;
}

export function SentimentPage({ classifiedText }: SentimentPageProps) {
	return (
		<>
			<div className="flex h-full w-full flex-col-reverse xl:flex-row">
				<div className="grid h-full w-full grid-cols-2 place-items-center gap-2 p-12 xl:w-2/5">
					<Card
						title="Overall Sentiment"
						value={classifiedText['Overall Sentiment']}
					/>
					<Card
						title="Weighted Sentiment"
						value={classifiedText['Weighted Sentiment']}
					/>
					<Card
						title="Average Bullish Score"
						value={classifiedText['Average Score Bullish']}
					/>
					<Card
						title="Average Neutral Score"
						value={classifiedText['Average Score Neutral']}
					/>
					<Card
						title="Average Bearish Score"
						value={classifiedText['Average Score Bearish']}
					/>
					<Card
						title="Bullish Sentences"
						value={classifiedText['Amount Bullish']}
					/>
					<Card
						title="Neutral Sentences"
						value={classifiedText['Amount Neutral']}
					/>
					<Card
						title="Bearish Sentences"
						value={classifiedText['Amount Bearish']}
					/>
				</div>
				{/*-------------------------------------------------------------------*/}
				<div className="no-scrollbar flex h-full w-full flex-col items-center gap-2 overflow-scroll border border-l-2 p-3 xl:w-3/5">
					{classifiedText.sentences.map((sentence: any, i: number) => (
						<div
							key={i}
							className="flex w-[calc(100%-10px)] items-center justify-start md:w-fit"
						>
							<p className="mr-2 text-sm font-thin">{i + 1}</p>
							<SentenceCard
								sentence={sentence.sentence}
								label={sentence.result['label']}
								score={sentence.result['score']}
								index={i + 1}
							/>
						</div>
					))}
				</div>
			</div>
			<div className="xl:absolute xl:top-0">
				<Link href="/">Go back</Link>
			</div>
		</>
	);
}
