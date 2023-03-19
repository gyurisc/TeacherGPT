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

  async function generateSummary(event: any) {
    event.preventDefault();

    setResult("");
    setBusy(true);

    console.log('start call');

    const response = await fetch("/api/summarize", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: textInput }),
    });

    const data = await response.json();

    setResult(data.result);
    setBusy(false);
  }

  async function copyToClipboard() {
    navigator.clipboard.writeText(result);
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-5xl flex-col pt-8 sm:pt-12">
      <Head>
        <title>Meeting Summarizer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 mt-12 sm:mt-20">
        <a
          className="flex max-w-fit items-center justify-center space-x-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm text-gray-600 shadow-md transition-colors hover:bg-gray-100 mb-5"
          href="https://github.com/gyurisc/summarizer-tool"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Github />
          <p>Star on GitHub</p>
        </a>
        <h1 className="sm:text-6xl text-4xl max-w-[708px] font-bold text-slate-900">
          Generate your meeting summaries and todos using chatGPT
        </h1>
        <p className="text-slate-500 mt-5">Countless summaries generated so far.</p>
        <div className="max-w-xl w-full">
          <div className="flex mt-10 items-center space-x-3">
            <p className="text-left font-medium">Copy the meeting transcript that needs to be summarize</p>
          </div>
          <textarea
            className="w-full rounded-md border border-gray-300 shadow-sm p-4 focus:border-black focus:ring-black my-5"

            placeholder="Paste your meeting or text that you want to summarize"
            rows={4}
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
          />
        </div>
        {!busy && (
          <button
            className="bg-black text-white px-6 py-3 rounded-md mt-5 hover:bg-gray-900 transition-colors"
            onClick={(e) => generateSummary(e)}
          >
            Generate Summary
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