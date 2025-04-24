import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import palette from "@/theme/Palette";
import ActionButton from "@/components/ActionButton";

const NotFound = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: `linear-gradient(135deg, ${palette.deepBlue}, ${palette.gradientPurple})`,
        color: palette.pureWhite,
        px: 2,
        textAlign: "center",
      }}
    >
      <Typography variant="h2" fontWeight={700} mb={1}>
        404
      </Typography>
      <Typography variant="h5" fontWeight={500} mb={2}>
        Page Not Found
      </Typography>
      <Typography
        variant="body1"
        color={palette.softLightGray}
        mb={4}
        maxWidth="400px"
      >
        The page you're looking for doesn't exist or has been moved. Let's get
        you back on track.
      </Typography>
      <Link to="/" style={{ textDecoration: "none" }}>
        <Button
          sx={{
            backgroundColor: palette.accentBlue,
            color: "white",
            textTransform: "none",
            fontWeight: 600,
            px: 4,
            py: 1.5,
            borderRadius: 2,
            ":hover": {
              backgroundColor: "#2A55D3",
            },
          }}
        >
          Go Home
        </Button>
      </Link>
    </Box>
  );
};

export default NotFound;
