import { useState } from "react";
import { Box, Typography, Paper, Button } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home"; // optional icon
import { useNavigate } from "react-router-dom";

// Sample transcript + tips data
const entries = [
  {
    name: "John Bergen",
    response:
      "Cloud computing engineer. I’ve worked in an active environment on scalablescalablescalablescalablescalablescalablescalablescalablescalablescalablescalablescalablescalablescalablescalablescalablescalablescalablescalablescalablescalablescalablescalablescalablescalablescalablescalablescalablescalablescalablescalablescalablescalablescalablescalablescalablescalablescalablescalablescalablescalablescalablescalablescalablescalablescalablescalablescalablescalablescalablescalablescalablescalablescalablescalablescalablescalablescalablescalablescalablescalablescalablescalablescalablescalablescalablescalablescalablescalablescalablescalablescalablescalablescalablescalablescalablescalablescalablescalablescalablescalablescalablescalablescalablescalablescalablescalablescalablescalablescalablescalablescalablescalablescalablescalablescalablescalablescalablescalablescalable infrastructures.",
    tip: "Good opening, though diving deeper might better distinguish the answer.",
  },
  {
    name: "Sarah Fanech",
    response:
      "I’m continuing after an internship at Shopify, launching two new features.",
    tip: "Achievements are great, but demonstrating impact could be emphasized more.",
  },
  {
    name: "Lola Bikowski",
    response:
      "I’m focusing on problem-solving. Recounting a project where a late feature change posed a challenge.",
    tip: "Well-told story, but the answer structure could be tightened.",
  },
];

const PaginatedAnalytics = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const entry = entries[page];

  return (
    <Box
      sx={{
        height: "calc(100vh - 81px)",
        backgroundColor: "#F8F9FF",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        p: 4,
      }}
    >
      <Box sx={{ alignSelf: "flex-start", mb: 2 }}>
        <Button
          onClick={() => navigate("/home")} // or "/" if that's your home route
          startIcon={<HomeIcon />}
          variant="outlined"
          color="primary"
        >
          Home
        </Button>
      </Box>
      <Typography variant="h4" fontWeight={600} color="#2C3E50" mb={4}>
        Analysis ({page + 1} of {entries.length})
      </Typography>

      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          gap: 4,
          overflow: "hidden",
        }}
      >
        <Paper
          sx={{
            flex: 1.6,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            borderRadius: 2,
            boxShadow: 3,
            p: 3,
            mb: 4,
            mx: 2,
          }}
        >
          <Typography variant="h6" fontWeight={500} color="#34495E" mb={2}>
            Transcript:
          </Typography>
          <Box
            sx={{ maxHeight: "calc(100vh - 250px)", overflowY: "auto", pr: 1 }}
          >
            <Typography
              variant="body1"
              color="#2C3E50"
              mb={3}
              sx={{ wordBreak: "break-word", whiteSpace: "pre-wrap" }}
            >
              <strong>{entry.name}:</strong> {entry.response}
            </Typography>
          </Box>
        </Paper>

        <Paper
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            borderRadius: 2,
            boxShadow: 3,
            p: 3,
            mb: 4,
            mx: 2,
          }}
        >
          <Typography variant="h6" fontWeight={500} color="#34495E" mb={1}>
            Feedback
          </Typography>
          <Typography variant="body1" color="#34495E">
            {entry.tip}
          </Typography>
        </Paper>
      </Box>

      <Box mt={4} display="flex" gap={2}>
        <Button
          variant="outlined"
          onClick={() => setPage((p) => Math.max(0, p - 1))}
          disabled={page === 0}
        >
          Previous
        </Button>
        <Button
          variant="contained"
          onClick={() => setPage((p) => Math.min(entries.length - 1, p + 1))}
          disabled={page === entries.length - 1}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default PaginatedAnalytics;
