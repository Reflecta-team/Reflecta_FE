import { useEffect, useRef, useState } from "react";
import { Box, Button, Typography, IconButton } from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import MicCameraTest from "@/pages/interview/MicCameraTest";

export default function LiveInterview() {
  const [confirmed, setConfirmed] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [videoEnabled, setVideoEnabled] = useState(true);

  const handleTestSystem = async () => {
    const userStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    setStream(userStream);
    if (videoRef.current) {
      videoRef.current.srcObject = userStream;
    }
  };

  const toggleAudio = () => {
    if (!stream) return;
    stream
      .getAudioTracks()
      .forEach((track) => (track.enabled = !track.enabled));
    setAudioEnabled(!audioEnabled);
  };

  const toggleVideo = () => {
    if (!stream) return;
    stream
      .getVideoTracks()
      .forEach((track) => (track.enabled = !track.enabled));
    setVideoEnabled(!videoEnabled);
  };

  useEffect(() => {
    return () => {
      stream?.getTracks().forEach((track) => track.stop());
    };
  }, [stream]);

  return (
    <>
      {confirmed ? (
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
          <Typography variant="h4" mb={2} fontWeight={600}>
            Live Mock Interview
          </Typography>

          {/* Main video grid */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 2,
              width: "100%",
              maxWidth: 1200,
            }}
          >
            {/* Local (You) */}
            <Box
              sx={{
                position: "relative",
                flex: 1,
                maxWidth: 300,
                borderRadius: 2,
                overflow: "hidden",
                border: "2px solid #4B5EFF",
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

            {/* Remote (Interviewer) */}
            <Box
              sx={{
                flex: 2,
                borderRadius: 2,
                overflow: "hidden",
                background: "#1e1e2f",
                position: "relative",
              }}
            >
              {/* placeholder for remote stream */}
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

            {/* Transcript could go here as an optional sidebar */}
          </Box>

          {/* Controls */}
          <Box sx={{ display: "flex", gap: 2, mt: 4 }}>
            <Button variant="outlined" onClick={handleTestSystem}>
              Test Camera & Mic
            </Button>
            <IconButton onClick={toggleAudio} color="primary">
              {audioEnabled ? <MicIcon /> : <MicOffIcon />}
            </IconButton>
            <IconButton onClick={toggleVideo} color="primary">
              {videoEnabled ? <VideocamIcon /> : <VideocamOffIcon />}
            </IconButton>
          </Box>
        </Box>
      ) : (
        <MicCameraTest onComplete={() => setConfirmed(true)} />
      )}
    </>
  );
}
