import React from "react";
import { SentimentPage } from "@/components/component/sentiment-page";
import { ClassifiedText } from "@/types/types";

type searchParams = {
  searchParams: {
    url: string;
  };
};

export default async function ProcessPage({ searchParams }: searchParams) {
  const url = searchParams.url;

  const AWS_URL = process.env.AWS_URL;

  const awsURL = AWS_URL + "?url=" + url;

  // const dockerURL = "http://flask-app:5000/process-url";
  // const localURL = "http://127.0.0.1:5000/process-url";

  const response = await fetch(awsURL, {
    method: "GET",
    headers: {
      "Content-Type": "text/plain",
    },
  });

  const data: ClassifiedText = await response.json();

  if (!response.ok) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-4xl font-bold text-red-500">{response.statusText}</p>
      </div>
    );
  }

  return <SentimentPage classifiedText={data} />;
}
