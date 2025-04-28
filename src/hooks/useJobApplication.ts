
import { useMutation } from "@tanstack/react-query"
import { supabase } from "@/lib/database"
import { useToast } from "@/hooks/use-toast"

export type JobApplicationData = {
  jobId: string
  candidateId: string
  coverLetter: string
  note?: string
}

export const useJobApplication = () => {
  const { toast } = useToast()

  return useMutation({
    mutationFn: async ({ jobId, candidateId, coverLetter, note }: JobApplicationData) => {
      const { data, error } = await supabase
        .from('applications')
        .insert({
          job_id: jobId,
          candidate_id: candidateId,
          cover_letter: coverLetter,
          note: note,
          status: 'pending'
        })
        .select()
        .single()

      if (error) throw error
      return data
    },
    onSuccess: () => {
      toast({
        title: "Application Submitted",
        description: "Your job application has been submitted successfully.",
      })
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to submit application. Please try again.",
        variant: "destructive",
      })
      console.error("Application error:", error)
    }
  })
}
