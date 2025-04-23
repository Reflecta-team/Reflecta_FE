import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import logo from "@/assets/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/stores/authStore";
import ActionButton from "@/components/ActionButton";

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <AppBar
      position="static"
      elevation={0}
      color="transparent"
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
            sx={{ width: 96, height: 64, cursor: "pointer" }}
            onClick={() => {
              isAuthenticated ? navigate("/") : navigate("/landing");
            }}
          />
        </Box>

        {/* Right side CTA */}
        <Box>
          {isAuthenticated ? (
            <Link to="/setup/interview">
              <ActionButton>Logout</ActionButton>
            </Link>
          ) : (
            <Link to="/setup/interview">
              <ActionButton>Login</ActionButton>
            </Link>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
