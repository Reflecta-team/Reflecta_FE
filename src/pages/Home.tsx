import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import palette from "@/theme/Palette";

const Home = () => {
  return (
    <Box
      sx={{
        height: "100vh",
        background: "linear-gradient(to right, #f8f9ff, #e4e9ff)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        px: 3,
      }}
    >
      <Typography variant="h2" fontWeight={600} color={palette.deepBlue} mb={2}>
        Brand Key
      </Typography>

      <Typography variant="h5" fontWeight={400} color="text.secondary" mb={4}>
        Realistic mock interviews to help you grow.
      </Typography>

      <Link to="/setup/interview" style={{ textDecoration: "none" }}>
        <Button
          variant="contained"
          sx={{
            background: `linear-gradient(to right, ${palette.deepBlue}, ${palette.gradientPurple})`,
            color: "white",
            textTransform: "none",
            fontWeight: 600,
            px: 4,
            py: 1.5,
            borderRadius: 2,
            fontSize: "1rem",
            boxShadow: "0 4px 14px rgba(0,0,0,0.1)",
            ":hover": { opacity: 0.95 },
          }}
        >
          Start Interview
        </Button>
      </Link>
    </Box>
  );
};

export default Home;
