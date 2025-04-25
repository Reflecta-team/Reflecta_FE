import { useState, useRef, useEffect } from "react";
import { Box, IconButton, Typography, Avatar, Button } from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import CallEndIcon from "@mui/icons-material/CallEnd";
import { useMicVAD } from "@ricky0123/vad-react";

interface InterviewScreenProps {
  vad: any;
  videoRef: React.RefObject<HTMLVideoElement | null>;
  toggleAudio: () => void;
  toggleVideo: () => void;
  audioEnabled: boolean;
  videoEnabled: boolean;
  endCall: () => void;
}

const InterviewScreen: React.FC<InterviewScreenProps> = ({
  vad,
  videoRef,
  toggleAudio,
  toggleVideo,
  audioEnabled,
  videoEnabled,
  endCall,
}) => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [sideBySide, setSideBySide] = useState(false);
  const userProfileImage = "https://i.pravatar.cc/150?img=32";

  return (
    <Box
      sx={{
        height: "100vh",
        background: "black",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: "100%",
          maxWidth: 1200,
          mx: "auto",
          my: 2,
          display: "flex",
          alignItems: sideBySide ? "center" : "normal",
          flexDirection: sideBySide ? "row" : "column",
          gap: 2,
          flexGrow: 1,
        }}
      >
        {/* Remote (Interviewer) video */}
        <Box
          sx={{
            flex: 1,
            height: sideBySide ? 500 : "100%",
            borderRadius: 2,
            overflow: "hidden",
            backgroundColor: "#1e1e2f",
            position: "relative",
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "100%",
              borderRadius: 2,
              p: 2,
              border: `2px solid ${vad.userSpeaking ? "#4B5EFF" : "#555"}`,
              backgroundImage: `url("https://i.pravatar.cc/600?img=12")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        </Box>

        {/* Local (You) video */}
        <Box
          sx={{
            position: sideBySide ? "relative" : "absolute",
            bottom: sideBySide ? 0 : 20,
            right: sideBySide ? 0 : 20,
            width: sideBySide ? "50%" : 150,
            height: sideBySide ? 500 : 120,
            borderRadius: 2,
            overflow: "hidden",
            border: `2px solid ${vad.userSpeaking ? "#4B5EFF" : "#555"}`,
            backgroundColor: "#1e1e2f",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "grab",
            zIndex: 10,
            transition: "top 0.3s ease, left 0.3s ease",
          }}
        >
          {videoEnabled ? (
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                opacity: videoEnabled ? 1 : 0,
                transition: "opacity 0.3s ease-in-out",
              }}
            />
          ) : (
            <Avatar src={userProfileImage} sx={{ width: 64, height: 64 }} />
          )}
        </Box>
      </Box>

      {/* Fixed Bottom Bar */}
      <Box
        sx={{
          position: "sticky",
          bottom: 0,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          gap: 2,
          py: 2,
          background: "#fff",
        }}
      >
        <IconButton onClick={toggleAudio} color="primary">
          {audioEnabled ? <MicIcon /> : <MicOffIcon />}
        </IconButton>
        <IconButton onClick={toggleVideo} color="primary">
          {videoEnabled ? <VideocamIcon /> : <VideocamOffIcon />}
        </IconButton>
        <Button
          variant="outlined"
          startIcon={<SwapHorizIcon />}
          onClick={() => setSideBySide((prev) => !prev)}
          sx={{ color: "black", borderColor: "#666" }}
        >
          Toggle View
        </Button>
        <IconButton onClick={endCall} color="error">
          <CallEndIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default InterviewScreen;
