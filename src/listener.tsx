import { useEffect, useState } from "react";
import useSpeechToText from "react-hook-speech-to-text";

const hotword = "yeah";

export default function AnyComponent() {
  const {
    error,
    interimResult,
    isRecording,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  useEffect(() => {
    console.log(interimResult);
    if (interimResult?.toLowerCase().split(" ").pop() === hotword) {
      console.log("HOLY SHIT CHAT");
      fetch("http://184.162.198.193:3000/yeah");
    }
  }, [interimResult]);

  useEffect(() => {
    if (!isRecording) {
      startSpeechToText();
    }
  }, [isRecording]);

  if (error) return <p>Web Speech API is not available in this browser 🤷‍</p>;

  return (
    <div>
      <h1>Recording: {isRecording.toString()}</h1>
      <button onClick={isRecording ? stopSpeechToText : startSpeechToText}>
        {isRecording ? "Stop Recording" : "Start Recording"}
      </button>
    </div>
  );
}
