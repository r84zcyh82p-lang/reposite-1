interface MessageProps {
  success: string | null
  error: string | null
}

export default function Message({ success, error }: MessageProps) {
  return (
    <>
      {success && <p className="text-green-600 text-center font-semibold">{success}</p>}
      {error && <p className="text-red-600 text-center font-semibold">{error}</p>}
    </>
  )
}
