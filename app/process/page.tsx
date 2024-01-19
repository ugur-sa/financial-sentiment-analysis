import React from 'react';
import { SentimentPage } from '@/components/component/sentiment-page';
import { ClassifiedText } from '@/types/types';

type searchParams = {
    searchParams: {
        url: string;
    }
}

export default async function ProcessPage({searchParams}: searchParams) {

    const url = searchParams.url;

    const dockerURL = "http://flask-app:5000/process-url";
    const localURL = "http://127.0.0.1:5000/process-url";

    const response = await fetch(dockerURL, {
        method: "POST",
        body: JSON.stringify({ url: url }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data: ClassifiedText = await response.json();
    
      if(!data) { return <div>Loading...</div> }

    return (
        <SentimentPage classifiedText={data} />
    );
};