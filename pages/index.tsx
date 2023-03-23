import Head from "next/head";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Github from "@/components/GitHub";
import { NextPage } from "next";
import { useState, useRef } from "react";
import LoadingDots from "../components/LoadingDots";
import { ClipboardIcon } from '@heroicons/react/24/outline'

import { text } from "stream/consumers";
import FormattedText from "@/components/FormattedText";

const Home: NextPage = () => {

  const [textInput, setTextInput] = useState("");
  const [result, setResult] = useState("");

  const [busy, setBusy] = useState(false);

  const prompt = `I want you to act as an English translator, spelling corrector, and improver. I will speak to you in my basic English and you will provide recommendations on how to improve my English and fix any grammar errors in my text. Also, provide me a list of recommendations that would make my text to be the same as a native speaker. No need to rewrite my text such give me a list of improvements and fixes. My text is ${textInput}`;

  async function generateImprovedText(event: any) {
    event.preventDefault();

    setResult("");
    setBusy(true);

    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      console.log('error', response.statusText);
      throw new Error(response.statusText);
    }

    // data is ReadableStream
    const data = response.body;
    if (!data) {
      return
    };

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;

    console.log('received stream')
    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      setResult((prev) => prev + chunkValue);
    }

    setBusy(false);

  }

  async function copyToClipboard() {
    navigator.clipboard.writeText(result);
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-5xl flex-col pt-8 sm:pt-12">
      <Head>
        <title>Improve your English</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="flex flex-1 w-full flex-col items-center text-center px-4 mt-12 sm:mt-12">
        <a
          className="flex max-w-fit items-center justify-center space-x-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm text-gray-600 shadow-md transition-colors hover:bg-gray-100 mb-5"
          href="https://github.com/gyurisc/TeacherGPT"
          target="_blank"
          rel="noopener noreferrer"
        >

          <p>Star on GitHub</p>
        </a>
        <h1 className="sm:text-6xl text-4xl max-w-[708px] font-bold text-slate-900">
          Improve your English using chatGPT
        </h1>
        <p className="text-slate-500 mt-5">We helped 34,567 students so far.</p>
        <div className="max-w-xl w-full">
          <div className="flex mt-10 items-center space-x-3">
            <Image
              src="/1-black.png"
              width={30}
              height={30}
              alt="1 icon"
              className="mb-5 sm:mb-0"
            />
            <p className="text-left font-medium">Copy your text that needs to be improved.</p>
          </div>
          <textarea
            className="w-full rounded-md border border-gray-300 shadow-sm p-4 focus:border-black focus:ring-black my-5"
            placeholder="Paste your text that you want to improve"
            rows={4}
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
          />
        </div>
        {!busy && (
          <button
            className="bg-black text-white px-6 py-3 rounded-md mt-5 hover:bg-gray-900 transition-colors"
            onClick={(e) => generateImprovedText(e)}
          >
            Improve My Text
          </button>
        )}
        {busy && (
          <button
            className="bg-black text-white px-6 py-3 rounded-md mt-5 hover:bg-gray-900 transition-colors"
            disabled
          >
            <LoadingDots color="white" style="large" />
          </button>
        )}
        <hr className="w-full my-10" />
        <div className="max-w-xl w-full">
          {result && (
            <>
              <p className="text-left">
                <FormattedText text={result} />

              </p>
              <button
                type="button"
                className="text-gray-400 hover:text-gray-500"
                onClick={() => copyToClipboard()}>
                <ClipboardIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                <span className="sr-only">Copy to Clipboard</span>
              </button>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Home;