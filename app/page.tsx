'use client';
import { useState, CSSProperties } from 'react';
import BarLoader from 'react-spinners/BarLoader';
import { useRouter } from 'next/navigation';
import CountdownDate from '@/components/component/CountdownDate';

const override: CSSProperties = {
	display: 'block',
	margin: '0 auto',
	borderColor: 'red',
};

export default function Home() {
	const [url, setUrl] = useState('');
	const [errorMessage, setErrorMessage] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	const handleSubmit = async () => {
		if (!errorMessage && url) {
			setIsLoading(true);
			router.push(`/process/?url=${url}`);
		}
	};

	const checkUrl = (inputUrl: string) => {
		return inputUrl.includes('/news/') && !inputUrl.includes('/video/');
	};

	const handleInputChange = (e: any) => {
		const inputUrl = e.target.value;
		setUrl(inputUrl);
		if (inputUrl && !checkUrl(inputUrl)) {
			setErrorMessage(
				'Bitte geben Sie einen Link ein, der nur "news" enthält.',
			);
		} else {
			setErrorMessage('');
		}
	};

	return (
		<>
			<div className="absolute left-0 top-0">
				<CountdownDate targetDate="2024-06-01T00:00:00" />
			</div>
			<div className="flex h-full flex-col items-center justify-center gap-10">
				<div className="h-[350px] w-[500px] rounded-md border border-gray-300 p-12 shadow-sm">
					<div>
						<div className="flex items-center justify-between">
							<p className="text-3xl font-bold">Link Input</p>
							<div className="rounded-md bg-gray-300 p-1 text-center font-semibold">
								Testing
							</div>
						</div>
						<p className="text-md text-gray-600">
							Geben Sie bitte einen Link ein
						</p>
						<p className="text-[12px] text-gray-600">
							(Der Link sollte von der Kategorie &quot;Business&quot; sein)
						</p>
					</div>
					<div className="mt-20">
						<input
							onChange={handleInputChange}
							value={url}
							className="w-full rounded-md border border-gray-400 p-3"
							type="text"
							placeholder="Link einfügen ..."
						/>
						{errorMessage && (
							<p className="text-sm text-red-500">{errorMessage}</p>
						)}
						<button
							onClick={handleSubmit}
							className={`mt-2 w-full rounded-lg bg-black p-2 text-center font-semibold text-white hover:bg-zinc-800 ${errorMessage || !url ? 'cursor-not-allowed opacity-50' : ''}`}
							disabled={!!errorMessage || !url}
						>
							Bestätigen
						</button>
					</div>
				</div>
				{isLoading && (
					<BarLoader
						color={'#000'}
						cssOverride={override}
						aria-label="Loading Spinner"
						data-testid="loader"
					/>
				)}
			</div>
		</>
	);
}
