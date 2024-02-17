import React, { useEffect } from 'react';
import { FaArrowDown } from 'react-icons/fa6';
import { GoLinkExternal } from 'react-icons/go';
import {
	CheckIcon,
	FailedIcon,
	InfoIcon,
	SuccessIcon,
	XCircleIcon,
} from '../ui/Icons';
import TextareaAutosize from 'react-textarea-autosize';
import { writeFeedback } from '@/app/actions/writeFeedback';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '../ui/button';
import Image from 'next/image';

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
	const [fullName, setFullName] = React.useState('');
	const [feedbackText, setFeedbackText] = React.useState('');
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
		} finally {
			setFullName('');
			setFeedbackText('');
			toast({
				title: 'Erfolgreich',
				description: 'Ihr Feedback wurde eingereicht. Vielen Dank!',
			});
		}
	}

	return (
		<div
			ref={modalRef}
			className="no-scrollbar h-[500px] w-full overflow-y-scroll rounded-lg bg-white p-5 shadow-xl lg:h-[800px] lg:w-[1000px] lg:p-10"
		>
			{/* {!entry?.isIntersecting && (
				<div className="absolute bottom-20 right-1/2 translate-x-1/2">
					<FaArrowDown
						className="animate-bounce cursor-pointer rounded-full bg-gray-400 bg-opacity-30 p-1"
						size={30}
						onClick={() => {
							scrollToBottom();
						}}
					/>
				</div>
			)} */}
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
				zu entnehmen ist, wird dieser Seite nach dem 01.06.2024 ablaufen und
				nicht mehr verfügbar sein.
			</p>
			<h1 className="mt-4 text-lg font-semibold">Einführung</h1>
			<p className="mt-4">
				Diese Applikation wurde entwickelt, um die Sentiment-Analyse von
				Finanznachrichten zu demonstrieren. <br />
				Dabei wird im Hintergrund mein eigenes für die Bachelorarbeit
				feinabgestimmtes BERT-Modell verwendet. <br />
				Link zur Bachlorarbeit folgt: <a href="/">...</a>
			</p>
			<h1 className="mt-4 text-lg font-semibold">Über das Modell</h1>
			<p className="mt-4">
				Das Modell wurde mit meinem selbst gesammelten{' '}
				<a
					className="inline-flex items-center text-blue-500"
					href="https://huggingface.co/datasets/ugursa/Yahoo-Finance-News-Sentences"
					target="_blank"
				>
					Datensatz <GoLinkExternal className="ml-1" size={12} />
				</a>{' '}
				von Sätzen aus Yahoo Finance Artikeln trainiert. <br />
				Die Daten wurden mit mehrenen Python Skripts und Jupyter Notebooks
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
					href="https://github.com/ugur-sa/Bachelorarbeit/tree/main/data/Abgabe"
				>
					https://github.com/ugur-sa/Bachelorarbeit/tree/main/data/Abgabe{' '}
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
				Diese App ist sehr simpel aufgebaut. Im Frontend läuft eine Next.js
				Applikation die auf{' '}
				<a
					className="inline-flex items-center text-blue-500"
					href="https://www.vercel.com"
					target="_blank"
				>
					Vercel
					<GoLinkExternal className="ml-1" size={12} />{' '}
				</a>{' '}
				gehostet wird. <br />
				Ursprünglich war das Backend ein einfacher Python Flask Server, der die
				URL entgegen nimmt, den Text aus dem Artikel extrahiert, den Text in
				Sätze aufteilt und dann die Sätze an die Inference API von Huggingface
				schickt. <br />
				Bei so einem einfachen Skript ist es einfacher einen Serverless Ansatz
				mit AWS Lambda zu wählen. AWS Lambda ist bis 1 Millionen Anfragen pro
				Monat kostenlos und man muss keine eigene Serverinstanz verwalten. Die
				Verbindung zu dieser Lambda Funktion erfolgt über einen weiteren AWS
				Service namens API Gateway. Dieser Service ist als Websocket
				konfiguriert, sodass die Lambda Funktion auf Anfragen reagieren kann. So
				gelingt die Echtzeit Kommunikation zwischen Frontend und Backend. <br />
				Nachdem die Verarbeitung abgeschlossen ist, legt diese Lambda Funktion
				das Ergebnis in einer DynamoDB Tabelle ab. <br />
				Danach kann der Nutzer die Ergebnisse über eine weitere API abrufen.{' '}
				<br />
				Ihre bisherigen Anfragen können Sie in der Tabelle unten einsehen. Diese
				werden in Localstorage gespeichert und sind somit nur für Sie auch nach
				dem Schließen des Tabs verfügbar (da die Ergebnisse in der Datenbank
				gespeichert sind, können Sie auch den Link kopieren und weiterschicken,
				ohne dass es einer erneuten Verarbeitung bedarf). Wenn Sie einen Link
				eingeben, der schon verarbeitet wurde, dann werden Sie nach einer kurzen
				Verzögerung zur Ergbenisseite weitergeleitet.
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
				Ergebnisse einsehen. Manchmal kann es zu Fehlern kommen, die durch ein
				rotes Kreuz (
				<span className="inline-flex justify-center">
					<XCircleIcon className="text-red-500" />
				</span>
				) angezeigt werden. Durch <i>hovern</i> über das rote Kreuz können Sie
				den Fehler einsehen. Um die Verarbeitung erneut zu starten, geben Sie
				den Link erneut ein und klicken Sie auf &quot;Bestätigen&quot;.
			</p>
			<video
				src="videos/tutorial2.mp4"
				autoPlay
				loop
				className="border border-black"
				ref={videoRef}
			/>
			<p className="mt-4">
				Ein häufiger Fehler der auftreten kann, ist dass die Inference API von
				Huggingface erst gestartet werden muss, da nur das kostenlose Kontingent
				genutzt wird. Dieser Vorgang kann bis zu 20 Sekunden dauern.
			</p>
			<h1 className="mt-4 text-lg font-semibold">
				Interpretation der Ergebnisse des Modells
			</h1>
			<p className="mt-4">
				Das Ergebniss der Verarbeitung bzw. der Klassifizierung ist eine
				Darstellung bei der auf einer Seite die Sätze des Artikels farbig
				markiert werden (<span className="text-green-500">grün</span>,{' '}
				<span className="text-gray-400">grau</span> oder{' '}
				<span className="text-red-500">rot</span>) und auf der anderen Seite
				eine Zusammenfassung der Klassifizierung in Form von Karten dargestellt
				wird. <br />
				Dabei wird das gesamte Sentiment des Artikels, das gewichtete und die
				durchschnittlichen Scores der Sätze und die Anzahl der Sätze in den
				Kategorien &quot;bullish&quot;, &quot;neutral&quot; und
				&quot;bearish&quot; angezeigt. <br />
				Das gesamte Sentiment wird anhand des gewichteten Sentiments angezeigt.
				Den Code für die Rechnung des Sentiments kann man hier finden:{' '}
				<a
					href="https://github.com/ugur-sa/Bachelorarbeit/blob/main/flask/app.py"
					className="inline-flex items-center text-blue-500"
				>
					https://github.com/ugur-sa/Bachelorarbeit/blob/main/flask/app.py{' '}
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
					Da die Inference API kostenlos ist, hat sie ein Rate Limit. Wenn
					dieses Rate Limit erreicht wurde, schlagen neue Anfragen fehl und
					zeigen dies auch als Fehler an. Das Rate Limit wird zum Anfang jeder
					Stunde zurückgesetzt.
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
					Scraping-Skript zur Zeit nur daran angepasst ist. Außerdem werden nur
					Artikel die /news/ im Link haben verarbeitet wegen dem gleichen Grund.
				</li>
			</ul>

			<h1 className="mt-4 text-lg font-semibold">Feedback</h1>
			<p className="mt-4">
				Wenn Sie Feedback haben können Sie es in das Textfeld eintragen und
				absenden.
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
				>
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
				Diesen Dialog können Sie immer wieder öffnen indem Sie auf das{' '}
				<span className="inline-flex">
					<InfoIcon />
				</span>{' '}
				oben rechts klicken.
			</p>

			<button
				onClick={onClose}
				className="mt-10 w-full rounded-lg bg-black p-2 text-center font-semibold text-white hover:bg-zinc-800"
			>
				Verstanden
			</button>
			<div ref={ref1}></div>
			<div ref={bottomRef}></div>
		</div>
	);
};

export default Tutorial;
