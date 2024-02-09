'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function deleteFeedback(id: string) {
	await prisma.feedback.delete({
		where: {
			id,
		},
	});
	revalidatePath('/feedback');
}
