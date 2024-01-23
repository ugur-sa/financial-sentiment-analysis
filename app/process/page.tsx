import React from 'react';
import { SentimentPage } from '@/components/component/sentiment-page';
import { ClassifiedText } from '@/types/types';
import Link from 'next/link';
import Countdown from './Countdown';

type searchParams = {
	searchParams: {
		url: string;
	};
};

export default async function ProcessPage({ searchParams }: searchParams) {
	const url = searchParams.url;

	const AWS_URL = process.env.AWS_URL;

	const awsURL = AWS_URL + '?url=' + url;

	const response = await fetch(awsURL, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'x-api-key': process.env.X_API_KEY || '',
		},
	});

	if (!response.ok) {
		if (response.status === 503) {
			const error: { message: string; estimated_time: number } = JSON.parse(
				await response.text(),
			);
			const statusCode = response.status;

			return (
				<>
					<Link href="/">Go back</Link>
					<div className="flex h-screen flex-col items-center justify-center">
						<p className="text-4xl font-bold text-red-500">
							{statusCode}: {error.message}
						</p>
						<p className="text-3xl font-bold text-red-500">
							Estimated time:{' '}
							{<Countdown targetNumber={error.estimated_time} />} seconds
						</p>
					</div>
				</>
			);
		} else {
			const error: { message: string } = JSON.parse(await response.text());
			const statusCode = response.status;

			return (
				<>
					<Link href="/">Go back</Link>
					<div className="flex h-screen items-center justify-center">
						<p className="text-4xl font-bold text-red-500">
							{statusCode}: {error.message}
						</p>
					</div>
				</>
			);
		}
	}
	if (response.ok) {
		const data: ClassifiedText = await response.json();

		return <SentimentPage classifiedText={data} />;
	}
}
