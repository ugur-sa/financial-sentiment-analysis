'use server';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function writeFeedback(fullName: string, feedbackText: string) {
	await prisma.feedback.create({
		data: {
			name: fullName,
			message: feedbackText,
		},
	});
}
