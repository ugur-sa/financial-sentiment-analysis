import { ClassifiedText } from "@/types/types";
import SentenceCard from "@/app/process/SentenceCard";
import Card from "./Card";
interface SentimentPageProps {
  classifiedText: ClassifiedText;
}

export function SentimentPage({ classifiedText }: SentimentPageProps) {

  let bullish = 0;
  classifiedText.sentences.forEach((element: any) => {
    element.result[0]["label"] === 'bullish' ? bullish++ : 0;
  });

  let neutral = 0;
  classifiedText.sentences.forEach((element: any) => {
    element.result[0]["label"] === 'neutral' ? neutral++ : 0;
  });

  let bearish = 0;
  classifiedText.sentences.forEach((element: any) => {
    element.result[0]["label"] === 'bearish' ? bearish++ : 0;
  });

  return (
    <>
      <div className="w-full h-full flex">
        <div className="w-1/3 h-full grid grid-cols-2 p-12">
          <Card title="Overall Sentiment" value={classifiedText.sentiment["overall_sentiment"]} />
          <Card title="Average Bullish Score" value={classifiedText.sentiment["avg_bullish_score"]} />
          <Card title="Average Neutral Score" value={classifiedText.sentiment["avg_neutral_score"]} />
          <Card title="Average Bearish Score" value={classifiedText.sentiment["avg_bearish_score"]} />
          <Card title="Bullish Sentences" value={bullish} />
          <Card title="Neutral Sentences" value={neutral} />
          <Card title="Bearish Sentences" value={bearish} />
        </div>
        {/*-------------------------------------------------------------------*/}
        <div className="flex flex-col items-center gap-2 w-2/3 p-3 overflow-scroll no-scrollbar border border-l-2">
          {classifiedText.sentences.map((sentence: any, i: number) => (
            <div key={i} className="flex justify-center items-center">
              <p className="font-thin mr-2 text-sm">{i+1}</p>
              <SentenceCard sentence={sentence.sentence} label={sentence.result[0]["label"]} score={sentence.result[0]["score"]} index={i+1} />
            </div>
          ))}
        </div>
      </div>
  </>
  );
}
