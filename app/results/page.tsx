import Link from 'next/link';
import React from 'react';

interface Props {
	// Define the props for your component here
}

const ResultsPage: React.FC<Props> = async () => {
	const response: string[] = await fetch(
		process.env.AWS_URL_GET_ALL_RESULT_URLS!,
		{
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'x-api-key': process.env.AWS_URL_GET_ALL_RESULT_URLS_API_KEY || '',
			},
		},
	).then((res) => res.json());

	return (
		<div className="">
			<Link href="/">Startseite</Link>
			<h1 className="text-center text-2xl font-bold">
				Alle bisherigen Anfragen
			</h1>
			{response.map((url, i) => {
				return (
					<div key={i} className="text-center">
						<Link
							href={`/process?url=${url}`}
							target="_blank"
							className="text-blue-500 hover:text-blue-800"
						>
							{url}
						</Link>
					</div>
				);
			})}
		</div>
	);
};

export default ResultsPage;
