'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function writeFeedback(fullName: string, feedbackText: string) {
	await prisma.feedback.create({
		data: {
			name: fullName,
			message: feedbackText,
		},
	});
	revalidatePath('/feedback');
}
