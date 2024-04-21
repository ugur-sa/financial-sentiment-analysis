import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';
import './globals.css';
import { GeistSans } from 'geist/font/sans';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
	title: 'Yahoo Finance Sentiment Analysis',
	description: 'Yahoo Finance Sentiment Analysis',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" className={GeistSans.className}>
			<body>
				<main>
					{children}
					<Analytics />
				</main>
				<Toaster />
			</body>
		</html>
	);
}
