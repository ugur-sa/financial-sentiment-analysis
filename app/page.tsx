'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import CountdownDate from '@/components/component/CountdownDate';
import RequestsTable from '@/components/component/RequestsTable';
import Modal from '@/components/component/Modal';
import { InfoIcon } from '@/components/ui/Icons';
import { useIntersection } from '@mantine/hooks';
import Tutorial from '@/components/component/Tutorial';
import { useModalStatus } from '@/hooks/useModalStatus';
import { usePersistedRequests } from '@/hooks/usePersistedRequests';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';

export default function Home() {
	const [url, setUrl] = useState('');
	const [errorMessage, setErrorMessage] = useState('');
	const [isConnected, setIsConnected] = useState(false);
	const [websocket, setWebsocket] = useState<WebSocket | null>(null);
	const [requests, setRequests] = usePersistedRequests([]);
	const { toast } = useToast();
	// State for Modal
	const [isOpen, setIsOpen] = useModalStatus(false);
	// Ref for Intersection Observer
	const modalRef = useRef<HTMLDivElement>(null);
	const bottomRef = useRef<HTMLDivElement>(null);
	const { ref, entry } = useIntersection({
		root: modalRef.current,
		threshold: 1,
	});

	const router = useRouter();

	const onClose = () => {
		setIsOpen(false);
		localStorage.setItem('hasUserSeenModal', 'true');
	};

	const scrollToBottom = () => {
		// Sicherstellen, dass bottomRef.current existiert, bevor scrollIntoView aufgerufen wird
		if (bottomRef.current) {
			bottomRef.current.scrollIntoView({ behavior: 'smooth' });
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

	useEffect(() => {
		const WSS_URL = process.env.NEXT_PUBLIC_WSS_URL!;

		function connectWebSocket() {
			let ws = new WebSocket(WSS_URL);

			ws.onopen = () => {
				console.log('Connected to WebSocket');
				setIsConnected(true);
			};

			ws.onmessage = (event) => {
				const message = JSON.parse(event.data);
				if (message.message === 'This URL has already been processed') {
					//remove this request from the list
					setRequests((prev) =>
						prev.filter((request) => request.url !== message.redirect),
					);
					//remove this request from localstorage
					localStorage.setItem(
						'requests',
						JSON.stringify(
							requests.filter((request) => request.url !== message.redirect),
						),
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
								? {
										...request,
										status: 'failed',
										text: message.error + ' Please wait 20 seconds.',
									}
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
				setTimeout(() => {
					connectWebSocket();
				}, 1000); // Verzögerung vor dem Wiederverbinden
			};

			ws.onerror = (error) => {
				console.error('WebSocket Fehler:', error);
			};

			setWebsocket(ws);
		}

		connectWebSocket();

		// Bereinigung beim Unmount
		return () => {
			if (websocket) {
				websocket.close();
			}
		};
	}, []);

	const sendUrlToWebSocket = (url: string) => {
		url = url.replace(/\s+/g, '');
		// if the url is in the list and its status is pending, do nothing
		const requestIndex = requests.findIndex((request) => request.url === url);
		if (requestIndex !== -1 && requests[requestIndex].status === 'completed') {
			router.push(`/process?url=${url}`);
			setUrl('');
			if (requests[requestIndex].status === 'pending') {
				return;
			}
			return;
		}
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
			<Modal isOpen={isOpen}>
				<Tutorial
					bottomRef={bottomRef}
					ref1={ref}
					modalRef={modalRef}
					entry={entry!}
					onClose={onClose}
					scrollToBottom={scrollToBottom}
				/>
			</Modal>

			<header className="mb-20">
				<div className="flex items-center justify-between">
					<CountdownDate targetDate="2024-06-01T01:00:00" />
					<button className="" onClick={() => setIsOpen(true)}>
						<InfoIcon />
					</button>
				</div>
			</header>
			{/* <div className="absolute right-0 top-0">
					{isConnected ? (
						<div className="bg-green-500 p-2 text-center text-white">
							Connected
						</div>
					) : (
						<div className="bg-red-500 p-2 text-center text-white">
							Disconnected. Please refresh the page.
						</div>
					)}
				</div> */}
			{isConnected && (
				<div className="flex h-fit flex-col items-center justify-center gap-10 overflow-x-hidden">
					<div className="rounded-md border border-gray-300 p-12 shadow-md lg:h-[350px] lg:w-[500px]">
						<div>
							<div className="flex items-center justify-between">
								<p className="text-3xl font-bold">Link Input</p>
								{/* <div className="rounded-md bg-gray-300 p-1 text-center font-semibold">
									Testing
								</div> */}
								<div className="glowing-border-div">Testing</div>
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
							<Button
								onClick={() => {
									sendUrlToWebSocket(url);
									toast({
										title: 'Erfolgreich',
										description: 'Ihre Anfrage wurde erfolgreich gesendet.',
									});
								}}
								className={`mt-2 w-full rounded-lg bg-black p-2 text-center font-semibold text-white hover:bg-zinc-800 ${errorMessage || !url ? 'cursor-not-allowed opacity-50' : ''}`}
								disabled={!!errorMessage || !url}
								variant="outline"
							>
								Bestätigen
							</Button>
						</div>
					</div>
					<RequestsTable requests={requests} />
				</div>
			)}
		</>
	);
}
