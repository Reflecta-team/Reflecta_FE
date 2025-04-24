import { useEffect, useRef, useState } from "react";
import { Box, Button, Typography, IconButton } from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";

const InterviewScreen = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Get user media on load
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStream(stream);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setupVAD(stream);
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
    setAudioEnabled(enabled);
  };

  const toggleVideo = () => {
    if (!stream) return;
    const enabled = !videoEnabled;
    stream.getVideoTracks().forEach((track) => (track.enabled = enabled));
    setVideoEnabled(enabled);
  };

  // Voice Activity Detection using Web Audio API
  const setupVAD = (stream: MediaStream) => {
    const audioCtx = new AudioContext();
    const source = audioCtx.createMediaStreamSource(stream);
    const analyser = audioCtx.createAnalyser();
    const data = new Uint8Array(analyser.fftSize);
    analyser.fftSize = 256;

    source.connect(analyser);

    const checkVolume = () => {
      analyser.getByteTimeDomainData(data);
      const rms =
        Math.sqrt(
          data.reduce((sum, val) => sum + (val - 128) ** 2, 0) / data.length
        ) / 128;

      setIsSpeaking(rms > 0.05); // threshold

      requestAnimationFrame(checkVolume);
    };

    checkVolume();
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
            border: `3px solid ${isSpeaking ? "#4B5EFF" : "#555"}`,
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

        {/* Remote Video */}
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

      {/* Controls */}
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
