import { ClassifiedText } from "@/types/types";
import SentenceCard from "@/app/process/SentenceCard";
import Card from "./Card";
import Link from "next/link";
interface SentimentPageProps {
  classifiedText: ClassifiedText;
}

export function SentimentPage({ classifiedText }: SentimentPageProps) {

  return (
    <>
      <div className="w-full h-full flex flex-col-reverse xl:flex-row">
        <div className="w-full xl:w-1/3 h-full grid grid-cols-2 p-12">
          <Card title="Overall Sentiment" value={classifiedText["Overall Sentiment"]} />
          <Card title="Weighted Sentiment" value={classifiedText["Weighted Sentiment"]} />
          <Card title="Average Bullish Score" value={classifiedText["Average Score Bullish"]} />
          <Card title="Average Neutral Score" value={classifiedText["Average Score Neutral"]} />
          <Card title="Average Bearish Score" value={classifiedText["Average Score Bearish"]} />
          <Card title="Bullish Sentences" value={classifiedText["Amount Bullish"]} />
          <Card title="Neutral Sentences" value={classifiedText["Amount Neutral"]} />
          <Card title="Bearish Sentences" value={classifiedText["Amount Bearish"]} />
        </div>
        {/*-------------------------------------------------------------------*/}
        <div className="flex flex-col items-center gap-2 w-full h-full xl:w-2/3 p-3 overflow-scroll no-scrollbar border border-l-2">
          {classifiedText.sentences.map((sentence: any, i: number) => (
            <div key={i} className="flex justify-center items-center">
              <p className="font-thin mr-2 text-sm">{i+1}</p>
              <SentenceCard sentence={sentence.sentence} label={sentence.result["label"]} score={sentence.result["score"]} index={i+1} />
            </div>
          ))}
        </div>
      </div>
      <div className="xl:absolute xl:top-0">
        <Link href="/">Go back</Link>
      </div>
  </>
  );
}