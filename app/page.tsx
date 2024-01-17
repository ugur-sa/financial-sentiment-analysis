"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [url, setUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const checkUrl = (inputUrl: string) => {
    return inputUrl.includes("/news/") && !inputUrl.includes("/video/");
  };

  const handleInputChange = (e: any) => {
    const inputUrl = e.target.value;
    setUrl(inputUrl);
    if (inputUrl && !checkUrl(inputUrl)) {
      setErrorMessage("Dieser Link wird nicht akzeptiert. Bitte gib einen Link ein, der '/news/' enthält und nicht '/video/'.");
    } else {
      setErrorMessage("");
    }
  };

  const handleSubmit = () => {
    if (!errorMessage && url) {
      router.push(`/process/?url=${url}`);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center h-full">
        <div className="border border-gray-300 shadow-sm w-[500px] h-[350px] rounded-md p-12">
          <div>
            <p className="text-3xl font-bold">Link Input</p>
            <p className="text-md text-gray-600">Enter your Link below</p>
          </div>
          <div className="mt-20">
            <input 
              onChange={handleInputChange} 
              value={url}
              className="w-full border border-gray-400 rounded-md p-3" 
              type="text" 
              placeholder="Enter your link ..."
            />
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            <button 
              onClick={handleSubmit}
              className={`bg-black text-white p-2 w-full mt-2 rounded-lg text-center font-semibold ${errorMessage || !url ? "opacity-50 cursor-not-allowed" : ""}`}
              disabled={!!errorMessage || !url}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
