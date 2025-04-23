import { Box, keyframes } from "@mui/material";
import palette from "@/theme/Palette";

const rotate = keyframes`
  to {
    transform: rotate(0.5turn);
  }
`;
export default function Loader() {
  return (
    <Box
      sx={{
        height: "calc(100vh - 81px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(to right, #f8f9ff, #e4e9ff)",
      }}
    >
      <Box
        sx={{
          width: 75,
          aspectRatio: "1",
          borderRadius: "50%",
          border: "8px solid",
          borderColor: `${palette.deepBlue} transparent`,
          animation: `${rotate} 1s infinite linear`,
        }}
      />
    </Box>
  );
}
