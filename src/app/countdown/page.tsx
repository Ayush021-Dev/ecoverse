import HackathonCountdown from './HackathonCountdown'

export default function CountdownPage() {
  const reviews = [
    {
      name: "Review 1",
      time: "2026-01-05T13:00:00",
      description: "Initial progress check"
    },
    {
      name: "Review 2",
      time: "2026-01-05T21:00:00",
      description: "Mid-hackathon review"
    }
  ]

  return (
    <HackathonCountdown 
      hackathonStartTime="2026-01-05T10:00:00" // 10 AM start
      reviews={reviews}
      finalSubmissionTime="2026-01-06T10:00:00" // Final deadline
      eventName="Ecoverse 2026"
    />
  )
}