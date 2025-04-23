import React, { useState } from "react";
import { Box, Typography, TextField, Button, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { createInterviewSession } from "@/services/session";
import { useInterview } from "@/stores/interviewStore";
import palette from "@/theme/Palette";
import ActionButton from "@/components/ActionButton";

export default function JobForm() {
  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [description, setDescription] = useState("");
  const [resume, setResume] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!resume) {
      setError("Please upload your resume.");
      return;
    }

    try {
      const job = { title: jobTitle, company, description };
      const session = await createInterviewSession(job, resume);
      useInterview.getState().setJobInfo(job);
      navigate(`/interview?session=${session.session_id}`);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <Box
      sx={{
        background: "linear-gradient(to right, #f8f9ff, #e4e9ff)",
        minHeight: "calc(100vh - 81px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          maxWidth: 600,
          width: "100%",
          borderRadius: 3,
        }}
      >
        <Typography variant="h5" fontWeight={600} mb={2}>
          Set up your mock interview
        </Typography>

        <TextField
          fullWidth
          label="Job Title"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          multiline
          minRows={4}
          label="Job Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          sx={{ mb: 2 }}
        />

        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" fontWeight={500} mb={1}>
            Upload Resume
          </Typography>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) setResume(file);
            }}
          />
        </Box>

        {error && (
          <Typography color="error" mb={2}>
            {error}
          </Typography>
        )}
        <ActionButton onClick={handleSubmit}>Start Interview</ActionButton>
      </Paper>
    </Box>
  );
}
