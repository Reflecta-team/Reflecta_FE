import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import InterviewScreen from "./InterviewScreen";
import { useMicVAD } from "@ricky0123/vad-react";

const InterviewLogic = () => {
  const navigate = useNavigate();

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [stream, setStream] = useState<MediaStream | null>(null);

  // Commented out until backend is ready
  // const wsRef = useRef<WebSocket | null>(null);
  // const recorderRef = useRef<MediaRecorder | null>(null);

  const vad = useMicVAD({
    startOnLoad: true,
    onSpeechStart: async () => {
      console.log("Speech detected");

      // Commented out full stream logic until backend is ready
      // const micStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      // const ws = new WebSocket("wss://your-api.com/ws/audio");
      // wsRef.current = ws;

      // const recorder = new MediaRecorder(micStream, { mimeType: "audio/webm" });
      // recorder.ondataavailable = (e) => {
      //   if (ws.readyState === WebSocket.OPEN) {
      //     e.data.arrayBuffer().then((buf) => ws.send(buf));
      //   }
      // };
      // recorder.start(250);
      // recorderRef.current = recorder;
      // setStream(micStream);

      // ws.onmessage = (e) => {
      //   const msg = JSON.parse(e.data);
      //   if (msg.type === "end") {
      //     recorder.stop();
      //     ws.close();
      //     micStream.getAudioTracks().forEach(track => track.enabled = false);
      //     vad.pause?.();
      //   }
      // };
    },
  });

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((camStream) => {
        setStream(camStream);
        if (videoRef.current) {
          videoRef.current.srcObject = camStream;
        }
      })
      .catch((err) => {
        console.error("Media access error:", err);
      });

    return () => {
      if (videoRef.current?.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach((track) => track.stop());
        videoRef.current.srcObject = null;
      }
    };
  }, []);

  const endCall = () => {
    const stream = videoRef.current?.srcObject as MediaStream;
    stream?.getTracks().forEach((track) => track.stop());
    videoRef.current!.srcObject = null;

    console.log("Call ended");
    navigate("/summary"); // or open a modal
  };

  const toggleAudio = () => {
    if (!stream) return;

    const enabled = !audioEnabled;
    stream.getAudioTracks().forEach((track) => (track.enabled = enabled));

    if (enabled) {
      vad.start?.();
      console.log("Mic unmuted");
    } else {
      vad.pause?.();
      console.log("Mic muted");
    }

    setAudioEnabled(enabled);
  };

  const toggleVideo = () => {
    const tracks = (
      videoRef.current?.srcObject as MediaStream
    )?.getVideoTracks();
    const enabled = !videoEnabled;
    tracks?.forEach((track) => (track.enabled = enabled));
    setVideoEnabled(enabled);
  };

  return (
    <InterviewScreen
      vad={vad}
      videoRef={videoRef}
      toggleAudio={toggleAudio}
      toggleVideo={toggleVideo}
      endCall={endCall}
      audioEnabled={audioEnabled}
      videoEnabled={videoEnabled}
    />
  );
};

export default InterviewLogic;
