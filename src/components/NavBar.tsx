import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import logo from "@/assets/react.svg"; // Vite will import as URL string
import { Link } from "react-router-dom"; // use this, not next/link

export default function Navbar() {
  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        background: "linear-gradient(to right, #ffffff, #f7f8ff)",
        borderBottom: "1px solid #e0e0e0",
        color: "black",
        px: 2,
        py: 1,
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Logo and brand name */}
        <Box display="flex" alignItems="center" gap={1}>
          <Box
            component="img"
            src={logo}
            alt="Logo"
            sx={{ width: 32, height: 32 }}
          />
          <Typography variant="h6" fontWeight={500}>
            Brand Key
          </Typography>
        </Box>

        {/* Right side CTA */}
        <Link to="/setup/interview">
          <Button
            variant="contained"
            sx={{
              background: "linear-gradient(to right, #4B5EFF, #8A42FF)",
              color: "white",
              textTransform: "none",
              px: 2.5,
              py: 1,
              borderRadius: 2,
              fontWeight: 500,
              "&:hover": {
                background: "linear-gradient(to right, #3a4ae0, #7839df)",
              },
            }}
          >
            Get Started
          </Button>
        </Link>
      </Toolbar>
    </AppBar>
  );
}
