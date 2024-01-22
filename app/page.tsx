'use client';
import { useState, CSSProperties } from 'react';
import BarLoader from 'react-spinners/BarLoader';
import { useRouter } from 'next/navigation';

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

	// blöde Lösung, aber funktioniert
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
				'Dieser Link wird nicht akzeptiert. Bitte geben Sie einen Link ein, der nur "news" enthält.'
			);
		} else {
			setErrorMessage('');
		}
	};

	return (
		<>
			<div className='flex flex-col gap-10 justify-center items-center h-full'>
				<div className='border border-gray-300 shadow-sm w-[500px] h-[350px] rounded-md p-12'>
					<div>
						<div className='flex justify-between items-center'>
							<p className='text-3xl font-bold'>Link Input</p>
							<div className='p-1 bg-gray-300 rounded-md text-center font-semibold'>
								Testing
							</div>
						</div>
						<p className='text-md text-gray-600'>
							Geben Sie bitte einen Link ein
						</p>
						<p className='text-[12px] text-gray-600'>
							(Der Link sollte von der Kategorie &quot;Business&quot; sein)
						</p>
					</div>
					<div className='mt-20'>
						<input
							onChange={handleInputChange}
							value={url}
							className='w-full border border-gray-400 rounded-md p-3'
							type='text'
							placeholder='Link einfügen ...'
						/>
						{errorMessage && (
							<p className='text-red-500 text-sm'>{errorMessage}</p>
						)}
						<button
							onClick={handleSubmit}
							className={`bg-black hover:bg-zinc-800 text-white p-2 w-full mt-2 rounded-lg text-center font-semibold ${errorMessage || !url ? 'opacity-50 cursor-not-allowed' : ''}`}
							disabled={!!errorMessage || !url}>
							Bestätigen
						</button>
					</div>
				</div>
				{isLoading && (
					<BarLoader
						color={'#000'}
						cssOverride={override}
						aria-label='Loading Spinner'
						data-testid='loader'
					/>
				)}
			</div>
		</>
	);
}
