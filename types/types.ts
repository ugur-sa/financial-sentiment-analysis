export type ClassifiedText = {
    sentences: [
        sentence: string,
        result: {
            label: string,
            score: number
        }
    ],
    sentiment: {
        overall_sentiment: string,
        avg_bullish_score: number,
        avg_neutral_score: number,
        avg_bearish_score: number
    }
}