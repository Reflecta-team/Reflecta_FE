import { Box, Typography, Button, Paper } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { useEffect, useRef, useState } from "react";
import { useMicTest } from "@/utils/micTest";

interface Props {
  onComplete: () => void;
}

export default function MicCameraTest({ onComplete }: Props) {
  const [videoReady, setVideoReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const { audioURL, startRecording, reset, isRecording } = useMicTest();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setVideoReady(true);
        }
      })
      .catch((err) => {
        console.error("Camera access denied:", err);
        setVideoReady(false);
        alert("Please allow camera access to proceed.");
      });

    return () => {
      const tracks = videoRef.current?.srcObject as MediaStream;
      tracks?.getTracks().forEach((t) => t.stop());
    };
  }, []);

  return (
    <Box
      sx={{
        height: "calc(100vh - 81px)",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(to right, #f8f9ff, #e4e9ff)",
      }}
    >
      <Paper
        elevation={5}
        sx={{
          p: 4,
          maxWidth: 500,
          width: "90%",
          display: "flex",
          flexDirection: "column",
          gap: 3,
          alignItems: "center",
          textAlign: "center",
          borderRadius: 3,
        }}
      >
        <Typography variant="h5" fontWeight={600}>
          Test Your System
        </Typography>

        {/* Camera Preview */}
        <Box
          sx={{
            borderRadius: 2,
            overflow: "hidden",
            border: "2px solid #ccc",
            height: "300px",
          }}
        >
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            style={{ width: "100%", height: "300px" }}
          />
        </Box>

        {/* Mic Test */}
        {!audioURL ? (
          <Box>
            <Button
              variant="contained"
              onClick={startRecording}
              disabled={isRecording}
              sx={{
                minWidth: 180,
                px: 3,
                py: 1.25,
                textTransform: "none",
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 1.5,
              }}
            >
              {isRecording ? (
                <>
                  Recording...
                  <CircularProgress size={20} color="error" />
                </>
              ) : (
                "Say something"
              )}
            </Button>
          </Box>
        ) : (
          <>
            <audio controls src={audioURL} />
            <Box mt={2}>
              <Button onClick={reset}>Try Again</Button>
              <Button
                onClick={onComplete}
                variant="contained"
                sx={{ ml: 2 }}
                color="primary"
              >
                Continue to Interview
              </Button>
            </Box>
          </>
        )}
      </Paper>
    </Box>
  );
}
