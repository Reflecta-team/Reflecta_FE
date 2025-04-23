// src/components/PrimaryButton.tsx
import { Button, ButtonProps } from "@mui/material";
import palette from "@/theme/Palette";

interface ActionButtonProps extends ButtonProps {
  fontSize?: string | number;
  onSubmit?: () => void;
}

export default function ActionButton({
  fontSize = "1rem",
  ...props
}: ActionButtonProps) {
  return (
    <Button
      variant="contained"
      fullWidth
      disableElevation
      sx={{
        background: `linear-gradient(to right, ${palette.deepBlue}, ${palette.gradientPurple})`,
        color: "white",
        textTransform: "none",
        fontWeight: 600,
        px: 3,
        py: 1.5,
        borderRadius: 2,
        fontSize,
        boxShadow: "0 4px 14px rgba(0,0,0,0.1)",
        transition: "all 0.2s ease-in-out",
        ":hover": {
          opacity: 0.95,
          transform: "scale(1.03)",
        },
      }}
      {...props}
    />
  );
}
