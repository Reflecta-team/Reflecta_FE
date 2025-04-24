import { useState, useRef } from 'react'

export function useMicTest() {
  const [audioURL, setAudioURL] = useState<string | null>(null)
  const [isRecording, setIsRecording] = useState(false)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const chunks = useRef<Blob[]>([])

  const startRecording = async () => {
    setIsRecording(true)
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    mediaRecorderRef.current = new MediaRecorder(stream)
    chunks.current = []

    mediaRecorderRef.current.ondataavailable = (e) => chunks.current.push(e.data)
    mediaRecorderRef.current.onstop = () => {
      const blob = new Blob(chunks.current, { type: 'audio/webm' })
      setAudioURL(URL.createObjectURL(blob))
      setIsRecording(false)
    }

    mediaRecorderRef.current.start()
    setTimeout(() => mediaRecorderRef.current?.stop(), 3000)
  }

  return { audioURL, startRecording, reset: () => setAudioURL(null), isRecording }
}
