import { ClassifiedText } from '@/types/types';
import SentenceCard from '@/app/process/SentenceCard';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';

import Link from 'next/link';
import ProgressBar from '@/app/process/ProgessBar';
interface SentimentPageProps {
	classifiedText: ClassifiedText;
}

export function SentimentPage({ classifiedText }: SentimentPageProps) {
	const overall_sentiment_text = classifiedText['Overall Sentiment'];

	const textColor = () => {
		if (typeof overall_sentiment_text === 'string') {
			if (overall_sentiment_text === 'Bullish') {
				return 'text-green-500';
			} else if (overall_sentiment_text === 'Slightly Bullish') {
				return 'text-green-300';
			} else if (overall_sentiment_text === 'Neutral') {
				return 'text-gray-500';
			} else if (overall_sentiment_text === 'Slightly Bearish') {
				return 'text-red-300';
			}
			return 'text-red-500';
		}
	};

	return (
		<>
			<div className="flex h-dvh w-dvw flex-col-reverse xl:flex-row">
				<div className="no-scrollbar grid w-full grid-cols-2 place-items-center gap-2 overflow-y-scroll p-12 xl:w-2/5">
					<Card className="h-48 w-full lg:w-11/12">
						<CardHeader>
							<CardTitle className="text-center text-lg lg:text-2xl">
								Overall Sentiment
							</CardTitle>
						</CardHeader>
						<CardContent
							className={`${textColor()} text-center text-2xl font-bold lg:text-4xl`}
						>
							{classifiedText['Overall Sentiment']}
						</CardContent>
					</Card>
					<Card className="h-48 w-full lg:w-11/12">
						<CardHeader>
							<CardTitle className="text-center text-lg lg:text-2xl">
								Weighted Sentiment
							</CardTitle>
						</CardHeader>
						<CardContent className="text-center text-xl font-bold lg:text-4xl">
							{classifiedText['Weighted Sentiment'].toFixed(3)}
						</CardContent>
						<CardFooter>
							<ProgressBar
								value={+classifiedText['Weighted Sentiment'].toFixed(3)}
							/>
						</CardFooter>
					</Card>
					<Card className="h-48 w-full lg:w-11/12">
						<CardHeader>
							<CardTitle className="text-center text-lg lg:text-2xl">
								Average Bullish Score
							</CardTitle>
						</CardHeader>
						<CardContent className="text-center text-xl font-bold lg:text-4xl">
							{classifiedText['Average Score Bullish'].toFixed(3)}
						</CardContent>
					</Card>
					<Card className="h-48 w-full lg:w-11/12">
						<CardHeader>
							<CardTitle className="text-center text-lg lg:text-2xl">
								Average Neutral Score
							</CardTitle>
						</CardHeader>
						<CardContent className="text-center text-xl font-bold lg:text-4xl">
							{classifiedText['Average Score Neutral'].toFixed(3)}
						</CardContent>
					</Card>
					<Card className="h-48 w-full lg:w-11/12">
						<CardHeader>
							<CardTitle className="text-center text-lg lg:text-2xl">
								Average Bearish Score
							</CardTitle>
						</CardHeader>
						<CardContent className="text-center text-xl font-bold lg:text-4xl">
							{classifiedText['Average Score Bearish'].toFixed(3)}
						</CardContent>
					</Card>
					<Card className="h-48 w-full lg:w-11/12">
						<CardHeader>
							<CardTitle className="text-center text-lg lg:text-2xl">
								Bullish Sentences
							</CardTitle>
						</CardHeader>
						<CardContent className="text-center text-xl font-bold lg:text-4xl">
							{classifiedText['Amount Bullish']}
						</CardContent>
					</Card>
					<Card className="h-48 w-full lg:w-11/12">
						<CardHeader>
							<CardTitle className="text-center text-lg lg:text-2xl">
								Neutral Sentences
							</CardTitle>
						</CardHeader>
						<CardContent className="text-center text-xl font-bold lg:text-4xl">
							{classifiedText['Amount Neutral']}
						</CardContent>
					</Card>
					<Card className="h-48 w-full lg:w-11/12">
						<CardHeader>
							<CardTitle className="text-center text-lg lg:text-2xl">
								Bearish Sentences
							</CardTitle>
						</CardHeader>
						<CardContent className="text-center text-xl font-bold lg:text-4xl">
							{classifiedText['Amount Bearish']}
						</CardContent>
					</Card>
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
				<Link href="/">Startseite</Link>
			</div>
		</>
	);
}
