import { redirect } from 'next/navigation'

// Showcase URL — send visitors straight to the MindMarker tool.
export default function HomePage() {
  redirect('/dashboard')
}
