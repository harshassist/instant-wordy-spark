
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { FileText, Send } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useJobApplication, JobApplicationData } from "@/hooks/useJobApplication"

const formSchema = z.object({
  coverLetter: z
    .string()
    .min(1, "Cover letter is required")
    .max(500, "Cover letter must not exceed 500 characters"),
  note: z
    .string()
    .max(300, "Note must not exceed 300 characters")
    .optional(),
})

type JobApplicationFormProps = {
  jobId: string
  candidateId: string
  onSuccess?: () => void
}

export default function JobApplicationForm({ jobId, candidateId, onSuccess }: JobApplicationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const jobApplication = useJobApplication()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      coverLetter: "",
      note: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true)
    try {
      const applicationData: JobApplicationData = {
        jobId,
        candidateId,
        coverLetter: values.coverLetter,
        note: values.note,
      }
      await jobApplication.mutateAsync(applicationData)
      onSuccess?.()
      form.reset()
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Apply for this Position</CardTitle>
        <CardDescription>Submit your application for this job opportunity</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="coverLetter"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Cover Letter *
                  </FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Write your cover letter here..."
                      className="min-h-[150px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="note"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">Additional Note</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Any additional information you'd like to share..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">* Cover letter is required to apply</p>
              <Button 
                type="submit" 
                className="w-full md:w-auto"
                disabled={isSubmitting}
              >
                <Send className="mr-2 h-4 w-4" />
                Submit Application
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
