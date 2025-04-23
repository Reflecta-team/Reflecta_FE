// src/pages/Landing.tsx
import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import palette from "@/theme/Palette";
import { useAuth } from "@/stores/authStore";

const Landing = () => {
  const { isAuthenticated } = useAuth();
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
      <Typography
        sx={{
          fontSize: "5rem",
          width: "90%",
          padding: "0 1rem",
        }}
        variant="h1"
        fontWeight={500}
        mb={1}
      >
        Your next interview
      </Typography>

      <Typography
        variant="body1"
        color="text.secondary"
        mb={4}
        fontSize={"1.75rem"}
      >
        Your mirror doesn't ask follow-ups. We do.
      </Typography>
      <Link
        to={isAuthenticated ? "/setup/interview" : "/login"}
        style={{ textDecoration: "none", marginBottom: "1rem" }}
      >
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
            fontSize: "1.25rem",
          }}
        >
          Get Started
        </Button>
      </Link>
    </Box>
  );
};

export default Landing;
