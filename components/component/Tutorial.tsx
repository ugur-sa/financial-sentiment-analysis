import React, { useEffect, useState } from 'react';
import { FaArrowDown } from 'react-icons/fa6';
import { GoLinkExternal } from 'react-icons/go';
import { CheckIcon, InfoIcon, XCircleIcon } from '../ui/Icons';
import TextareaAutosize from 'react-textarea-autosize';
import { writeFeedback } from '@/app/actions/writeFeedback';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '../ui/button';
import Image from 'next/image';
import FadeLoader from 'react-spinners/FadeLoader';

interface TutorialProps {
	onClose: () => void;
	modalRef: React.RefObject<HTMLDivElement>;
	bottomRef: React.RefObject<HTMLDivElement>;
	ref1: any;
	entry: IntersectionObserverEntry;
	scrollToBottom: () => void;
}

const Tutorial = ({
	onClose,
	modalRef,
	bottomRef,
	ref1,
	entry,
	scrollToBottom,
}: TutorialProps) => {
	const videoRef = React.useRef<HTMLVideoElement>(null);
	const [fullName, setFullName] = useState('');
	const [feedbackText, setFeedbackText] = useState('');
	const [sendingFeedback, setSendingFeedback] = useState(false);
	const { toast } = useToast();

	useEffect(() => {
		const videoRefCurrent = videoRef.current!;
		const observer = new IntersectionObserver(
			(entries) => {
				const entry = entries[0];
				if (entry.isIntersecting) {
					videoRefCurrent.play();
				} else {
					videoRefCurrent.pause();
				}
			},
			{
				threshold: 0.5, // Konfiguriere dies je nach Bedarf
			},
		);

		if (videoRefCurrent) {
			observer.observe(videoRefCurrent);
		}

		// Cleanup beim Unmount
		return () => {
			if (videoRefCurrent) {
				observer.unobserve(videoRefCurrent);
			}
		};
	}, []);

	function handleFeedbackSubmit(formData: FormData) {
		const fullName = formData.get('fullName') as string;
		const feedbackText = formData.get('feedbackText') as string;
		try {
			writeFeedback(fullName, feedbackText);
		} catch (error) {
			console.error('Feedback konnte nicht gesendet werden.');
			setSendingFeedback(false);
			toast({
				title: 'Fehler',
				description: 'Feedback konnte nicht gesendet werden.',
			});
		} finally {
			setFullName('');
			setFeedbackText('');
			setSendingFeedback(false);
			toast({
				title: 'Erfolgreich',
				description: 'Ihr Feedback wurde eingereicht. Vielen Dank!',
			});
		}
	}

	return (
		<div
			ref={modalRef}
			className="no-scrollbar relative h-[500px] w-full overflow-y-scroll rounded-lg bg-white p-5 shadow-xl lg:h-[800px] lg:w-[1000px] lg:p-10"
		>
			<span className="text-xl font-semibold">
				Willkommen zur Testapplikation meines{' '}
				<a
					className="inline-flex items-center text-blue-500 underline hover:text-blue-700"
					href="https://huggingface.co/ugursa/FinancialBERT-Yahoo-Finance-Sentiment-Analysis"
					target="_blank"
				>
					fine-tuned BERT-Modells <GoLinkExternal className="ml-1" />
				</a>
			</span>
			<p className="text-sm">
				<span className="font-bold text-red-500">Hinweis:</span> Wie oben links
				zu entnehmen ist, wird diese Seite nach dem 01.06.2024 ablaufen und
				nicht mehr verfügbar sein.
			</p>
			<h1 className="mt-4 text-lg font-semibold">Einführung</h1>
			<p className="mt-4">
				Die vorliegende Applikation wurde entwickelt, um die Sentiment-Analyse
				von Finanznachrichten zu demonstrieren. <br />
				Dabei kommt im Hintergrund ein eigens für die Bachelorarbeit
				entwickeltes und feinabgestimmtes BERT-Modell zum Einsatz.
				<br />
				Link zur Bachlorarbeit folgt:{' '}
				<a href="/" target="_blank">
					...
				</a>
			</p>
			<h1 className="mt-4 text-lg font-semibold">Über das Modell</h1>
			<p className="mt-4">
				Das Modell wurde anhand eines selbst erstellten{' '}
				<a
					className="inline-flex items-center text-blue-500"
					href="https://huggingface.co/datasets/ugursa/Yahoo-Finance-News-Sentences"
					target="_blank"
				>
					Datensatzes <GoLinkExternal className="ml-1" size={12} />
				</a>{' '}
				von Sätzen aus Yahoo Finance Artikeln trainiert. <br />
				Die Daten wurden mit mehreren Python-Skripten und Jupyter Notebooks
				gesammelt und aufbereitet und anschließend mit{' '}
				<a
					className="inline-flex items-center text-blue-500"
					href="https://pytorch.org/"
					target="_blank"
				>
					PyTorch <GoLinkExternal className="ml-1" size={12} />
				</a>
				,{' '}
				<a
					className="inline-flex items-center text-blue-500"
					href="https://huggingface.co/"
					target="_blank"
				>
					Huggingface <GoLinkExternal className="ml-1" size={12} />
				</a>{' '}
				und anderen Bibliotheken trainiert. <br />
				Link zu den Notebooks und Skripts:{' '}
				<a
					className="inline-flex items-center text-blue-500"
					href="https://github.com/ugur-sa/Ugur_Sadiklar_BA_2024"
					target="_blank"
				>
					https://github.com/ugur-sa/Ugur_Sadiklar_BA_2024{' '}
					<GoLinkExternal className="ml-1" size={12} />
				</a>
			</p>
			<h1 className="mt-4 text-lg font-semibold">Technische Details:</h1>
			<Image
				src="/images/aws_diagram_2.png"
				alt="aws_diagram"
				width={1000}
				height={1000}
			/>
			<p className="mt-4">
				Diese Applikation ist in ihrer Struktur sehr übersichtlich gestaltet. Im
				Frontend wird eine{' '}
				<a
					href="https://nextjs.org"
					target="_blank"
					className="inline-flex items-center rounded border border-neutral-200 bg-neutral-50 p-1 text-sm leading-4 text-neutral-900 no-underline dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100"
				>
					<img
						alt="Next.js logomark"
						src="/svgs/next-logo.svg"
						className="!mr-1"
						width="14"
						height="14"
					/>
					Next.js
				</a>{' '}
				Applikation verwendet, die auf{' '}
				<a
					href="https://vercel.com"
					target="_blank"
					className="inline-flex items-center rounded border border-neutral-200 bg-neutral-50 p-1 text-sm leading-4 text-neutral-900 no-underline dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100"
				>
					<img
						alt="Vercel logomark"
						src="/svgs/vercel-icon-light.svg"
						className="!mr-1"
						width="12"
						height="12"
					/>
					Vercel
				</a>{' '}
				gehostet wird. <br />
				<br />
				Das Backend basiert ursprünglich auf einem einfachen Python Flask
				Server, der die URL entgegenimmt, den Text aus dem Artikel extrahiert,
				den Text in Sätze aufteilt und schließlich die Sätze an die Inference
				API von Hugging Face schickt. <br />
				Bei einem derart simplen Skript empfiehlt sich die Verwendung eines
				Serverless-Ansatzes, wie er beispielsweise mit AWS Lambda zur Verfügung
				steht. AWS Lambda ist bis zu einer Million Anfragen pro Monat kostenlos
				nutzbar, sodass keine eigene Serverinstanz verwaltet werden muss. Die
				Verbindung zu dieser Lambda-Funktion erfolgt über einen weiteren
				AWS-Service namens API Gateway. Dieser ist als Websocket konfiguriert,
				sodass die Lambda-Funktion auf Anfragen reagieren kann. Auf diese Weise
				kann eine Echtzeit-Kommunikation zwischen Frontend und Backend
				gewährleistet werden.
				<br />
				<br />
				Nach Abschluss der Verarbeitung wird das Ergebnis durch die
				Lambda-Funktion in einer DynamoDB-Tabelle gespeichert. Der Nutzer kann
				die Ergebnisse über eine weitere API abrufen. Die bisherigen Anfragen
				können in der Tabelle unten eingesehen werden. Diese werden im
				LocalStorage gespeichert und sind somit auch nach dem Schließen des Tabs
				verfügbar. Da die Ergebnisse in der Datenbank gespeichert sind, kann der
				Link kopiert und weitergeleitet werden, ohne dass es einer erneuten
				Verarbeitung bedarf. Bei Eingabe eines bereits verarbeiteten Links
				erfolgt eine kurze Verzögerung, bevor die Ergebnisseite aufgerufen wird.{' '}
				<br />
			</p>
			<h1 className="mt-4 text-lg font-semibold">Wie man Tests durchführt</h1>
			<p className="mt-4">
				1. Gehen Sie auf die Webseite von{' '}
				<a
					className="inline-flex items-center text-blue-500"
					href="https://finance.yahoo.com/news"
					target="_blank"
				>
					Yahoo Finance
					<GoLinkExternal className="ml-1" size={12} />{' '}
				</a>{' '}
				und suchen Sie nach einem Artikel aus der Kategorie
				&quot;Business&quot;. <br />
			</p>
			<p className="">
				2. Kopieren Sie den Link des Artikels und fügen Sie ihn in das Textfeld
				ein. <br />
			</p>
			<p className="">
				3. Klicken Sie auf &quot;Bestätigen&quot; um die Sentiment-Analyse zu
				starten.
			</p>
			<p className="">
				4. Der Status der Verarbeitung wird in Echtzeit angezeigt. Sie können
				parallel mehrere Verarbeitungen starten.
			</p>
			<p className="">
				5. Wenn die Tabelle ein grünes Häkchen (
				<span className="inline-flex justify-center">
					<CheckIcon className="text-green-500" />
				</span>
				) anzeigt, ist die Verarbeitung abgeschlossen und Sie können die
				Ergebnisse einsehen. <br />
				In gelegentlichen Fällen können Fehler auftreten, die durch ein rotes
				Kreuz (
				<span className="inline-flex justify-center">
					<XCircleIcon className="text-red-500" />
				</span>
				) angezeigt werden. Durch <i>hovern</i> des Kreuzes können Sie den
				Fehler einsehen. Um die Verarbeitung erneut zu starten, geben Sie den
				Link erneut ein und klicken Sie auf &quot;Bestätigen&quot;.
			</p>
			{/* <video
				src="videos/tutorial2.mp4"
				autoPlay
				loop
				className="border border-black"
				ref={videoRef}
			/> */}
			<p className="mt-4">
				Ein häufig zu beobachtender Fehler ist, dass die Inference API von
				Hugging Face zunächst gestartet werden muss, da lediglich das kostenlose
				Kontingent genutzt wird. Dieser Vorgang kann bis zu 20 Sekunden dauern.
			</p>
			<h1 className="mt-4 text-lg font-semibold">
				Interpretation der Ergebnisse des Modells
			</h1>
			<p className="mt-4">
				Das Ergebniss der Verarbeitung bzw. der Klassifizierung ist eine
				Darstellung, bei der auf einer Seite die Sätze des Artikels farbig
				markiert werden (<span className="text-green-500">grün</span>,{' '}
				<span className="text-gray-400">grau</span> oder{' '}
				<span className="text-red-500">rot</span>) und auf der anderen Seite
				eine Zusammenfassung der Klassifizierung in Form von Karten dargestellt
				wird. <br />
				Die Darstellung umfasst das gesamte Sentiment des Artikels, das
				gewichtete sowie die durchschnittlichen Scores der Sätze und die Anzahl
				der Sätze in den Kategorien &quot;bullish&quot;, &quot;neutral&quot; und
				&quot;bearish&quot; . <br />
				Das gesamte Sentiment wird anhand des gewichteten Sentiments angezeigt.
				<br />
				<br />
				Der Code für die Rechnung des Sentiments unter folgendem Link eingesehen
				werden:{' '}
				<a
					href="https://github.com/ugur-sa/financial-sentiment-analysis/blob/master/aws-lambda/ProcessURL_WSS.py"
					className="inline-flex items-center text-blue-500"
					target="_blank"
				>
					https://github.com/ugur-sa/financial-sentiment-analysis/blob/master/aws-lambda/ProcessURL_WSS.py{' '}
					<GoLinkExternal className="ml-1" size={12} />
				</a>
			</p>
			<h1 className="mt-4 text-lg font-semibold">
				Bekannte Fehler und Restriktionen
			</h1>
			<p className="mt-4">
				Es gibt einige bekannte Fehler und Restriktionen, die in der Applikation
				auftreten können:
			</p>
			<ul className="mt-4 list-inside list-disc">
				<li>
					Starten der kostenlosen Inference API von Huggingface kann bis zu 20
					Sekunden dauern.
					<Image
						src="/images/api_starting_error.png"
						className="rounded-md border border-black"
						alt="api starting please wait error"
						width={1000}
						height={100}
					/>
				</li>
				<li>
					Manchmal schlägt die Klassifizierung fehl. Der Grund dafür ist
					unbekannt, da die API von Huggingface gemanaged wird.
					<Image
						src="/images/something_went_wrong_huggingface.png"
						alt="something went wrong with huggingface"
						className="rounded-md border border-black"
						width={1000}
						height={100}
					/>
				</li>
				<li>
					Die Inference API ist kostenlos verfügbar, allerdings ist ihr
					Funktionsumfang durch ein Rate Limit beschränkt. Sobald dieses Limit
					erreicht ist, werden neue Anfragen abgelehnt und als Fehler
					gekennzeichnet. Das Rate Limit wird zu Beginn jeder Stunde
					zurückgesetzt.
					<Image
						src="/images/ratelimit.png"
						alt="rate limit"
						className="rounded-md border border-black"
						width={1000}
						height={100}
					/>
				</li>
				<li>
					Es können nur Links von Yahoo Finance Artikeln aus der Kategorie
					&quot;Business&quot; verarbeitet werden. Das liegt daran, dass das
					Scraping-Skript zur Zeit nur daran angepasst ist. Außerdem werden zur
					Zeit nur Artikel die /news/ im Link haben verarbeitet.
				</li>
				<li>
					Oft kommt es vor, dass Yahoo Finance bei der Abfrage mit requests ein
					404 zurückgibt. Das tritt nach Erfahrung zufällig auf und es kann
					nicht garantiert werden, dass es nicht eintritt. Falls es eintritt,
					wird der Nutzer darauf hingewiesen, einen neuen Artikel auszuwählen,
					auch wenn dies nicht der ursprünglichen Idee entspricht (ich
					entschuldige mich für die Unannehmlichkeiten). Falls keine der
					ausgewählten Artikel funktionieren, dann wird auf die bisherigen{' '}
					<a href="/results" className="font-bold text-blue-500">
						Abfragen
					</a>{' '}
					hingewiesen, sodass ersichtlich wird, wie die Ergebnisse aussehen
					könnten (der blaue Text ist ein Link zu dieser Seite).
					<Image
						src="/images/yahooerror.png"
						alt="yahoo error"
						className="rounded-md border border-black"
						width={1000}
						height={100}
					/>
				</li>
			</ul>

			<h1 className="mt-4 text-lg font-semibold">Update 23.04.2024</h1>
			<p className="mt-4">
				Yahoo Finance hat vor kurzem das Design der Webseite geändert. Das ist
				allerdings kein Problem, da die HTML-Strukturen und Links gleich
				geblieben sind. Dennoch kann man (falls notwendig) das alte Design
				einsehen:
			</p>
			<Image
				src="/svgs/OldDesign.svg"
				alt="return to old design"
				width={1000}
				height={100}
			/>

			<h1 className="mt-4 text-lg font-semibold">Feedback</h1>
			<p className="mt-4">
				Bitte teilen Sie mir Ihr Feedback mit, indem Sie es in das dafür
				vorgesehene Textfeld eintragen und anschließend absenden.
			</p>

			<form action={handleFeedbackSubmit}>
				<TextareaAutosize
					className="min-h-24 w-full rounded-lg border p-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-zinc-800"
					placeholder="Ihr Feedback ..."
					name="feedbackText"
					value={fullName}
					onChange={(e) => setFullName(e.currentTarget.value)}
				/>
				<input
					className={`focus:ring-zinc-800" mb-4 w-full rounded-lg border p-2 focus:border-transparent focus:outline-none focus:ring-2`}
					type="text"
					placeholder="Ihr Name"
					name="fullName"
					value={feedbackText}
					onChange={(e) => setFeedbackText(e.currentTarget.value)}
				/>
				<Button
					disabled={!fullName || !feedbackText}
					type="submit"
					className="w-32 rounded-lg bg-black p-2 text-center font-semibold text-white hover:bg-zinc-800"
					variant="outline"
					onClick={() => {
						setSendingFeedback(true);
					}}
				>
					{sendingFeedback === true && (
						<div className="sweet-loading">
							<FadeLoader
								color={'#fff'}
								aria-label="Loading Spinner"
								data-testid="loader"
								height={15}
								width={5}
								margin={-5}
							/>
						</div>
					)}
					Absenden
				</Button>
			</form>
			<h1 className="mt-4 text-lg font-semibold">Technische Unterstützung</h1>
			<p className="mt-4">
				Bei Fragen oder Problemen können Sie mich gerne per E-Mail kontaktieren:{' '}
				<a className="text-blue-500" href="mailto:ugur.sadiklar@stud.hn.de">
					ugur.sadiklar@stud.hn.de
				</a>
			</p>
			<div className="my-4 h-[1px] w-full bg-gray-300"></div>
			<p className="mt-4">
				Der Dialog kann durch einen Klick auf das{' '}
				<span className="inline-flex">
					<InfoIcon />
				</span>{' '}
				oben rechts wiederholt geöffnet werden.
			</p>

			<button
				onClick={onClose}
				className="mt-10 w-full rounded-lg bg-black p-2 text-center font-semibold text-white hover:bg-zinc-800"
			>
				Verstanden
			</button>
			<div ref={ref1}></div>
			<div ref={bottomRef}></div>
			{!entry?.isIntersecting && (
				<div className="fixed bottom-[20%] right-1/2 translate-x-1/2 cursor-pointer lg:bottom-[8%]">
					<FaArrowDown
						className="animate-bounce rounded-full bg-gray-400 bg-opacity-30 p-1"
						size={30}
						onClick={scrollToBottom}
					/>
				</div>
			)}
		</div>
	);
};

export default Tutorial;
