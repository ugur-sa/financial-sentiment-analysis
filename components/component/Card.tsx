import React from 'react';

interface Props {
    title: string;
    value: string | number;
}

const Card: React.FC<Props> = (props) => {
    
    const textColor = () => {
        if(typeof props.value === "string") {
            if(props.value === "Bullish") {
                return "text-green-500";
            } else if(props.value === "Slightly Bullish") {
                return "text-green-300";
            } else if(props.value === "Neutral") {
                return "text-gray-500";
            } else if(props.value === "Slightly Bearish") {
                return "text-red-300";
            }
            return "text-red-500";
        }
    }

    return (
        <div className="w-60 h-40 border border-gray-300 shadow-md p-2 rounded-md flex flex-col">
            <p className="font-semibold text-xl text-center">{props.title}</p>
            <div className='w-full h-full flex justify-center items-center'>
                <p className={`text-center ${textColor()} ${typeof props.value === "string" ? "text-4xl font-bold" : "text-3xl font-medium"}`}>{typeof props.value === "number" && props.value % 1 != 0 ? props.value.toFixed(3) : props.value}</p>
             </div>
        </div>
    );
};

export default Card;
