import { useState } from "react";
import MicCameraTest from "@/components/interview/MicCameraTest";
import InterviewLogic from "@/components/interview/InterviewLogic";

export default function LiveInterview() {
  const [confirmed, setConfirmed] = useState(false);

  return (
    <>
      {confirmed ? (
        <InterviewLogic />
      ) : (
        <MicCameraTest onComplete={() => setConfirmed(true)} />
      )}
    </>
  );
}
