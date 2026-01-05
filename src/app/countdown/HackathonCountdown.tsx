'use client'

import { useState, useEffect } from 'react'

interface Review {
  name: string
  time: string
  description: string
}

interface HackathonCountdownProps {
  hackathonStartTime: string
  reviews: Review[]
  finalSubmissionTime: string
  eventName?: string
}

export default function HackathonCountdown({ 
  hackathonStartTime,
  reviews, 
  finalSubmissionTime, 
  eventName = "Hackathon" 
}: HackathonCountdownProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false
  })
  const [currentMilestone, setCurrentMilestone] = useState<string>('')
  const [burningProgress, setBurningProgress] = useState(0)

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date()
      const startTime = new Date(hackathonStartTime)
      const finalTime = new Date(finalSubmissionTime)
      
      // All milestones: Start, Review 1, Review 2, Final
      const allMilestones = [
        { name: 'Start', time: startTime, position: 0 },
        ...reviews.map((r, i) => ({ 
          name: r.name, 
          time: new Date(r.time), 
          position: ((i + 1) / (reviews.length + 1)) * 100 
        })),
        { name: 'Final Submission', time: finalTime, position: 100 }
      ]
      
      // Find current milestone
      let targetTime = finalTime
      let targetName = 'Final Submission'
      let currentMilestoneIndex = allMilestones.length - 1
      
      for (let i = 0; i < allMilestones.length; i++) {
        if (allMilestones[i].time > now) {
          targetTime = allMilestones[i].time
          targetName = allMilestones[i].name
          currentMilestoneIndex = i
          break
        }
      }
      
      setCurrentMilestone(targetName)
      
      // Calculate burning progress
      let progress = 0
      
      if (currentMilestoneIndex === 0) {
        // Before start
        progress = 0
      } else {
        // After at least one milestone
        const prevMilestone = allMilestones[currentMilestoneIndex - 1]
        const nextMilestone = allMilestones[currentMilestoneIndex]
        
        const prevPosition = prevMilestone.position
        const nextPosition = nextMilestone.position
        const segmentWidth = nextPosition - prevPosition
        
        const prevTime = prevMilestone.time.getTime()
        const nextTime = nextMilestone.time.getTime()
        const totalDuration = nextTime - prevTime
        const elapsed = now.getTime() - prevTime
        const segmentProgress = Math.min(1, Math.max(0, elapsed / totalDuration))
        
        progress = prevPosition + (segmentProgress * segmentWidth)
      }
      
      setBurningProgress(Math.min(100, Math.max(0, progress)))
      
      const difference = +targetTime - +now
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
          isExpired: false
        })
      } else {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isExpired: true
        })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [hackathonStartTime, reviews, finalSubmissionTime])

  const TimeCard = ({ value, label }: { value: number; label: string }) => (
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-green-600 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
      <div className="relative bg-gradient-to-br from-gray-900 via-emerald-950 to-gray-900 border-2 border-emerald-400/30 rounded-2xl p-6 md:p-8 shadow-2xl transform group-hover:scale-105 transition-all duration-300">
        <div className="text-5xl md:text-7xl font-black bg-gradient-to-r from-emerald-300 via-green-400 to-lime-400 bg-clip-text text-transparent mb-2">
          {String(value).padStart(2, '0')}
        </div>
        <div className="text-emerald-300 text-sm md:text-base font-semibold uppercase tracking-wider">
          {label}
        </div>
      </div>
    </div>
  )

  if (timeLeft.isExpired) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-emerald-950 to-black flex items-center justify-center px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#10b981" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="relative z-10 text-center max-w-4xl">
          <div className="mb-8 flex justify-center">
            <div className="w-24 h-24 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full flex items-center justify-center animate-bounce">
              <svg className="w-14 h-14 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6">
            <span className="bg-gradient-to-r from-emerald-300 via-green-400 to-lime-400 bg-clip-text text-transparent">
              Submissions Closed! 🏁
            </span>
          </h1>
          <p className="text-emerald-300 text-xl md:text-2xl font-semibold mb-4">
            {eventName} Has Concluded
          </p>
          <p className="text-gray-400 text-lg md:text-xl">
            Thank you for your amazing work! Best of luck with the results. 🎉
          </p>
        </div>
      </div>
    )
  }

  const isUrgent = timeLeft.days === 0 && timeLeft.hours < 3
  const now = new Date()
  const startTime = new Date(hackathonStartTime)
  
  // Create milestones with proper positions
  const displayMilestones = [
    { 
      name: 'Start', 
      time: hackathonStartTime, 
      position: 0,
      isStart: true,
      isPassed: now > startTime
    },
    ...reviews.map((r, i) => ({ 
      name: r.name, 
      time: r.time, 
      position: ((i + 1) / (reviews.length + 1)) * 100,
      isStart: false,
      isFinal: false,
      isPassed: now > new Date(r.time)
    })),
    { 
      name: 'Final Submission', 
      time: finalSubmissionTime, 
      position: 100,
      isFinal: true,
      isPassed: false
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-emerald-950 to-black relative overflow-hidden py-12 px-6">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#10b981" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 right-20 w-32 h-32 border-2 border-emerald-400/30 rotate-45 animate-spin-slow"></div>
      <div className="absolute bottom-32 left-16 w-24 h-24 bg-gradient-to-r from-green-400/20 to-emerald-600/20 rounded-full animate-pulse"></div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-black mb-4">
            <span className="bg-gradient-to-r from-emerald-300 via-green-400 to-lime-400 bg-clip-text text-transparent">
              {eventName}
            </span>
          </h1>
          <p className="text-emerald-300 text-xl md:text-2xl font-semibold mb-2">
            Time Until {currentMilestone}
          </p>
          {isUrgent && (
            <div className="inline-block mt-4">
              <div className="bg-red-900/30 border-2 border-red-500/50 rounded-full px-6 py-2 animate-pulse">
                <p className="text-red-400 font-bold text-sm md:text-base flex items-center gap-2 justify-center">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  FINAL HOURS! Submit now!
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Countdown Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16">
          <TimeCard value={timeLeft.days} label="Days" />
          <TimeCard value={timeLeft.hours} label="Hours" />
          <TimeCard value={timeLeft.minutes} label="Minutes" />
          <TimeCard value={timeLeft.seconds} label="Seconds" />
        </div>

        {/* Burning Fuse Timeline */}
        <div className="mb-12">
          <div className="bg-gradient-to-r from-emerald-900/50 to-green-900/50 backdrop-blur-lg border-2 border-emerald-400/30 rounded-3xl p-8 md:p-12 shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-black text-emerald-300 mb-12 text-center">
              🔥 Hackathon Timeline
            </h2>

            {/* Timeline Container */}
            <div className="relative px-4 md:px-8 py-8">
              {/* The Fuse Line */}
              <div className="absolute top-1/2 left-0 right-0 h-2 -translate-y-1/2">
                {/* Unburned part (gray) */}
                <div className="absolute inset-0 bg-gradient-to-r from-gray-600 to-gray-500 rounded-full"></div>
                
                {/* Burned part (orange to red gradient) */}
                <div 
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-orange-500 via-red-500 to-red-600 rounded-full transition-all duration-1000 ease-linear"
                  style={{ width: `${burningProgress}%` }}
                >
                  {/* Glowing tip of the burning fuse */}
                  {burningProgress < 100 && burningProgress > 0 && (
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4">
                      <div className="absolute inset-0 bg-yellow-400 rounded-full animate-pulse"></div>
                      <div className="absolute inset-0 bg-yellow-300 rounded-full blur-md animate-ping"></div>
                      {/* Sparks */}
                      <div className="absolute -top-2 -right-1 w-1 h-1 bg-yellow-400 rounded-full animate-spark-1"></div>
                      <div className="absolute -top-1 -right-2 w-1 h-1 bg-orange-400 rounded-full animate-spark-2"></div>
                      <div className="absolute top-2 -right-1 w-1 h-1 bg-red-400 rounded-full animate-spark-3"></div>
                    </div>
                  )}
                </div>
              </div>

              {/* Milestone Markers */}
              <div className="relative flex items-center">
                {displayMilestones.map((milestone, idx) => {
                  const isPassed = milestone.isPassed
                  const isCurrent = !isPassed && (idx === 0 || displayMilestones[idx - 1].isPassed)
                  
                  return (
                    <div 
                      key={idx} 
                      className="absolute flex flex-col items-center"
                      style={{ 
                        left: `${milestone.position}%`,
                        transform: 'translateX(-50%)'
                      }}
                    >
                      {/* Marker Circle */}
                      <div className="relative z-10 mb-4">
                        {milestone.isStart ? (
                          // Start - Rocket
                          <div className={`w-16 h-16 md:w-20 md:h-20 rounded-full border-4 flex items-center justify-center shadow-lg ${
                            isPassed 
                              ? 'bg-emerald-600 border-emerald-400 shadow-emerald-500/50'
                              : 'bg-gray-700 border-gray-600'
                          }`}>
                            <span className="text-2xl md:text-3xl">🚀</span>
                          </div>
                        ) : isPassed ? (
                          // Completed - Green check
                          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-emerald-600 border-4 border-emerald-400 flex items-center justify-center shadow-lg shadow-emerald-500/50">
                            <svg className="w-8 h-8 md:w-10 md:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        ) : isCurrent ? (
                          // Current - Pulsing fire
                          <div className="relative">
                            <div className="absolute inset-0 w-16 h-16 md:w-20 md:h-20 bg-gradient-to-r from-orange-500 to-red-600 rounded-full blur-xl animate-pulse opacity-75"></div>
                            <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-r from-orange-500 via-red-500 to-red-600 border-4 border-yellow-400 flex items-center justify-center shadow-lg animate-pulse">
                              <span className="text-2xl md:text-3xl">🔥</span>
                            </div>
                          </div>
                        ) : milestone.isFinal ? (
                          // Final - Trophy
                          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-r from-yellow-600 to-orange-600 border-4 border-yellow-400 flex items-center justify-center shadow-lg">
                            <span className="text-2xl md:text-3xl">🏆</span>
                          </div>
                        ) : (
                          // Upcoming - Gray
                          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gray-700 border-4 border-gray-600 flex items-center justify-center shadow-lg">
                            <span className="text-2xl md:text-3xl text-gray-500 font-bold">
                              {idx}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Milestone Info */}
                      <div className="text-center w-[120px] md:w-[150px]">
                        <h3 className={`font-bold text-sm md:text-base mb-1 ${
                          isPassed ? 'text-emerald-400' :
                          isCurrent ? 'text-orange-400' :
                          milestone.isFinal ? 'text-yellow-400' :
                          'text-gray-500'
                        }`}>
                          {milestone.name}
                        </h3>
                        <p className={`text-xs ${
                          isPassed ? 'text-emerald-500/70' :
                          isCurrent ? 'text-orange-400/70' :
                          milestone.isFinal ? 'text-yellow-400/70' :
                          'text-gray-600'
                        }`}>
                          {new Date(milestone.time).toLocaleString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            hour: 'numeric',
                            minute: '2-digit',
                            hour12: true
                          })}
                        </p>
                        {isPassed && !milestone.isStart && (
                          <span className="inline-block mt-1 text-xs font-semibold text-emerald-400 bg-emerald-900/30 px-2 py-0.5 rounded-full">
                            ✓ Done
                          </span>
                        )}
                        {isCurrent && (
                          <span className="inline-block mt-1 text-xs font-semibold text-orange-400 bg-orange-900/30 px-2 py-0.5 rounded-full animate-pulse">
                            🔥 Active
                          </span>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Message */}
        <div className="text-center">
          <div className="inline-block bg-gradient-to-r from-emerald-900/50 to-green-900/50 backdrop-blur-lg border-2 border-emerald-400/30 rounded-full px-8 py-4 shadow-2xl">
            <p className="text-emerald-300 text-lg md:text-xl font-semibold">
              {isUrgent
                ? "⚡ Final countdown! Submit your project now!"
                : "💪 Keep building! The fuse is burning! 🔥"}
            </p>
          </div>
        </div>
      </div>

      {/* Custom Animation Styles */}
      <style jsx>{`
        @keyframes spin-slow {
          from {
            transform: rotate(45deg);
          }
          to {
            transform: rotate(405deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }

        @keyframes spark-1 {
          0%, 100% {
            opacity: 0;
            transform: translate(0, 0) scale(1);
          }
          50% {
            opacity: 1;
            transform: translate(-8px, -8px) scale(1.5);
          }
        }
        @keyframes spark-2 {
          0%, 100% {
            opacity: 0;
            transform: translate(0, 0) scale(1);
          }
          50% {
            opacity: 1;
            transform: translate(-10px, -4px) scale(1.2);
          }
        }
        @keyframes spark-3 {
          0%, 100% {
            opacity: 0;
            transform: translate(0, 0) scale(1);
          }
          50% {
            opacity: 1;
            transform: translate(-6px, 6px) scale(1.3);
          }
        }
        .animate-spark-1 {
          animation: spark-1 1s ease-in-out infinite;
        }
        .animate-spark-2 {
          animation: spark-2 1.2s ease-in-out infinite;
          animation-delay: 0.2s;
        }
        .animate-spark-3 {
          animation: spark-3 0.9s ease-in-out infinite;
          animation-delay: 0.4s;
        }
      `}</style>
    </div>
  )
}