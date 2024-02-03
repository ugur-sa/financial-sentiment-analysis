export type ClassifiedText = {
	sentences: [
		sentence: string,
		result: {
			label: string;
			score: number;
		},
	];
	'Average Score Bullish': number;
	'Average Score Neutral': number;
	'Average Score Bearish': number;
	'Amount Bullish': number;
	'Amount Neutral': number;
	'Amount Bearish': number;
	'Weighted Sentiment': number;
	'Overall Sentiment': string;
};

export type Requests = {
	url: string;
	status: string;
	text?: string;
};
