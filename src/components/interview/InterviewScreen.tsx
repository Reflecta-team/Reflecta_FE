import { useEffect, useRef, useState } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import { useMicVAD } from "@ricky0123/vad-react";

const InterviewScreen = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [videoEnabled, setVideoEnabled] = useState(true);

  // const vad = useMicVAD({
  //   startOnLoad: true,
  //   onSpeechStart: () => console.log("Started talking..."),
  //   onSpeechEnd: () => console.log("Stopped talking."),
  // });

  const vad = useMicVAD({
    baseAssetPath: "/",
    onnxWASMBasePath: "/",
    onSpeechStart: () => console.log("Speech started!"),
    onSpeechEnd: async (audio) => {
      console.log("Speech ended! Got", audio.length, "samples");
      // const wavBlob = float32ArrayToWavBlob(audio);
      // await sendToAssemblyAI(wavBlob);
    },
  });
  vad.start();

  // Start cam/mic and attach to video tag
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStream(stream);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((err) => {
        console.error("Media access error:", err);
      });

    return () => {
      stream?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  const toggleAudio = () => {
    if (!stream) return;
    const enabled = !audioEnabled;
    stream.getAudioTracks().forEach((track) => (track.enabled = enabled));
    vad?.[enabled ? "start" : "pause"](); // sync VAD
    setAudioEnabled(enabled);
  };

  const toggleVideo = () => {
    if (!stream) return;
    const enabled = !videoEnabled;
    stream.getVideoTracks().forEach((track) => (track.enabled = enabled));
    setVideoEnabled(enabled);
  };

  return (
    <Box
      sx={{
        height: "100vh",
        background: "black",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        p: 3,
      }}
    >
      <Typography variant="h4" mb={2} fontWeight={600} color="white">
        Live Mock Interview
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 2,
          width: "100%",
          maxWidth: 1200,
        }}
      >
        {/* Local Video */}
        <Box
          sx={{
            position: "relative",
            flex: 1,
            maxWidth: 300,
            borderRadius: 2,
            overflow: "hidden",
            border: `3px solid ${vad.userSpeaking ? "#4B5EFF" : "#555"}`,
            transition: "border-color 0.3s ease",
          }}
        >
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </Box>

        {/* Remote Video (placeholder) */}
        <Box
          sx={{
            flex: 2,
            borderRadius: 2,
            overflow: "hidden",
            background: "#1e1e2f",
            position: "relative",
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "100%",
              backgroundImage: `url("https://i.pravatar.cc/600?img=12")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        </Box>
      </Box>

      {/* Mic/Camera Toggles */}
      <Box sx={{ display: "flex", gap: 2, mt: 4 }}>
        <IconButton onClick={toggleAudio} color="primary">
          {audioEnabled ? <MicIcon /> : <MicOffIcon />}
        </IconButton>
        <IconButton onClick={toggleVideo} color="primary">
          {videoEnabled ? <VideocamIcon /> : <VideocamOffIcon />}
        </IconButton>
      </Box>
    </Box>
  );
};

export default InterviewScreen;
