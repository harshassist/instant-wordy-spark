
import JobApplicationForm from "./components/JobApplicationForm"
import { useNavigate, useParams } from "react-router-dom"

export default function ApplyJob() {
  const navigate = useNavigate()
  const { jobId } = useParams()
  
  // In a real app, you'd get the candidateId from your auth context
  const candidateId = "example-candidate-id"

  const handleSuccess = () => {
    navigate("/jobs") // Redirect to jobs list after successful application
  }

  if (!jobId) return null

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <JobApplicationForm 
        jobId={jobId} 
        candidateId={candidateId}
        onSuccess={handleSuccess}
      />
    </div>
  )
}
