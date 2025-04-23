import React, { useState } from "react";
import { useRouter } from "next/router";

import { createInterviewSession } from "@/services/session";
import { useInterview } from "@/stores/interviewStore";

type JobFormData = {
  job: {
    title: string;
    company: string;
    description: string;
  };
  resume: File;
};

const Interview = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: JobFormData) => {
    try {
      const session = await createInterviewSession(data.job, data.resume);
      useInterview.getState().setJobInfo(data.job);
      router.push(`/interview?session=${session.session_id}`);
    } catch (err) {
      console.error(err);
      setError("Session creation failed");
    }
  };

  return (
    <div>
      <h1>Interview Setup</h1>
      {/* your form component here should call onSubmit(data) */}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Interview;
