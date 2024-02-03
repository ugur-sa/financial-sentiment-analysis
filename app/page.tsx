'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import CountdownDate from '@/components/component/CountdownDate';
import RequestsTable from '@/components/component/RequestsTable';
import { Requests } from '@/types/types';

export default function Home() {
	const [url, setUrl] = useState('');
	const [errorMessage, setErrorMessage] = useState('');
	const [isConnected, setIsConnected] = useState(false);
	const [websocket, setWebsocket] = useState<WebSocket | null>(null);
	const [requests, setRequests] = useState<Requests[]>([]);
	const router = useRouter();

	useEffect(() => {
		const initialRequests = localStorage.getItem('requests');

		if (initialRequests) setRequests(JSON.parse(initialRequests));
	}, []);

	useEffect(() => {
		if (requests.length > 0) {
			localStorage.setItem('requests', JSON.stringify(requests));
		}
	}, [requests]);

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

	useEffect(() => {
		const WSS_URL = process.env.NEXT_PUBLIC_WSS_URL!;
		let ws = new WebSocket(WSS_URL);

		ws.onopen = () => {
			console.log('Connected to WebSocket');
			setIsConnected(true);
		};

		ws.onmessage = (event) => {
			const message = JSON.parse(event.data);
			if (message.message === 'This URL has already been processed') {
				//remove this url from the requests array
				setRequests((prev) =>
					prev.filter((request) => request.url !== message.url),
				);
				router.push(`/process/?url=${message.redirect}`);
			} else if (message.error === 'Rate limit reached') {
				setRequests((prev) =>
					prev.map((request) =>
						request.url === message.url
							? { ...request, status: 'failed', text: message.error }
							: request,
					),
				);
			} else if (
				message.error ===
				'Model ugursa/FinancialBERT-Yahoo-Finance-Sentiment-Analysis is currently loading.'
			) {
				setRequests((prev) =>
					prev.map((request) =>
						request.url === message.url
							? { ...request, status: 'failed', text: message.error }
							: request,
					),
				);
			} else if (message.error === 'An unexpected error occurred') {
				setRequests((prev) =>
					prev.map((request) =>
						request.url === message.url
							? { ...request, status: 'failed', text: message.error }
							: request,
					),
				);
			} else if (message.error === 'Something went wrong with huggingface') {
				setRequests((prev) =>
					prev.map((request) =>
						request.url === message.url
							? { ...request, status: 'failed', text: message.error }
							: request,
					),
				);
			} else if (message.status === 'pending') {
				setRequests((prev) =>
					prev.map((request) =>
						request.url === message.url
							? { ...request, status: 'pending' }
							: request,
					),
				);
			} else if (message.status === 'completed') {
				setRequests((prev) =>
					prev.map((request) =>
						request.url === message.url
							? { ...request, status: 'completed' }
							: request,
					),
				);
			}
		};

		ws.onclose = () => {
			setIsConnected(false);
			console.log('WebSocket Verbindung geschlossen');
			// set all pending requests to failed
			setRequests((prev) =>
				prev.map((request) =>
					request.status === 'pending'
						? { ...request, status: 'failed' }
						: request,
				),
			);
		};

		ws.onerror = (error) => {
			console.error('WebSocket Fehler:', error);
		};

		setWebsocket(ws);

		// Bereinigung beim Unmount
		return () => {
			ws.close();
		};
	}, []);

	const sendUrlToWebSocket = (url: string) => {
		if (websocket && websocket.readyState === WebSocket.OPEN) {
			// Sende die Nachricht
			websocket.send(
				JSON.stringify({
					action: 'process',
					data: url,
				}),
			);
			// check if there is an entry with the same url and set it to pending
			const requestIndex = requests.findIndex((request) => request.url === url);
			if (requestIndex !== -1) {
				setRequests((prev) =>
					prev.map((request, index) =>
						index === requestIndex
							? { ...request, status: 'pending', text: undefined }
							: request,
					),
				);
			} else {
				setRequests((prev) => [
					{
						url,
						status: 'pending',
					},
					...prev,
				]);
			}

			setUrl('');
		} else {
			console.error('WebSocket-Verbindung ist nicht geöffnet.');
		}
	};

	return (
		<>
			<div className="absolute left-0 top-0">
				<CountdownDate targetDate="2024-06-01T01:00:00" />
			</div>
			<div className="absolute right-0 top-0">
				{isConnected ? (
					<div className="bg-green-500 p-2 text-center text-white">
						Connected
					</div>
				) : (
					<div className="bg-red-500 p-2 text-center text-white">
						Disconnected
					</div>
				)}
			</div>
			<div className="flex h-full flex-col items-center justify-center gap-10">
				<div className="h-[350px] w-[500px] rounded-md border border-gray-300 p-12 shadow-md">
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
							onClick={() => sendUrlToWebSocket(url)}
							className={`mt-2 w-full rounded-lg bg-black p-2 text-center font-semibold text-white hover:bg-zinc-800 ${errorMessage || !url ? 'cursor-not-allowed opacity-50' : ''}`}
							disabled={!!errorMessage || !url || isConnected === false}
						>
							Bestätigen
						</button>
					</div>
				</div>
				{requests.length > 0 && <RequestsTable requests={requests} />}
			</div>
		</>
	);
}
