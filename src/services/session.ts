import { JobInfo, SessionResponse } from "../types/types"

export async function createInterviewSession(
    job: JobInfo,
    resume: File,
  ): Promise<SessionResponse> {
    const formData = new FormData()
    formData.append('job', JSON.stringify(job))
    formData.append('resume', resume)
  
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/sessions`, {
      method: 'POST',
      body: formData,
      credentials: 'include', // send cookies if auth uses HttpOnly JWT
    })
  
    if (!res.ok) throw new Error('Session creation failed')
    return await res.json()
  }