'use client';
import React, { useEffect } from 'react';

export default function Error({
	error,
}: {
	error: Error & { digest?: string };
}) {
	useEffect(() => {
		console.error(error);
	}, [error]);

	return (
		<div className="flex h-dvh w-dvw flex-col items-center justify-center">
			<h1>504 Gateway Timeout</h1>
			<p>Sorry, the server is taking too long to respond.</p>
			<p>Please refresh the page.</p>
			<button
				className="w-32 bg-black p-2 text-white"
				onClick={() => window.location.reload()}
			>
				Refresh
			</button>
		</div>
	);
}
