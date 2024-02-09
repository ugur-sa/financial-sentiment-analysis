import React from 'react';
import { PrismaClient } from '@prisma/client';
import Link from 'next/link';

const prisma = new PrismaClient();

async function getFeedback() {
	const feedback = await prisma.feedback.findMany();
	return feedback;
}

async function deleteFeedback(id: string) {
	await prisma.feedback.delete({
		where: {
			id,
		},
	});
}

export const revalidate = 1;
export default async function FeedbackPage() {
	const feedback = await getFeedback();

	return (
		<>
			<div className="xl:absolute xl:top-0">
				<Link href="/">Startseite</Link>
			</div>
			<div className="flex h-full w-full items-center justify-center">
				<div className="no-scrollbar h-full w-full overflow-y-scroll border-2 xl:w-1/3">
					{feedback.map((f) => (
						<div key={f.id} className="border-b-2 p-4">
							<h1 className="text-2xl font-bold">{f.name}</h1>
							<p className="whitespace-pre-line break-normal text-lg">
								{f.message}
							</p>
							<p className="text-sm font-light">
								{new Date(f.createdAt).toLocaleDateString()}
							</p>
						</div>
					))}
				</div>
			</div>
		</>
	);
}
