// src/pages/Landing.tsx
import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import palette from "@/theme/Palette";

const Landing = () => {
  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 81px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        px: 2,
        background: "linear-gradient(to right, #f8f9ff, #e4e9ff)",
      }}
    >
      <Typography variant="h2" fontWeight={500} mb={1}>
        Prepare for your next interview
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={4}>
        Practice your interview skills with realistic mock interviews.
      </Typography>
      <Typography variant="h3" fontWeight={700} mb={1}>
        Your mirror doesn’t ask follow-ups. We do.
      </Typography>
      <Link to="/setup/interview" style={{ textDecoration: "none" }}>
        <Button
          sx={{
            background: `linear-gradient(to right, ${palette.deepBlue}, ${palette.gradientPurple})`,
            color: "white",
            px: 4,
            py: 1.5,
            borderRadius: 2,
            ":hover": { opacity: 0.9 },
            textTransform: "none",
            fontWeight: 600,
            fontSize: "1rem",
          }}
        >
          Start Mock Interview
        </Button>
      </Link>
    </Box>
  );
};

export default Landing;
