export default function Timeline() {
  const timelineEvents = [
    {
      id: 1,
      date: "20th OCT",
      title: "Registration starts",
      type: "start",
      side: "left"
    },
    {
      id: 2,
      date: "2nd NOV",
      title: "Registration ends",
      subtitle: "",
      type: "deadline",
      side: "right"
    },
    {
      id: 3,
      date: "5th & 6th NOV",
      title: "ECOVERSE STARTS",
      subtitle: "STIM",
      details: [
        "REVIEW 1 - NOV 5th afternoon",
        "REVIEW 2 - NOV 5th evening", 
        "REVIEW 3 - NOV 6th morning"
      ],
      type: "event",
      side: "left"
    },
    {
      id: 4,
      date: "6th NOV",
      title: "Final Evaluation",
      subtitle: "& Winners Announcement",
      type: "final",
      side: "right",
    }
  ]

  const reviews = [
    {
      title: "REVIEW 1:",
      items: [
        "PPT submission (Idea)",
        "Checking originality, feasibility"
      ]
    },
    {
      title: "REVIEW 2:",
      items: [
        "Github Repo Submission (Partial Implementation)",
        "Monitoring Progress",
        "Plagiarism Checks"
      ]
    },
    {
      title: "REVIEW 3:",
      items: [
        "Final Judgement",
        "Full Working Prototype"
      ]
    }
  ]

  const getEventStyle = (type: string): string => {
    switch(type) {
      case 'start':
        return 'from-yellow-600 to-green-300'
      case 'deadline':
        return 'from-green-300 to-yellow-600'
      case 'event':
        return 'from-yellow-600 to-green-300'
      case 'final':
        return 'from-green-300 to-yellow-600'
      default:
        return 'from-yellow-600 to-green-300'
    }
  }

  return (
    <section id="timeline" className="relative z-10 min-h-screen py-20">
      <div className="absolute top-20 right-20 w-16 h-16 border border-emerald-400/20 rotate-45 animate-pulse"></div>
      <div className="absolute bottom-32 left-16 w-12 h-12 bg-gradient-to-r from-green-400/10 to-emerald-600/10 rounded-full animate-bounce"></div>
      <main className="relative z-10 px-6">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-black mb-4 tracking-tight">
            <span className="bg-gradient-to-r from-emerald-300 via-green-400 to-lime-400 bg-clip-text text-transparent animate-gradient-x">
              TIMELINE
            </span>
          </h1>
          <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
            Follow the journey from registration to victory. Stay updated with all important dates and milestones.
          </p>
          <div className="flex items-center justify-center space-x-4 mt-6">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-emerald-400"></div>
            <span className="text-emerald-400 font-semibold">Event Schedule</span>
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-emerald-400"></div>
          </div>
        </div>

        {/* Timeline Container - Brochure Style */}
        <div className="max-w-6xl mx-auto">
          <div className="hidden lg:block relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-emerald-400 via-green-500 to-lime-400 transform -translate-x-1/2 z-0">
              <div className="absolute top-0 left-1/2 w-3 h-3 bg-emerald-400 rounded-full transform -translate-x-1/2"></div>
              <div className="absolute bottom-0 left-1/2 w-3 h-3 bg-emerald-600 rounded-full transform -translate-x-1/2"></div>
            </div>
            
            {/* Timeline Events */}
            <div className="space-y-20">
              {timelineEvents.map((event) => (
                <div key={event.id} className={`relative flex items-center ${event.side === 'left' ? 'justify-start' : 'justify-end'}`}>
                  
                  {/* Event Card - Positioned based on side */}
                  <div className={`w-5/12 ${event.side === 'left' ? 'pr-16' : 'pl-16'}`}>
                    <div className={`bg-gradient-to-br from-emerald-900/90 to-green-900/90 backdrop-blur-xl border-2 border-emerald-400/40 rounded-2xl p-6 shadow-2xl hover:shadow-emerald-500/20 transition-all duration-300 transform hover:scale-105 ${event.side === 'right' ? 'ml-auto' : ''}`}>
                      
                      {/* Date Badge */}
                      <div className="flex items-center justify-between mb-4">
                        <div className={`bg-gradient-to-r ${getEventStyle(event.type)} text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg`}>
                          {event.date}
                        </div>
                        </div>
                      
                      <h3 className="text-xl font-bold text-white mb-2">{event.title}</h3>
                      {event.subtitle && (
                        <p className="text-emerald-300 font-medium mb-3">{event.subtitle}</p>
                      )}
                      
                      {event.details && (
                        <ul className="space-y-1">
                          {event.details.map((detail, i) => (
                            <li key={i} className="text-gray-300 text-sm">• {detail}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>

                  {/* Timeline Node */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 z-20">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${getEventStyle(event.type)} flex items-center justify-center text-white font-bold text-lg shadow-xl border-4 border-slate-900`}>
                      {event.id}
                    </div>
                    
                    {/* Connecting line to card */}
                    <div className={`absolute top-6 w-16 h-0.5 bg-gradient-to-r ${getEventStyle(event.type)} ${event.side === 'left' ? 'right-12' : 'left-12'}`}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Timeline */}
          <div className="lg:hidden space-y-8">
            {timelineEvents.map((event) => (
              <div key={event.id} className="relative pl-12">
                {/* Mobile Timeline Line */}
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-400 to-lime-400"></div>
                
                {/* Mobile Timeline Node */}
                <div className={`absolute left-2 top-4 w-8 h-8 rounded-full bg-gradient-to-r ${getEventStyle(event.type)} flex items-center justify-center text-white font-bold text-sm shadow-lg`}>
                  {event.id}
                </div>

                {/* Mobile Event Card */}
                <div className="bg-gradient-to-br from-emerald-900/90 to-green-900/90 backdrop-blur-xl border-2 border-emerald-400/40 rounded-2xl p-4 shadow-2xl">
                  <div className="flex items-center justify-between mb-3">
                    <div className={`bg-gradient-to-r ${getEventStyle(event.type)} text-white px-3 py-1 rounded-full font-bold text-xs`}>
                      {event.date}
                    </div>
                    </div>
                  
                  <h3 className="text-lg font-bold text-white mb-2">{event.title}</h3>
                  {event.subtitle && (
                    <p className="text-emerald-300 font-medium mb-2">{event.subtitle}</p>
                  )}
                  
                  {event.details && (
                    <ul className="space-y-1">
                      {event.details.map((detail, i) => (
                        <li key={i} className="text-gray-300 text-sm">• {detail}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews Section */}
        <div className="max-w-6xl mx-auto mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            <span className="bg-gradient-to-r from-emerald-300 to-lime-400 bg-clip-text text-transparent">
              Review Process
            </span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {reviews.map((review, index) => (
              <div key={index} className="bg-gradient-to-br from-emerald-900/90 to-green-900/90 backdrop-blur-xl border-2 border-emerald-400/40 rounded-2xl p-6 shadow-2xl hover:shadow-emerald-500/20 transition-all duration-300 transform hover:scale-105">
                <h3 className="text-xl font-bold text-emerald-400 mb-4">{review.title}</h3>
                <ul className="space-y-3">
                  {review.items.map((item, i) => (
                    <li key={i} className="text-gray-300 flex items-start">
                      <span className="text-emerald-400 mr-2 translate-y[5px]">•</span>
                      <span className="flex-1">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </main>
    </section>
  )
}