"use client";
import Link from "next/link";
import { useState } from "react";

export default function Home() {

  const [url, setUrl] = useState("");

  return(
    <>
      <div className="flex justify-center items-center h-full">
        <div className="border border-gray-300 shadow-sm w-[500px] h-[350px] rounded-md p-12">
          <div className="">
            <p className="text-3xl font-bold">Link Input</p>
            <p className="text-md text-gray-600">Enter your Link below</p>
          </div>
          <div className="mt-20">
            <input onChange={(e) => {
              setUrl(e.target.value);
            }} className="w-full border border-gray-400 rounded-md p-3" type="text" placeholder="Enter your link ..."/>
            <Link href={{
              pathname: '/process',
              query: {url: url} // the data
            }} className="bg-black text-white p-2 w-full mt-2 rounded-lg text-center font-semibold" type="submit">Submit</Link>
          </div>
        </div>
      </div>
    </>
  );
}
