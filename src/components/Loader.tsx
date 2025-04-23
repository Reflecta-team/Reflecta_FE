import { Box, keyframes } from "@mui/material";

const pulseAnim = keyframes`
  20% { background-position: 0% 0%, 50% 50%, 100% 50%; }
  40% { background-position: 0% 100%, 50% 0%, 100% 50%; }
  60% { background-position: 0% 50%, 50% 100%, 100% 0%; }
  80% { background-position: 0% 50%, 50% 50%, 100% 100%; }
`;

export default function Loader() {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(to right, #f8f9ff, #e4e9ff)",
      }}
    >
      <Box
        sx={{
          width: "60px",
          aspectRatio: "2",
          "--_g":
            "no-repeat radial-gradient(circle closest-side, #000 90%, #0000)",
          background: `
            var(--_g) 0% 50%,
            var(--_g) 50% 50%,
            var(--_g) 100% 50%
          `,
          backgroundSize: "calc(100%/3) 50%",
          animation: `${pulseAnim} 1s infinite linear`,
        }}
      />
    </Box>
  );
}
