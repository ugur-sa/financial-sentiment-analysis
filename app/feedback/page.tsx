'use server';
import React from 'react';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import DeleteButton from './DeleteButton';

async function getFeedback() {
	const feedback = await prisma.feedback.findMany();
	return feedback;
}

export default async function FeedbackPage() {
	const feedback = await getFeedback();

	return (
		<>
			<div className="xl:absolute xl:top-0">
				<Link href="/">Startseite</Link>
			</div>
			<div className="flex h-dvh w-dvw items-center justify-center">
				<div className="no-scrollbar h-full w-full overflow-y-scroll border-2 xl:w-1/3">
					{feedback.map((f) => (
						<div
							key={f.id}
							className="flex items-end justify-between border-b-2 p-4"
						>
							<div>
								<h1 className="text-2xl font-bold">{f.name}</h1>
								<p className="whitespace-pre-line break-normal text-lg">
									{f.message}
								</p>
								<p className="text-sm font-light">
									{new Date(f.createdAt).toLocaleDateString()}
								</p>
							</div>
							<DeleteButton id={f.id} />
						</div>
					))}
				</div>
			</div>
		</>
	);
}
