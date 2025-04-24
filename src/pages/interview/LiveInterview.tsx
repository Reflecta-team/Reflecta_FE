import { useState } from "react";
import MicCameraTest from "@/components/interview/MicCameraTest";
import InterviewScreen from "@/components/interview/InterviewScreen";

export default function LiveInterview() {
  const [confirmed, setConfirmed] = useState(false);

  return (
    <>
      {confirmed ? (
        <InterviewScreen />
      ) : (
        <MicCameraTest onComplete={() => setConfirmed(true)} />
      )}
    </>
  );
}
