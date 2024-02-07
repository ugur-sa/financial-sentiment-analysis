import React from 'react';
import { FaArrowDown } from 'react-icons/fa6';
import { GoLinkExternal } from 'react-icons/go';
import { FailedIcon, InfoIcon, SuccessIcon } from '../ui/Icons';
import TextareaAutosize from 'react-textarea-autosize';

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
	return (
		<div
			ref={modalRef}
			className="no-scrollbar h-[500px] w-full overflow-y-scroll rounded-lg bg-white p-10 shadow-xl lg:h-[800px] lg:w-1/2"
		>
			{!entry?.isIntersecting && (
				<div className="absolute bottom-24 right-1/2 hidden translate-x-1/2 lg:block">
					<FaArrowDown
						className="animate-bounce cursor-pointer rounded-full bg-gray-400 bg-opacity-30 p-1"
						size={30}
						onClick={() => {
							scrollToBottom();
						}}
					/>
				</div>
			)}
			<span className="flex items-center text-xl font-semibold">
				Willkommen zur Testapplikation meines{' '}
				<a
					className="ml-1 inline-flex items-center text-blue-500 underline hover:text-blue-700"
					href="https://huggingface.co/ugursa/FinancialBERT-Yahoo-Finance-Sentiment-Analysis"
					target="_blank"
				>
					fine-tuned BERT-Modells <GoLinkExternal className="ml-1" />
				</a>
			</span>
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
				Das Modell wurde mit meinem selbst gesammelten Datensatz von Sätzen aus
				Yahoo Finance Artikeln trainiert. <br />
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
			<h1 className="mt-4 text-lg font-semibold">Wie man Tests durchführt</h1>
			<p className="mt-4">
				1. Gehen Sie auf die Webseite von{' '}
				<a href="finance.yahoo.com">Yahoo Finance</a> und suchen Sie nach einem
				Artikel aus der Kategorie "Business". <br />
			</p>
			<p className="">
				2. Kopieren Sie den Link des Artikels und fügen Sie ihn in das Textfeld
				ein. <br />
			</p>
			<p className="">
				3. Klicken Sie auf "Bestätigen" um die Sentiment-Analyse zu starten.
			</p>
			<p className="">
				4. Der Status der Verarbeitung wird in Echtzeit angezeigt. Sie können
				parallel mehrere Verarbeitungen starten.
			</p>
			<p className="">
				5. Wenn die Tabelle ein grünes Häkchen (
				<span className="inline-flex justify-center">
					<SuccessIcon />
				</span>
				) anzeigt, ist die Verarbeitung abgeschlossen und Sie können die
				Ergebnisse einsehen. Manchmal kann es zu Fehlern kommen, die durch ein
				rotes Kreuz (
				<span className="inline-flex justify-center">
					<FailedIcon />
				</span>
				) angezeigt werden. Durch <i>hovern</i> über das rote Kreuz können Sie
				den Fehler einsehen. Um die Verarbeitung erneut zu starten, geben Sie
				den Link erneut ein und klicken Sie auf "Bestätigen".
			</p>
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
				Kategorien "bullish", "neutral" und "bearish" angezeigt. <br />
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
			<h1 className="mt-4 text-lg font-semibold">Feedback</h1>
			<p className="mt-4">
				Wenn Sie Feedback haben können Sie es in das Textfeld eintragen und
				absenden.
			</p>

			<form action="">
				<TextareaAutosize
					className="min-h-24 w-full rounded-lg border p-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-zinc-800"
					placeholder="Funktioniert gerade noch nicht ..."
				/>
				<button
					type="submit"
					className="w-full rounded-lg bg-black p-2 text-center font-semibold text-white hover:bg-zinc-800"
				>
					Absenden
				</button>
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

			{/* <p className="mt-4">
				<strong>Technische Details:</strong>
			</p>
			<img src="images/aws_diagram_2.png" /> */}

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
