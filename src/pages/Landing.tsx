// src/pages/Landing.tsx
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import ActionButton from "@/components/ActionButton";
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
        variant="h1"
        mb={1}
        width={{ xs: "100%", sm: "80%", md: "60%" }}
        padding={{ xs: "0 1rem", sm: "0 2rem", md: "0 3rem" }}
      >
        Prepare for your next interview
      </Typography>

      <Link
        to={isAuthenticated ? "/setup/interview" : "/login"}
        style={{
          textDecoration: "none",
          marginBottom: "2rem",
          marginTop: "2rem",
        }}
      >
        <ActionButton>Get Started</ActionButton>
      </Link>
      <Typography variant="body1" color="text.secondary" mt={4}>
        Your mirror doesn't ask follow-ups. We do.
      </Typography>
    </Box>
  );
};

export default Landing;
