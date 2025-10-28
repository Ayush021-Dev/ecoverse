'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

type TeamInfo = {
  teamName: string
  leaderName: string
}

type SubmissionData = {
  id: string
  team_id: number
  ppt_file_url: string
  ppt_file_name: string
  file_size_mb: string
  github_link: string
  submitted_at: string
  team_name: string
  team_leader_name: string
}

export default function SubmitPPT() {
  const [activeTab, setActiveTab] = useState<'submit' | 'view'>('submit')

  const [formData, setFormData] = useState({
    teamId: '',
    githubLink: ''
  })
  const [teamInfo, setTeamInfo] = useState<TeamInfo | null>(null)
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [successType, setSuccessType] = useState<'submit' | 'edit'>('submit')

  const [viewTeamId, setViewTeamId] = useState('')
  const [submissionData, setSubmissionData] = useState<SubmissionData | null>(null)
  const [loadingView, setLoadingView] = useState(false)
  const [viewError, setViewError] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [loadingTeamValidation, setLoadingTeamValidation] = useState(false)
  const [teamValidated, setTeamValidated] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target
  
  setFormData({
    ...formData,
    [name]: value
  })
  setError('')
  
  // Only reset validation if teamId field is changed
  if (name === 'teamId') {
    setTeamValidated(false)
    setTeamInfo(null)
  }
}

  const validateTeamId = async () => {
    if (!formData.teamId.trim()) {
      setError('Please enter your Team ID')
      return
    }

    setLoadingTeamValidation(true)
    setError('')

    try {
      const { data: team, error: teamError } = await supabase
        .from('teams')
        .select('*')
        .eq('id', parseInt(formData.teamId))
        .single()

      if (teamError || !team) {
        setError('Invalid Team ID. Please register your team first.')
        setLoadingTeamValidation(false)
        return
      }

      const { data: members, error: membersError } = await supabase
        .from('team_members')
        .select('*')
        .eq('team_id', parseInt(formData.teamId))
        .eq('member_role', 'leader')
        .single()

      if (membersError) {
        setError('Error fetching team leader information')
        setLoadingTeamValidation(false)
        return
      }

      setTeamInfo({
        teamName: team.team_name,
        leaderName: members?.name || 'N/A'
      })
      setTeamValidated(true)

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error validating Team ID'
      setError(errorMessage)
    } finally {
      setLoadingTeamValidation(false)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      const validTypes = [
        'application/vnd.ms-powerpoint',
        'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        'application/pdf'
      ]
      if (!validTypes.includes(selectedFile.type)) {
        setError('Please upload a valid PPT, PPTX, or PDF file')
        setFile(null)
        return
      }

      const maxSize = 15 * 1024 * 1024
      if (selectedFile.size > maxSize) {
        setError('File size must be less than 15MB')
        setFile(null)
        return
      }

      setFile(selectedFile)
      setError('')
    }
  }

  const validateForm = () => {
    if (!teamValidated) {
      setError('Please validate your Team ID first')
      return false
    }

    if (!formData.githubLink.trim()) {
      setError('Please enter your GitHub repository link')
      return false
    }

    try {
      new URL(formData.githubLink)
    } catch {
      setError('Please enter a valid GitHub repository URL')
      return false
    }

    if (!file) {
      setError('Please upload your presentation file')
      return false
    }

    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setLoading(true)
    setError('')
    setUploadProgress(0)

    try {
      const teamId = parseInt(formData.teamId)

      const { data: existingSubmission } = await supabase
        .from('ppt_submissions')
        .select('team_id')
        .eq('team_id', teamId)
        .single()

      if (existingSubmission) {
        setError('This Team ID has already submitted. Use "View & Edit Submission" tab to update.')
        setLoading(false)
        return
      }

      const fileExt = file!.name.split('.').pop()
      const fileName = `${Date.now()}_team${teamId}.${fileExt}`

      setUploadProgress(30)

      const { error: uploadError } = await supabase.storage
        .from('PPTs')
        .upload(fileName, file!)

      if (uploadError) throw new Error(`Upload failed: ${uploadError.message}`)

      setUploadProgress(60)

      const { data: { publicUrl } } = supabase.storage
        .from('PPTs')
        .getPublicUrl(fileName)

      setUploadProgress(80)

      const { error: dbError } = await supabase
        .from('ppt_submissions')
        .insert({
          team_id: teamId,
          ppt_file_url: publicUrl,
          ppt_file_name: file!.name,
          file_size_mb: (file!.size / (1024 * 1024)).toFixed(2),
          github_link: formData.githubLink.trim()
        })

      if (dbError) {
        await supabase.storage.from('PPTs').remove([fileName])
        throw new Error(`Database error: ${dbError.message}`)
      }

      setUploadProgress(100)
      setSuccess(true)
      setSuccessType('submit')

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred. Please try again.'
      setError(errorMessage)
      console.error('Submission error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleViewSubmission = async () => {
    if (!viewTeamId.trim()) {
      setViewError('Please enter your Team ID')
      return
    }

    setLoadingView(true)
    setViewError('')
    setSubmissionData(null)

    try {
      const teamId = parseInt(viewTeamId.trim())

      const { data: submission, error: submissionError } = await supabase
        .from('ppt_submissions')
        .select('*')
        .eq('team_id', teamId)
        .single()

      if (submissionError || !submission) {
        setViewError('No submission found for this Team ID')
        setLoadingView(false)
        return
      }

      const { data: team, error: teamError } = await supabase
        .from('teams')
        .select('team_name')
        .eq('id', teamId)
        .single()

      const { data: leader, error: leaderError } = await supabase
        .from('team_members')
        .select('name')
        .eq('team_id', teamId)
        .eq('member_role', 'leader')
        .single()

      if (teamError || leaderError) {
        setViewError('Error fetching team details')
        setLoadingView(false)
        return
      }

      setSubmissionData({
        ...submission,
        team_name: team.team_name,
        team_leader_name: leader.name
      })

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error fetching submission'
      setViewError(errorMessage)
    } finally {
      setLoadingView(false)
    }
  }

  const handleUpdateSubmission = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!submissionData) return

    if (!file) {
      setError('Please select a new file to upload')
      return
    }

    setLoading(true)
    setError('')
    setUploadProgress(0)

    try {
      setUploadProgress(20)

      const urlParts = submissionData.ppt_file_url.split('/PPTs/')
      const oldFileName = urlParts.length > 1 ? urlParts[1] : null

      if (oldFileName) {
        await supabase.storage
          .from('PPTs')
          .remove([oldFileName])
      }

      setUploadProgress(40)

      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}_team${submissionData.team_id}.${fileExt}`

      const { error: uploadError } = await supabase.storage
        .from('PPTs')
        .upload(fileName, file)

      if (uploadError) throw new Error(`Upload failed: ${uploadError.message}`)

      setUploadProgress(60)

      const { data: { publicUrl } } = supabase.storage
        .from('PPTs')
        .getPublicUrl(fileName)

      setUploadProgress(80)

      const { error: updateError } = await supabase
        .from('ppt_submissions')
        .update({
          ppt_file_url: publicUrl,
          ppt_file_name: file.name,
          file_size_mb: (file.size / (1024 * 1024)).toFixed(2),
          github_link: formData.githubLink.trim()
        })
        .eq('id', submissionData.id)

      if (updateError) throw new Error(`Update failed: ${updateError.message}`)

      setUploadProgress(100)
      setSuccess(true)
      setSuccessType('edit')
      setIsEditing(false)
      setSubmissionData(null)
      setFile(null)

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
              {successType === 'edit' ? 'Update Successful!' : 'Submission Successful!'}
            </h2>
            <p className="text-emerald-300 text-lg mb-8">
              {successType === 'edit'
                ? 'Your presentation has been updated successfully!'
                : 'Your presentation has been uploaded successfully. Good luck!'}
            </p>

            <button
              onClick={() => {
                setSuccess(false)
                setFormData({ teamId: '', githubLink: '' })
                setFile(null)
                setError('')
                setActiveTab('submit')
                setTeamValidated(false)
                setTeamInfo(null)
              }}
              className="w-full px-8 py-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold rounded-full shadow-lg hover:shadow-emerald-500/40 transition-all duration-300 transform hover:scale-105"
            >
              Back to Submission Page
            </button>
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
                PPT Submission
              </span>
            </h1>
            <p className="text-gray-400 text-lg">
              Ecoverse 2025
            </p>
          </div>

          <div className="flex space-x-4 mb-8">
            <button
              onClick={() => {
                setActiveTab('submit')
                setError('')
                setViewError('')
                setSubmissionData(null)
                setIsEditing(false)
              }}
              className={`flex-1 py-3 rounded-xl font-semibold transition-all ${activeTab === 'submit'
                  ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg'
                  : 'bg-emerald-900/30 text-emerald-300 hover:bg-emerald-900/50'
                }`}
            >
              Submit New
            </button>
            <button
              onClick={() => {
                setActiveTab('view')
                setError('')
                setViewError('')
                setFormData({ teamId: '', githubLink: '' })
                setFile(null)
              }}
              className={`flex-1 py-3 rounded-xl font-semibold transition-all ${activeTab === 'view'
                  ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg'
                  : 'bg-emerald-900/30 text-emerald-300 hover:bg-emerald-900/50'
                }`}
            >
              View & Edit
            </button>
          </div>

          {activeTab === 'submit' && (
            <div className="bg-gradient-to-r from-emerald-900/50 to-green-900/50 backdrop-blur-lg border-2 border-emerald-400/30 rounded-3xl p-8 md:p-12 shadow-2xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-emerald-300 font-semibold mb-2">Team ID *</label>
                  <div className="flex space-x-2">
                    <input
                      type="number"
                      name="teamId"
                      value={formData.teamId}
                      onChange={handleInputChange}
                      className="flex-1 px-4 py-3 bg-gray-900/50 border border-emerald-400/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-emerald-400 transition-colors"
                      placeholder="Enter your team ID"
                      disabled={loading || teamValidated}
                    />
                    {!teamValidated && (
                      <button
                        type="button"
                        onClick={validateTeamId}
                        disabled={loadingTeamValidation}
                        className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition-colors disabled:opacity-50"
                      >
                        {loadingTeamValidation ? 'Validating...' : 'Validate'}
                      </button>
                    )}
                  </div>
                </div>

                {teamValidated && teamInfo && (
                  <div className="bg-emerald-900/30 border border-emerald-400/30 rounded-xl p-4 space-y-2">
                    <div className="flex items-center space-x-2 text-emerald-400 mb-3">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="font-semibold">Team Validated!</span>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Team Name</p>
                      <p className="text-white font-semibold">{teamInfo.teamName}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Team Leader</p>
                      <p className="text-white font-semibold">{teamInfo.leaderName}</p>
                    </div>
                  </div>
                )}
                <div className="bg-blue-900/20 border border-blue-400/20 rounded-xl p-5">
                  <h3 className="text-blue-300 font-semibold mb-3">📋 Submission Instructions:</h3>
                  <ul className="text-gray-400 text-sm space-y-2">
                    <li>• Enter your Team ID and validate it first</li>
                    <li>• Provide your GitHub repository link (project doesn&apos;t need to be complete)</li>
                    <li>• An empty repository where you&apos;ll work on your project is sufficient</li>
                    <li>• Upload your presentation file (<strong className="text-yellow-400">MAX 15MB</strong>)</li>
                    <li>• Accepted formats: PPT, PPTX, or PDF</li>
                    <li>• Each team can submit only once</li>
                  </ul>
                </div>

                <div>
                  <label className="block text-emerald-300 font-semibold mb-2">GitHub Repository Link *</label>
                  <input
                    type="url"
                    name="githubLink"
                    value={formData.githubLink}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-900/50 border border-emerald-400/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-emerald-400 transition-colors"
                    placeholder="https://github.com/username/repository"
                    disabled={loading || !teamValidated}
                  />
                  <p className="text-gray-500 text-sm mt-2">
                    Your project repository (can be empty initially)
                  </p>
                </div>
                <div>
                  <label className="block text-emerald-300 font-semibold mb-2">Upload Presentation *</label>
                  <input
                    type="file"
                    accept=".ppt,.pptx,.pdf"
                    onChange={handleFileChange}
                    className="w-full px-4 py-3 bg-gray-900/50 border border-emerald-400/30 rounded-xl text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-emerald-500 file:text-white hover:file:bg-emerald-600 file:cursor-pointer focus:outline-none focus:border-emerald-400 transition-colors"
                    disabled={loading || !teamValidated}
                  />
                  <p className="text-gray-500 text-sm mt-2">Accepted: PPT, PPTX, PDF (Max 15MB)</p>
                  {file && (
                    <p className="text-emerald-400 text-sm mt-2">
                      ✓ {file.name} ({(file.size / (1024 * 1024)).toFixed(2)} MB)
                    </p>
                  )}
                </div>

                {loading && uploadProgress > 0 && (
                  <div className="space-y-2">
                    <div className="w-full bg-gray-900/50 rounded-full h-3 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-emerald-500 to-green-600 h-full transition-all duration-500 rounded-full"
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                    <p className="text-emerald-400 text-sm text-center">Uploading... {uploadProgress}%</p>
                  </div>
                )}

                {error && (
                  <div className="bg-red-900/30 border border-red-500/50 rounded-xl p-4">
                    <p className="text-red-300 text-sm">❌ {error}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading || !teamValidated}
                  className="w-full px-8 py-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold rounded-full shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {loading ? 'Submitting...' : 'Submit Presentation'}
                </button>
              </form>
            </div>
          )}

          {activeTab === 'view' && (
            <div className="bg-gradient-to-r from-emerald-900/50 to-green-900/50 backdrop-blur-lg border-2 border-emerald-400/30 rounded-3xl p-8 md:p-12 shadow-2xl">
              {!submissionData ? (
                <div className="space-y-6">
                  <div>
                    <label className="block text-emerald-300 font-semibold mb-2">Enter Your Team ID</label>
                    <input
                      type="number"
                      value={viewTeamId}
                      onChange={(e) => {
                        setViewTeamId(e.target.value)
                        setViewError('')
                      }}
                      className="w-full px-4 py-3 bg-gray-900/50 border border-emerald-400/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-emerald-400 transition-colors"
                      placeholder="Enter your team ID"
                      disabled={loadingView}
                    />
                  </div>

                  {viewError && (
                    <div className="bg-red-900/30 border border-red-500/50 rounded-xl p-4">
                      <p className="text-red-300 text-sm">❌ {viewError}</p>
                    </div>
                  )}

                  <button
                    onClick={handleViewSubmission}
                    disabled={loadingView}
                    className="w-full px-8 py-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold rounded-full shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loadingView ? 'Loading...' : 'View Submission'}
                  </button>
                </div>
              ) : !isEditing ? (
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-emerald-300 mb-4">Your Submission</h3>

                  <div className="space-y-4">
                    <div className="bg-gray-900/30 rounded-xl p-4">
                      <p className="text-gray-400 text-sm mb-1">Team ID</p>
                      <p className="text-white font-semibold">{submissionData.team_id}</p>
                    </div>

                    <div className="bg-gray-900/30 rounded-xl p-4">
                      <p className="text-gray-400 text-sm mb-1">Team Name</p>
                      <p className="text-white font-semibold">{submissionData.team_name}</p>
                    </div>

                    <div className="bg-gray-900/30 rounded-xl p-4">
  <p className="text-gray-400 text-sm mb-1">Team Leader</p>
  <p className="text-white font-semibold">{submissionData.team_leader_name}</p>
</div>

<div className="bg-gray-900/30 rounded-xl p-4">
  <p className="text-gray-400 text-sm mb-1">GitHub Repository</p>
  <a 
    href={submissionData.github_link} 
    target="_blank" 
    rel="noopener noreferrer"
    className="text-emerald-400 font-semibold hover:text-emerald-300 underline break-all"
  >
    {submissionData.github_link}
  </a>
</div>

<div className="bg-gray-900/30 rounded-xl p-4">
  <p className="text-gray-400 text-sm mb-1">Presentation File</p>
                      <p className="text-emerald-400 font-semibold mb-2">{submissionData.ppt_file_name}</p>
                      <a
                        href={submissionData.ppt_file_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-emerald-300 hover:text-emerald-200 underline"
                      >
                        Download File
                      </a>
                    </div>

                    <div className="bg-gray-900/30 rounded-xl p-4">
                      <p className="text-gray-400 text-sm mb-1">Submitted At</p>
                      <p className="text-white font-semibold">
                        {new Date(submissionData.submitted_at).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <button
                      onClick={() => setIsEditing(true)}
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold rounded-full shadow-lg hover:shadow-emerald-500/40 transition-all duration-300 transform hover:scale-105"
                    >
                      Replace PPT
                    </button>
                    <button
                      onClick={() => {
                        setSubmissionData(null)
                        setViewTeamId('')
                      }}
                      className="flex-1 px-6 py-3 bg-gray-700 text-white font-bold rounded-full hover:bg-gray-600 transition-all"
                    >
                      Close
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleUpdateSubmission} className="space-y-6">
                  <h3 className="text-2xl font-bold text-emerald-300 mb-4">Replace Presentation</h3>

                  <div className="bg-emerald-900/30 border border-emerald-400/30 rounded-xl p-4 space-y-2">
                    <div>
                      <p className="text-gray-400 text-sm">Team ID</p>
                      <p className="text-white font-semibold">{submissionData.team_id}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Team Name</p>
                      <p className="text-white font-semibold">{submissionData.team_name}</p>
                    </div>
                    <div>
  <p className="text-gray-400 text-sm">Team Leader</p>
  <p className="text-white font-semibold">{submissionData.team_leader_name}</p>
</div>
<div>
  <p className="text-gray-400 text-sm">GitHub Repository</p>
  <a 
    href={submissionData.github_link} 
    target="_blank" 
    rel="noopener noreferrer"
    className="text-emerald-400 text-sm hover:text-emerald-300 underline break-all"
  >
    {submissionData.github_link}
  </a>
</div>
                  </div>

                  <div>
                    <label className="block text-emerald-300 font-semibold mb-2">Upload New Presentation *</label>
                    <input
                      type="file"
                      accept=".ppt,.pptx,.pdf"
                      onChange={handleFileChange}
                      className="w-full px-4 py-3 bg-gray-900/50 border border-emerald-400/30 rounded-xl text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-emerald-500 file:text-white hover:file:bg-emerald-600 file:cursor-pointer focus:outline-none focus:border-emerald-400 transition-colors"
                      disabled={loading}
                    />
                    <p className="text-gray-500 text-sm mt-2">
                      Current: {submissionData.ppt_file_name}
                    </p>
                    {file && (
                      <p className="text-emerald-400 text-sm mt-2">
                        ✓ New: {file.name} ({(file.size / (1024 * 1024)).toFixed(2)} MB)
                      </p>
                    )}
                  </div>

                  {loading && uploadProgress > 0 && (
                    <div className="space-y-2">
                      <div className="w-full bg-gray-900/50 rounded-full h-3 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-emerald-500 to-green-600 h-full transition-all duration-500 rounded-full"
                          style={{ width: `${uploadProgress}%` }}
                        ></div>
                      </div>
                      <p className="text-emerald-400 text-sm text-center">Updating... {uploadProgress}%</p>
                    </div>
                  )}

                  {error && (
                    <div className="bg-red-900/30 border border-red-500/50 rounded-xl p-4">
                      <p className="text-red-300 text-sm">❌ {error}</p>
                    </div>
                  )}

                  <div className="flex space-x-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold rounded-full shadow-lg hover:shadow-emerald-500/40 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? 'Updating...' : 'Update Presentation'}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsEditing(false)
                        setFile(null)
                        setError('')
                      }}
                      className="flex-1 px-6 py-3 bg-gray-700 text-white font-bold rounded-full hover:bg-gray-600 transition-all"
                      disabled={loading}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}