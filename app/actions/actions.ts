'use server';

import { prisma } from '@/lib/prisma';

export async function deleteFeedback(id: string) {
	await prisma.feedback.delete({
		where: {
			id,
		},
	});
}
