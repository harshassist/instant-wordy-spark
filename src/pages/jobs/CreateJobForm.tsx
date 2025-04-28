
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Briefcase, MapPin, FileText, DollarSign, ListCheck, BookOpen, GraduationCap, Clock } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { useCreateJob } from "@/hooks/useJobs"
import { useToast } from "@/hooks/use-toast"

const formSchema = z.object({
  title: z.string().min(1, "Job title is required"),
  location: z.string().min(1, "Location is required"),
  description: z.string().min(1, "Job description is required"),
  salary_range: z.string().optional(),
  employment_type: z.enum(["full_time", "part_time", "contract", "temporary", "internship", "remote"], {
    required_error: "Please select an employment type"
  }),
  requirements: z.string().optional(),
  school_level: z.string().min(1, "School level is required"),
  subject_required: z.string().min(1, "Subject is required"),
  experience_required: z.string().optional()
})

type FormValues = z.infer<typeof formSchema>

export default function CreateJobForm() {
  const { toast } = useToast()
  const createJob = useCreateJob()
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      location: "",
      description: "",
      salary_range: "",
      employment_type: undefined,
      requirements: "",
      school_level: "",
      subject_required: "",
      experience_required: ""
    }
  })

  const onSubmit = async (data: FormValues) => {
    try {
      await createJob.mutateAsync({
        title: data.title,
        location: data.location,
        description: data.description,
        employment_type: data.employment_type,
        salary_range: data.salary_range,
        requirements: data.requirements ? data.requirements.split(",").map(r => r.trim()) : [],
        school_level: data.school_level,
        subject_required: data.subject_required,
        experience_required: data.experience_required,
        is_active: true,
        is_approved: false
      })
      toast({
        title: "Success",
        description: "Job posted successfully",
      })
      form.reset()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to post job",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <Card>
        <CardHeader>
          <CardTitle>Post a New Job</CardTitle>
          <CardDescription>Create a new job listing for EduAssist</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Basic Information */}
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Briefcase className="h-4 w-4" />
                        Job Title *
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Mathematics Teacher" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        Location *
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Mumbai, Maharashtra" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Job Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Job Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <FileText className="h-4 w-4" />
                          Job Description *
                        </FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Describe the role, responsibilities, and qualifications..."
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
                    name="requirements"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <ListCheck className="h-4 w-4" />
                          Requirements
                        </FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Enter requirements separated by commas..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {/* New Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="school_level"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <GraduationCap className="h-4 w-4" />
                            School Level *
                          </FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select school level" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Primary">Primary</SelectItem>
                              <SelectItem value="Secondary">Secondary</SelectItem>
                              <SelectItem value="College">College</SelectItem>
                              <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="subject_required"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <BookOpen className="h-4 w-4" />
                            Subject Required *
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. Mathematics, English, Science" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="experience_required"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          Experience Required
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. 3-5 years, 5+ years" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Compensation */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Compensation</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="salary_range"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4" />
                          Salary Range
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. ₹25,000–₹35,000 per month" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="employment_type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Briefcase className="h-4 w-4" />
                          Employment Type *
                        </FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select employment type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="full_time">Full-Time</SelectItem>
                            <SelectItem value="part_time">Part-Time</SelectItem>
                            <SelectItem value="contract">Contract</SelectItem>
                            <SelectItem value="temporary">Temporary</SelectItem>
                            <SelectItem value="internship">Internship</SelectItem>
                            <SelectItem value="remote">Remote</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">Fields marked with an asterisk (*) are required.</p>
                <Button type="submit" className="w-full md:w-auto" size="lg">
                  Post Job
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
