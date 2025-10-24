'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

type TeamData = {
  teamName: string
  teamSize: number
  trackName: string
}

type MemberData = {
  name: string
  phone: string
  email: string
  resumeLink: string
}

type ExistingTeamData = {
  team: {
    id: number
    team_name: string
    team_size: number
    track_name: string
  }
  leader: {
    name: string
    phone: string
    email: string
    resume_link: string
  }
  members: Array<{
    id: string
    name: string
    phone: string
    email: string
    resume_link: string
  }>
}

export default function CreateTeam() {
  const [activeTab, setActiveTab] = useState<'create' | 'edit'>('create')
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [generatedTeamId, setGeneratedTeamId] = useState(0)

  // Team data
  const [teamData, setTeamData] = useState<TeamData>({
    teamName: '',
    teamSize: 2,
    trackName: ''
  })

  // Leader data
  const [leaderData, setLeaderData] = useState<MemberData>({
    name: '',
    phone: '',
    email: '',
    resumeLink: ''
  })

  // Members data
  const [membersData, setMembersData] = useState<MemberData[]>([
    { name: '', phone: '', email: '', resumeLink: '' },
    { name: '', phone: '', email: '', resumeLink: '' },
    { name: '', phone: '', email: '', resumeLink: '' }
  ])

  // Edit mode states
  const [editTeamId, setEditTeamId] = useState('')
  const [loadingEdit, setLoadingEdit] = useState(false)
  const [editError, setEditError] = useState('')
  const [existingTeamData, setExistingTeamData] = useState<ExistingTeamData | null>(null)
  const [isEditing, setIsEditing] = useState(false)

  const tracks = [
    'Data Science & Machine Learning',
    'Blockchain & Cybersecurity',
    'IoT & Robotics'
  ]

  const handleTeamDataChange = (field: keyof TeamData, value: string | number) => {
    setTeamData({ ...teamData, [field]: value })
    setError('')
  }

  const handleLeaderDataChange = (field: keyof MemberData, value: string) => {
    setLeaderData({ ...leaderData, [field]: value })
    setError('')
  }

  const handleMemberDataChange = (index: number, field: keyof MemberData, value: string) => {
    const updated = [...membersData]
    updated[index] = { ...updated[index], [field]: value }
    setMembersData(updated)
    setError('')
  }

  const validateStep1 = () => {
    if (!teamData.teamName.trim()) {
      setError('Team name is required')
      return false
    }
    if (!teamData.trackName) {
      setError('Please select a track')
      return false
    }
    return true
  }

  const validateMemberData = (data: MemberData, role: string) => {
    if (!data.name.trim()) {
      setError(`${role} name is required`)
      return false
    }
    
    const phoneRegex = /^[6-9]\d{9}$/
    if (!phoneRegex.test(data.phone.replace(/\s+/g, ''))) {
      setError(`${role} phone must be a valid 10-digit number`)
      return false
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(data.email)) {
      setError(`${role} email is invalid`)
      return false
    }

    if (!data.resumeLink.trim()) {
      setError(`${role} resume link is required`)
      return false
    }

    try {
      new URL(data.resumeLink)
    } catch {
      setError(`${role} resume link must be a valid URL`)
      return false
    }

    return true
  }

  const validateStep2 = () => {
    if (!validateMemberData(leaderData, 'Team Leader')) return false
    
    const memberCount = teamData.teamSize - 1
    for (let i = 0; i < memberCount; i++) {
      if (!validateMemberData(membersData[i], `Member ${i + 2}`)) {
        return false
      }
    }
    return true
  }

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2)
    }
  }

  const handleSubmit = async () => {
    if (!validateStep2()) return

    setLoading(true)
    setError('')

    try {
      const { data: existingTeam } = await supabase
        .from('teams')
        .select('team_name')
        .eq('team_name', teamData.teamName.trim())
        .single()

      if (existingTeam) {
        setError('This team name is already taken. Please choose a different name.')
        setLoading(false)
        return
      }

      const { data: team, error: teamError } = await supabase
        .from('teams')
        .insert({
          team_name: teamData.teamName.trim(),
          team_size: teamData.teamSize,
          track_name: teamData.trackName
        })
        .select()
        .single()

      if (teamError) throw new Error(`Team creation failed: ${teamError.message}`)

      const teamId = team.id

      const { error: leaderError } = await supabase
        .from('team_members')
        .insert({
          team_id: teamId,
          member_role: 'leader',
          member_number: 1,
          name: leaderData.name.trim(),
          phone: leaderData.phone.replace(/\s+/g, ''),
          email: leaderData.email.trim().toLowerCase(),
          resume_link: leaderData.resumeLink.trim()
        })

      if (leaderError) throw new Error(`Leader registration failed: ${leaderError.message}`)

      const memberCount = teamData.teamSize - 1
      if (memberCount > 0) {
        const membersToInsert = []
        for (let i = 0; i < memberCount; i++) {
          membersToInsert.push({
            team_id: teamId,
            member_role: 'member',
            member_number: i + 2,
            name: membersData[i].name.trim(),
            phone: membersData[i].phone.replace(/\s+/g, ''),
            email: membersData[i].email.trim().toLowerCase(),
            resume_link: membersData[i].resumeLink.trim()
          })
        }

        const { error: membersError } = await supabase
          .from('team_members')
          .insert(membersToInsert)

        if (membersError) throw new Error(`Members registration failed: ${membersError.message}`)
      }

      setGeneratedTeamId(teamId)
      setSuccess(true)

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred. Please try again.'
      setError(errorMessage)
      console.error('Registration error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleViewTeam = async () => {
    if (!editTeamId.trim()) {
      setEditError('Please enter your Team ID')
      return
    }

    setLoadingEdit(true)
    setEditError('')
    setExistingTeamData(null)

    try {
      const { data: team, error: teamError } = await supabase
        .from('teams')
        .select('*')
        .eq('id', parseInt(editTeamId))
        .single()

      if (teamError || !team) {
        setEditError('No team found with this ID')
        return
      }

      const { data: members, error: membersError } = await supabase
        .from('team_members')
        .select('*')
        .eq('team_id', parseInt(editTeamId))
        .order('member_number')

      if (membersError) throw new Error('Failed to fetch team members')

      const leader = members.find(m => m.member_role === 'leader')
      const teamMembers = members.filter(m => m.member_role === 'member')

      if (!leader) {
        setEditError('Team leader not found')
        return
      }

      setExistingTeamData({ team, leader, members: teamMembers })
      setTeamData({
        teamName: team.team_name,
        teamSize: team.team_size,
        trackName: team.track_name
      })
      setLeaderData({
        name: leader.name,
        phone: leader.phone,
        email: leader.email,
        resumeLink: leader.resume_link
      })
      
      const updatedMembers = [...membersData]
      teamMembers.forEach((member, index) => {
        updatedMembers[index] = {
          name: member.name,
          phone: member.phone,
          email: member.email,
          resumeLink: member.resume_link
        }
      })
      setMembersData(updatedMembers)

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error fetching team data'
      setEditError(errorMessage)
    } finally {
      setLoadingEdit(false)
    }
  }

  const handleUpdateTeam = async () => {
    if (!validateStep2()) return

    setLoading(true)
    setError('')

    try {
      const teamId = parseInt(editTeamId)

      const { error: teamError } = await supabase
        .from('teams')
        .update({
          team_name: teamData.teamName.trim(),
          team_size: teamData.teamSize,
          track_name: teamData.trackName
        })
        .eq('id', teamId)

      if (teamError) throw new Error(`Team update failed: ${teamError.message}`)

      const { error: leaderError } = await supabase
        .from('team_members')
        .update({
          name: leaderData.name.trim(),
          phone: leaderData.phone.replace(/\s+/g, ''),
          email: leaderData.email.trim().toLowerCase(),
          resume_link: leaderData.resumeLink.trim()
        })
        .eq('team_id', teamId)
        .eq('member_role', 'leader')

      if (leaderError) throw new Error(`Leader update failed: ${leaderError.message}`)

      const memberCount = teamData.teamSize - 1
      if (memberCount > 0) {
        for (let i = 0; i < memberCount; i++) {
          const { error: memberError } = await supabase
            .from('team_members')
            .update({
              name: membersData[i].name.trim(),
              phone: membersData[i].phone.replace(/\s+/g, ''),
              email: membersData[i].email.trim().toLowerCase(),
              resume_link: membersData[i].resumeLink.trim()
            })
            .eq('team_id', teamId)
            .eq('member_number', i + 2)

          if (memberError) throw new Error(`Member ${i + 2} update failed: ${memberError.message}`)
        }
      }

      setSuccess(true)
      setGeneratedTeamId(teamId)

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred. Please try again.'
      setError(errorMessage)
      console.error('Update error:', err)
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-emerald-950 to-black flex items-center justify-center px-6">
        <div className="max-w-2xl w-full text-center">
          <div className="bg-gradient-to-r from-emerald-900/50 to-green-900/50 backdrop-blur-lg border-2 border-emerald-400/50 rounded-3xl p-12 shadow-2xl">
            <div className="mb-6 flex justify-center">
              <div className="w-20 h-20 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>

            <h2 className="text-4xl font-black text-white mb-4">
              {isEditing ? 'Team Updated!' : 'Team Registered!'}
            </h2>
            <p className="text-emerald-300 text-lg mb-4">
              {isEditing 
                ? `Team "${teamData.teamName}" has been updated successfully.`
                : `Your team "${teamData.teamName}" has been created successfully.`
              }
            </p>
            
            <div className="bg-emerald-900/30 border border-emerald-400/30 rounded-xl p-6 mb-8">
              <p className="text-gray-400 text-sm mb-2">Your Team ID</p>
              <p className="text-5xl font-black text-emerald-400 mb-2">{generatedTeamId}</p>
              <p className="text-gray-500 text-xs">Use this ID for PPT submission</p>
            </div>

            <Link href="/">
              <button className="w-full px-8 py-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold rounded-full shadow-lg hover:shadow-emerald-500/40 transition-all duration-300 transform hover:scale-105">
                Back to Home
              </button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-emerald-950 to-black relative overflow-hidden">
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

      <div className="absolute top-20 right-20 w-32 h-32 border-2 border-emerald-400/30 rotate-45"></div>
      <div className="absolute bottom-32 left-16 w-24 h-24 bg-gradient-to-r from-green-400/20 to-emerald-600/20 rounded-full"></div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-6 py-12">
        <div className="max-w-3xl w-full">
          <div className="text-center mb-8">
            <Link href="/" className="inline-block mb-6">
              <button className="px-6 py-2 bg-emerald-900/50 hover:bg-emerald-900/70 border border-emerald-400/30 text-emerald-300 font-semibold rounded-full transition-all">
                Home
              </button>
            </Link>
            <h1 className="text-5xl md:text-6xl font-black mb-4">
              <span className="bg-gradient-to-r from-emerald-300 via-green-400 to-lime-400 bg-clip-text text-transparent">
                Team Registration
              </span>
            </h1>
            <p className="text-gray-400 text-lg">
              Ecoverse 2025
            </p>
          </div>

          {/* Guidelines Box - Always visible at top */}
          <div className="bg-emerald-900/20 border border-emerald-400/20 rounded-xl p-6 mb-8">
            <h3 className="text-emerald-300 font-bold text-xl mb-3">📋 Guidelines:</h3>
            <ul className="text-gray-400 text-sm space-y-2">
              <li>• Team size must be between 2-4 members</li>
              <li>• All team members must be registered students</li>
              <li>• Each member must provide valid contact details and resume</li>
              <li>• Resume links should be accessible (Google Drive with view permissions recommended)</li>
              <li>• You will receive a Team ID after registration for PPT submission</li>
              <li>• Keep your Team ID safe - you&apos;ll need it throughout the hackathon</li>
            </ul>
          </div>

          {/* Tabs */}
          <div className="flex space-x-4 mb-8">
            <button
              onClick={() => {
                setActiveTab('create')
                setError('')
                setEditError('')
                setExistingTeamData(null)
                setIsEditing(false)
                setStep(1)
              }}
              className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
                activeTab === 'create'
                  ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg'
                  : 'bg-emerald-900/30 text-emerald-300 hover:bg-emerald-900/50'
              }`}
            >
              Create New Team
            </button>
            <button
              onClick={() => {
                setActiveTab('edit')
                setError('')
                setEditError('')
                setStep(1)
              }}
              className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
                activeTab === 'edit'
                  ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg'
                  : 'bg-emerald-900/30 text-emerald-300 hover:bg-emerald-900/50'
              }`}
            >
              Edit Team
            </button>
          </div>

          {activeTab === 'create' && (
            <div className="bg-gradient-to-r from-emerald-900/50 to-green-900/50 backdrop-blur-lg border-2 border-emerald-400/30 rounded-3xl p-8 md:p-12 shadow-2xl">
              {/* Progress Steps */}
              <div className="flex justify-center mb-8">
                <div className="flex items-center space-x-4">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold ${step >= 1 ? 'bg-emerald-500 text-white' : 'bg-gray-700 text-gray-400'}`}>
                    1
                  </div>
                  <div className={`h-1 w-16 ${step >= 2 ? 'bg-emerald-500' : 'bg-gray-700'}`}></div>
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold ${step >= 2 ? 'bg-emerald-500 text-white' : 'bg-gray-700 text-gray-400'}`}>
                    2
                  </div>
                </div>
              </div>

              {step === 1 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-emerald-300 mb-6">Team Information</h2>

                  <div>
                    <label className="block text-emerald-300 font-semibold mb-2">Team Name *</label>
                    <input
                      type="text"
                      value={teamData.teamName}
                      onChange={(e) => handleTeamDataChange('teamName', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-900/50 border border-emerald-400/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-emerald-400 transition-colors"
                      placeholder="Enter your team name"
                    />
                  </div>

                  <div>
                    <label className="block text-emerald-300 font-semibold mb-2">Team Size *</label>
                    <select
                      value={teamData.teamSize}
                      onChange={(e) => handleTeamDataChange('teamSize', parseInt(e.target.value))}
                      className="w-full px-4 py-3 bg-gray-900/50 border border-emerald-400/30 rounded-xl text-white focus:outline-none focus:border-emerald-400 transition-colors"
                    >
                      <option value={2}>2 Members</option>
                      <option value={3}>3 Members</option>
                      <option value={4}>4 Members</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-emerald-300 font-semibold mb-2">Track *</label>
                    <select
                      value={teamData.trackName}
                      onChange={(e) => handleTeamDataChange('trackName', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-900/50 border border-emerald-400/30 rounded-xl text-white focus:outline-none focus:border-emerald-400 transition-colors"
                    >
                      <option value="">Select a track</option>
                      {tracks.map((track) => (
                        <option key={track} value={track}>{track}</option>
                      ))}
                    </select>
                  </div>

                  {error && (
                    <div className="bg-red-900/30 border border-red-500/50 rounded-xl p-4">
                      <p className="text-red-300 text-sm">❌ {error}</p>
                    </div>
                  )}

                  <button
                    onClick={handleNext}
                    className="w-full px-8 py-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold rounded-full shadow-lg hover:shadow-emerald-500/40 transition-all duration-300 transform hover:scale-105"
                  >
                    Next: Team Members Info
                  </button>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-emerald-300">Team Members Information</h2>
                    <button
                      onClick={() => setStep(1)}
                      className="text-emerald-400 hover:text-emerald-300 text-sm font-semibold"
                    >
                      ← Back
                    </button>
                  </div>

                  {/* Leader */}
                  <div className="bg-gray-900/30 rounded-xl p-6 space-y-4">
                    <h3 className="text-lg font-bold text-emerald-400">Team Leader</h3>

                    <div>
                      <label className="block text-emerald-300 font-semibold mb-2">Full Name *</label>
                      <input
                        type="text"
                        value={leaderData.name}
                        onChange={(e) => handleLeaderDataChange('name', e.target.value)}
                        className="w-full px-4 py-3 bg-gray-900/50 border border-emerald-400/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-emerald-400 transition-colors"
                        placeholder="Enter full name"
                      />
                    </div>

                    <div>
                      <label className="block text-emerald-300 font-semibold mb-2">Phone Number *</label>
                      <input
                        type="tel"
                        value={leaderData.phone}
                        onChange={(e) => handleLeaderDataChange('phone', e.target.value)}
                        className="w-full px-4 py-3 bg-gray-900/50 border border-emerald-400/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-emerald-400 transition-colors"
                        placeholder="10-digit mobile number"
                        maxLength={10}
                      />
                    </div>

                    <div>
                      <label className="block text-emerald-300 font-semibold mb-2">Email Address *</label>
                      <input
                        type="email"
                        value={leaderData.email}
                        onChange={(e) => handleLeaderDataChange('email', e.target.value)}
                        className="w-full px-4 py-3 bg-gray-900/50 border border-emerald-400/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-emerald-400 transition-colors"
                        placeholder="example@email.com"
                      />
                    </div>

                    <div>
                      <label className="block text-emerald-300 font-semibold mb-2">Resume Link *</label>
                      <input
                        type="url"
                        value={leaderData.resumeLink}
                        onChange={(e) => handleLeaderDataChange('resumeLink', e.target.value)}
                        className="w-full px-4 py-3 bg-gray-900/50 border border-emerald-400/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-emerald-400 transition-colors"
                        placeholder="Google Drive link or any accessible URL"
                      />
                    </div>
                  </div>

                  {/* Other Members */}
                  {Array.from({ length: teamData.teamSize - 1 }).map((_, index) => (
                    <div key={index} className="bg-gray-900/30 rounded-xl p-6 space-y-4">
                      <h3 className="text-lg font-bold text-emerald-400">Member {index + 2}</h3>

                      <div>
                        <label className="block text-emerald-300 font-semibold mb-2">Full Name *</label>
                        <input
                          type="text"
                          value={membersData[index].name}
                          onChange={(e) => handleMemberDataChange(index, 'name', e.target.value)}
                          className="w-full px-4 py-3 bg-gray-900/50 border border-emerald-400/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-emerald-400 transition-colors"
                          placeholder="Enter full name"
                        />
                      </div>

                      <div>
                        <label className="block text-emerald-300 font-semibold mb-2">Phone Number *</label>
                        <input
                          type="tel"
                          value={membersData[index].phone}
                          onChange={(e) => handleMemberDataChange(index, 'phone', e.target.value)}
                          className="w-full px-4 py-3 bg-gray-900/50 border border-emerald-400/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-emerald-400 transition-colors"
                          placeholder="10-digit mobile number"
                          maxLength={10}
                        />
                      </div>

                      <div>
                        <label className="block text-emerald-300 font-semibold mb-2">Email Address *</label>
                        <input
                          type="email"
                          value={membersData[index].email}
                          onChange={(e) => handleMemberDataChange(index, 'email', e.target.value)}
                          className="w-full px-4 py-3 bg-gray-900/50 border border-emerald-400/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-emerald-400 transition-colors"
                          placeholder="example@email.com"
                        />
                      </div>

                      <div>
                        <label className="block text-emerald-300 font-semibold mb-2">Resume Link *</label>
                        <input
                          type="url"
                          value={membersData[index].resumeLink}
                          onChange={(e) => handleMemberDataChange(index, 'resumeLink', e.target.value)}
                          className="w-full px-4 py-3 bg-gray-900/50 border border-emerald-400/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-emerald-400 transition-colors"
                          placeholder="Google Drive link or any accessible URL"
                        />
                      </div>
                    </div>
                  ))}

                  {error && (
                    <div className="bg-red-900/30 border border-red-500/50 rounded-xl p-4">
                      <p className="text-red-300 text-sm">❌ {error}</p>
                    </div>
                  )}

                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-full px-8 py-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold rounded-full shadow-lg hover:shadow-emerald-500/40 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Submitting...' : 'Submit Registration'}
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'edit' && (
            <div className="bg-gradient-to-r from-emerald-900/50 to-green-900/50 backdrop-blur-lg border-2 border-emerald-400/30 rounded-3xl p-8 md:p-12 shadow-2xl">
              {!existingTeamData ? (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-emerald-300 mb-6">Enter Your Team ID</h2>

                  <div>
                    <label className="block text-emerald-300 font-semibold mb-2">Team ID</label>
                    <input
                      type="number"
                      value={editTeamId}
                      onChange={(e) => {
                        setEditTeamId(e.target.value)
                        setEditError('')
                      }}
                      className="w-full px-4 py-3 bg-gray-900/50 border border-emerald-400/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-emerald-400 transition-colors"
                      placeholder="Enter your team ID (e.g., 1, 2, 3)"
                      disabled={loadingEdit}
                    />
                  </div>

                  {editError && (
                    <div className="bg-red-900/30 border border-red-500/50 rounded-xl p-4">
                      <p className="text-red-300 text-sm">❌ {editError}</p>
                    </div>
                  )}

                  <button
                    onClick={handleViewTeam}
                    disabled={loadingEdit}
                    className="w-full px-8 py-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold rounded-full shadow-lg hover:shadow-emerald-500/40 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loadingEdit ? 'Loading...' : 'View Team'}
                  </button>
                </div>
              ) : !isEditing ? (
                <div className="space-y-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-emerald-300">Team Details</h2>
                    <button
                      onClick={() => {
                        setExistingTeamData(null)
                        setEditTeamId('')
                      }}
                      className="text-emerald-400 hover:text-emerald-300 text-sm font-semibold"
                    >
                      ← Back
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-gray-900/30 rounded-xl p-4">
                      <p className="text-gray-400 text-sm mb-1">Team ID</p>
                      <p className="text-3xl font-black text-emerald-400">{existingTeamData.team.id}</p>
                    </div>

                    <div className="bg-gray-900/30 rounded-xl p-4">
                      <p className="text-gray-400 text-sm mb-1">Team Name</p>
                      <p className="text-white font-semibold">{existingTeamData.team.team_name}</p>
                    </div>

                    <div className="bg-gray-900/30 rounded-xl p-4">
                      <p className="text-gray-400 text-sm mb-1">Team Size</p>
                      <p className="text-white font-semibold">{existingTeamData.team.team_size} Members</p>
                    </div>

                    <div className="bg-gray-900/30 rounded-xl p-4">
                      <p className="text-gray-400 text-sm mb-1">Track</p>
                      <p className="text-white font-semibold">{existingTeamData.team.track_name}</p>
                    </div>

                    <div className="bg-gray-900/30 rounded-xl p-4">
                      <p className="text-gray-400 text-sm mb-1">Team Leader</p>
                      <p className="text-white font-semibold">{existingTeamData.leader.name}</p>
                      <p className="text-gray-400 text-sm mt-1">{existingTeamData.leader.email}</p>
                    </div>

                    {existingTeamData.members.map((member, index: number) => (
                      <div key={member.id} className="bg-gray-900/30 rounded-xl p-4">
                        <p className="text-gray-400 text-sm mb-1">Member {index + 2}</p>
                        <p className="text-white font-semibold">{member.name}</p>
                        <p className="text-gray-400 text-sm mt-1">{member.email}</p>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => setIsEditing(true)}
                    className="w-full px-8 py-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold rounded-full shadow-lg hover:shadow-emerald-500/40 transition-all duration-300 transform hover:scale-105"
                  >
                    Edit Team Details
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-emerald-300">Edit Team</h2>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="text-emerald-400 hover:text-emerald-300 text-sm font-semibold"
                    >
                      ← Back
                    </button>
                  </div>

                  <div className="bg-emerald-900/30 border border-emerald-400/30 rounded-xl p-4">
                    <p className="text-gray-400 text-sm mb-1">Team ID (Cannot be changed)</p>
                    <p className="text-3xl font-black text-emerald-400">{editTeamId}</p>
                  </div>

                  <div>
                    <label className="block text-emerald-300 font-semibold mb-2">Team Name *</label>
                    <input
                      type="text"
                      value={teamData.teamName}
                      onChange={(e) => handleTeamDataChange('teamName', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-900/50 border border-emerald-400/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-emerald-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-emerald-300 font-semibold mb-2">Team Size *</label>
                    <select
                      value={teamData.teamSize}
                      onChange={(e) => handleTeamDataChange('teamSize', parseInt(e.target.value))}
                      className="w-full px-4 py-3 bg-gray-900/50 border border-emerald-400/30 rounded-xl text-white focus:outline-none focus:border-emerald-400 transition-colors"
                    >
                      <option value={2}>2 Members</option>
                      <option value={3}>3 Members</option>
                      <option value={4}>4 Members</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-emerald-300 font-semibold mb-2">Track *</label>
                    <select
                      value={teamData.trackName}
                      onChange={(e) => handleTeamDataChange('trackName', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-900/50 border border-emerald-400/30 rounded-xl text-white focus:outline-none focus:border-emerald-400 transition-colors"
                    >
                      {tracks.map((track) => (
                        <option key={track} value={track}>{track}</option>
                      ))}
                    </select>
                  </div>

                  {/* Leader */}
                  <div className="bg-gray-900/30 rounded-xl p-6 space-y-4">
                    <h3 className="text-lg font-bold text-emerald-400">Team Leader</h3>

                    <div>
                      <label className="block text-emerald-300 font-semibold mb-2">Full Name *</label>
                      <input
                        type="text"
                        value={leaderData.name}
                        onChange={(e) => handleLeaderDataChange('name', e.target.value)}
                        className="w-full px-4 py-3 bg-gray-900/50 border border-emerald-400/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-emerald-400 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-emerald-300 font-semibold mb-2">Phone Number *</label>
                      <input
                        type="tel"
                        value={leaderData.phone}
                        onChange={(e) => handleLeaderDataChange('phone', e.target.value)}
                        className="w-full px-4 py-3 bg-gray-900/50 border border-emerald-400/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-emerald-400 transition-colors"
                        maxLength={10}
                      />
                    </div>

                    <div>
                      <label className="block text-emerald-300 font-semibold mb-2">Email Address *</label>
                      <input
                        type="email"
                        value={leaderData.email}
                        onChange={(e) => handleLeaderDataChange('email', e.target.value)}
                        className="w-full px-4 py-3 bg-gray-900/50 border border-emerald-400/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-emerald-400 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-emerald-300 font-semibold mb-2">Resume Link *</label>
                      <input
                        type="url"
                        value={leaderData.resumeLink}
                        onChange={(e) => handleLeaderDataChange('resumeLink', e.target.value)}
                        className="w-full px-4 py-3 bg-gray-900/50 border border-emerald-400/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-emerald-400 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Other Members */}
                  {Array.from({ length: teamData.teamSize - 1 }).map((_, index) => (
                    <div key={index} className="bg-gray-900/30 rounded-xl p-6 space-y-4">
                      <h3 className="text-lg font-bold text-emerald-400">Member {index + 2}</h3>

                      <div>
                        <label className="block text-emerald-300 font-semibold mb-2">Full Name *</label>
                        <input
                          type="text"
                          value={membersData[index].name}
                          onChange={(e) => handleMemberDataChange(index, 'name', e.target.value)}
                          className="w-full px-4 py-3 bg-gray-900/50 border border-emerald-400/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-emerald-400 transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-emerald-300 font-semibold mb-2">Phone Number *</label>
                        <input
                          type="tel"
                          value={membersData[index].phone}
                          onChange={(e) => handleMemberDataChange(index, 'phone', e.target.value)}
                          className="w-full px-4 py-3 bg-gray-900/50 border border-emerald-400/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-emerald-400 transition-colors"
                          maxLength={10}
                        />
                      </div>

                      <div>
                        <label className="block text-emerald-300 font-semibold mb-2">Email Address *</label>
                        <input
                          type="email"
                          value={membersData[index].email}
                          onChange={(e) => handleMemberDataChange(index, 'email', e.target.value)}
                          className="w-full px-4 py-3 bg-gray-900/50 border border-emerald-400/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-emerald-400 transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-emerald-300 font-semibold mb-2">Resume Link *</label>
                        <input
                          type="url"
                          value={membersData[index].resumeLink}
                          onChange={(e) => handleMemberDataChange(index, 'resumeLink', e.target.value)}
                          className="w-full px-4 py-3 bg-gray-900/50 border border-emerald-400/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-emerald-400 transition-colors"
                        />
                      </div>
                    </div>
                  ))}

                  {error && (
                    <div className="bg-red-900/30 border border-red-500/50 rounded-xl p-4">
                      <p className="text-red-300 text-sm">❌ {error}</p>
                    </div>
                  )}

                  <button
                    onClick={handleUpdateTeam}
                    disabled={loading}
                    className="w-full px-8 py-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold rounded-full shadow-lg hover:shadow-emerald-500/40 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Updating...' : 'Update Team'}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}