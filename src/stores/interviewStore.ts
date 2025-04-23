import { create } from 'zustand'

interface InterviewState {
  transcript: string[]
  jobInfo: {
    company: string
    title: string
    description: string
  } | null
  addLine: (line: string) => void
  setJobInfo: (info: InterviewState['jobInfo']) => void
}

export const useInterview = create<InterviewState>((set) => ({
  transcript: [],
  jobInfo: null,
  addLine: (line) => set((s) => ({ transcript: [...s.transcript, line] })),
  setJobInfo: (info) => set({ jobInfo: info }),
}))
